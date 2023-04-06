import { Box, Container, Input, Typography } from "@mui/material";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Character picker
        </Typography>
      </Box>
    </Container>
  );
}
