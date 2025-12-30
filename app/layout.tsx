import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const generalSans = localFont({
  src: [
    {
      path: "../public/fonts/GeneralSans-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-ExtralightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
});

export const metadata: Metadata = {
  title: "Road to 100k",
  description:
    "A tool to help you track your progress towards $100,000 in benefits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${generalSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
