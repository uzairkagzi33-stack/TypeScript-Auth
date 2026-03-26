import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AuthLayout from "../Layouts/AuthLayout";
// import SignUpPage from "../pages/SignUpPage";
import LoginPage from "../pages/LogInPage";
// import SignUpPassword from "../pages/SignUpPassword";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import VerifyOTP from "../pages/VerifyOTP";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import SignUpIn2Step from "../pages/SignUp"

const rootRoute = createRootRoute({
  component: AuthLayout,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignUpIn2Step,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

// const signupPasswordRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: "/signup2",
//   component: SignUpPassword,
// });

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});

const verifyOtpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-otp",
  component: VerifyOTP,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPasswordPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signupRoute,
  loginRoute,
  forgotPasswordRoute,
  verifyOtpRoute,
  resetPasswordRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}