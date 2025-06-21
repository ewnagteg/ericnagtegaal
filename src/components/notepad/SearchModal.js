import React from 'react';

export default function SearchModal({ searchValue, searchResults, onSearch, onResultClick, onClose, nodes }) {
    const handleResultClick = (result) => {
        const node = result.item;
        onResultClick(node.position.x, node.position.y);
        onClose();
    };

    const handleManualSearch = () => {
        const match = nodes.find((node) => {
            return node.data.notes?.toLowerCase().includes(searchValue.toLowerCase());
        });

        if (match) {
            onResultClick(match.position.x, match.position.y);
        } else {
            console.log("No match found");
        }
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-gray-900 p-4 rounded shadow-lg max-w-xl w-full max-h-xl">
                <h2 className="text-xl font-bold mb-2">Search Nodes:</h2>
                <input
                    type="text"
                    className="w-full bg-gray-800 border p-3 mb-4 text-white rounded"
                    defaultValue=""
                    onChange={onSearch}
                    placeholder="Search notes..."
                />
                
                {searchResults.length > 0 && (
                    <ul className="bg-gray-800 p-3 rounded">
                        {searchResults.map((result, index) => (
                            <li key={index} className="text-white mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => handleResultClick(result)}>

                            {result.item.data.label || "No Label"}: {result.matches.slice(0, 4).map((match, matchIndex) => (
                                <span key={matchIndex}>{match.indices.slice(0, 4).map(([start, end]) =>
                                    result.item.data.notes.substring(start, end + 1)
                                ).join(", ")} </span>))}
                        </li>
                        ))}
                    </ul>
                )}
                
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                        onClick={handleManualSearch}
                    >
                        Search
                    </button>
                    <button
                        className="bg-gray-500 text-white px-3 py-1 ml-4 rounded hover:bg-gray-600 transition"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};