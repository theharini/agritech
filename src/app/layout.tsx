import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/theme/ThemeContext";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "AgriTech — Empowering Agriculture Through Technology",
  description:
    "Production-grade bilingual agriculture platform connecting Farmers, Buyers, Equipment Suppliers, Grocery Sellers, Agronomists, and Finance Providers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-theme-bg text-theme-text transition-colors duration-200 antialiased selection:bg-theme-primary selection:text-theme-bg">
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
