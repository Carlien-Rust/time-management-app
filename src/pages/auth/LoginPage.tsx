// Template from https://mui.com/material-ui/getting-started/templates/sign-in/
/*
/src/pages/auth/LoginPage.tsx
route: "/" or "/login"

-- Clickup ticket
A registered user can log in with email + password.✅
Acceptance Criteria 
Create form with Email, Password. ✅
After submit, the app redirects to /dashboard. ✅
Redirect to  /signup if user is not in db.
currentUser in Auth Context is populated.
Error handling: Invalid credentials display human-friendly inline errors (e.g. “Incorrect password”).
Route Protection: Attempting to access any protected route while unauthenticated redirects to /login after the auth guard resolves.
Session Persistence: The user stays logged in after page reload or browser restart. ✅ Included in firebaseConfig "setPersistence"
*/

import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Box, Typography, Container, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigationManager } from "../../services/navigationManager";
import { useAuth } from '../../services/auth_services/AuthProvider';

const defaultTheme = createTheme();

export default function LoginPage() {
  const { handleRegister, handleReset, handleClickOverview } = useNavigationManager(); 
  const { login } = useAuth();

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // async to help execute and handle error
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      setError("Set both email and password!");
      return;
    }

    try
    {
      setLoading(true);
      login(email, password);
     
    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        setError("No account found with this email. Redirecting to sign up?");
      } else if (error.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              onClick={handleClickOverview}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            <Button onClick={handleReset} fullWidth variant="text">
              Forgot password?
            </Button>
            <Button onClick={handleRegister} fullWidth variant="text">
              Don't have an account? Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}