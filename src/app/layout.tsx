import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "SOLID Project — Administrative Performance Dashboard",
    template: "%s · SOLID Dashboard",
  },
  description:
    "Digital administrative command centre for the SOLID Project, Adamawa State Project Coordinating Unit — attendance, registry, contracts, procurement, assets and management reporting in one place.",
  keywords: [
    "SOLID Project",
    "Adamawa State PCU",
    "administrative dashboard",
    "World Bank project management",
  ],
  authors: [{ name: "Adamawa State PCU" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6fafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('solid-theme');
    var theme = stored || 'light';
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
