import { fromUnixTime } from "date-fns";
import {
  getFirestore,
  doc,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { firebaseApp } from "./firebaseApp";
import { isNotNullOrUndefined } from "@/utils/is-not-null-or-undefined";

const db = () => getFirestore(firebaseApp);

type RawMessage = {
  message: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
};

type Message = {
  message: string;
  timestamp: Date;
};

function validateMessage(data: DocumentData | undefined): data is RawMessage {
  return isNotNullOrUndefined(data) && "message" in data && "timestamp" in data;
}

function parseMessage(message: RawMessage): Message {
  return {
    ...message,
    timestamp: fromUnixTime(message.timestamp.seconds),
  };
}

export function useMessageSubscription() {
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);

  useEffect(() => {
    console.debug("Setting up subscription");
    const unsubscribe = onSnapshot(
      doc(db(), "messages", "newest"),
      (fetchedData) => {
        const message = fetchedData.data();
        console.debug("Message updates", { doc: fetchedData, message });
        if (validateMessage(message)) {
          const parsedMessage = parseMessage(message);
          setCurrentMessage(parsedMessage);
        }
      }
    );
    return () => {
      console.debug("Unsubscribing");
      unsubscribe();
    };
  });

  return currentMessage;
}
