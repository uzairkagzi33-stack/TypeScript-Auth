import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { Mail, ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import SignUpCard from "../components/signup/SignUpCard";
import OtpInput from "../components/signup/OtpInput";
import PasswordIcon from "../components/icons/PasswordIcon";
import VerifyEmailLogo from "../components/icons/VerifyEmailLogo";
import { useCredentials } from "../context/CredContext";

type Step = 1 | 2 | 3;

// Schema
const emailSchema = z.string().email("Please enter a valid email address.");

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Min 8 characters are required"),
    confirmPassword: z.string().min(8, "Min 8 characters are required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordFlow() {
  const navigate = useNavigate();
  const {
    setRecoveryEmail,
    recoveryEmail: email,
    clearRecoveryEmail,
  } = useCredentials();

  const [step, setStep] = useState<Step>(1);

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const step1Form = useForm({
    defaultValues: { email: "" },
    onSubmit: ({ value }) => {
      const parsed = emailSchema.safeParse(value.email);
      if (!parsed.success) return;
      setRecoveryEmail(value.email);
      setStep(2);
    },
  });

  const step3Form = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    onSubmit: ({ value }) => {
      const parsed = resetPasswordSchema.safeParse(value);
      if (!parsed.success) return;
      clearRecoveryEmail();
      navigate({ to: "/login" });
    },
  });

  const handleVerify = () => {
    if (otp.length < 4) {
      setOtpError("Please enter full 4-digit OTP");
      return;
    }
    setOtpError("");
    setStep(3);
  };

  const cardConfig = {
    1: {
      title: "Forgot Password?",
      subtitle: "Enter your email to reset your password.",
      icon: <PasswordIcon />,
      styles: "w-110 min-h-117",
      showDivider: false,
    },
    2: {
      title: "Email Verification Code",
      subtitle: (
        <>
          We sent a 4-digit code to{" "}
          <span className="font-medium text-gray-900">{email}</span>
        </>
      ),
      icon: <VerifyEmailLogo />,
      styles: "min-h-118.5 w-[473px]",
      showDivider: true,
    },
    3: {
      title: "Reset Password",
      subtitle: "Enter your new password.",
      icon: undefined,
      styles: "",
      showDivider: false,
    },
  };

  const config = cardConfig[step];

  return (
    <SignUpCard
      title={config.title}
      subtitle={config.subtitle}
      icon={config.icon}
      styles={config.styles}
      showDivider={config.showDivider}
    >
      {step === 1 && (
        <>
          <form
            className="flex flex-col w-94 gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              step1Form.handleSubmit();
            }}
          >
            <step1Form.Field
              name="email"
              validators={{
                onSubmit: ({ value }) =>
                  emailSchema.safeParse(value).success
                    ? undefined
                    : "Please enter a valid email address.",
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-3">
                  <Label htmlFor="forgotEmail" className="min-h-5">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="forgotEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="pl-9"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  </div>
                  {field.state.meta.errors[0] && (
                    <p className="text-destructive text-xs">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </step1Form.Field>
          </form>

          <Button
            type="button"
            onClick={step1Form.handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold"
          >
            Send OTP
          </Button>

          {/* Back to Login */}
          <BackButton to="/login" label="Back" onClick={undefined} />
        </>
      )}

      {step === 2 && (
        <>
          <OtpInput
            value={otp}
            onChange={(next) => {
              setOtp(next);
              if (otpError) setOtpError("");
            }}
            error={otpError}
          />

          <Button
            type="button"
            onClick={handleVerify}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold"
          >
            Submit Code
          </Button>

          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-muted-foreground h-5">
              Experiencing issues receiving the code?
            </span>
            <div className="flex w-full text-gray-950 font-bold justify-center">
              <div
                className="cursor-pointer hover:text-blue-600 active:text-blue-800 flex items-center gap-1"
                onClick={() => {
                  setOtp("");
                  setOtpError("");
                  setStep(1);
                }}
              >
                <Link
                  to="/forgot-password"
                  className="font-medium leading-5 tracking-tighter underline-offset-2 underline h-5"
                >
                  Resend
                </Link>
              </div>
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              step3Form.handleSubmit();
            }}
          >
            <step3Form.Field
              name="password"
              validators={{
                onSubmit: ({ value }) =>
                  !value
                    ? "Please enter both passwords"
                    : value.length < 8
                      ? "Min 8 characters are required"
                      : undefined,
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="newPassword" className="min-h-5">New Password</Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="• • • • • • • • • •"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="px-9 tracking-[0.15rem] placeholder:tracking-tighter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-700 active:text-gray-900 hover:cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {field.state.meta.errors[0] && (
                    <p className="text-destructive text-xs">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </step3Form.Field>

            <step3Form.Field
              name="confirmPassword"
              validators={{
                onSubmit: ({ value, fieldApi }) => {
                  if (!value) return "Please enter both passwords";
                  return value !== fieldApi.form.getFieldValue("password")
                    ? "Passwords do not match!"
                    : undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword" className="min-h-5">
                    Retype Password
                  </Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="• • • • • • • • • •"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="px-9 tracking-[0.15rem] placeholder:tracking-tighter"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gray-700 active:text-gray-900 hover:cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {field.state.meta.errors[0] && (
                    <p className="text-destructive text-xs">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </step3Form.Field>
          </form>

          <Button
            type="button"
            onClick={step3Form.handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold"
          >
            Reset Password
          </Button>

          {/* Back to Step 2 */}
          <BackButton to={undefined} label="Back" onClick={() => setStep(2)} />
        </>
      )}
    </SignUpCard>
  );
}

// ── Reusable Back Button ───────────────────────────────────────────────────────
function BackButton({
  to,
  label,
  onClick,
}: {
  to?: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex w-full text-gray-950 leading-10.5 px-2.5 h-10.5 py-4 gap-0.5 font-bold justify-start">
      <div
        className="cursor-pointer hover:text-blue-600 active:text-blue-800 flex items-center gap-1"
        onClick={onClick}
      >
        <ArrowLeft size={16} />
        {to ? (
          <Link
            to={to}
            className="font-medium leading-5 tracking-tighter underline-offset-2 underline"
          >
            {label}
          </Link>
        ) : (
          <span className="font-medium leading-5 tracking-tighter underline-offset-2 underline">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
