import 'reactflow/dist/style.css';

import { Box } from '@mui/material';
import ReactFlow, { Background, Controls } from 'reactflow';

import type { GraphEdge, GraphNode } from '../types/graph';

type Props = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export function GraphView({ nodes, edges }: Props) {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
}
