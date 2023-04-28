import {
  Box,
  Container,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Image from "next/image";

type CharacterOption = {
  label: string;
  source: string;
};

export default function Index() {
  const options: CharacterOption[] = [
    { label: "Wario", source: "/wario.png" },
    { label: "Wario and Waluigi", source: "/wario-and-waluigi.jpg" },
    { label: "Yoshi", source: "/yoshi.webp" },
    { label: "King Boo", source: "/king-boo.webp" },
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
        {selectedCharacter ? (
          <Image
            src={selectedCharacter.source}
            alt={selectedCharacter.label}
            width={300}
            height={300}
          />
        ) : (
          <p>No character selected</p>
        )}
      </Box>
    </Container>
  );
}
