"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { verifyOtp } from "@/services/AuthService";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import OtpInput from "./OtpInput";

const OTP_LENGTH = 6;
const RESEND_TIME = 60;

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_TIME);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const isExpired = timer === 0;
  const isComplete = otp.every((d) => d !== "");

  useEffect(() => {
    if (!email) {
      toast.error("Invalid verification request");
      router.push("/login");
    }
  }, [email, router]);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (isComplete && !isSubmitting) {
      handleSubmit();
    }
  }, [isComplete]);

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== OTP_LENGTH || !email) return;

    try {
      setIsSubmitting(true);

      const res = await verifyOtp({
        email,
        code: otpValue,
        type: "VERIFY_EMAIL",
      });

      if (res?.success) {
        toast.success(res?.message || "OTP verified successfully");
        router.push("/");
      } else {
        throw new Error(res?.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Invalid OTP");
      setOtp(Array(OTP_LENGTH).fill(""));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendOtp = async () => {
    if (!email) return;

    try {
      setIsResending(true);

      // call resend api

      setOtp(Array(OTP_LENGTH).fill(""));
      setTimer(RESEND_TIME);

      toast.success("OTP resent to your email");
    } catch {
      toast.error("Failed to resend OTP");
    } finally {
      setIsResending(false);
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
          <OtpInput
            value={otp}
            onChange={setOtp}
            length={OTP_LENGTH}
            disabled={isSubmitting || isExpired}
          />

          {isExpired && (
            <p className="text-red-500 text-sm text-center">
              OTP expired. Please request a new one.
            </p>
          )}

          <div className="text-center text-sm">
            {timer > 0 ? (
              <p className="text-gray-500">
                Resend OTP in <span className="font-semibold">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={resendOtp}
                disabled={isResending}
                className="text-primary font-medium hover:underline disabled:opacity-50"
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
