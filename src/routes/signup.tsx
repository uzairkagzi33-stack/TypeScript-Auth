import { createFileRoute } from "@tanstack/react-router";
import SignUpIn2Step from "../pages/SignUp";

export const Route = createFileRoute("/signup")({
  component: SignUpIn2Step,
});
