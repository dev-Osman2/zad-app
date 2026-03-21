import type { Metadata, Viewport } from "next";
import { Amiri, Noto_Sans_Arabic, Aref_Ruqaa } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SidebarProvider } from "@/providers/SidebarProvider";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-aref-ruqaa",
  display: "swap",
});

const notoSans = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172B" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "زاد",
  description:
    "منصة زاد التعليمية: رفيقك الأمثل في شهر رمضان المبارك لتدبر القرآن الكريم، ودراسة المتون المشروحة، والاستماع لأفضل البودكاست الإسلامي بوعي وبناء.",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
    apple: "/icon-192.png",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "زاد",
  },
  verification: {
    google: "EK88A_02hP3bsgTaEERUyy_hKzASQFGRz2Df3h5L_wE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("zad_theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${notoSans.variable} ${amiri.variable} ${arefRuqaa.variable}  font-sans antialiased `}
      >
        <ThemeProvider>
          <SidebarProvider>
            <Header />

            <main className="min-h-screen">{children}</main>

            <Footer />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
