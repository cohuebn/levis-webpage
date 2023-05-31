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

type Message = {
  message: string;
  timestamp: Date;
};

function validateMessage(data: DocumentData | undefined): data is Message {
  return isNotNullOrUndefined(data) && "message" in data && "timestamp" in data;
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
          setCurrentMessage(message);
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
