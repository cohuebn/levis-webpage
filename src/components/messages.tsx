import { sub, isAfter } from "date-fns";
import { Button, IconButton, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import React, { useCallback, useState } from "react";

import { isNotNullOrUndefined } from "@/utils/is-not-null-or-undefined";
import { useMessageSubscription } from "@/firebase/firestore";

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

  const handleCloseMessage = useCallback(() => {
    setLastClosedMessage(currentMessage?.message);
  }, [currentMessage?.message]);

  const showMessage = useCallback(
    () =>
      isNotNullOrUndefined(currentMessage) &&
      currentMessage.message !== lastClosedMessage &&
      isMessageNewish(currentMessage.timestamp),
    [currentMessage, lastClosedMessage]
  );

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
