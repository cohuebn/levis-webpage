import {
  Box,
  Container,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState } from "react";

type CharacterOption = {
  label: string;
};

export default function Index() {
  const options: CharacterOption[] = [
    { label: "Wario" },
    { label: "Wario and Waluigi" },
    { label: "Yoshi" },
  ];
  const [selectedCharacter, selectCharacter] = useState<CharacterOption | null>(
    null
  );
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mario Picker
        </Typography>
        <Autocomplete
          id="character name"
          options={options}
          renderInput={(params) => (
            <TextField {...params} label="character name" variant="filled" />
          )}
          onChange={(_event: unknown, newCharacter: CharacterOption | null) => {
            selectCharacter(newCharacter);
          }}
        />
        <p>
          {selectedCharacter
            ? selectedCharacter.label
            : "No character selected"}
        </p>
      </Box>
    </Container>
  );
}
