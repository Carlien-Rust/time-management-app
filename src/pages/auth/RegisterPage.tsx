// Template from https://mui.com/material-ui/getting-started/templates/sign-in/
/*
/src/pages/auth/RegisterPage.tsx
route: "/register"

-- Clickup ticket
Provide new users a way to register with Email + Password so they can access the app. ✅
Acceptance Criteria
User successfully submits the "Create Account" form with Name, Email, Password, Confirm. ✅
New user account appears in both Firebase Console and backend system.
On success sign in redirect to /dashboard. ✅
Error handling: Invalid credentials display human-friendly inline errors (e.g. “Password has to be 8 characters long”).
Route Protection: Attempting to access any protected route while unauthenticated redirects to /login after the auth guard resolves.
Session Persistence: The user stays logged in after page reload or browser restart. ✅ Included in firebaseConfig "setPersistence"
*/

import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigationManager } from "../../services/navigationManager";
import { useAuth } from '../../services/auth_services/AuthProvider';

const defaultTheme = createTheme();

export default function SignUp() {

  const { handleLogout, handleClickOverview } = useNavigationManager();
  const { register } = useAuth();

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
      await register(email, password);

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              onClick={handleClickOverview} 
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
            <Button onClick={handleLogout} fullWidth variant="text">
              Already have an account? Sign in
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}