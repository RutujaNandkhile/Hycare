import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export const metadata: Metadata = {
  title: "HyCare Industries | Precision CNC, Welding & Spring Manufacturing",
  description:
    "HyCare Industries provides high-precision CNC & VMC machining, spot welding electrodes, spring manufacturing and fabrication services in Pune, India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}