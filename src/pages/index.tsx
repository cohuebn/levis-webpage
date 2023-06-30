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
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Send } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { Messages } from "@/components/messages";
import { CharacterOption, characterOptions } from "@/data/characters";
import { sendMessageToFirestore } from "@/firebase/firestore";

export default function Index() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCharacter = searchParams.get("character");
  const [selectedCharacter, selectCharacter] = useState<CharacterOption | null>(
    null
  );

  useEffect(() => {
    if (!initialCharacter) return;
    const match = characterOptions.find(
      (x) => x.label.toLowerCase() === initialCharacter
    );
    if (match && match !== selectedCharacter) {
      selectCharacter(match);
    }
  }, [initialCharacter]);

  const [, setSender] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const [isLoggedIn, login] = useState<boolean>(false);
  const handleLogin = useCallback(() => {
    login(true);
  }, []);

  const handleSendMessage = useCallback(() => {
    setSender(true);
    sendMessageToFirestore(message);
  }, [message]);

  const onCharacterChange = useCallback(
    (character: CharacterOption | null) => {
      selectCharacter(character);
      const queryStringValue = character
        ? character.label.toLowerCase()
        : undefined;
      router.replace({
        query: { ...router.query, character: queryStringValue },
      });
    },
    [selectedCharacter]
  );

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mario Picker
          </Typography>
          {isLoggedIn ? (
            <Tooltip title="Levi Huebner">
              <Avatar alt="Levi Huebner" src="/levi.jpg" />
            </Tooltip>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box sx={{ marginTop: 4 }}>
          <Autocomplete
            id="character-name"
            options={characterOptions}
            value={selectedCharacter}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            renderInput={(params) => (
              <TextField {...params} label="Character name" variant="filled" />
            )}
            onChange={(
              _event: unknown,
              newCharacter: CharacterOption | null
            ) => {
              onCharacterChange(newCharacter);
            }}
          />
          {selectedCharacter ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src={selectedCharacter.source}
                alt={selectedCharacter.label}
                priority
                // Silly hack-around; required properties, but both modified by style to keep aspect ratio
                width={300}
                height={301}
                style={{ marginTop: "1em", width: "auto", height: "300px" }}
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
            minRows={2}
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
