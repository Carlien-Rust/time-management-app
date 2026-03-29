/* 
src/components/Header.tsx
- Include app name
- Add navigation for Profile (/profile), Reset Password (/reset), Logout(/)
- Include Menu with dropdown nav to user profile, reset password, logout

Clicking “Logout” clears auth state and routes to /login .
Acceptance Criteria
Add logout button to navigation bar
After logout, refreshing the page stays on /login
*/

import * as React from 'react';
import { AppBar, Box, Typography, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import icon from  "../../public/icon.png"
import { useNavigationManager } from "../services/navigationManager";
import { useAuth } from '../services/auth_services/AuthProvider';

export default function Header() {
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { handleProfile, handleReset } = useNavigationManager();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { logout } = useAuth();
  
  const handleSignOut = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed"
        sx={(theme) => ({zIndex: theme.zIndex.drawer + 1,})}
      >
        <Toolbar>
          <img
            src={icon}
            alt="App"
            style={{ height: 48, cursor: "pointer" }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Time Management Portal
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem> {/* show username and email */}
                <MenuItem onClick={handleReset}>Reset password</MenuItem>
                <MenuItem onClick={handleSignOut}>Log out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
