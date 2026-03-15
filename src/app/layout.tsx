import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { Noto_Sans_Bengali } from "next/font/google";
import { Roboto } from "next/font/google";
import UserProvider from "@/context/UserContext";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "স্মার্ট মানি ম্যানেজার",
  description: "তোমার টাকা-পয়সার হিসাব রাখো সহজে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <UserProvider>
          {children}
          <Toaster richColors position="top-center" />
        </UserProvider>
      </body>
    </html>
  );
}
