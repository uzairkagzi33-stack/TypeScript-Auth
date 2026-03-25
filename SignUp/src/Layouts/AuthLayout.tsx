import { Outlet } from "@tanstack/react-router";
import Header            from "../components/layout/Header";
import Footer            from "../components/layout/Footer";
import PatternBackground from "../components/layout/PatternBackground";

// ── AuthLayout ────────────────────────────────────────────────────────────────
// Wraps all auth pages (SignUp, Login, ForgotPassword, etc.)
// <Outlet /> renders the matched child route's page in the centre slot.
//
// Route setup example (in main.jsx or router.jsx):
//
//   <Route element={<AuthLayout />}>
//     <Route path="/signup"         element={<SignUpPage />} />
//     <Route path="/login"          element={<LoginPage />} />
//     <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//   </Route>

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Header: 1352×40 */}
      <Header />

      {/* Main: centres whatever <Outlet /> renders */}
      <main className="flex-1 flex items-center justify-center relative">

        {/* Pattern: 1140×440, sits behind the card */}
        <PatternBackground />

        {/* Child page renders here — SignUpPage, LoginPage, etc. */}
        <Outlet />

      </main>

      {/* Footer: 1352×20 */}
      <Footer />

    </div>
  );
}