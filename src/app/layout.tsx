import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { Roboto } from "next/font/google";
import UserProvider from "@/context/UserContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Smart Money Manager",
  description:
    "Track your income and expenses, grow your savings, and manage debts easily all in one place.",
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
          <Toaster richColors position="top-right" />
        </UserProvider>
      </body>
    </html>
  );
}
