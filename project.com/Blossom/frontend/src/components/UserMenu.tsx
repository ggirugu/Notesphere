import { UserSessionType } from "@/pages/Auth/typesAndData";
import { signOutUser } from "@/utils/authUtils";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";

type UserMenuProps = {
  user: UserSessionType;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box>
      <IconButton
        id="user-menu"
        aria-controls={isOpen ? "user-menu-controls" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Avatar sx={{ width: "2.5rem", height: "2.5rem" }}>
          {user.name[0]}
        </Avatar>
      </IconButton>
      <Menu
        id="user-menu-controls"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "user-menu",
        }}
      >
        <MenuItem divider sx={{ textTransform: "capitalize" }}>
          <Typography fontWeight="bold">Hi, {user.name}</Typography>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem
          onClick={() => {
            handleClose();
            signOutUser();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserMenu;
