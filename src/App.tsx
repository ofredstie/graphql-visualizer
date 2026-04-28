import { useEffect, useMemo, useState } from "react";
import type { Edge, Node } from "reactflow";

import "./App.css";

import { FileUploader } from "./components/FileUploader";
import { GraphView } from "./components/GraphView";
import { buildVisibleGraph } from "./lib/buildVisibleGraph";
import { layoutGraph } from "./lib/layoutGraph";
import { parseSchema } from "./lib/parseSchema";

function App() {
    const [allNodes, setAllNodes] = useState<Node[]>([]);
    const [allEdges, setAllEdges] = useState<Edge[]>([]);
    const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const handleSchemaUpload = async (schema: string) => {
        const graph = parseSchema(schema);

        setAllNodes(graph.nodes);
        setAllEdges(graph.edges);

        // Collapse every node that has at least one parent by default
        const nodesWithParents = new Set<string>(graph.edges.map(edge => edge.target));

        setCollapsed(nodesWithParents);
    };

    const toggleCollapse = (nodeId: string) => {
        setCollapsed(prev => {
            const next = new Set(prev);

            if (next.has(nodeId)) {
                next.delete(nodeId);
            } else {
                next.add(nodeId);
            }

            return next;
        });
    };

    const visibleGraph = useMemo(() => {
        return buildVisibleGraph(allNodes, allEdges, collapsed);
    }, [allNodes, allEdges, collapsed]);

    useEffect(() => {
        const runLayout = async () => {
            const enrichedNodes = visibleGraph.nodes.map(node => ({
                ...node,
                data: {
                    ...node.data,
                    collapsed: collapsed.has(node.id),
                    onToggle: toggleCollapse,
                },
            }));

            const layouted = await layoutGraph(enrichedNodes, visibleGraph.edges);

            setNodes(layouted);
            setEdges(visibleGraph.edges);
        };

        runLayout();
    }, [visibleGraph, collapsed]);

    return (
        <div className="app">
            <FileUploader onLoad={handleSchemaUpload} />

            <GraphView nodes={nodes} edges={edges} />
        </div>
    );
}

export default App;
