import React, { useState } from "react";
import ForgetPasswordComponent from "./Forget";
import VerifyOtpComponent from "./VerifyOtp";
import ResetPasswordComponent from "./Reset";
import { adminStore } from "../../../store/AdminStore";

const ForgetLayout: React.FC = () => {
  // State to handle the current step
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState<string>("");
  const [otpToken, setOtpToken] = useState<string>("");

  // This function handles moving to the next step and storing necessary data
  const handleEmailSubmit = async (enteredEmail: string) => {
    const otpToken = await adminStore.sendOtp(enteredEmail); // Request OTP from the backend
    if (otpToken) {
      setEmail(enteredEmail); // Store the email
      setOtpToken(otpToken); // Store the OTP token for future verification
      setStep("otp"); // Move to the OTP verification step
    }
  };

  const handleOtpSubmit = async (enteredOtp: string) => {
    const isVerified = await adminStore.verifyOtp(otpToken, enteredOtp); // Verify OTP
    if (isVerified) {
      setStep("reset"); // Move to the password reset step
    }
  };

  const handlePasswordReset = async (newPassword: string) => {
    const isResetSuccessful = await adminStore.resetPassword(
      otpToken,
      newPassword,
    ); // Reset password
    if (isResetSuccessful) {
      // You can redirect to the login page after password reset
      adminStore.changePage("/admin/auth");
    }
  };

  return (
    <div className="w-full">
      {step === "email" && (
        <ForgetPasswordComponent onSubmit={handleEmailSubmit} />
      )}
      {step === "otp" && <VerifyOtpComponent onSubmit={handleOtpSubmit} />}
      {step === "reset" && (
        <ResetPasswordComponent onSubmit={handlePasswordReset} />
      )}
    </div>
  );
};

export default ForgetLayout;
