import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { firebaseApp } from "./firebaseApp";

const db = () => getFirestore(firebaseApp);

export function useMessageSubscription() {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);

  useEffect(() => {
    console.info("Setting up subscription");
    const unsubscribe = onSnapshot(
      doc(db(), "messages", "newest"),
      (fetchedData) => {
        const message = fetchedData.data()?.message;
        console.info("Message updates", { doc: fetchedData, message });
        setCurrentMessage(message);
      }
    );
    return () => {
      console.info("Unsubscribing");
      unsubscribe();
    };
  });

  return currentMessage;
}
