import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import SignUpCard from "../components/signup/SignUpCard";
import OtpInput from "../components/signup/OtpInput";
import VerifyEmailLogo from "../components/icons/VerifyEmailLogo";
import { Back, Button, Footer } from "../components/signup/SignUpForm";
import { useAuthStore } from "../store/authStore";
//error  done
function VerifyOTPpage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const email = useAuthStore((state) => state.recoveryEmail);
  const clearRecoveryEmail = useAuthStore((state) => state.clearRecoveryEmail);
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (otp.length < 4) {
      // alert("Please enter full 4-digit OTP");
      setError("Please enter full 4-digit OTP");
      return;
    }
    // console.log("OTP submitted:", otp);
    // TODO: Verify OTP with backend
    // alert("OTP verified! Redirecting...");
    clearRecoveryEmail();
    navigate({ to: "/login" });
  };
  return (
    <SignUpCard
      title="Email verification Code"
      subtitle={
        // Show the actual email from context right in the subtitle
        <>
          We sent a 4-digit code to{" "}
          <span className="font-medium text-gray-900">{email}</span>
        </>
      }
      icon={<VerifyEmailLogo />}
      showDivider
      styles={"min-h-118.5 w-[473px]"}
    >
      {/* <div>Error goes here</div> */}

      <OtpInput
        value={otp}
        onChange={(nextOtp) => {
          setOtp(nextOtp);
          if (error) {
            setError("");
          }
        }}
        error={error}
      />

      <Button onNext={handleVerify} buttonLabel="Submit code" />
      <div className="h-13">
        {/* <button
        onClick={handleVerify}
        className="rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        style={{ width: 373, minHeight: 42, fontSize: 15 }}
      >

        Submit Code
      </button> */}

        <Footer footerText={"Experiencing issues receiving the code?"} />

        <Back
          footerText="Resend"
          footerLinkTo="/forget-password"
          align="center"
          backArrow="false"
        />
      </div>
    </SignUpCard>
  );
}

export default VerifyOTPpage;
