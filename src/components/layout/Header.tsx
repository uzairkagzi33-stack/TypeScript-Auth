
import ApexLogo from "../icons/ApexLogo";

// Header: 1352×40
export default function Header() {
  return (
    <header className="w-full h-10 flex items-center px-8  bottom-1px gap-16 mt-8">
      <div className="w-10 h-10 shrink-0">
        <ApexLogo />
      </div>
      {/* Right filler — 1296×14 spacer */}
      <div className="flex-1" />
    </header>
  );
}