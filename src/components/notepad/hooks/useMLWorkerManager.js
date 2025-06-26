import { useState, useEffect, useRef, useCallback } from 'react';

export default function useMLWorkerManager(setNodes, config, setEmbeddings) {
    const [mlWorkerState, setMLWorkerState] = useState("not-loaded");

    const workerRef = useRef(null);

    useEffect(() => {
        workerRef.current = new Worker('worker.js', { type: 'module' });
        workerRef.current.onmessage = function (e) {
            if (e.data.status === "loading") {
                console.log("Loading model:", e.data.progress);
            } else if (e.data.status === "result") {
                console.log("Result:", e.data.result);
                setEmbeddings(e.data.output.embedding);
                setMLWorkerState("embedded")
            } else if (e.data.status === "loaded") {
                console.log("Model loaded successfully");
                setMLWorkerState("ready")
            } else {
                console.log(e.data);
            }
        };
    }, [setNodes, mlWorkerState]);

    

    const mlUpdatePositions = useCallback((nodes) => {
        if (workerRef.current && (mlWorkerState === "ready" || mlWorkerState === "embedded")) {
            workerRef.current.postMessage({
                task: "process",
                data: JSON.stringify(nodes),
                config: config
            });
            setMLWorkerState("busy");
        }
    }, [mlWorkerState, config]);

    const loadWorker = useCallback(() => {
        if (mlWorkerState === "not-loaded") {
            setMLWorkerState("loading");
            workerRef.current.postMessage({ task: "load" });
        }
    }, [workerRef, mlWorkerState]);

    return {
        mlWorkerState, 
        mlUpdatePositions,
        loadWorker
    };
}