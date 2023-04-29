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
    { label: "Goomba", source: "/Goomba.png" },
    { label: "Luigi", source: "/luigi.png" },
    { label: "King Bob-omb", source: "/king-bomb.png" },
    { label: "Bomb omb", source: "/bob-omb.webp" },
    { label: "Chain Chomp", source: "/CC.png" },
    { label: "Kamek", source: "/kamek.png" },
    { label: "Larry", source: "/Larry.png" },
    { label: "Ludwig", source: "/Ludwig.png" },
    { label: "Wendy", source: "/wendy.png" },
    { label: "Mario", source: "/mario.png" },
    { label: "Boo", source: "/BooNSMBWarticle.png" },
    { label: "Koopa Troopa", source: "/Troopa.png" },
    { label: "Hammer Bro", source: "/hammer-bro.png" },
    { label: "Bowser", source: "/Bowser.png" },
    { label: "Peach", source: "/peach.png" },
    { label: "Donkey Kong", source: "/D.K.png" },
    { label: "Bowser Jr.", source: "/B.J.png" },
    { label: "Iggy", source: "/Iggy.png" },
    { label: "Morton", source: "/Morton.png" },
    { label: "Lemmy", source: "/Lemmy_SSBU.webp" },
    { label: "Roy", source: "/Roy.png" },
    { label: "Lucito", source: "/Lucito" },
    { label: "Toad", source: "/Toad.png" },
    { label: "Toadette", source: "/Toadette.png" },
    { label: "Gradpa Toad", source: "/toad-grandpa.png" },
    { label: "Daisy", source: "/daisy.png" },
    { label: "Bullet Bill", source: "/bullet-bill.png" },
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
