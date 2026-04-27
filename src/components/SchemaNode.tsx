import { Box, Divider, Stack, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";

type SchemaNodeProps = {
    data: {
        label: string;
        fields: {
            name: string;
            type: string;
        }[];
    };
};

export const SchemaNode = ({ data }: SchemaNodeProps) => {
    return (
        <Box
            sx={{
                minWidth: 220,
                border: "2px solid black",
                borderRadius: 2,
                backgroundColor: "#666666",
                overflow: "hidden",
                fontFamily: "monospace",
            }}
        >
            <Handle type="target" position={Position.Top} />

            <Box sx={{ p: 1, textAlign: "center" }}>
                <Typography variant="h6">{data?.label}</Typography>
            </Box>

            <Divider />

            <Stack spacing={0.3} sx={{ p: 1 }}>
                {data.fields.map(field => (
                    <Box
                        key={field.name}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <Typography variant="body2">{field.name}</Typography>
                        <Typography variant="body2">{field.type}</Typography>
                    </Box>
                ))}
            </Stack>

            <Handle type="source" position={Position.Bottom} />
        </Box>
    );
};
