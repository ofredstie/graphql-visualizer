import dagre from "dagre";
import type { GraphEdge, GraphNode } from "../types/graph";

export function layoutGraph(
  nodes: GraphNode[],
  edges: GraphEdge[]
): GraphNode[] {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR" });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 180, height: 60 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  console.log(nodes);
  console.log(edges);

  dagre.layout(g);

  return nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      position: {
        x: pos.x,
        y: pos.y,
      },
    };
  });
}