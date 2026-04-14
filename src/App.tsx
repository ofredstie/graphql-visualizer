import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

import { FileUploader } from "./components/FileUploader";
import { GraphView } from "./components/GraphView";
import { layoutGraph } from "./lib/layoutGraph";
import { parseSchema } from "./lib/parseSchema";
import type { GraphEdge, GraphNode } from "./types/graph";

function App() {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);

  const handleSchema = (schema: string) => {
    const { nodes, edges } = parseSchema(schema);
    const layouted = layoutGraph(nodes, edges);

    setNodes(layouted);
    setEdges(edges);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            GraphQL Visualizer
          </Typography>
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