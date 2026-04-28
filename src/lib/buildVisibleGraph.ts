import type { Edge, Node } from "reactflow";

export function buildVisibleGraph(
    nodes: Node[],
    edges: Edge[],
    collapsed: Set<string>,
) {
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    const incoming = new Map<string, number>();

    nodes.forEach(n => incoming.set(n.id, 0));

    edges.forEach(e => {
        incoming.set(e.target, (incoming.get(e.target) ?? 0) + 1);
    });

    const roots = nodes
        .filter(n => (incoming.get(n.id) ?? 0) === 0)
        .map(n => n.id);

    const visibleNodes = new Set<string>();
    const visibleEdges = new Set<string>();

    const queue = [...roots];

    while (queue.length) {
        const current = queue.shift()!;

        visibleNodes.add(current);

        if (collapsed.has(current)) continue;

        edges.forEach(edge => {
            if (edge.source !== current) return;

            visibleEdges.add(edge.id);

            if (!visibleNodes.has(edge.target)) {
                queue.push(edge.target);
            }
        });
    }

    return {
        nodes: nodes.filter(n => visibleNodes.has(n.id)),
        edges: edges.filter(e => visibleEdges.has(e.id)),
    };
}