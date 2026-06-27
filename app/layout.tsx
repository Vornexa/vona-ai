import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Vona AI",
  description:
    "AI-powered assistant by Vornexa. Experience intelligent, fast, and context-aware conversations.",
  icons: {
    icon: "/favicon.ico",
  },
};

const themeBootstrap = `(function(){try{var raw=localStorage.getItem("vona-settings-v1");var pref=null;if(raw){try{var p=JSON.parse(raw);var ap=p&&p.appearance;if(ap&&(ap.theme==="light"||ap.theme==="dark")){pref=ap.theme;}}catch(e){}}if(!pref){var legacy=localStorage.getItem("vona-theme");if(legacy==="light"||legacy==="dark"){pref=legacy;}}var theme;if(pref){theme=pref;}else{var m=window.matchMedia("(prefers-color-scheme: dark)");theme=m.matches?"dark":"light";}document.documentElement.setAttribute("data-theme",theme);if(raw){try{var ap=JSON.parse(raw).appearance;if(ap){document.documentElement.dataset.fontSize=ap.fontSize||"medium";document.documentElement.dataset.chatStyle=ap.chatStyle||"rounded";document.documentElement.dataset.codeTheme=ap.codeTheme||"default";document.documentElement.dataset.sendBehavior=ap.sendBehavior||"enter";}}catch(e){}}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
