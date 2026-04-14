import {
    buildSchema,
    GraphQLSchema,
    isObjectType,
} from "graphql";
import type { GraphEdge, GraphNode } from "../types/graph";

export function parseSchema(schemaString: string): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const schema: GraphQLSchema = buildSchema(schemaString);
  const typeMap = schema.getTypeMap();

  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const objectTypeNames = new Set<string>();

  // First pass: collect valid object types
  Object.values(typeMap).forEach((type) => {
    if (!isObjectType(type) || type.name.startsWith("__")) return;

    objectTypeNames.add(type.name);

    nodes.push({
      id: type.name,
      data: { label: type.name },
      position: { x: 0, y: 0 },
    });
  });

  // Second pass: create edges only between known object types
  Object.values(typeMap).forEach((type) => {
    if (!isObjectType(type) || type.name.startsWith("__")) return;

    console.log(type);

    const fields = type.getFields();

    Object.values(fields).forEach((field) => {
      const rawType = field.type.toString();
      const cleanType = rawType.replace(/[[\]!]/g, "");

      console.log({rawType, cleanType});

      if (!objectTypeNames.has(cleanType)) return; // 👈 IMPORTANT

      edges.push({
        id: `${type.name}-${field.name}`,
        source: type.name,
        target: cleanType,
      });
    });
  });

  return { nodes, edges };
}