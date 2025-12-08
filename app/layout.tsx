import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SVG Converter - Free Online Vector to Raster Image Tool",
  description: "Convert SVG files to PNG, JPEG, or TIFF instantly in your browser. High-resolution DPI support, transparent backgrounds, and secure client-side processing.",
  metadataBase: new URL("https://svg-convert.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SVG Converter - Free Online Vector to Raster Image Tool",
    description: "Convert SVG files to PNG, JPEG, or TIFF instantly in your browser. High-resolution DPI support, transparent backgrounds, and secure client-side processing.",
    url: "/",
    siteName: "SVG Converter",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SVG Converter - Free Online Vector to Raster Image Tool",
    description: "Convert SVG files to PNG, JPEG, or TIFF instantly in your browser. High-resolution DPI support, transparent backgrounds, and secure client-side processing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
