import { createFileRoute } from "@tanstack/react-router";
import VerifyOTP from "../pages/VerifyOTP";

export const Route = createFileRoute("/verify-otp")({
  component: VerifyOTP,
});
