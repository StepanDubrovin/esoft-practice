import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AuthForm from './ModalAuth';
import useCheckAuth from '../hooks/useCheckAuth';
import AccountMenu from './AccountMenu';

const Header: React.FC = () => {

  
  const [authModalOpen, setAuthModalOpen] = useState(false);


  const store = useCheckAuth();
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#131313' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Listings
          </Typography>
          {store.isAuth ? (
          <Box
            position='relative'
            onMouseEnter={() => setIsAccountMenuOpen(true)}
            onMouseLeave={() => setIsAccountMenuOpen(false)}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              color="inherit"
              onClick={() => setAuthModalOpen(true)}
            >
              <AccountCircle /> 
            </IconButton>
            {isAccountMenuOpen && <AccountMenu />}
          </Box>
        ) : (
          <IconButton
            size="large"
            aria-label="account of current user"
            color="inherit"
            onClick={() => setAuthModalOpen(true)}
          >
            <AccountCircle />
          </IconButton>
        )}
        </Toolbar>
      </AppBar>
      <AuthForm
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </Box>
  );
};

export default Header;
