import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: {
    default: "lprsrts",
    template: "%s | lprsrts"
  },
  description: "Study notes on physics, mathematics, and philosophical meditations.",
  keywords: ["physics", "quantum mechanics", "uncertainty principle", "mathematics", "Gaussian distribution", "electromagnetic theory", "Helmholtz equation", "Maxwell's equations", "mathematical physics", "philosophy"],
  authors: [{ name: "Alper Saritas" }],
  creator: "Alper Saritas",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lprsrts.com",
    siteName: "lprsrts",
    title: "lprsrts",
    description: "Study notes on physics, mathematics, and philosophical meditations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when you register with search engines
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
