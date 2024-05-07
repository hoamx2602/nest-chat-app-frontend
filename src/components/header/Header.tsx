import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Branding from "./Branding";
import MobileBranding from "./mobile/MobileBranding";
import MobileNavigation from "./mobile/MobileNavigation";
import Navigation from "./Navigation";
import { useState } from "react";
import Settings from "./Settings";

const pages: string[] = [];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          <MobileNavigation pages={pages} />
          <MobileBranding />
          <Navigation pages={pages} />
          <Settings />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
