import { fromUnixTime } from "date-fns";
import {
  getFirestore,
  doc,
  onSnapshot,
  updateDoc,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { getFirebaseApp } from "./firebaseApp";
import { isNotNullOrUndefined } from "@/utils/is-not-null-or-undefined";
import { getSessionUser } from "@/utils/user-session";

const db = () => getFirestore(getFirebaseApp());

type RawMessage = {
  message: string;
  timestamp: {
    nanoseconds: number;
    seconds: number;
  };
  from?: string;
};

type Message = {
  message: string;
  timestamp: Date;
  from?: string;
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

/**
 * Get the "newest" message from firebase (needed to update the record)
 * @returns The "newest" message doc from firebase
 */
function getNewestMessageDoc() {
  return doc(db(), "messages", "newest");
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
  }, []);

  return currentMessage;
}

/**
 * Send a message to firestore as the "newest" message document
 * @param message The message to send
 */
export async function sendMessageToFirestore(message: string) {
  const messageUpdates: Partial<Message> = {
    message,
    timestamp: new Date(),
    from: getSessionUser()?.email ?? undefined,
  };
  await updateDoc(getNewestMessageDoc(), messageUpdates);
  console.debug("Updated newest message doc", { messageUpdates });
}
