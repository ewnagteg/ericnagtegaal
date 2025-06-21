import { useCallback } from 'react';
import { fetchWithAuth, fetchWithAuthPost } from "../../../api/fetchWithAuth";


export default function useNotesData(nodes, edges, getAccessTokenSilently, setMessage) {
    // saves notes to the server
    const saveNotes = useCallback(async () => {
        try {
            setMessage("Saved Notes");
            const data = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    label: node.data.label,
                    notes: node.data.notes,
                    position: node.position,
                })),
                edges: edges,
            };

            await fetchWithAuthPost({ getAccessTokenSilently, url: "/notes", body: data });
        } catch (error) {
            console.error("Failed to save notes:", error);
            setMessage("Failed to save notes");
        }
    }, [nodes, edges, getAccessTokenSilently, setMessage]);

    const loadNotes = useCallback(async (setNodes, setEdges) => {
        try {
            const data = await fetchWithAuth({
                getAccessTokenSilently,
                url: "/notes",
            });
            setNodes(JSON.parse(data[0].nodes).map((note) => ({
                id: note.id,
                position: { x: note.position.x, y: note.position.y },
                data: { label: note.label, notes: note.notes },
            })));
            setEdges(JSON.parse(data[0].edges).map((edge) => ({
                id: edge.id,
                source: edge.source,
                target: edge.target,
            })));
        } catch (error) {
            console.error("Failed to load notes:", error);
            setMessage("Failed to load notes");
        }
    }, [getAccessTokenSilently, setMessage]);
    return {
        saveNotes,
        loadNotes
    };
}