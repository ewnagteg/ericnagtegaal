import React from 'react';

export default function ConfigModel({ config, setConfig, onClose, onRun, workerState, mlWorkerState, mlOnRun, loadWorker }) {

    const handleKChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setConfig(prevConfig => ({
            ...prevConfig,
            k: selectedValue,
        }));
    };

    const handleLambdaChange = (e) => {
        const selectedValue = parseFloat(e.target.value);
        setConfig(prevConfig => ({
            ...prevConfig,
            lambda: selectedValue,
        }));
    };

    const handleStepsChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        setConfig(prevConfig => ({
            ...prevConfig,
            steps: selectedValue,
        }));
    };

    const handleUseEmbeddingsChange = (e) => {
        const isChecked = e.target.checked;
        setConfig((prevConfig) => ({
            ...prevConfig,
            useEmbeddings: isChecked,
        }));
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-gray-900 p-4 rounded shadow-lg max-w-xl w-full max-h-xl">
                <h2 className="text-xl font-bold mb-2">Auto Group Nodes Tool</h2>

                <p>Select number of clusters notes should be in</p>
                <select
                    className="w-full bg-gray-800 border p-3 mb-4 mt-2 text-white rounded"
                    value={config.k}
                    onChange={handleKChange}
                >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>

                <p>Select how fast nodes should move apart</p>
                <input
                    type="range"
                    className="w-full bg-gray-800 border p-3 mb-1 text-white rounded"
                    value={config.lambda}
                    min="0.05"
                    max="10"
                    step="0.05"
                    onChange={handleLambdaChange}
                />
                <p className="text-white mb-6">Current Lambda: {config.lambda.toFixed(1)}</p>

                <p>Select number of steps to run algorithm</p>
                <input
                    type="range"
                    className="w-full bg-gray-800 border p-3 mb-4 text-white rounded"
                    value={config.steps}
                    min="1"
                    max="200"
                    step="1"
                    onChange={handleStepsChange}
                />
                <p className="text-white mb-6">Current Steps: {config.steps}</p>

                <div className="mt-4 flex justify-end">
                    <button
                        className="text-white bg-green-500 px-3 py-1 ml-4 hover:bg-green-600 transition rounded disabled:opacity-50"
                        onClick={onRun}
                        disabled={workerState === 'busy'}
                    >
                        {workerState === 'busy' ? 'Running...' : 'Run'}
                    </button>
                    <button
                        className="text-gray-300 bg-gray-700 px-3 py-1 ml-4 hover:bg-gray-800 transition rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                {mlWorkerState !== "not-loaded" && mlWorkerState !== "loading" &&
                    <>
                        <p className="text-white mb-6">Use Embeddings for update:</p>
                        <label className="flex items-center text-white mb-6">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={config.useEmbeddings || false}
                                onChange={handleUseEmbeddingsChange}
                            />
                            Enable Embeddings
                        </label>
                    </>
                }

                <p>ML Worker State: {mlWorkerState}</p>
                {mlWorkerState == "not-loaded" && <>
                    <p className="text-white mb-6">Load ML Worker</p>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="text-white bg-green-500 px-3 py-1 ml-4 hover:bg-green-600 transition rounded disabled:opacity-50"
                            onClick={loadWorker}
                            disabled={mlWorkerState !== 'not-loaded'}
                        >
                            {mlWorkerState === 'not-loaded' ? 'Load' : 'mlWorkerState' === "loading" ? "loading..." : "busy"}
                        </button>
                    </div>
                    <p>load model pls {mlWorkerState}</p>
                </>}
                {(mlWorkerState === "ready" || mlWorkerState === "embedded") && <>
                    
                    <p className="text-white mb-6">Run ML Worker</p>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="text-white bg-green-500 px-3 py-1 ml-4 hover:bg-green-600 transition rounded disabled:opacity-50"
                            onClick={mlOnRun}
                            disabled={mlWorkerState !== 'embedded' && mlWorkerState !== 'ready'}
                        >
                            Run
                        </button>
                    </div>
                </>}
                {mlWorkerState === "embedded" && <>
                    <p>Embeddings loaded</p>
                </>}
            </div>
        </div>
    );
};