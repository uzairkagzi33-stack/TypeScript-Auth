import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "../pages/LogInPage";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});
