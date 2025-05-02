import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from '../components/Header';
import "./globals.css";
import { UserProvider } from "../context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio ESGI",
  description: "A portfolio for ESGI projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserProvider>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        {children}
      </body>
      </UserProvider>
      
    </html>
  );
}
