import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { Cursor } from "@/components/motion/Cursor";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

/* Type system: Space Grotesk (display) · Inter Tight (text) · JetBrains Mono (technical) */
const display = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});
const sans = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});
const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#0a0b0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SH Truck Bodies — Wholesale Truck Body Manufacturer | Honey Brook, PA",
    template: "%s | SH Truck Bodies",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Flags JS early so reveal styles only hide content when JS will reveal it */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Technical column grid behind everything */}
        <div aria-hidden className="site-columns">
          <div className="container-site">
            <span />
            <span />
            <span />
            <span />
            <span className="hidden lg:block" />
            <span className="hidden lg:block" />
          </div>
        </div>

        <Header />
        <main id="main" tabIndex={-1} className="relative z-[1]">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />

        <SmoothScroll />
        <RevealObserver />
        <Cursor />
        <div aria-hidden className="grain" />
        <noscript>
          <style>{`[data-reveal],[data-split] .split-inner{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
