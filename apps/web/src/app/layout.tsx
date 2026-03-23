import type { Metadata } from "next";
import NavWrapper from "@/components/nav-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forum",
  description: "Discussion forum app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavWrapper />
        {children}
      </body>
    </html>
  );
}
