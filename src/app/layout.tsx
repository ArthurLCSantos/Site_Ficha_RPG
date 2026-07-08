import type { Metadata } from "next";
import { Geist, Geist_Mono, Protest_Riot } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const protestRiot = Protest_Riot({
  variable: "--font-protest",
  subsets: ["latin"],
  weight: "400"
})


export const metadata: Metadata = {
  title: " Ficha RPG",
  description: "Ficha para RPG de Gachiakuta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${protestRiot.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
