import type { Metadata } from "next";
import { Inter, Ubuntu_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ubuntuMono = Ubuntu_Mono({
  variable: "--font-ubuntu-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  fallback: ["Monaco", "Menlo", "Consolas", "monospace"],
});

export const metadata: Metadata = {
  title: "SonarQube Cloud",
  description: "Code Review Platform",
  icons: {
    icon: [
      { url: '/Sonar%20Qube%20Cloud.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/Sonar%20Qube%20Cloud.svg',
    apple: '/Sonar%20Qube%20Cloud.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
