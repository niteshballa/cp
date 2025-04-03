// Environment configuration with type safety
type EnvConfig = {
  isDirect: any
  companyName: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  sidebarColor: string
  topbarColor: string
  companyLogo: string
  companyFavicon: string
}

export function getEnvConfig(): EnvConfig {
  return {
    isDirect: process.env.NEXT_PUBLIC_IS_DIRECT || true,
    companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "BNPLX",
    primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#10b981",
    secondaryColor: process.env.NEXT_PUBLIC_SECONDARY_COLOR || "#6366f1",
    backgroundColor: process.env.NEXT_PUBLIC_BACKGROUND_COLOR || "#ffffff",
    sidebarColor: process.env.NEXT_PUBLIC_SIDEBAR_COLOR || "#1a1a1a",
    topbarColor: process.env.NEXT_PUBLIC_TOPBAR_COLOR || "#ffffff",
    companyLogo: process.env.NEXT_PUBLIC_COMPANY_LOGO || "/logo.svg",
    companyFavicon: process.env.NEXT_PUBLIC_COMPANY_FAVICON || "/favicon.ico",
  }
}

