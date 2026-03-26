import { useNavigate } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import SignUpCard          from "../components/signup/SignUpCard";
import { InputField,Back, Button }      from "../components/signup/SignUpForm";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import PasswordIcon from "../components/icons/PasswordIcon";
import { useCredentials } from "../context/CredContext";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const { setRecoveryEmail } = useCredentials();
  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: ({ value }) => {
      const parsed = z.string().email("Please enter a valid email address.").safeParse(value.email);
      if (!parsed.success) return;
      setRecoveryEmail(value.email);
      navigate({ to: "/verify-otp" });
    },
  });
  // const cardStyles = {  minHeight:468 , width:440}
  
  return (
    <SignUpCard
      title="Forget Password?"
      subtitle="Enter your email to reset your password."
      icon={<PasswordIcon />}
      styles={"w-110 min-h-117"}
    >
      <form
        className="flex flex-col w-94 gap-3 h-17"
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
              z.string().email("Please enter a valid email address.").safeParse(value).success
                ? undefined
                : "Please enter a valid email address.",
          }}
        >
          {(field) => (
            <InputField
          id="passwordReset"
          error={field.state.meta.errors[0]}
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          icon={Mail}
        />
          )}
        </form.Field>
      </form>
      <Button onNext={form.handleSubmit} buttonLabel="Send OTP" />

      <Back footerText="Back" footerLinkTo="/login" />
    </SignUpCard>
  );
}