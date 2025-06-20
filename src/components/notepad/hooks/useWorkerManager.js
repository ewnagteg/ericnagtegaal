import { useState, useEffect, useRef, useCallback } from 'react';

export default function useWorkerManager(setNodes, config) {
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
            workerRef.current.postMessage({ 
                type: "process", 
                data: JSON.stringify(nodes), 
                config: config 
            });
            setWorkerState("busy");
        }
    }, [workerState, config]);

    return {
        workerState,
        updatePositions
    };
}