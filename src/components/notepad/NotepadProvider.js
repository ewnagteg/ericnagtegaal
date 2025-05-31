import { ReactFlowProvider } from '@xyflow/react';
import Notepad from './Notepad.js';

export default function NotepadProvider({ children }) {
    return (
        <ReactFlowProvider>
            <Notepad />
        </ReactFlowProvider>
    );
}