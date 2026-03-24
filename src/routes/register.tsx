import { createFileRoute } from '@tanstack/react-router'
import SignUp from "../pages/auth/RegisterPage";

export const Route = createFileRoute('/register')({
  component: SignUp,
})
