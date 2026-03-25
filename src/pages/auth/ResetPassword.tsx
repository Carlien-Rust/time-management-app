// Template from 
/*
/src/pages/auth/RegisterPage.tsx
route: "/reset"

Navigate from option in header dropdown menu ✅
Need to validate user input ✅
SAVE button ✅
Re-auth and update password
Success message

Reuse for Forget Password

-- Clickup ticket
Add “Forgot password?” link on login page that triggers sendPasswordResetEmail.
Email delivered.
Toast says “Reset link sent”.
*/

import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigationManager } from "../../services/navigationManager";
import { useAuth } from '../../services/auth_services/AuthProvider';

const defaultTheme = createTheme();

export default function ResetPassword() {

  const { handleLogout } = useNavigationManager();
  const { resetPass } = useAuth();
  
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    const user = data.get('user') as string;
    const currentPass = data.get('current-password') as string;
    const newPass = data.get('new-password') as string;

    if (!currentPass || !newPass) {
      setError("Set both passwords!");
      return;
    } else if (currentPass === newPass) {
        setError("Passwords should be different.");
        return;
    }

    try
    {
      setLoading(true);
      await resetPass(user, newPass);
      handleLogout();

    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        setError("No account found with this email. Redirecting to sign up?");
      } else {
        setError("Failed to sign in. Check your credentials.");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="current-password"
              label="CurrentPassword"
              type="current-password"
              id="current-password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="new-password"
              label="NewPassword"
              type="new-password"
              id="new-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              disabled={loading}
              onClick={handleLogout}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}