import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DotGothic16 } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dotGothic16 = DotGothic16({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "FeedLogic™ Internship Program",
  description: "Help FeedLogic AI learn and grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dotGothic16.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
