import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import useCheckAuth from "../hooks/useCheckAuth";
import AuthForm from "./ModalAuth";
import AccountMenu from "./AccountMenu";

const Header = () => {
  const store = useCheckAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#131313" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Listings
          </Typography>

          {store.isAuth ? (
            <IconButton
              size="large"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              color="inherit"
              onClick={() => setAuthModalOpen(true)}
            >
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {store.isAuth && (
        <AccountMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        />
      )}

      <AuthForm
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </Box>
  );
};

export default Header;
