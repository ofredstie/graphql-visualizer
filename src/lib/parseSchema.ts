import {
    buildSchema,
    GraphQLObjectType,
    GraphQLSchema,
    getNamedType,
    isObjectType,
} from "graphql";

import type { Edge, Node } from "reactflow";

type FieldRow = {
    name: string;
    type: string;
};

type SchemaNodeData = {
    label: string;
    fields: FieldRow[];
};

export function parseSchema(schemaString: string): {
    nodes: Node<SchemaNodeData>[];
    edges: Edge[];
} {
    const schema: GraphQLSchema = buildSchema(schemaString);
    const typeMap = schema.getTypeMap();

    const nodes: Node<SchemaNodeData>[] = [];
    const edges: Edge[] = [];

    const objectTypes = new Map<string, GraphQLObjectType>();

    Object.values(typeMap).forEach(type => {
        if (!isObjectType(type) || type.name.startsWith("__")) return;

        objectTypes.set(type.name, type);

        const fields = Object.values(type.getFields()).map(field => ({
            name: field.name,
            type: field.type.toString(),
        }));

        nodes.push({
            id: type.name,
            type: "schemaNode",
            position: { x: 0, y: 0 },
            data: {
                label: type.name,
                fields,
            },
        });
    });

    objectTypes.forEach(type => {
        const fields = type.getFields();

        Object.values(fields).forEach(field => {
            const namedType = getNamedType(field.type);
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