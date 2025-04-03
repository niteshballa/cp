import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { fontSans } from "@/lib/fonts"
import { AppLayout } from "@/components/layout/app-layout"
import Script from "next/script"
import { getEnvConfig } from "@/lib/env-config"
import { ErrorBoundary } from "@/components/error-boundary"

const envConfig = getEnvConfig()

export const metadata: Metadata = {
  title: envConfig.companyName,
  description: `${envConfig.companyName} - Payment Dashboard`,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  icons: envConfig.companyFavicon ? [{ url: envConfig.companyFavicon }] : undefined,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={fontSans.variable}>
        {/* Script to set theme before page renders to prevent flash */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {
                  console.error('Error setting theme:', e);
                }
              })();
            `,
          }}
        />
        <ErrorBoundary>
          <AppLayout>{children}</AppLayout>
        </ErrorBoundary>
      </body>
    </html>
  )
}