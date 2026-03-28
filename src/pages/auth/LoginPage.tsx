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
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Box, Typography, Container, Alert, FormLabel, FormControl, IconButton, InputAdornment } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigationManager } from "../../services/navigationManager";
import { usePostAuth } from '../../hooks/usePostAuth';
import {z} from "zod";
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useUserStore } from '../../store/user/UserStore';
import { UserService } from "../../services/users.services";

const defaultTheme = createTheme();

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type LoginInputs = z.infer<typeof LoginSchema>;

export default function LoginPage() {

  const methods = useForm<LoginInputs>({
      resolver: zodResolver(LoginSchema),
      mode: "onChange",
  });

  const { handleRegister, handleReset, handleClickOverview } = useNavigationManager();
  const loginMutation = usePostAuth();

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useUserStore();

  // async to help execute and handle error
  const onSubmit = async (data: LoginInputs) => {
    setError(null);
    setLoading(true);
  
    if (!data.email || !data.password) {
      setError("Set both email and password!");
      return;
    }
    try {
      setLoading(true);

      // Login Firebase
      const { userId, tokens } = await loginMutation.mutateAsync(data);
      localStorage.setItem('authtoken', tokens.idToken);

      // Login BE
      const backendUserData = await UserService.getUserById(userId as string);
      setUser(backendUserData);

      handleClickOverview();
      setLoading(false);

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
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel> 
            <TextField
              {...methods.register("email")}
              error={!!methods.formState.errors.email}
              helperText={methods.formState.errors.email ? methods.formState.errors.email.message : ""}
              required
              label="Email Address"
              placeholder="your@email.com"
              autoComplete="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>  
            <TextField
              {...methods.register("password", { pattern: /^[A-Za-z]+$/i })}
              error={!!methods.formState.errors.password}
              helperText={methods.formState.errors.password ? methods.formState.errors.password.message : ""}
              required
              type={showPassword ? "text" : "password"}
              label="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password visibility" : "Show password visibility"}
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </FormControl> 
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
            //onClick={handleClickOverview} 
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