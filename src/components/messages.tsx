import { sub, isAfter } from "date-fns";
import { useMessageSubscription } from "@/firestore/firestore";
import { Button, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import { isNotNullOrUndefined } from "@/utils/is-not-null-or-undefined";
import React, { useState } from "react";

function isMessageNewish(messageTimestamp: Date) {
  const now = new Date();
  const newish = sub(now, { minutes: 1 });
  console.log({ messageTimestamp, newish });
  return isAfter(messageTimestamp, newish);
}

export function Messages() {
  const currentMessage = useMessageSubscription();
  const [lastClosedMessage, setLastClosedMessage] = useState<
    string | undefined
  >();

  function handleCloseMessage() {
    setLastClosedMessage(currentMessage?.message);
  }

  function showMessage() {
    return (
      isNotNullOrUndefined(currentMessage) &&
      currentMessage.message !== lastClosedMessage &&
      isMessageNewish(currentMessage.timestamp)
    );
  }

  const closeAction = (
    <>
      <Button color="secondary" size="small" onClick={handleCloseMessage}>
        Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseMessage}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={showMessage()}
      message={currentMessage?.message}
      action={closeAction}
    />
  );
}
