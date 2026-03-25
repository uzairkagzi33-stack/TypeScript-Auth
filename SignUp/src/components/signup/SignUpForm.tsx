import { CircleUserRound, Building2, Mail, LockKeyhole, ArrowLeft } from "lucide-react";
import { useState, type ReactNode } from "react";
import {  Eye, EyeOff } from "lucide-react";
import { Link } from "@tanstack/react-router";

// ── Reusable Input Field ──────────────────────────────────────────────────────
// Props:
//   id          (string)    — input id + label htmlFor
//   label       (string)    — label text
//   placeholder (string)    — input placeholder
//   value       (string)    — controlled value
//   onChange    (fn)        — change handler
//   icon        (ReactNode) — lucide icon component
//   type        (string)    — input type, default "text"
export function InputField({ id, label, placeholder, value, onChange, icon: Icon, type = "text", error}) {
  return (
    <div className="flex flex-col w-93.25 h-14.5 gap-2" >
      <div
      className="flex justify-between "
      >

      <label
        htmlFor={id}
        className="text-gray-900 font-medium justify-start h-3.5 text-sm leading-3.5"
      >
        {label}
      </label>
<span className=" text-red-600 text-xs h-3.5 "

>{error}</span>
      </div>
      <div className="relative flex items-center h-9" >
        {Icon && (
          <Icon
            size={15}
            className="absolute left-3 text-gray-600 pointer-events-none"
            strokeWidth={1.5}
          />
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
               className= "w-full  pr-3 h-9 text-sm text-gray-900 bg-white border placeholder-gray-500 border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all"
        style={{ paddingLeft: Icon ? 32 : 12}}
        /> 
        
        
      </div>
    </div>
  );
}

// ── Role Selector ─────────────────────────────────────────────────────────────
// Props:
//   role     (string)   — currently selected value
//   onSelect (fn)       — callback with selected value
//   options  (array)    — [{ value, label }], defaults to Employee/Support engineer
export function RoleSelector({
  role,
  onSelect,
  options = [
    { value: "employee", label: "Employee" },
    { value: "engineer", label: "Support engineer" },
  ],
}) {
  return (
    <div className="flex flex-col w-93.25 h-16 gap-3" >
      <label
        className="text-gray-900 font-medium h-3.5 text-xs leading-3.5"
      >
        Role
      </label>
      <div className="flex gap-2 h-10.5" >
        {options.map(({ value, label }) => {
          const selected = role === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              className="flex-1 rounded-lg border h-10.5 text-[14px]  font-medium transition-all cursor-pointer"
              style={{
                borderColor:     selected ? "rgba(37, 99, 235, 1)" : "#E5E7EB",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Back({footerText, footerLinkTo, align = 'center', backArrow = 'true'}){
  return footerText && (
    <div
      className={`flex w-full text-gray-950 leading-10.5 px-2.5 h-10.5 py-4 gap-0.5 font-bold ${align === 'left' ? 'justify-start' : 'justify-center'}`}
    >
      <div 
      
      className="cursor-pointer  hover:text-blue-600 active:text-blue-800 flex items-center gap-1">
        { (backArrow == "true") ?
        <ArrowLeft size={16} />:null
        }
        
        <Link
          to={footerLinkTo}
          className="font-medium leading-5 tracking-tighter w-12.5 h-5 underline-offset-2 underline"
        >
          {footerText}
        </Link>
      </div>
    </div>
  );
}
export function Button({ onNext, buttonLabel = "Next" }){
  return (
    <button
        type="button"
        onClick={onNext}
        className="rounded-lg bg-blue-600 w-93.5 min-h-10.5 text-[15px] text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors cursor-pointer"
      >
        {buttonLabel}
      </button>
  )
}




export function PasswordField({
  id          = "password",
  label       = "Password",
  placeholder = "• • • • • • • • • • ",
  value, error,
  onChange,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col w-93.25 h-16 gap-2">
      <div
      className="flex justify-between "
      >

      <label
        htmlFor={id}
        className="text-gray-900 font-medium justify-start leading-3.5 text-sm h-3.5"
      >
        {label}
      </label>
    <span className=" text-red-600 text-sm h-3"
      >
          {error}
    </span>
      </div>
      <div className="relative flex items-center h-9" >

        {/* Lock — left */}
        <LockKeyhole
          size={15}
          className="absolute left-3 text-gray-600 pointer-events-none"
          strokeWidth={1.5}
        />

        {/* Input */}
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          //, letterSpacing: '0.3em'  placeholder:font-bold  transition-all tracking-widest  placeholder:text-md placeholder:tracking-widest
          className="w-full px-8 text-gray-900 h-9 pl-8 tracking-[0.15rem] placeholder:tracking-tighter bg-white border placeholder-gray-400 border-gray-200 rounded-lg outline-none focus:border-blue-500 "
        />

        {/* Eye toggle — right, inside input */}
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow(prev => !prev)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-2 flex items-center p-1 justify-center text-gray-400 hover:text-gray-500 transition-colors"
        >
          {show
            ? <EyeOff size={15} strokeWidth={1.5}  
          className=" text-gray-600 pointer-events-none"

            />
            : <Eye    size={15} strokeWidth={1.5} 
          className=" text-gray-600 pointer-events-none"

            />
          }
        </button>

      </div>
    </div>
    // </div>
  );
}


export function Footer({
  footerText,
  footerLinkText,
  footerLinkTo,
}: {
  footerText?: ReactNode;
  footerLinkText?: string;
  footerLinkTo?: string;
}) {
  return (
    <p className="text-center text-gray-500 w-93.25 text-sm leading-5 h-4 py-1">
      {footerText}
      {footerLinkText && (
        <Link to={footerLinkTo} className="text-blue-600 font-medium underline underline-offset-2 ml-1">
          {footerLinkText}
        </Link>
      )}
    </p>
  );
}


// ── SignUpForm ────────────────────────────────────────────────────────────────
// Props:
//   fullName      / setFullName    — full name field state
//   department    / setDepartment  — department field state
//   role          / setRole        — selected role state
//   onNext        (fn)             — submit handler
//   buttonLabel   (string)         — button text, default "Next"
//   footerText    (string)         — text before the link
//   footerLinkText(string)         — link label
//   footerLinkTo  (string)         — href for the footer link
//   roleOptions   (array)          — custom role options passed to RoleSelector
type SignUpFormProps = {
  fullName: string;
  setFullName: (_next: string) => void;
  department: string;
  setDepartment: (_next: string) => void;
  role: string | null;
  setRole: (_next: string) => void;
  onNext: () => void | Promise<void>;
  buttonLabel?: string;
  footerText?: string;
  footerLinkText?: string;
  footerLinkTo?: string;
  roleOptions?: { value: string; label: string }[];
  fullNameError?: string;
  departmentError?: string;
  roleError?: string;
};

export default function SignUpForm({
  fullName,
  setFullName,
  department,
  setDepartment,
  role,
  setRole,
  onNext,
  buttonLabel = "Next",
  footerText = "Already have an account?",
  footerLinkText = "Login",
  footerLinkTo = "/login",
  roleOptions,
  fullNameError,
  departmentError,
  roleError,
}: SignUpFormProps) {
  return (
    <>
      {/* Form: 373×204 */}
      <form
        className="flex flex-col w-93.25 gap-3"
        onSubmit={e => { e.preventDefault(); onNext(); }}
      >
        <InputField
          id="fullName"
          label="Full Name"
          placeholder="Enter your name"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          icon={CircleUserRound}
          error={fullNameError}
        />
        <InputField
          id="department"
          label="Department"
          placeholder="Enter your department"
          value={department}
          onChange={e => setDepartment(e.target.value)}
          icon={Building2}
          error={departmentError}
        />
        <span className="text-red-600 text-xs h-3.5">{roleError}</span>
        <RoleSelector
          role={role}
          onSelect={setRole}
          options={roleOptions}
        />
      </form>

      {/* Submit button: 373×42, outside form */}
      <Button 
        onNext={onNext}
        buttonLabel={buttonLabel}

      />
      <Footer 
        footerText={footerText}
        footerLinkText={footerLinkText}
        footerLinkTo={footerLinkTo}
      />
      {/* Footer link: 373×16 */}
      
    </>
  );
}