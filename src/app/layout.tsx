import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bicycle Program Waiver | Hope's Corner",
  description: "Hope's Corner, Inc. Bicycle Program Waiver and Release from Liability - Sharing meals, building community",
  keywords: ["bicycle", "waiver", "Hope's Corner", "community", "bike program"],
  authors: [{ name: "Hope's Corner, Inc." }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Bicycle Program Waiver | Hope's Corner",
    description: "Sign the waiver for Hope's Corner Bicycle Program",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
