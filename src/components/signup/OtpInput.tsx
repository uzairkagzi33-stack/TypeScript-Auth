import { useRef, type ChangeEvent, type ClipboardEvent, type KeyboardEvent } from "react";

type OtpInputProps = {
  value?: string;
  onChange?: (_next: string) => void;
  length?: number;
  error?: string;
};

// ── OtpInput ──────────────────────────────────────────────────────────────────
// Props:
//   value      (string)   — 4-char controlled string e.g. "4709"
//   onChange   (fn)       — called with full 4-digit string on every change
//   length     (number)   — number of boxes, default 4
export default function OtpInput({ value = "", onChange, length = 4, error }: OtpInputProps) {
  const hasError = !!error;
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  // Split string into array of individual chars
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  const update = (arr: string[]) => onChange?.(arr.join(""));

  const handleInput = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const digit = e.target.value.replace(/[^0-9]/g, "").slice(-1);
    const next  = [...digits];
    next[idx]   = digit;
    update(next);
    if (digit && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace") {
      if (!digits[idx] && idx > 0) {
        const next = [...digits];
        next[idx - 1] = "";
        update(next);
        refs.current[idx - 1]?.focus();
      } else {
        const next = [...digits];
        next[idx] = "";
        update(next);
      }
    }
    if (e.key === "ArrowLeft"  && idx > 0)          refs.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
    const next  = Array.from({ length }, (_, i) => text[i] || "");
    update(next);
    refs.current[Math.min(text.length, length - 1)]?.focus();
  };

  return (
    // Wrapper: 376×64, gap 10px
    <div className="flex gap-1" style={{ width: 376 }}>
      {/* {hasError && (
        <span className="text-red-600 text-xs" style={{fontSize:12, height:14}}>
          {error}
        </span> */}
      {/* )} */}
    {/* <label className="block text-red-600 text-xs mt-1 mb-2" style={{fontSize:12, height:14}}>
      {error}
    </label> */}
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => {
            refs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          value={digit}
        //   id= {Math.random}
        id={`otp-${idx}`}
          onChange={e => {
            handleInput(e, idx);
          }}
          onKeyDown={e => handleKey(e, idx)}
          onPaste={handlePaste}


          className={`border rounded-[10px] w-[86.5px] h-16 text-2xl font-medium leading-8 text-center text-gray-900 bg-white outline-none transition-all
          ${hasError
            ? "border-red-600 ring-2 ring-red-600/20 "
            : "border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"}`}
        style={{
        borderColor: hasError ? "#dc2626" : "#3182ce",  // red-600 : blue
        }}
        />
      ))}
    </div>
  );
}