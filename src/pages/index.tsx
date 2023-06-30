import {
  Box,
  Container,
  Typography,
  Autocomplete,
  TextField,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useCallback, useState } from "react";
import Image from "next/image";
import { Send } from "@mui/icons-material";

import { Messages } from "@/components/messages";
import { CurrentUser } from "@/components/current-user";

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
    { label: "Bomb-omb", source: "/bob-omb.webp" },
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
    { label: "Lakitu", source: "/lakitu.webp" },
    { label: "Toad", source: "/Toad.png" },
    { label: "Toadette", source: "/Toadette.png" },
    { label: "Gradpa Toad", source: "/toad-grandpa.png" },
    { label: "Daisy", source: "/daisy.png" },
    { label: "Bullet Bill", source: "/bullet-bill.png" },
    { label: "Diddy Kong", source: "/D.D.K.png" },
    { label: "Dixie Kong", source: "/D.X.K.png" },
    { label: "Crankey Kong", source: "/C.K.png" },
    { label: "Funkey Kong", source: "/F.K.png" },
    { label: "Paratroopa", source: "/Paratroopa.png" },
    { label: "Dry Bones", source: "/Dry-Bones.png" },
    { label: "Birdo", source: "Birdo.png" },
    { label: "Piranha Plant", source: "/Prana.png" },
    { label: "Shy Guy", source: "/Shy-guy.png" },
    { label: "Petey Piranha", source: "/P.P.webph" },
    { label: "Wiggler", source: "/Wigaler.png" },
    { label: "Boom Boom", source: "/Boom Boom.png" },
    { label: "Pom Pom", source: "/P.P.png" },
    { label: "Fire Ball", source: "/Fire Ball.png" },
    { label: "Mario and Luigi", source: "/M.L.png" },
    { label: "Waluigi", source: "/Waluigi.png" },
    { label: "Big Cheap Cheap", source: "/big cheap cheap.png" },
    { label: "Cheap Cheap", source: "/Cheap-Cheap.png" },
    { label: "Blooper", source: "/Blooper.png" },
    { label: "Rosalina", source: "/Rosealinea.png" },
  ];
  const [selectedCharacter, selectCharacter] = useState<CharacterOption | null>(
    null
  );
  const [isLoggedIn, login] = useState<boolean>(false);
  const [, setSender] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleLogin = useCallback(() => {
    login(true);
  }, []);

  const handleSendMessage = useCallback(() => {
    setSender(true);
  }, []);

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mario Picker
          </Typography>
          {/* {isLoggedIn ? (
            <Tooltip title="Levi Huebner">
              <Avatar alt="Levi Huebner" src="/levi.jpg" />
            </Tooltip>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )} */}
          <CurrentUser onChange={(user) => console.log({ user })} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 4 }}>
          <Autocomplete
            id="character-name"
            options={options}
            renderInput={(params) => (
              <TextField {...params} label="Character name" variant="filled" />
            )}
            onChange={(
              _event: unknown,
              newCharacter: CharacterOption | null
            ) => {
              selectCharacter(newCharacter);
            }}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
          />
          {selectedCharacter ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={selectedCharacter.source}
                alt={selectedCharacter.label}
                // Both modified by style to keep aspect ratio
                width={300}
                height={301}
                style={{ marginTop: "4rem", width: "auto", height: "300px" }}
              />
            </div>
          ) : (
            <p>No character selected</p>
          )}
          <TextField
            id="filled-basic"
            label="Message"
            variant="filled"
            multiline
            fullWidth
            maxRows={5}
            value={message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMessage(event.target.value);
            }}
            sx={{ marginTop: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            sx={{ marginTop: 2 }}
          >
            <Send />
            Send
          </Button>

          <Messages />
        </Box>
      </Container>
    </>
  );
}
