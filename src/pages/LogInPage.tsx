import { useNavigate, Link } from "@tanstack/react-router";
import { Mail, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import SignUpCard from "../components/signup/SignUpCard";
import { loginRequest } from "../api/auth";
import { useCredentials } from "../context/CredContext";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Min 8 Characters are required"),
});

export default function LoginPage() {
  const { setLoginIdentity } = useCredentials();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
      if (!parsed.success) return;
      const data = await loginMutation.mutateAsync(value);
      setLoginIdentity({
        email: data.email,
        username: data.username || data.email.split("@")[0] || "",
      });
      navigate({ to: "/" });
    },
  });

  return (
    <SignUpCard
      title="Login to your account"
      subtitle="Enter your detail to login."
      styles="min-h-105"
    >
      <form
        className="flex flex-col w-93.25 gap-3"
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
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-9"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
              {field.state.meta.errors[0] && (
                <p className="text-destructive text-xs">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </FormApi.Field>

        <FormApi.Field
          name="password"
          validators={{
            onSubmit: ({ value }) => (!value ? "Password is required" : undefined),
          }}
        >
          {(field) => (
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="• • • • • • • • • •"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="px-9 tracking-[0.15rem] placeholder:tracking-tighter bg-white "
                />
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {field.state.meta.errors[0] && (
                <p className="text-destructive text-xs ">{field.state.meta.errors[0]}</p>
              )}
            </div>
          )}
        </FormApi.Field>
      </form>

      <div className="flex items-center justify-between px-1 w-93.25">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked === true)}
          />
          <Label htmlFor="remember" className="text-[13px] font-normal cursor-pointer">
            Keep me logged in
          </Label>
        </div>
        <Link
          to="/forgot-password"
          className="text-[13px] underline hover:text-blue-600 active:text-blue-800"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="button"
        onClick={FormApi.handleSubmit}
        disabled={loginMutation.isPending}
        className="w-93.25 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold"
      >
        {loginMutation.isPending ? "Loading..." : "Login"}
      </Button>



      <p className="text-center text-gray-500 w-93.25 text-sm leading-5 h-4 py-1">
      Don't hve an account?
      
        <Link to="/signup" className="text-blue-600 font-medium underline underline-offset-2 ml-1">
          Sign up now
        </Link>
      
    </p>
    </SignUpCard>
  );
}