import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { useState } from "react";
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

    if (name.length > 20) {
        return name.substring(0, 20) + "...";
    } else {
        return name;
    }
};

export const SchemaNode = ({ id, data }: NodeProps<SchemaNodeData>) => {
    const fullName = data.label;
    const shortName = getShorterNodeName(fullName);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Box className="schema-node">
                <Handle position={Position.Top} type="target" />

                <Box className="schema-node__header">
                    <Tooltip title={data.label} disableHoverListener={fullName === shortName}>
                        <Typography variant="h5">{shortName}</Typography>
                    </Tooltip>

                    <Button
                        variant="outlined"
                        onClick={event => {
                            event.stopPropagation();
                            data.onToggle?.(id);
                        }}
                        color="primary"
                        startIcon={data.collapsed ? <ExpandMore /> : <ExpandLess />}
                    >
                        {data.collapsed ? "view children" : "hide children"}
                    </Button>
                </Box>

                <Divider />

                <Button variant="text" onClick={() => setIsOpen(!isOpen)} color="secondary">
                    {isOpen ? "hide fields" : "View fields"}
                </Button>

                {isOpen && (
                    <>
                        <Divider />
                        <Stack>
                            {data.fields.map(field => (
                                <Box key={field.name} className="schema-node__row">
                                    <Typography className="schema-node__field">
                                        {field.name}
                                    </Typography>

                                    <Typography className="schema-node__type">
                                        {field.type}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </>
                )}

                <Handle position={Position.Bottom} type="source" />
            </Box>
        </>
    );
};
