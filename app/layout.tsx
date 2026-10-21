import type { Metadata } from "next";
import { Inter, VT323 } from "next/font/google";
import "./globals.css";

// Pixel font for headings, nav and accents.
const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

// Readable sans for body text.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ivan Chiu · Software Engineer",
  description:
    "Ivan Chiu is a Boston College CS graduate and software engineer who ships real products to real users, across the full stack and into AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vt323.variable} ${inter.variable}`}>
      <body className="bg-ink font-sans text-washi antialiased">
        {children}
      </body>
    </html>
  );
}
