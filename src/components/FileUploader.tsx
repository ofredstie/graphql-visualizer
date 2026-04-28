import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Button, Stack, Typography } from "@mui/material";

type Props = {
    onLoad: (schema: string) => void;
};

export function FileUploader({ onLoad }: Props) {
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const text = await file.text();
        onLoad(text);
    };

    return (
        <Stack direction="row" spacing={2} style={{ padding: 10 }}>
            <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
                Upload Schema
                <input type="file" hidden accept=".graphql,.gql" onChange={handleFile} />
            </Button>

            <Typography variant="body2" color="text.secondary">
                Upload a .graphql schema file
            </Typography>
        </Stack>
    );
}
