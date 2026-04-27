import ELK from "elkjs/lib/elk.bundled.js";
import type { Edge, Node } from "reactflow";

const elk = new ELK();

export async function layoutGraph(
    nodes: Node[],
    edges: Edge[],
): Promise<Node[]> {
    const graph = {
        id: "root",
        layoutOptions: {
            "elk.algorithm": "layered",
            "elk.direction": "DOWN",

            "elk.spacing.nodeNode": "80",
            "elk.layered.spacing.nodeNodeBetweenLayers": "140",
            "elk.spacing.edgeNode": "60",

            "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
        },

        children: nodes.map(node => ({
            id: node.id,
            width: 260,
            height: 220,
        })),

        edges: edges.map(edge => ({
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target],
        })),
    };

    const layoutedGraph = await elk.layout(graph);

    return nodes.map(node => {
        const layoutNode = layoutedGraph.children?.find(
            child => child.id === node.id,
        );

        return {
            ...node,
            position: {
                x: layoutNode?.x ?? 0,
                y: layoutNode?.y ?? 0,
            },
        };
    });
}