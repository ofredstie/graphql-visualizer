import "reactflow/dist/style.css";

import { Box } from "@mui/material";
import type { Edge, Node } from "reactflow";
import ReactFlow, { Background, Controls } from "reactflow";

type Props = {
    nodes: Node[];
    edges: Edge[];
};

import { SchemaNode } from "./SchemaNode";

const nodeTypes = {
    schemaNode: SchemaNode,
};

export function GraphView({ nodes, edges }: Props) {
    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
                <Background />
                <Controls />
            </ReactFlow>
        </Box>
    );
}
