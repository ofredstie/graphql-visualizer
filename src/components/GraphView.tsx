import type { Edge, Node } from "reactflow";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";

import { SchemaNode } from "./SchemaNode";

import "reactflow/dist/style.css";

type Props = {
    nodes: Node[];
    edges: Edge[];
};

const nodeTypes = {
    schemaNode: SchemaNode,
};

export function GraphView({ nodes, edges }: Props) {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ReactFlow fitView nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
                <Background />
                <Controls />
                <MiniMap />
            </ReactFlow>
        </div>
    );
}
