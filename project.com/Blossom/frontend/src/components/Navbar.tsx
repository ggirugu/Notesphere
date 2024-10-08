import { getSignedInUserDetails } from "@/utils/authUtils";
import {
  AppBar,
  Button,
  ButtonGroup,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
type NavLinkItem = {
  url: string;
  label: string;
  icon?: React.ReactNode; // 'icon' is optional
};

const Navbar: React.FC = () => {
  return (
<AppBar position="sticky" sx={{ backgroundColor: 'white' }}>
<Toolbar sx={{ gap: "1.5rem", justifyContent: "space-between" }}>
        {/* Navbar Logo  */}
        <Typography
          letterSpacing={3}
          variant="h5"
          fontWeight="600"
          component={Link}
          to="/"
          sx={(props) => ({
            textDecoration: "none",
            color: props.palette.secondary.main,
          })}
        >
          NoteSphere
        </Typography>

        {/* Navbar Links */}
        <NavLinks />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

/**
 * ============== DATA ============
 */

/**
 * ======= Custom Component =============
 */

const NavLinks: React.FC = () => {
  const { pathname } = useLocation();
  const user = getSignedInUserDetails();
  let navLinks: NavLinkItem[] = [];

  // If not signed in
  if (!user) {
    navLinks = [

      {
        url: "/auth/notes",
        label: "Create Notes",
      },
    ];
  }


  return (
    <Stack direction="row" gap="1rem" alignItems="center">
      <ButtonGroup variant="outlined">
        {navLinks.map((navlink) => (
          <Button
            key={navlink.url}
            component={NavLink}
            to={navlink.url}
            color="secondary"
            startIcon={navlink.icon} // Add the icon to the button
            variant={
              pathname?.startsWith(navlink.url) ? "contained" : "outlined"
            }
          >
            {navlink.label}
          </Button>
        ))}
      </ButtonGroup>

      {/* User Menu */}
      {user && <UserMenu user={user} />}
    </Stack>
  );
};
