import SignUpCard from "../components/signup/SignUpCard";
import { Mail } from "lucide-react";
import { InputField, PasswordField } from "../components/signup/SignUpForm";
import { Back } from "../components/signup/SignUpForm";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const signupPasswordSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export default function SignUpPassword() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      const parsed = signupPasswordSchema.safeParse(value);
      if (!parsed.success) return;
      navigate({ to: "/login" });
    },
  });

  return (
    <SignUpCard
      title="Register for System Access"
      subtitle="Enter your details to Sign up."
      styles={"w-93.25 min-h-152.5"}
    >
      <div className="flex flex-col w-93.5 min-h-52.5 gap-6">
        <form
          className="flex flex-col w-93.25 gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="email"
            validators={{
              onSubmit: ({ value }) =>
                z.string().email("Enter a valid email").safeParse(value).success
                  ? undefined
                  : "Enter a valid email",
            }}
          >
            {(field) => (
              <InputField
            id="email"
            label="Email"
            placeholder="Enter your email"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            icon={Mail}
            type="email"
            error={field.state.meta.errors[0]}
          />
            )}
          </form.Field>
          <form.Field
            name="password"
            validators={{
              onSubmit: ({ value }) => (!value ? "Password is required" : undefined),
            }}
          >
            {(field) => (
          <PasswordField
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors[0]}
          />
            )}
          </form.Field>

          <form.Field
            name="confirmPassword"
            validators={{
              onSubmit: ({ value, fieldApi }) => {
                if (!value) return "Confirm password is required";
                return value !== fieldApi.form.getFieldValue("password")
                  ? "Passwords do not match!"
                  : undefined;
              },
            }}
          >
            {(field) => (
          <PasswordField
            id="ConfirmPassword"
            label="Confirm Password"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            error={field.state.meta.errors[0]}
          />
            )}
          </form.Field>
        </form>

        <button
          type="button"
          onClick={form.handleSubmit}
          className="rounded-lg bg-blue-600 w-93.25 min-h-10.5 text-[15px] text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
        >
          Register
        </button>
        <Back
          footerText={"back"}
          footerLinkTo={"/signup"}
          align={"left"}
          backArrow={"true"}
        />
      </div>
    </SignUpCard>
  );
}
