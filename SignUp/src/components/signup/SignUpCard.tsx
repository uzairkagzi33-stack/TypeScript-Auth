import CustomIcon from "../icons/CustomIcon";
import type { ReactNode } from "react";

type CardHeaderProps = {
  icon?: ReactNode;
  title: string;
  subtitle: ReactNode;
};

type SignUpCardProps = {
  title?: string;
  subtitle?: ReactNode;
  icon?: ReactNode;
  showDivider?: boolean;
  styles?: string;
  children: ReactNode;
};

// ── Content Divider ───────────────────────────────────────────────────────────
function ContentDivider() {
  return (
    <div className="w-93.25 h-0">
      <hr className="border-t border-gray-200 m-0" />
    </div>
  );
}

// ── Card Header ───────────────────────────────────────────────────────────────
function CardHeader({ icon, title, subtitle }: CardHeaderProps) {
  return (
    <div className="flex flex-col items-center w-93.25 gap-2">
      <div className='w-22 h-22'
      >
        {icon ?? <CustomIcon />}
      </div>
      <div
        className="flex flex-col items-center text-center w-93.25 h-15"
      >
        <h1
          className="font-semibold text-gray-900 w-93.25 h-8 text-2xl leading-8"
        >
          {title}
        </h1>
        <p
          className="text-gray-500 w-93.25 h-6 text-sm leading-6"
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// ── SignUpCard ────────────────────────────────────────────────────────────────
// Props:
//   title       (string)    — card heading
//   subtitle    (string)    — card subheading
//   icon        (ReactNode) — optional icon, defaults to <CustomIcon />
//   showDivider (bool)      — show HR divider, default true
//   width       (number)    — card width px, default 437
//   minHeight   (number)    — card min-height px, default 578
//   children    (ReactNode) — card body content
export default function SignUpCard({
  title       = "Create a new account",
  subtitle    = "Enter your details to Sign up.",
  icon,
  showDivider = true,
  // width       = 437,
  // minHeight   = 600,
  styles,
  children,
}: SignUpCardProps) {
  return (
    <div
      className={`relative z-10 bg-white w-109.25  rounded-3xl p-8 gap-6 shadow-md flex flex-col items-center ${styles ?? ""}`}
    >
      <CardHeader icon={icon} title={title} subtitle={subtitle} />
      {showDivider && <ContentDivider />}
      {children}
    </div>
  );
}