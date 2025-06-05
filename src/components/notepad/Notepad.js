import React, { useEffect, useState, useCallback, useRef } from "react";
import { ReactFlow, useNodesState, useReactFlow } from "@xyflow/react";
import Notepadnav from "./Notepadnav.js";
import { fetchWithAuth, fetchWithAuthPost } from "../../api/fetchWithAuth";
import "@xyflow/react/dist/style.css";
import { useAuth0 } from "@auth0/auth0-react";
import Fuse from "fuse.js";
import { useMessage } from "../MessageProvider.js";

const initialNodes = [
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];
export default function Notepad() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [selectedNode, setSelectedNode] = useState(null);
    const [search, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [nodes, setNodes, onNodesChanges] = useNodesState(initialNodes);
    const [searchResults, setSearchResults] = useState([]);
    const [fuse, setFuse] = useState(null);
    const { setViewport } = useReactFlow();
    const workerRef = useRef(null);
    const [workerstate, setWorkerstate] = useState("loading");
    const [config, setConfig] = useState({ k: 2, lambda: 15 });
    const [configMenue, setConfigMenu] = useState(false);
    const { setMessage } = useMessage();

    useEffect(() => {
        // Set the message only when the component is first mounted
        setMessage(`This is a basic notepad made with react flow. 
                    You can create/edit notes and position them in 2d.
                    Notes will not save until you click save in nav bar.
                    Update Node graph will use K-means with tf idf to cluster your notes, 
                    it uses a sort of particle sim to position nodes in 2d space.
                    `);
    }, [setMessage]);


    useEffect(() => {
        workerRef.current = new Worker("tfidfworker.js");;
        const worker = workerRef.current;
        // currently this worker doesnt load anything so fine to set it to ready
        setWorkerstate("ready");
        worker.onmessage = (e) => {
            if (e.data.type === "result") {
                console.log("Received result:", e.data);
                let positions = e.data.data;
                setWorkerstate("ready");
                setNodes((prevNodes) =>
                    prevNodes.map((node, index) => ({
                        ...node,
                        position: positions[index], // Update position based on the corresponding index
                    }))
                );
            } else if (e.data.type === "error") {
                setWorkerstate("error");
                console.error("Error from worker:", e.data.message);
            }
        };
        return () => worker.terminate();
    }, []);

    const updatePositions = useCallback(() => {
        // This function gets called when the user clicks the update graph button
        // it should check state of worker and send nodes to it if not busy
        if (workerstate === "ready") {
            workerRef.current.postMessage({ type: "process", data: JSON.stringify(nodes), config: config });
            setWorkerstate("busy");
        }
    });

    const updateNodes = useCallback(() => {
        setConfigMenu(true);
    });

    // sets the selected node, this will display the edit node UI
    const onNodeClick = (event, node) => {
        setSelectedNode(node);
    };

    // this sets the viewport to center on the given x and y coordinates
    // this allows search results to center relevant node
    const onBlockOpen = useCallback((x, y) => {
        const zoom = 1.0;
        const { innerWidth, innerHeight } = window;

        const centerX = x - innerWidth / 2 / zoom;
        const centerY = y - innerHeight / 2 / zoom;

        setViewport({ x: -centerX, y: -centerY, zoom });
    }, [setViewport]);

    // saves notes to the server
    const saveNotes = useCallback(() => {
        console.log("Notes saved:", nodes);
        setMessage("Saved Notes");
        const data = {
            nodes: nodes.map(node => ({
                id: node.id,
                label: node.data.label,
                notes: node.data.notes,
                position: node.position,
            })),
            edges: initialEdges,
        };
        fetchWithAuthPost({ getAccessTokenSilently, url: "/notes", body: data });
    });

    // creates a new note, does not save to server
    // this is just for the UI
    const newNote = useCallback(() => {
        const newNode = {
            id: `${nodes.length + 1}`,
            position: { x: 0, y: 0 },
            data: { label: `New Note ${nodes.length + 1}`, notes: "" },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode);
    });
    const searchNotes = () => {
        // Logic to save search, e.g., send to server or local storage
        setSearch(true);
    };

    // fetches users notes from the server
    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                const data = await fetchWithAuth({
                    getAccessTokenSilently,
                    url: "/notes",
                });
                setNodes(JSON.parse(data[0].nodes).map((note) => ({
                    id: note.id,
                    position: { x: note.position.x, y: note.position.y },
                    data: { label: note.label, notes: note.notes },
                })));
            })();
        }
    }, [getAccessTokenSilently, isAuthenticated]);

    // this syncs fuse with current state of nodes
    // maybe this can be done a bit more efficiently
    // but this works for now
    useEffect(() => {
        if (nodes.length > 0) {
            const newFuse = new Fuse(nodes, {
                keys: ["data.notes", "data.label"],
                threshold: 0.4,
                includeMatches: true
            });
            setFuse(newFuse);

        }
    }, [nodes]);

    return (<main className="text-gray-400 bg-gray-900 body-font">
        <Notepadnav newNote={newNote} saveNotes={saveNotes} searchNotes={searchNotes} updateNodes={updateNodes} />
        <div style={{ width: "100vw", height: "100vh" }}>
            {/* react flow component - displays actual nodes */}
            <ReactFlow nodes={nodes}
                edges={initialEdges}
                onNodeClick={onNodeClick}
                onNodesChange={onNodesChanges}
                fitView />
            {/* allows config of k means */}
            {configMenue && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50"><div className="bg-gray-900 p-4 rounded shadow-lg max-w-xl w-full max-h-xl">
                <h2 className="text-xl font-bold mb-2">Update Nodes</h2>
                <p>Select number of clusters notes should be in</p>
                <select
                    className="w-full bg-gray-800 border p-3 mb-4 text-white rounded"
                    value={config.k} // Set the default value to the current value of `k` in `config`
                    onChange={(e) => {
                        const selectedValue = parseInt(e.target.value, 10);
                        setConfig((prevConfig) => ({
                            ...prevConfig,
                            k: selectedValue,
                        }));
                    }}
                >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    className="w-full bg-gray-800 border p-3 mb-4 text-white rounded"
                    value={config.lambda} // Set the default value to the current value of `lambda` in `config`
                    onChange={(e) => {
                        const selectedValue = parseInt(e.target.value, 10);
                        setConfig((prevConfig) => ({
                            ...prevConfig,
                            lambda: selectedValue,
                        }));
                    }}
                />
                <div className="mt-4 flex justify-end">

                    <button
                        className="bg-blue-500 text-white px-3 py-1 ml-4 rounded"
                        onClick={() => {
                            setConfigMenu(false);
                            updatePositions();
                        }}
                    >
                        Run
                    </button>
                    <button
                        className="bg-blue-500 text-white px-3 py-1 ml-4 rounded"
                        onClick={() => {
                            setConfigMenu(false);
                        }}
                    >
                        Close
                    </button>
                </div>
            </div></div>}
            {/* search ui */}
            {(search && !selectedNode) && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50"><div className="bg-gray-900 p-4 rounded shadow-lg max-w-xl w-full max-h-xl">
                <h2 className="text-xl font-bold mb-2">Search Nodes:</h2>
                <input
                    type="text"
                    className="w-full bg-gray-800 border p-3 mb-4 text-white rounded"
                    defaultValue=""
                    onChange={(e) => {
                        // handle change
                        console.log(fuse._docs);
                        console.log(fuse.search(e.target.value));
                        setSearchResults(fuse.search(e.target.value, { limit: 3 }));
                        setSearchValue(e.target.value);
                    }}
                />
                {searchResults.length > 0 &&
                    <ul className="bg-gray-800 p-3 rounded">
                        {searchResults.map((result, index) => (
                            <li key={index} className="text-white mb-2 cursor-pointer hover:bg-gray-700 p-2 rounded"
                                onClick={() => {
                                    const node = result.item;
                                    onBlockOpen(node.position.x, node.position.y);
                                    setSearch(false);
                                    setSearchValue("");
                                    setSearchResults([]);
                                }}>

                                {result.item.data.label || "No Label"}: {result.matches.slice(0, 4).map((match, matchIndex) => (
                                    <span key={matchIndex}>{match.indices.slice(0, 4).map(([start, end]) =>
                                        result.item.data.notes.substring(start, end + 1)
                                    ).join(", ")} </span>))}
                            </li>
                        ))}
                    </ul>
                }
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                            const match = nodes.find((node) => {
                                return node.data.notes?.toLowerCase().includes(searchValue.toLowerCase());
                            });

                            if (match) {
                                onBlockOpen(match.position.x, match.position.y);
                            } else {
                                console.log("No match found");
                            }

                            setSearch(false);
                            setSearchValue("");
                        }}
                    >
                        Search
                    </button>
                    <button
                        className="bg-blue-500 text-white px-3 py-1 ml-4 rounded"
                        onClick={() => {

                            setSearch(false);
                        }}
                    >
                        Close
                    </button>
                </div>
            </div></div>}
            {/* edit node */}
            {selectedNode && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-gray-900 p-4 rounded shadow-lg max-w-xl w-full max-h-xl">
                    <h2 className="text-xl font-bold mb-2">Edit Node:</h2>
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
                        className="w-full bg-gray-800 h-80 border p-3"
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
                                setNodes((prevNodes) =>
                                    prevNodes.filter((node) => node.id !== selectedNode.id)
                                );
                                setSelectedNode(null);
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className="text-white bg-green-500 px-3 py-1 ml-4 hover:bg-green-600 transition rounded"
                            onClick={() => {
                                // Save logic here, eg, update nodes
                                setNodes((prevNodes) =>
                                    prevNodes.map((node) =>
                                        node.id === selectedNode.id ? { ...node, data: selectedNode.data } : node
                                    )
                                );
                                setSelectedNode(null);
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    </main>
    );
}
