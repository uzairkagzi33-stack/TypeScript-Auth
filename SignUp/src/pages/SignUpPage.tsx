import SignUpCard from "../components/signup/SignUpCard";
import { useNavigate } from "@tanstack/react-router";
import SignUpForm from "../components/signup/SignUpForm";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";

const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
});

export default function SignUpPage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{
    fullName?: string;
    department?: string;
    role?: string;
  }>({});

  const form = useForm({
    defaultValues: {
      fullName: "",
      department: "",
      role: "",
    },
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
      alert(`Proceeding as ${value.role}: ${value.fullName} from ${value.department}`);
      navigate({ to: "/signup2" });
    },
  });

  return (
    <SignUpCard
      title="Create a new account"
      subtitle="Enter your details to Sign up."
      // width={437}
      // minHeight={578}
      styles = 'w-93.25 min-h-144.5'
    >
      <form.Subscribe
        selector={(state) => state.values}
      >
        {(values) => (
          <SignUpForm
        fullName={values.fullName}
        setFullName={(next) => {
          form.setFieldValue("fullName", next);
          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
        }}
        department={values.department}
        setDepartment={(next) => {
          form.setFieldValue("department", next);
          if (errors.department) setErrors((prev) => ({ ...prev, department: undefined }));
        }}
        role={values.role}
        setRole={(next) => {
          form.setFieldValue("role", next);
          if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }));
        }}
        onNext={form.handleSubmit}
        buttonLabel="Next"
        footerText="Already have an account?"
        footerLinkText="Login"
        footerLinkTo="/login"
        fullNameError={errors.fullName}
        departmentError={errors.department}
        roleError={errors.role}
      />
        )}
      </form.Subscribe>
    </SignUpCard>
  );
} 