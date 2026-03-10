"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Auto submit if all boxes filled
  useEffect(() => {
    if (otp.join("").length === 6) {
      handleSubmit();
    }
  }, [otp]);

  // Handle OTP change
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    // move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, 6);
    const newOtp = pasteData.split("");
    while (newOtp.length < 6) newOtp.push("");
    setOtp(newOtp);

    // focus last filled box
    const lastIndex = newOtp.findIndex((v) => v === "");
    if (lastIndex !== -1) {
      inputsRef.current[lastIndex]?.focus();
    } else {
      inputsRef.current[5]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // Submit OTP
  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6 || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = { email, otp: otpValue };
      console.log("VERIFY OTP DATA", payload);

      /**
       * API call example:
       * await fetch("/api/verify-otp", { method: "POST", body: JSON.stringify(payload) })
       */

      toast.success("Email verified successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    try {
      console.log("RESEND OTP", email);

      /**
       * Resend OTP API call
       */

      toast.success("OTP resent to your email");
      setTimer(60);
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-full max-w-lg shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="flex flex-col items-center space-y-2 p-6">
          <Image
            src="/logo.png"
            width={68}
            height={68}
            alt="Smart Money Manager Logo"
          />

          <h2 className="text-2xl font-bold text-gray-800">
            Verify Your Email
          </h2>

          <p className="text-gray-500 text-sm text-center">
            Enter the OTP sent to {email}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* OTP BOX */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  if (el) inputsRef.current[index] = el;
                }}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center border rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              />
            ))}
          </div>

          {/* VERIFY BUTTON */}
          {/* <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button> */}

          {/* RESEND */}
          <div className="text-center text-sm">
            {timer > 0 ? (
              <p className="text-gray-500">
                Resend OTP in <span className="font-semibold">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={resendOtp}
                className="text-primary font-medium hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtpForm;
