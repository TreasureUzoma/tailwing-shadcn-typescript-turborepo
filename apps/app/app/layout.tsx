import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Space_Grotesk } from "next/font/google";
import "@workspace/ui/globals.css";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eversub - Home",
  description: "Pay bills and subcriptons cheaper and faster with Eversub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={`${jakarta.variable} ${geistMono.variable} ${grotesk.variable} antialiased font-sans`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
