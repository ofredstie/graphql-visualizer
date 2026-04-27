import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import type { Edge, Node } from "reactflow";
import { FileUploader } from "./components/FileUploader";
import { GraphView } from "./components/GraphView";
import { layoutGraph } from "./lib/layoutGraph";
import { parseSchema } from "./lib/parseSchema";

function App() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const handleSchema = async (schema: string) => {
        const { nodes, edges } = parseSchema(schema);

        const layoutedNodes = await layoutGraph(nodes, edges);

        setNodes(layoutedNodes);
        setEdges(edges);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">GraphQL Visualizer</Typography>
                </Toolbar>
            </AppBar>

            <FileUploader onLoad={handleSchema} />

            <Box sx={{ flexGrow: 1 }}>
                <GraphView nodes={nodes} edges={edges} />
            </Box>
        </Box>
    );
}

export default App;
