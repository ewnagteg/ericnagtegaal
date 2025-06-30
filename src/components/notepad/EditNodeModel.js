import React from 'react';
import { DEV } from "../../constants.js";

export default function EditNodeModel({selectedNode, setSelectedNode, onDelete, onApply}) {
    return (<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="flex flex-col bg-gray-900 p-4 rounded shadow-lg max-h-xl">
            <h2 className="text-xl font-bold mb-2">Edit Node: {DEV && <>{selectedNode.id}</>}</h2>
            <input
                type="text"
                className="w-full bg-gray-800 border p-3 mb-4 text-white rounded"
                defaultValue={selectedNode.data.label || ""}
                onChange={(e) => {
                    setSelectedNode({
                        ...selectedNode,
                        data: { ...selectedNode.data, label: e.target.value },
                    });
                }}
            />
            <textarea
                className="w-full md:min-w-[60rem] bg-gray-800 h-80 border p-3 resize"
                defaultValue={selectedNode.data.notes || ""}
                onChange={(e) => {
                    setSelectedNode({
                        ...selectedNode,
                        data: { ...selectedNode.data, notes: e.target.value },
                    })
                }
                }
            />
            <div className="mt-4 flex justify-end">
                <button
                    className="text-gray-300 bg-gray-700 px-3 py-1 ml-4 hover:bg-gray-800 transition rounded"
                    onClick={() => {
                        setSelectedNode(null);
                    }}
                >
                    Close
                </button>
                <button
                    className="text-white bg-red-500 px-3 py-1 ml-4 hover:bg-red-600 transition rounded"
                    onClick={() => {
                        onDelete(selectedNode.id);
                        setSelectedNode(null);
                    }}
                >
                    Delete
                </button>
                <button
                    className="text-white bg-green-500 px-3 py-1 ml-4 hover:bg-green-600 transition rounded"
                    onClick={() => {
                        // Save logic here, eg, update nodes
                        onApply(selectedNode);
                        setSelectedNode(null);
                    }}
                >
                    Apply
                </button>
            </div>
        </div>
    </div>);
}