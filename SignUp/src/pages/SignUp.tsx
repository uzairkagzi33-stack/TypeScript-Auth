// SignUpPage.tsx
import { useState } from "react";
import SignUpCard from "../components/signup/SignUpCard";
import SignUpForm, { InputField, PasswordField, Back } from "../components/signup/SignUpForm";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Mail, ArrowLeft } from "lucide-react";

const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
});

const signupPasswordSchema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const navigate = useNavigate();

  // ✅ Controls which step is shown
  const [step, setStep] = useState<1 | 2>(1);

  const [errors, setErrors] = useState<{
    fullName?: string;
    department?: string;
    role?: string;
  }>({});

  const step1Form = useForm({
    defaultValues: { fullName: "", department: "", role: "" },
    onSubmit: ({ value }) => {
      const parsed = signupSchema.safeParse(value);
      if (!parsed.success) {
        const fieldErrors = parsed.error.flatten().fieldErrors;
        setErrors({
          fullName: fieldErrors.fullName?.[0],
          department: fieldErrors.department?.[0],
          role: fieldErrors.role?.[0],
        });
        return;
      }
      setErrors({});
      setStep(2); // ✅ Show Step 2 without changing URL
    },
  });

  const step2Form = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    onSubmit: ({ value }) => {
      const parsed = signupPasswordSchema.safeParse(value);
      if (!parsed.success) return;
      navigate({ to: "/login" });
    },
  });

  return (
    <SignUpCard
      title={step === 1 ? "Create a new account" : "Register for System Access"}
      subtitle="Enter your details to Sign up."
      styles={step === 1 ? "w-93.25 min-h-144.5" : "w-93.25 min-h-152.5"}
    >
      {/* ✅ Step 1 */}
      {step === 1 && (
        <step1Form.Subscribe selector={(state) => state.values}>
          {(values) => (
            <SignUpForm
              fullName={values.fullName}
              setFullName={(next) => {
                step1Form.setFieldValue("fullName", next);
                if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
              }}
              department={values.department}
              setDepartment={(next) => {
                step1Form.setFieldValue("department", next);
                if (errors.department) setErrors((p) => ({ ...p, department: undefined }));
              }}
              role={values.role}
              setRole={(next) => {
                step1Form.setFieldValue("role", next);
                if (errors.role) setErrors((p) => ({ ...p, role: undefined }));
              }}
              onNext={step1Form.handleSubmit}
              buttonLabel="Next"
              footerText="Already have an account?"
              footerLinkText="Login"
              footerLinkTo="/login"
              fullNameError={errors.fullName}
              departmentError={errors.department}
              roleError={errors.role}
            />
          )}
        </step1Form.Subscribe>
      )}

      {/* ✅ Step 2 */}
      {step === 2 && (
        <div className="flex flex-col w-93.5 min-h-52.5 gap-6">
          <form
            className="flex flex-col w-93.25 gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              step2Form.handleSubmit();
            }}
          >
            <step2Form.Field
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
            </step2Form.Field>

            <step2Form.Field
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
            </step2Form.Field>

            <step2Form.Field
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
            </step2Form.Field>
          </form>

          <button
            type="button"
            onClick={step2Form.handleSubmit}
            className="rounded-lg bg-blue-600 w-93.25 min-h-10.5 text-[15px] text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
          >
            Register
          </button>

          {/* ✅ Back goes to Step 1, not a different URL */}
          {/* <Back
            footerText="back"
            footerLinkTo="/signup"
            align="left"
            backArrow="true"
            onClick={() => setStep(1)} 
          /> */}
          {/* <button onClick={() => setStep(1)}>← back</button> */}
          <div
      className={`flex w-full text-gray-950 leading-10.5 px-2.5 h-10.5 py-4 gap-0.5 font-bold justify-start`}
    >
      <div
      className="cursor-pointer  hover:text-blue-600 active:text-blue-800 flex items-center gap-1"
      onClick={() => setStep(1)}
      >
        
        <ArrowLeft size={16} />
        
        
        <span
          className="font-medium leading-5 tracking-tighter w-12.5 h-5 underline-offset-2 underline"
        >
          Back
        </span>
      </div>
    </div>
        </div>
      )}
    </SignUpCard>
  );
}