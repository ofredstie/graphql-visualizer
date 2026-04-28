import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";
import type { NodeProps } from "reactflow";
import { Handle, Position } from "reactflow";

type Field = {
    name: string;
    type: string;
};

type SchemaNodeData = {
    label: string;
    fields: Field[];
    collapsed?: boolean;
    onToggle?: (nodeId: string) => void;
};

const getShorterNodeName = (name?: string) => {
    if (!name) return "";

    if (name.startsWith("QueryResponseOfIEnumerableOf")) {
        return name.replace("QueryResponseOfIEnumerableOf", "");
    } else if (name.startsWith("QueryResponseOf")) {
        return name.replace("QueryResponseOf", "");
    } else if (name.startsWith("ResultSetOf")) {
        return name.replace("ResultSetOf", "");
    } else if (name.startsWith("Workprogrambudget_")) {
        return name.replace("Workprogrambudget_", "WPB_");
    } else if (name.startsWith("EmissionData_")) {
        return name.replace("EmissionData_", "ED_");
    } else if (name.startsWith("ProductionDataService_")) {
        return name.replace("ProductionDataService_", "PDS_");
    } else if (name.startsWith("MetricService_")) {
        return name.replace("MetricService_", "MS_");
    } else {
        return name;
    }
};

export const SchemaNode = ({ id, data }: NodeProps<SchemaNodeData>) => {
    const nodeName = getShorterNodeName(data.label);

    return (
        <Box className="schema-node">
            <Handle position={Position.Top} type="target" />

            <Box className="schema-node__header">
                <Typography variant="h5">{nodeName}</Typography>

                <IconButton
                    size="small"
                    onClick={event => {
                        event.stopPropagation();
                        data.onToggle?.(id);
                    }}
                >
                    {data.collapsed ? (
                        <ExpandLess fontSize="small" color="primary" />
                    ) : (
                        <ExpandMore fontSize="small" color="primary" />
                    )}
                </IconButton>
            </Box>

            {!data.collapsed && (
                <>
                    <Divider />

                    <Stack className="schema-node__body">
                        {data.fields.map(field => (
                            <Box key={field.name} className="schema-node__row">
                                <Typography className="schema-node__field">{field.name}</Typography>

                                <Typography className="schema-node__type">{field.type}</Typography>
                            </Box>
                        ))}
                    </Stack>
                </>
            )}

            <Handle position={Position.Bottom} type="source" />
        </Box>
    );
};
