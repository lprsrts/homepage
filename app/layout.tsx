import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alper Saritas",
  description: "Personal website - Blog, Projects, and More",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}
