import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AudioManager from "../context/AudioManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bye Keys Experience",
  description: "Showcase R3F Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Zain:wght@200;300;400;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <AudioManager>{children}</AudioManager>
      </body>
    </html>
  );
}
