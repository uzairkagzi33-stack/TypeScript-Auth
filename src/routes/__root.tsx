import { createRootRoute } from "@tanstack/react-router";
import AuthLayout from "../Layouts/AuthLayout";

export const Route = createRootRoute({
  component: AuthLayout,
});
