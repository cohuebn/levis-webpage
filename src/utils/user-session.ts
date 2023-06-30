import { User } from "firebase/auth";

const userKey = "character-text/user";

export function setSessionUser(user: User | null) {
  if (user) {
    localStorage.setItem(userKey, JSON.stringify(user));
  } else {
    localStorage.removeItem(userKey);
  }
}

export function getSessionUser(): User | null {
  const sessionItem = localStorage.getItem(userKey);
  if (!sessionItem) return null;
  return JSON.parse(sessionItem) as User;
}
