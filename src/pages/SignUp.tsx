// import { useState } from "react";
// import { useNavigate, Link } from "@tanstack/react-router";
// import { useForm } from "@tanstack/react-form";
// import { z } from "zod";
// import {
//   CircleUserRound,
//   Building2,
//   Mail,
//   Eye,
//   EyeOff,
//   ArrowLeft,
//   LockKeyhole,
// } from "lucide-react";
// import { Input } from "../components/ui/input";
// import SignUpCard from "../components/signup/SignUpCard";
// import OtpInput from "../components/signup/OtpInput";
// // Add this import at the top
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/ui/select";

// // Dummy Data change later
// const DEPARTMENTS = [
//   { value: "it", label: "IT & Infrastructure" },
//   { value: "hr", label: "Human Resources" },
//   { value: "finance", label: "Finance & Accounts" },
//   { value: "operations", label: "Operations" },
//   { value: "support", label: "Customer Support" },
// ];

// // Schemas
// const signupSchema = z.object({
//   fullName: z.string().min(1, "Full name is required"),
//   department: z.string().min(1, "Department is required"),
//   email: z.string().email("Enter a valid email"),
// });

// const passwordSchema = z
//   .object({
//     password: z
//       .string()
//       .min(8, "Min 8 characters are required")
//       .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
//       .regex(/[0-9]/, "Must contain at least 1 number")
//       .regex(/[^a-zA-Z0-9]/, "Must contain at least 1 special character"),
//     confirmPassword: z.string().min(1, "Please confirm your password"),
//   })
//   .refine((d) => d.password === d.confirmPassword, {
//     message: "Passwords do not match!",
//     path: ["confirmPassword"],
//   });

// type Step = 1 | 2 | 3;

// export default function SignUpPage() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState<Step>(1);

//   // Step 2
//   const [otp, setOtp] = useState("");
//   const [otpError, setOtpError] = useState("");

//   // Step 3
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   //Step 1 errors
//   const [errors, setErrors] = useState<{
//     fullName?: string;
//     department?: string;
//     email?: string;
//   }>({});

//   // step1 form
//   const step1Form = useForm({
//     defaultValues: { fullName: "", department: "", email: "" },
//     onSubmit: ({ value }) => {
//       const parsed = signupSchema.safeParse(value);
//       if (!parsed.success) {
//         const fieldErrors = parsed.error.flatten().fieldErrors;
//         setErrors({
//           fullName: fieldErrors.fullName?.[0],
//           department: fieldErrors.department?.[0],
//           email: fieldErrors.email?.[0],
//         });
//         return;
//       }
//       setErrors({});
//       setStep(2);
//     },
//   });

//   //Step3 form
//   const step3Form = useForm({
//     defaultValues: { password: "", confirmPassword: "" },
//     onSubmit: ({ value }) => {
//       const parsed = passwordSchema.safeParse(value);
//       if (!parsed.success) return;
//       navigate({ to: "/login" });
//     },
//   });

//   //Otp handler
//   const handleVerify = () => {
//     if (otp.length < 4) {
//       setOtpError("Please enter full 4-digit OTP");
//       return;
//     }
//     setOtpError("");
//     //otp Logic Goes here
//     setStep(3);
//   };

//   const cardConfig = {
//     1: { title: "Create a new account", styles: "w-93.25 min-h-144.5" },
//     2: { title: "Verify your email", styles: "w-93.25 min-h-120" },
//     3: { title: "Create your password", styles: "w-93.25 min-h-144.5" },
//   };

//   return (
//     <SignUpCard
//       title={cardConfig[step].title}
//       subtitle="Enter your details to Sign up."
//       styles={cardConfig[step].styles}
//     >
//       {/* step1 */}
//       {step === 1 && (
//         <>
//           <step1Form.Subscribe selector={(s) => s.values}>
//             {(values) => (
//               <form
//                 className="flex flex-col w-93.25 gap-3"
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   step1Form.handleSubmit();
//                 }}
//               >
//                 <div className="flex flex-col w-93.25 h-14.5 gap-2">
//                   <div className="flex justify-between">
//                     <label
//                       htmlFor="fullName"
//                       className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
//                     >
//                       Full Name
//                     </label>
//                     {errors.fullName && (
//                       <span className="text-red-600 text-xs h-3.5">
//                         {errors.fullName}
//                       </span>
//                     )}
//                   </div>
//                   <div className="relative flex items-center h-9">
//                     <CircleUserRound
//                       size={15}
//                       className="absolute left-3 text-gray-600 pointer-events-none"
//                       strokeWidth={1.5}
//                     />
//                     <Input
//                       id="fullName"
//                       type="text"
//                       placeholder="Enter your name"
//                       value={values.fullName}
//                       onChange={(e) => {
//                         step1Form.setFieldValue("fullName", e.target.value);
//                         if (errors.fullName)
//                           setErrors((p) => ({ ...p, fullName: undefined }));
//                       }}
//                       className=" h-9 pl-8 pr-3"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex flex-col w-93.25 h-14.5 gap-2">
//                   <div className="flex justify-between">
//                     <label
//                       htmlFor="department"
//                       className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
//                     >
//                       Department
//                     </label>
//                     {errors.department && (
//                       <span className="text-red-600 text-xs h-3.5">
//                         {errors.department}
//                       </span>
//                     )}
//                   </div>

//                   <div className="relative flex items-center h-9">
//                     <Building2
//                       size={15}
//                       className="absolute left-3 text-gray-600 pointer-events-none z-10"
//                       strokeWidth={1.5}
//                     />
//                     <Select
//                       value={values.department}
//                       onValueChange={(val) => {
//                         step1Form.setFieldValue("department", val);
//                         if (errors.department)
//                           setErrors((p) => ({ ...p, department: undefined }));
//                       }}
//                     >
//                       <SelectTrigger
//                         id="department"
//                         className="w-full h-9 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0 focus-visible:ring-0 placeholder:text-gray-500 pl-8"
//                       >
//                         <SelectValue placeholder="Select your department" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {DEPARTMENTS.map(({ value, label }) => (
//                           <SelectItem key={value} value={value}>
//                             {label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="flex flex-col w-93.25 h-14.5 gap-2">
//                   <div className="flex justify-between">
//                     <label
//                       htmlFor="email"
//                       className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
//                     >
//                       Email
//                     </label>
//                     {errors.email && (
//                       <span className="text-red-600 text-xs h-3.5">
//                         {errors.email}
//                       </span>
//                     )}
//                   </div>
//                   <div className="relative flex items-center h-9">
//                     <Mail
//                       size={15}
//                       className="absolute left-3 text-gray-600 pointer-events-none"
//                       strokeWidth={1.5}
//                     />
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="Enter your email"
//                       value={values.email}
//                       onChange={(e) => {
//                         step1Form.setFieldValue("email", e.target.value);
//                         if (errors.email)
//                           setErrors((p) => ({ ...p, email: undefined }));
//                       }}
//                       className="w-full h-9 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus-visible:border-blue-500 focus-visible:ring-0 placeholder:text-gray-500 pl-8 pr-3"
//                     />
//                   </div>
//                 </div>
//               </form>
//             )}
//           </step1Form.Subscribe>

//           <button
//             type="button"
//             onClick={step1Form.handleSubmit}
//             className="rounded-lg bg-blue-600 w-93.5 min-h-10.5 text-[15px] text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
//           >
//             Next
//           </button>

//           <p className="text-center text-gray-500 w-93.25 text-sm leading-5 h-4 py-1">
//             Already have an account?
//             <Link
//               to="/login"
//               className="text-blue-600 font-medium underline underline-offset-2 ml-1"
//             >
//               Login
//             </Link>
//           </p>
//         </>
//       )}

//       {/* Step2 */}
//       {step === 2 && (
//         <>
//           <OtpInput
//             value={otp}
//             onChange={(next) => {
//               setOtp(next);
//               if (otpError) setOtpError("");
//             }}
//             error={otpError}
//           />

//           <button
//             type="button"
//             onClick={handleVerify}
//             className="rounded-lg bg-blue-600 w-93.5 min-h-10.5 text-[15px] text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
//           >
//             Verify OTP
//           </button>

//           <div className="flex flex-col items-center gap-1">
//             <span className="text-sm text-muted-foreground">
//               Experiencing issues receiving the code?
//             </span>
//             <div className="flex w-full text-gray-950 px-2.5 py-2 font-bold justify-center">
//               <span
//                 className="cursor-pointer hover:text-blue-600 active:text-blue-800 font-medium underline underline-offset-2"
//                 onClick={() => {
//                   setOtp("");
//                   setOtpError("");
//                 }}
//               >
//                 Resend
//               </span>
//             </div>
//           </div>
//         </>
//       )}

//       {step === 3 && (
//         <>
//           <form
//             className="flex flex-col w-93.25 gap-3"
//             onSubmit={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               step3Form.handleSubmit();
//             }}
//           >
//             <step3Form.Field
//               name="password"
//               validators={{
//                 onSubmit: ({ value }) => {
//                   const parsed = z
//                     .string()
//                     .min(8, "Min 8 characters are required")
//                     .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
//                     .regex(/[0-9]/, "Must contain at least 1 number")
//                     .regex(
//                       /[^a-zA-Z0-9]/,
//                       "Must contain at least 1 special character",
//                     )
//                     .safeParse(value);

//                   if (!parsed.success) {
//                     return parsed.error.issues[0].message; 
//                   }
//                   return undefined;
//                 },
//               }}
//             >
//               {(field) => (
//                 <div className="flex flex-col w-93.25 gap-2">
//                   <div className="flex justify-between">
//                     <label
//                       htmlFor="newPassword"
//                       className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
//                     >
//                       New Password
//                     </label>
//                     {field.state.meta.errors[0] && (
//                       <span className="text-red-600 text-xs h-3.5">
//                         {field.state.meta.errors[0]}
//                       </span>
//                     )}
//                   </div>
//                   <div className="relative flex items-center h-9">
//                     <LockKeyhole
//                       size={15}
//                       className="absolute left-3 text-gray-600 pointer-events-none"
//                       strokeWidth={1.5}
//                     />
//                     <Input
//                       id="newPassword"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="• • • • • • • • • •"
//                       value={field.state.value}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       className="w-full h-9 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus-visible:border-blue-500 focus-visible:ring-0 tracking-[0.15rem] placeholder:tracking-tighter pl-8 pr-9"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((p) => !p)}
//                       className="absolute right-3 text-muted-foreground"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-4 h-4" />
//                       ) : (
//                         <Eye className="w-4 h-4" />
//                       )}
//                     </button>
//                   </div>
//                   <p className="text-sm text-muted-foreground">
//                     Must be 8+ characters with 1 uppercase, 1 number, and 1
//                     special character.
//                   </p>
//                 </div>
//               )}
//             </step3Form.Field>

//             <step3Form.Field
//               name="confirmPassword"
//               validators={{
//                 onSubmit: ({ value, fieldApi }) => {
//                   if (!value) return "Please confirm your password";
//                   return value !== fieldApi.form.getFieldValue("password")
//                     ? "Passwords do not match!"
//                     : undefined;
//                 },
//               }}
//             >
//               {(field) => (
//                 <div className="flex flex-col w-93.25 h-14.5 gap-2">
//                   <div className="flex justify-between">
//                     <label
//                       htmlFor="confirmPassword"
//                       className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
//                     >
//                       Confirm Password
//                     </label>
//                     {field.state.meta.errors[0] && (
//                       <span className="text-red-600 text-xs h-3.5">
//                         {field.state.meta.errors[0]}
//                       </span>
//                     )}
//                   </div>
//                   <div className="relative flex items-center h-9">
//                     <LockKeyhole
//                       size={15}
//                       className="absolute left-3 text-gray-600 pointer-events-none"
//                       strokeWidth={1.5}
//                     />
//                     <Input
//                       id="confirmPassword"
//                       type={showConfirmPassword ? "text" : "password"}
//                       placeholder="• • • • • • • • • •"
//                       value={field.state.value}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       className="w-full h-9 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus-visible:border-blue-500 focus-visible:ring-0 tracking-[0.15rem] placeholder:tracking-tighter pl-8 pr-9"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowConfirmPassword((p) => !p)}
//                       className="absolute right-3 text-muted-foreground"
//                     >
//                       {showConfirmPassword ? (
//                         <EyeOff className="w-4 h-4" />
//                       ) : (
//                         <Eye className="w-4 h-4" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </step3Form.Field>
//           </form>

//           <button
//             type="button"
//             onClick={step3Form.handleSubmit}
//             className="rounded-lg bg-blue-600 w-93.5 min-h-10.5 text-[15px] text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
//           >
//             Register
//           </button>

//           <BackButton onClick={() => setStep(2)} />
//         </>
//       )}
//     </SignUpCard>
//   );
// }

// function BackButton({ onClick }: { onClick: () => void }) {
//   return (
//     <div className="flex w-full text-gray-950 leading-10.5 px-2.5 h-10.5 py-4 gap-0.5 font-bold justify-start">
//       <div
//         className="cursor-pointer hover:text-blue-600 active:text-blue-800 flex items-center gap-1"
//         onClick={onClick}
//       >
//         <ArrowLeft size={16} />
//         <span className="font-medium leading-5 tracking-tighter w-12.5 h-5 underline-offset-2 underline">
//           Back
//         </span>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  CircleUserRound,
  Building2,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  LockKeyhole,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import SignUpCard from "../components/signup/SignUpCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const DEPARTMENTS = [
  { value: "it", label: "IT & Infrastructure" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance & Accounts" },
  { value: "operations", label: "Operations" },
  { value: "support", label: "Customer Support" },
];

const ROLES = [
  { value: "employee", label: "Employee" },
  { value: "support_engineer", label: "Support engineer" },
];

// Schemas
const step1Schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  department: z.string().min(1, "Department is required"),
  role: z.string().min(1, "Role is required"),
});

const step2Schema = z
  .object({
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Min 8 characters are required")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(/[0-9]/, "Must contain at least 1 number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least 1 special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

type Step = 1 | 2;

export default function SignUpPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [step1Errors, setStep1Errors] = useState<{
    fullName?: string;
    department?: string;
    role?: string;
  }>({});

  const step1Form = useForm({
    defaultValues: { fullName: "", department: "", role: "" },
    onSubmit: ({ value }) => {
      const parsed = step1Schema.safeParse(value);
      if (!parsed.success) {
        const fieldErrors = parsed.error.flatten().fieldErrors;
        setStep1Errors({
          fullName: fieldErrors.fullName?.[0],
          department: fieldErrors.department?.[0],
          role: fieldErrors.role?.[0],
        });
        return;
      }
      setStep1Errors({});
      setStep(2);
    },
  });

  const step2Form = useForm({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    onSubmit: ({ value }) => {
      const parsed = step2Schema.safeParse(value);
      if (!parsed.success) return;
      navigate({ to: "/login" });
    },
  });

  const cardConfig = {
    1: { title: "Create a new account", styles: "w-93.25 min-h-144.5" },
    2: { title: "Register for System Access", styles: "w-93.25 min-h-144.5" },
  };

  return (
    <SignUpCard
      title={cardConfig[step].title}
      subtitle="Enter your details to Sign up."
      styles={cardConfig[step].styles}
    >
      {/* Step 1 */}
      {step === 1 && (
        <>
          <step1Form.Subscribe selector={(s) => s.values}>
            {(values) => (
              <form
                className="flex flex-col w-93.25 gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  step1Form.handleSubmit();
                }}
              >
                {/* Full Name */}
                <div className="flex flex-col w-93.25 h-14.5 gap-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="fullName"
                      className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
                    >
                      Full Name
                    </label>
                    {step1Errors.fullName && (
                      <span className="text-red-600 text-xs h-3.5">
                        {step1Errors.fullName}
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center h-9">
                    <CircleUserRound
                      size={15}
                      className="absolute left-3 text-gray-600 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your name"
                      value={values.fullName}
                      onChange={(e) => {
                        step1Form.setFieldValue("fullName", e.target.value);
                        if (step1Errors.fullName)
                          setStep1Errors((p) => ({ ...p, fullName: undefined }));
                      }}
                      className="h-9 pl-8 pr-3"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="flex flex-col w-93.25 h-14.5 gap-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="department"
                      className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
                    >
                      Department
                    </label>
                    {step1Errors.department && (
                      <span className="text-red-600 text-xs h-3.5">
                        {step1Errors.department}
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center h-9">
                    <Building2
                      size={15}
                      className="absolute left-3 text-gray-600 pointer-events-none z-10"
                      strokeWidth={1.5}
                    />
                    <Select
                      value={values.department}
                      onValueChange={(val) => {
                        step1Form.setFieldValue("department", val);
                        if (step1Errors.department)
                          setStep1Errors((p) => ({ ...p, department: undefined }));
                      }}
                    >
                      <SelectTrigger
                        id="department"
                        className="w-full h-9 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0 focus-visible:ring-0 placeholder:text-gray-500 pl-8"
                      >
                        <SelectValue placeholder="Enter your department" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENTS.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Role */}
                <div className="flex flex-col w-93.25 gap-2">
                  <div className="flex justify-between">
                    <label className="text-gray-900 font-medium h-3.5 text-sm leading-3.5">
                      Role
                    </label>
                    {step1Errors.role && (
                      <span className="text-red-600 text-xs h-3.5">
                        {step1Errors.role}
                      </span>
                    )}
                  </div>
                  <ToggleGroup
                    type="single"
                    value={values.role}
                    onValueChange={(val) => {
                      if (!val) return;
                      step1Form.setFieldValue("role", val);
                      if (step1Errors.role)
                        setStep1Errors((p) => ({ ...p, role: undefined }));
                    }}
                    className="flex gap-2"
                  >
                    {ROLES.map(({ value, label }) => (
                      <ToggleGroupItem
                        key={value}
                        value={value}
                        className="flex-1 h-9 rounded-lg border border-gray-200 text-sm font-medium text-gray-900 bg-white
                          data-[state=on]:bg-blue-50 data-[state=on]:border-blue-600 data-[state=on]:text-blue-600
                          hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        {label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              </form>
            )}
          </step1Form.Subscribe>

          <button
            type="button"
            onClick={step1Form.handleSubmit}
            className="rounded-lg bg-blue-600 w-93.5 min-h-10.5 text-[15px] text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
          >
            Next
          </button>

          <p className="text-center text-gray-500 w-93.25 text-sm leading-5 h-4 py-1">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-600 font-medium underline underline-offset-2 ml-1"
            >
              Login
            </Link>
          </p>
        </>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <form
            className="flex flex-col w-93.25 gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              step2Form.handleSubmit();
            }}
          >
            {/* Email */}
            <step2Form.Field
              name="email"
              validators={{
                onSubmit: ({ value }) => {
                  const parsed = z.string().email("Enter a valid email").safeParse(value);
                  return parsed.success ? undefined : parsed.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col w-93.25 h-14.5 gap-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="email"
                      className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
                    >
                      Email address
                    </label>
                    {field.state.meta.errors[0] && (
                      <span className="text-red-600 text-xs h-3.5">
                        {field.state.meta.errors[0]}
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center h-9">
                    <Mail
                      size={15}
                      className="absolute left-3 text-gray-600 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-9 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus-visible:border-blue-500 focus-visible:ring-0 placeholder:text-gray-500 pl-8 pr-3"
                    />
                  </div>
                </div>
              )}
            </step2Form.Field>

            {/* Password */}
            <step2Form.Field
              name="password"
              validators={{
                onSubmit: ({ value }) => {
                  const parsed = z
                    .string()
                    .min(8, "Min 8 characters are required")
                    .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
                    .regex(/[0-9]/, "Must contain at least 1 number")
                    .regex(/[^a-zA-Z0-9]/, "Must contain at least 1 special character")
                    .safeParse(value);
                  return parsed.success ? undefined : parsed.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col w-93.25 gap-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="password"
                      className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
                    >
                      Password
                    </label>
                    {field.state.meta.errors[0] && (
                      <span className="text-red-600 text-xs h-3.5">
                        {field.state.meta.errors[0]}
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center h-9">
                    <LockKeyhole
                      size={15}
                      className="absolute left-3 text-gray-600 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="• • • • • • • • • •"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-9 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus-visible:border-blue-500 focus-visible:ring-0 tracking-[0.15rem] placeholder:tracking-tighter pl-8 pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* <p className="text-sm text-muted-foreground">
                    Must be 8+ characters with 1 uppercase, 1 number, and 1 special character.
                  </p> */}
                </div>
              )}
            </step2Form.Field>

            {/* Confirm Password */}
            <step2Form.Field
              name="confirmPassword"
              validators={{
                onSubmit: ({ value, fieldApi }) => {
                  if (!value) return "Please confirm your password";
                  return value !== fieldApi.form.getFieldValue("password")
                    ? "Passwords do not match!"
                    : undefined;
                },
              }}
            >
              {(field) => (
                <div className="flex flex-col w-93.25 h-14.5 gap-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="text-gray-900 font-medium h-3.5 text-sm leading-3.5"
                    >
                      Confirm Password
                    </label>
                    {field.state.meta.errors[0] && (
                      <span className="text-red-600 text-xs h-3.5">
                        {field.state.meta.errors[0]}
                      </span>
                    )}
                  </div>
                  <div className="relative flex items-center h-9">
                    <LockKeyhole
                      size={15}
                      className="absolute left-3 text-gray-600 pointer-events-none"
                      strokeWidth={1.5}
                    />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="• • • • • • • • • •"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-9 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg outline-none focus-visible:border-blue-500 focus-visible:ring-0 tracking-[0.15rem] placeholder:tracking-tighter pl-8 pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                      className="absolute right-3 text-muted-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </step2Form.Field>
          </form>

          <button
            type="button"
            onClick={step2Form.handleSubmit}
            className="rounded-lg bg-blue-600 w-93.5 min-h-10.5 text-[15px] text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
          >
            Register
          </button>

          <BackButton onClick={() => setStep(1)} />
        </>
      )}
    </SignUpCard>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex w-full text-gray-950 leading-10.5 px-2.5 h-10.5 py-4 gap-0.5 font-bold justify-start">
      <div
        className="cursor-pointer hover:text-blue-600 active:text-blue-800 flex items-center gap-1"
        onClick={onClick}
      >
        <ArrowLeft size={16} />
        <span className="font-medium leading-5 tracking-tighter w-12.5 h-5 underline-offset-2 underline">
          Back
        </span>
      </div>
    </div>
  );
}