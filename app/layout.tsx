import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Email Alias",
    default: "Email Alias",
  },
  description: "Email Aliasing Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen w-full bg-gradient-to-br from-purple-200 to-yellow-100 font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
