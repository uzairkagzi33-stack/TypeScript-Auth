import { createFileRoute } from "@tanstack/react-router";
import NewForgotPassword from "../pages/NewForgotPassword"

export const Route = createFileRoute("/forgot-password")({
  component: NewForgotPassword,
});
