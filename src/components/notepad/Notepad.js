import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    Background,
    Controls,
    ReactFlow,
    useNodesState,
    useReactFlow,
    useEdgesState,
    addEdge,
    MarkerType
} from "@xyflow/react";
import Notepadnav from "./Notepadnav.js";
import "@xyflow/react/dist/style.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useMessage } from "../MessageProvider.js";
import SearchModal from "./SearchModal.js";
import EditNodeModel from "./EditNodeModel.js";
import ConfigModel from "./ConfigModel.js";
import useNodeSearch from "./hooks/useNodeSearch.js";
import useWorkerManager from "./hooks/useWorkerManager.js";
import useMLWorkerManager from "./hooks/useMLWorkerManager.js";
import useNotesData from "./hooks/useNotesData.js";
const initialNodes = [
];

const defaultEdgeOptions = {
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#b1b1b7',
    },
};

export default function Notepad() {
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();
    const { setMessage } = useMessage();
    const { setViewport } = useReactFlow();    

    const [selectedNode, setSelectedNode] = useState(null);
    const [search, setSearch] = useState(false);
    const [nodes, setNodes, onNodesChanges] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [config, setConfig] = useState({ k: 2, lambda: 0.05, steps: 10 });
    const [configMenu, setConfigMenu] = useState(false);

    const [embeddings, setEmbeddings] = useState([]);

    const { searchValue, searchResults, fuse, handleSearch, resetSearch } = useNodeSearch(nodes);
    const { workerState, updatePositions } = useWorkerManager(setNodes, config, embeddings);
    const { mlWorkerState, mlUpdatePositions, loadWorker } = useMLWorkerManager(setNodes, config, setEmbeddings);
    const { saveNotes, loadNotes } = useNotesData(nodes, edges, getAccessTokenSilently, setMessage);

    const handleDelete = (nodeId) => {
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    };

    const handleApply = (updatedNode) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === updatedNode.id ? { ...node, data: updatedNode.data } : node
            )
        );
    };

    useEffect(() => {
        // Set the message only when the component is first mounted
        setMessage(
            <div>
                <h2 className="text-lg font-bold">About</h2>
                <p>This is a basic notepad made with react flow.
                    You can create/edit notes and position them in 2d.
                    Notes will not save until you click save in nav bar.
                    Update Node graph will use K-means with tf idf to cluster your notes,
                    it uses a sort of particle sim to position nodes in 2d space.</p>
            </div>
        );
    }, [setMessage]);

    useEffect(() => {
        if (isAuthenticated) {
            loadNotes(setNodes, setEdges);
        }
    }, [isAuthenticated, loadNotes]);

    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds));
    }, [setEdges]);


    // sets the selected node, this will display the edit node UI
    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
    }, []);

    // this sets the viewport to center on the given x and y coordinates
    // this allows search results to center relevant node
    const onBlockOpen = useCallback((x, y) => {
        const zoom = 1.0;
        const { innerWidth, innerHeight } = window;

        const centerX = x - innerWidth / 2 / zoom;
        const centerY = y - innerHeight / 2 / zoom;

        setViewport({ x: -centerX, y: -centerY, zoom });
    }, [setViewport]);

    // creates a new note, does not save to server
    // this is just for the UI
    const newNote = useCallback(() => {
        const newNode = {
            id: `${Date.now()}`,
            position: { x: 0, y: 0 },
            data: { label: `New Note ${nodes.length + 1}`, notes: "" },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode);
    }, [nodes.length]);

    const searchNotes = useCallback(() => {
        setSearch(true);
    }, []);

    const updateNodes = useCallback(() => {
        setConfigMenu(true);
    }, []);

    const handleConfigClose = useCallback(() => {
        setConfigMenu(false);
    }, []);

    const handleConfigRun = useCallback(() => {
        setConfigMenu(false);
        updatePositions(nodes);
    }, [updatePositions]);

    const handleMLRun = useCallback(() => {
        mlUpdatePositions(nodes);
    }, [mlUpdatePositions]);

    const handleSearchClose = useCallback(() => {
        setSearch(false);
        resetSearch();
    }, [resetSearch]);

    return (<main className="text-gray-400 bg-gray-900 body-font">
        <Notepadnav newNote={newNote} saveNotes={saveNotes} searchNotes={searchNotes} updateNodes={updateNodes} />
        <div style={{ width: "100vw", height: "100vh" }}>
            {/* react flow component - displays actual nodes */}
            <ReactFlow nodes={nodes}
                edges={edges}
                onNodeClick={onNodeClick}
                onNodesChange={onNodesChanges}
                onEdgesChange={onEdgesChange}
                defaultEdgeOptions={defaultEdgeOptions}
                onConnect={onConnect}
                fitView />
            <Background />
            <Controls />
            {/* allows config of k means */}
            {configMenu && (
                <ConfigModel
                    config={config}
                    setConfig={setConfig}
                    onClose={handleConfigClose}
                    onRun={handleConfigRun}
                    workerState={workerState}
                    mlWorkerState={mlWorkerState}
                    mlOnRun={handleMLRun}
                    loadWorker={loadWorker}
                />
            )}
            {/* search ui */}
            {search && !selectedNode && (
                <SearchModal
                    searchValue={searchValue}
                    searchResults={searchResults}
                    onSearch={handleSearch}
                    onResultClick={onBlockOpen}
                    onClose={handleSearchClose}
                    nodes={nodes}
                />
            )}
            {selectedNode && (
                <EditNodeModel
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                    onDelete={handleDelete}
                    onApply={handleApply}
                />
            )}
        </div>
    </main>
    );
}
