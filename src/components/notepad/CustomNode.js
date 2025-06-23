import { Handle, Position, useConnection } from '@xyflow/react';

export default function CustomNode({ id }) {
    const connection = useConnection();

    const isTarget = connection.inProgress && connection.fromNode.id !== id;

    const label = isTarget ? 'Drop here' : 'Drag to connect';

    return (
        <div className="customNode">
            <div
                className="customNodeBody"
            >
                {!connection.inProgress && (
                    <Handle
                        className="customHandle"
                        position={Position.Right}
                        type="source"
                    />
                )}
                {/* disable the target handle, if the connection was started from this node */}
                {(!connection.inProgress || isTarget) && (
                    <Handle className="customHandle" position={Position.Left} type="target" isConnectableStart={false} />
                )}
                {label}
            </div>
        </div>
    );
}

