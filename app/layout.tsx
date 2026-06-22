import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "./i18n/context";

export const metadata: Metadata = {
  title: "Primaroas | Precision Engineering",
  description: "Industrial-grade digital systems, local AI, and strategic optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
