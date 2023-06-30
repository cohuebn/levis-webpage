import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

import { signInWithGoogle } from "@/firebase/auth";
import { getSessionUser, setSessionUser } from "@/utils/user-session";

export function CurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const sessionUser = getSessionUser();
    if (currentUser?.email !== sessionUser?.email) {
      setCurrentUser(sessionUser);
    }
  }, []);

  async function handleGoogleSignin() {
    const { user } = await signInWithGoogle();
    setSessionUser(user);
    setCurrentUser(user);
  }

  const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setSessionUser(null);
    setCurrentUser(null);
    closeMenu();
  };

  if (!currentUser) {
    return (
      <Button color="inherit" onClick={() => handleGoogleSignin()}>
        Login
      </Button>
    );
  }

  return (
    <>
      <IconButton aria-label="user" onClick={handleUserClick}>
        <Avatar
          alt={currentUser.displayName ?? undefined}
          src={currentUser.photoURL ?? undefined}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={userMenuOpen}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
