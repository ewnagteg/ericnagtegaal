import { useState, useEffect, useRef, useCallback } from 'react';

// TODO: move this to utils
function cosSim(v1, v2) {
    const mv1 = Math.sqrt(dot(v1, v1));
    const mv2 = Math.sqrt(dot(v2, v2));
    if (!mv1 || !mv2)
        return 0;
    return dot(v1, v2) / (mv1 * mv2);
}

function dot(v1, v2) {
    let s = 0;
    for (let i = 0; i < v1.length; i++) {
        s += v1[i] * v2[i];
    }
    return s;
}

export default function useWorkerManager(setNodes, setEdges, config, embeddings) {
    const [workerState, setWorkerState] = useState("loading");
    const workerRef = useRef(null);

    useEffect(() => {
        workerRef.current = new Worker("tfidfworker.js");
        const worker = workerRef.current;

        setWorkerState("ready");

        worker.onmessage = (e) => {
            if (e.data.type === "result") {
                const positions = e.data.data;
                setWorkerState("ready");
                setNodes((prevNodes) =>
                    prevNodes.map((node, index) => ({
                        ...node,
                        position: positions[index],
                    }))
                );
            } else if (e.data.type === "error") {
                setWorkerState("error");
                console.error("Error from worker:", e.data.message);
            }
        };
        return () => worker.terminate();
    }, [setNodes]);

    const updatePositions = useCallback((nodes) => {
        if (workerRef.current && workerState === "ready") {
            if (config.useEmbeddings && embeddings[0] && embeddings[0].length > 0) {
                workerRef.current.postMessage({
                    type: "process",
                    data: JSON.stringify(nodes),
                    embeddings: embeddings,
                    config: config
                });
            } else {
                workerRef.current.postMessage({
                    type: "process",
                    data: JSON.stringify(nodes),
                    config: config
                });
            }
            setWorkerState("busy");
        }
    }, [workerState, config]);

    const updatedEdges = useCallback((edges, nodes) => {

        const uniqueNodes = Array.from(
            new Map(nodes.map((node) => [node.id, node])).values()
        );

        let bestEdges = new Array(uniqueNodes.length).fill(0);
        let bestScores = new Array(uniqueNodes.length).fill(0);
        for (let j = 0; j < uniqueNodes.length; j++) {
            for (let i = j + 1; i < uniqueNodes.length; i++) {
                let score = cosSim(embeddings[j], embeddings[i]);
                if (score > bestScores[j]) {
                    bestScores[j] = score;
                    bestEdges[j] = i;
                    bestScores[i] = score;
                    bestEdges[i] = j;
                }
            }
        }
        console.log("Best edges:", bestEdges, bestScores);
        const n = config.numEdges < uniqueNodes.length - 1 ? config.numEdges : uniqueNodes.length - 1;
        const edgesWithScores = bestEdges.map((i, j) => ({
            j, i, score: bestScores[j],
        }));
        edgesWithScores.sort((a, b) => b.score - a.score);
        const best = [];

        const connectedPairs = new Set();

        for (const edge of edgesWithScores) {
            const pairKey = `${Math.min(edge.j, edge.i)}-${Math.max(edge.j, edge.i)}`;
            if (!connectedPairs.has(pairKey)) {
                connectedPairs.add(pairKey);
                best.push(edge);
                if (best.length >= n) break;
            }
        }

        const existingEdgeIds = new Set(edges.map((edge) => edge.id));

        const newEdges = best
            .map(({ j, i, score }) => ({
                id: `e${j}-${i}`,
                source: uniqueNodes[j].id,
                target: uniqueNodes[i].id,
            }))
            .filter((edge) => !existingEdgeIds.has(edge.id));

        setEdges(newEdges);
    });

    return {
        workerState,
        updatePositions,
        updatedEdges
    };
}