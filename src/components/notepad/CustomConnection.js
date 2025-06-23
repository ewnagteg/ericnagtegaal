import React from 'react';
import { getStraightPath } from '@xyflow/react';

export default function CustomConnection({ fromX, fromY, toX, toY, connectionLineStyle }) {
    const [edgePath] = getStraightPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
    });

    return (
        <g>
            <path style={connectionLineStyle} fill="none" d={edgePath} />
        </g>
    );
}