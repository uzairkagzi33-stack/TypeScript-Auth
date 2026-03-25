import SignUpCard from "../components/signup/SignUpCard";
import  { Back, Button, PasswordField } from "../components/signup/SignUpForm";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string().min(1, "Please enter both passwords"),
    confirmPassword: z.string().min(1, "Please enter both passwords"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ value }) => {
      const parsed = resetPasswordSchema.safeParse(value);
      if (!parsed.success) return;
      // Proceed...
    },
  });

  return (
    <SignUpCard
      title="Register for System Access"
      subtitle="Enter your details to Sign up."
      // styles={cardStyles}
    >
<form className="min-h-35 gap-3"
onSubmit={(e) => {
  e.preventDefault();
  e.stopPropagation();
  form.handleSubmit();
}}
>

    <form.Field
    name="password"
    validators={{
      onSubmit: ({ value }) => (!value ? "Please enter both passwords" : undefined),
    }}
    >
      {(field) => (
    <PasswordField
    id="password1"
    label="New Password"
    value={field.state.value}
    onChange={e=>field.handleChange(e.target.value)}
    error={field.state.meta.errors[0]}
    />
      )}
    </form.Field>
    <form.Field
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
    <PasswordField
    id="password2"
    label="Retype Password"
    value={field.state.value}
    onChange={e=>field.handleChange(e.target.value)}
    error={field.state.meta.errors[0]}
    />
      )}
    </form.Field>
</form>
    <Button 
        onNext = {form.handleSubmit}
        buttonLabel = {"Reset Password"}
    />
        <Back 
        footerText="Back"
        footerLinkTo="/signup"
        backArrow="true"
        align="left"
        />
    </SignUpCard>
  );
} 