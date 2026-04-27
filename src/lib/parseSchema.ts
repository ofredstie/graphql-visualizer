import { buildSchema, GraphQLObjectType, GraphQLSchema, getNamedType, isObjectType } from "graphql";
import type { Edge, Node } from "reactflow";

export function parseSchema(schemaString: string): {
    nodes: Node[];
    edges: Edge[];
} {
    const schema: GraphQLSchema = buildSchema(schemaString);
    const typeMap = schema.getTypeMap();

    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const objectTypes = new Map<string, GraphQLObjectType>();

    // ✅ 1. Collect only object types
    Object.values(typeMap).forEach(type => {
        if (!isObjectType(type) || type.name.startsWith("__")) return;

        objectTypes.set(type.name, type);

        nodes.push({
            id: type.name,
            data: { label: type.name },
            position: { x: 0, y: 0 },
        });
    });

    // ✅ 2. Create edges ONLY between object types
    objectTypes.forEach(type => {
        const fields = type.getFields();

        Object.values(fields).forEach(field => {
            const namedType = getNamedType(field.type); // 👈 IMPORTANT
            const targetTypeName = namedType.name;

            if (!objectTypes.has(targetTypeName)) return;

            edges.push({
                id: `${type.name}-${field.name}-${targetTypeName}`,
                source: type.name,
                target: targetTypeName,
            });
        });
    });

    return { nodes, edges };
}
