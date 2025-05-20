import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { GuestSessionProvider } from "@/providers/GuestSessionContext";

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
      <body className={`antialiased`}>
        <GuestSessionProvider>
          <Header />
         {children}
        </GuestSessionProvider>
      </body>
    </html>
  );
}
