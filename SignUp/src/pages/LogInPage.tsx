import { useNavigate } from "@tanstack/react-router";
import { Mail, LockKeyhole } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import SignUpCard from "../components/signup/SignUpCard";
import { InputField, Footer, Button, PasswordField } from "../components/signup/SignUpForm";
import { loginRequest } from "../api/auth";
import { Link } from "@tanstack/react-router";
import { useAuthStore } from "../store/authStore";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Min 8 Characters are required"),
});

export default function LoginPage() {
  const setLoginIdentity = useAuthStore((state) => state.setLoginIdentity);
  const navigate = useNavigate();

  const [isChecked,setIsChecked] = useState<boolean>(false)

  const handleChange = (e) => {
//Remember me login Goes here.
    // setIsChecked(prev => !prev);
    setIsChecked(e.target.checked);
    // console.log(isChecked)
  }

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
      navigate({ to: "/" }); //Dashboard Route; update first in routes then assign
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
        // <InputField
        //   id="password"
        //   label="Password"
        //   placeholder="Enter your password"
        //   type="password"
        //   value={field.state.value}
        //   onChange={(e) => field.handleChange(e.target.value)}
        //   icon={LockKeyhole}
        //   error={field.state.meta.errors[0]}
        // />
        <PasswordField
        id="password"
        label="Password"
        placeholder="• • • • • • • • • • "
        value={field.state.value}
        error={field.state.meta.errors[0]}
        onChange={(e) => field.handleChange(e.target.value)}
        />
          )}
        </FormApi.Field>
      </form>
      {/* <ForgetPassword
        linkTo="/forget-password"
        linkText="Forgot password?"
      /> */}
      <div
          className='flex items-center justify-between px-1 w-93.25 h-5'
          >
          <div 
          className='w-45 h-5 flex items-center'
          >
      
          <input
          type='checkbox'
          id='cb1'
        checked={isChecked}
        onChange={handleChange}
          className='bg-blue-600'
          />
          <label
          htmlFor='cb1'
          className='text-slate-900 ml-2 text-[13px] leading-5'
          >
              Keep me logged in
          </label>
          </div>
          <div 
          className='text-slate-900  text-center h-5 text-[13px] leading-5 underline cursor-pointer hover:text-blue-600 active:text-blue-800'>
          <Link to="/forgot-password">Forgot password?</Link>
          </div>
      
          </div>

      <Button buttonLabel={loginMutation.isPending ? "Loading..." : "Login"} onNext={FormApi.handleSubmit} />
      <Footer
        footerText={"Don't have an account? "}
        footerLinkTo={"/signup"}
        footerLinkText={"Sign up now"}
      />
    </SignUpCard>
  );
}