import type { Metadata } from "next";
import "./globals.css"; // <--- THIS IS THE MAGIC LINE

export const metadata: Metadata = {
  title: "CDEC Knowledge Base",
  description: "Internal Support System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}