import type { Metadata } from "next";
import "./globals.css";

import {
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  PasswordProvider,
} from "./component/PasswordProvider";

export const metadata: Metadata = {
  title: "Sarda Cloth Store",
  description:
    "Billing Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className="min-h-screen">

        <PasswordProvider>
          {children}
        </PasswordProvider>

        <ToastContainer
          position="top-right"
          autoClose={2000}
        />

      </body>
    </html>
  );
}