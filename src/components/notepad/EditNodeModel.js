import React, { useState, useRef } from 'react';
import { DEV } from "../../constants.js";

export default function EditNodeModel({ selectedNode, setSelectedNode, onDelete, onApply }) {
    const [notes, setNotes] = useState(selectedNode.data.notes || "");
    const textareaRef = useRef(null);
    const highlightRef = useRef(null);

    const syncScroll = () => {
        if (textareaRef.current && highlightRef.current) {
            highlightRef.current.scrollTop = textareaRef.current.scrollTop;
            highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    const getHighlightedText = () => {
        return notes
            .split("\n")
            .map((line, i) =>
                line.includes("##") ? (
                    <div key={i} style={{ backgroundColor: "#444" }}>
                        {line || "\u00A0"}
                    </div>
                ) : (
                    <div key={i}>{line || "\u00A0"}</div>
                )
            );
    };
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="flex flex-col bg-gray-900 p-4 rounded shadow-lg max-h-[80vh]">
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
                <div className="relative">
                    {/* Highlighted text div */}
                    <pre
                        ref={highlightRef}
                        aria-hidden="true"
                        className="absolute inset-0 p-4 overflow-auto whitespace-pre-wrap break-words text-white pointer-events-none font-mono border border-gray-700 rounded"
                    >
                        {getHighlightedText()}
                    </pre>
                    {/* Transparent textarea on top */}
                    <textarea
                        ref={textareaRef}
                        className="inset-0 w-full h-full min-w-[60rem] min-h-[20rem] p-4 resize bg-transparent text-white font-mono border border-gray-700 rounded outline-none"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        onScroll={syncScroll}
                    />
                </div>
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
                            onApply({
                                ...selectedNode,
                                data: {
                                    ...selectedNode.data,
                                    notes: notes,
                                },
                            });
                            setSelectedNode(null);
                        }}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>);
}