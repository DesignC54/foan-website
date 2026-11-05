import type { Metadata } from "next";
import { Outfit, Manrope } from "next/font/google";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { ThemeScript } from "@/components/site/theme-toggle";
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
  description:
    "A media, technology and data holding company headquartered in Abuja, Nigeria.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: ThemeScript may set data-theme before React loads.
    <html
      lang="en"
      className={`${outfit.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteNav />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
