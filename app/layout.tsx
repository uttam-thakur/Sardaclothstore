import type { Metadata } from "next";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PasswordProvider } from "./component/PasswordProvider";
import LogoutButton from "./component/LogoutButton";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://sardaclothstore.netlify.app"
  ),

  title: "Sarda Cloth Store",
  description: "Professional Billing Software",

  openGraph: {
    title: "Sarda Cloth Store",
    description:
      "Professional Billing Software for Sarda Cloth Store",

    url: "https://sardaclothstore.netlify.app",

    siteName: "Sarda Cloth Store",

    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Sarda Cloth Store",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sarda Cloth Store",
    description:
      "Professional Billing Software for Sarda Cloth Store",
    images: ["/logo.jpg"],
  },
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
          <LogoutButton />
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