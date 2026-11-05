import type { Metadata } from "next";
import { Outfit, Manrope } from "next/font/google";
import "./globals.css";

// next/font downloads these at build time and serves them from our own domain.
// `variable` exposes each font as a CSS variable that globals.css maps to
// --font-display (Outfit: headings/body) and --font-ui (Manrope: labels).
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FOAN Group",
    template: "%s | FOAN Group",
  },
  description: "FOAN Group",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
