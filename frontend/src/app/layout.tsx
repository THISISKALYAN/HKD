import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import Script from "next/script";

import { CmsProvider } from "@/components/CmsContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import NextTopLoader from 'nextjs-toploader';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


const SocialFloatWidget = dynamic(() => import("@/components/SocialFloatWidget"), { ssr: false });
const FloatingReelsWidget = dynamic(() => import("@/components/FloatingReelsWidget"), { ssr: false });
const AiChatbotWidget = dynamic(() => import("@/components/AiChatbotWidget"), { ssr: false });

export const metadata: Metadata = {
  title: "Hare Krishna Dharma Trust - Gau Seva & Annadana Seva",
  description: "Offer Gau Seva, Annadana Seva, and Prasadam online at Sri Radha Krishna Dham, Vrindavan. Fast secure donations with automated 80G receipts and WhatsApp updates.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://127.0.0.1:3000'),
  openGraph: {
    title: "Hare Krishna Dharma Trust - Gau Seva & Annadana Seva",
    description: "Support cow protection and food feeding in the holy land of Mathura Vrindavan. Secure tax exemption 80G receipts generated instantly.",
    images: [{ url: '/og-image.webp' }]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://hkmdehradun.org" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream-50 antialiased overflow-x-clip max-w-[100vw] w-full">
        <NextTopLoader
          color="#d4af37"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #d4af37,0 0 5px #d4af37"
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <CmsProvider>
          {/* Header Navigation */}
          <Navbar />
          
          {/* Page Contents */}
          <main className="pt-0 min-h-screen bg-cream/20">
            {children}
          </main>
          
          {/* Bottom Footer */}
          <Footer />

          {/* Floated Support Overlays */}
          <Script
            id="chatling-config"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.chtlConfig = { chatbotId: "2451993731" };`,
            }}
          />
          <Script
            id="chtl-script"
            src="https://chatling.ai/js/embed.js"
            data-id="2451993731"
            strategy="afterInteractive"
          />

          <SocialFloatWidget />
          <FloatingReelsWidget />
          <AiChatbotWidget />
        </CmsProvider>
        </ThemeProvider>
      </body>

    </html>
  );
}
