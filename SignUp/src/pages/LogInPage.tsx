import { useNavigate } from "@tanstack/react-router";
import { Mail, LockKeyhole } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import SignUpCard from "../components/signup/SignUpCard";
import { InputField, Footer, Button } from "../components/signup/SignUpForm";
import ForgetPassword from "../components/login/ForgetPassword";
import { loginRequest } from "../api/auth";
import { useAuthStore } from "../store/authStore";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const setLoginIdentity = useAuthStore((state) => state.setLoginIdentity);
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
  });

  const FormApi = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const parsed = loginSchema.safeParse(value);
      if (!parsed.success) {
        return;
      }
      const data = await loginMutation.mutateAsync(value);
      setLoginIdentity({
        email: data.email,
        username: data.username || data.email.split("@")[0] || "",
      });
      navigate({ to: "/signup" });
    },
  });

  return (
    <SignUpCard
      title="Login to your account"
      subtitle="Enter your detail to login."
      styles="min-h-105"
    >
      <form
        className="flex flex-col w-93.25 gap-3 h-33.5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          FormApi.handleSubmit();
        }}
      >
        <FormApi.Field
          name="email"
          validators={{
            onSubmit: ({ value }) =>
              z.string().email("Enter a valid email address").safeParse(value).success
                ? undefined
                : "Enter a valid email address",
          }}
        >
          {(field) => (
        <InputField
          id="email"
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          icon={Mail}
          error={field.state.meta.errors[0]}
        />
          )}
        </FormApi.Field>
        <FormApi.Field
          name="password"
          validators={{
            onSubmit: ({ value }) => (!value ? "Password is required" : undefined),
          }}
        >
          {(field) => (
        <InputField
          id="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          icon={LockKeyhole}
          error={field.state.meta.errors[0]}
        />
          )}
        </FormApi.Field>
      </form>
      <ForgetPassword
        linkTo="/forget-password"
        linkText="Forgot password?"
      />

      <Button buttonLabel={loginMutation.isPending ? "Loading..." : "Login"} onNext={FormApi.handleSubmit} />
      <Footer
        footerText={"Don't have an account? "}
        footerLinkTo={"/signup"}
        footerLinkText={"Sign up now"}
      />
    </SignUpCard>
  );
}