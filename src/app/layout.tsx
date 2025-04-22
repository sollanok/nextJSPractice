import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Movies App",
  description: "Movies app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}>
          <Header />
          {children}</body>
    </html>
  );
}
