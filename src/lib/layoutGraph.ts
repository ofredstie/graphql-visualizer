import dagre from "dagre";
import type { Edge, Node } from "reactflow";

export function layoutGraph(nodes: Node[], edges: Edge[]): Node[] {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: "TB" });

    nodes.forEach(node => {
        dagreGraph.setNode(node.id, { width: 180, height: 60 });
    });

    edges.forEach(edge => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    return nodes.map(node => {
        const pos = dagreGraph.node(node.id);
        return {
            ...node,
            position: {
                x: pos.x,
                y: pos.y,
            },
        };
    });
}
