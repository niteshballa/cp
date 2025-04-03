"use client"

import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { NavItem, NavGroup, Sidebar, SidebarContent } from "@/components/ui/sidebar"
import { MobileNav } from "@/components/ui/mobile-nav"
import {
  RocketIcon,
  HomeIcon,
  PackageIcon,
  DollarSignIcon,
  ArrowLeftRightIcon,
  BuildingIcon,
  ShieldCheckIcon,
  CodeIcon,
  LifeBuoyIcon,
  CreditCardIcon,
  RefreshCwIcon,
  AlertTriangleIcon,
  ReceiptIcon,
  BanknoteIcon as BankIcon,
  StoreIcon,
  FileTextIcon,
  UsersIcon,
  UserIcon,
  ShieldIcon,
  WebhookIcon,
  HelpCircleIcon,
  TicketIcon,
} from "lucide-react"
import { useMemo } from "react"

export function MainNav() {
  const pathname = usePathname()

  // Memoize the NavContent to prevent unnecessary re-renders
  const navContent = useMemo(() => <NavContent pathname={pathname} />, [pathname])

  return (
    <>
      <MobileNav>{navContent}</MobileNav>
      <div className="hidden md:block">
        <Sidebar className="w-[240px] border-r">
          <SidebarContent>{navContent}</SidebarContent>
        </Sidebar>
      </div>
    </>
  )
}

function NavContent({ pathname }: { pathname?: string }) {
  const isActive = (path: string) => pathname === path
  const isActiveParent = (path: string) => pathname?.startsWith(path)

  return (
    <ul className="space-y-1">
      {siteConfig.navigation.showGetStarted && (
        <NavItem
          href="/get-started"
          icon={<RocketIcon className="h-4 w-4" />}
          label="Get Started"
          isActive={isActive("/get-started")}
          hasIndicator
        />
      )}

      <NavItem href="/home" icon={<HomeIcon className="h-4 w-4" />} label="Home" isActive={isActive("/home")} />

      {siteConfig.navigation.showProducts && (
        <NavItem
          href="/products"
          icon={<PackageIcon className="h-4 w-4" />}
          label="Products"
          isActive={isActive("/products")}
        />
      )}

      {siteConfig.navigation.showSales && (
        <NavGroup
          href="/sales"
          icon={<DollarSignIcon className="h-4 w-4" />}
          label="Sales"
          isActive={isActiveParent("/sales")}
        >
          <NavItem
            href="/sales/overview"
            icon={<ReceiptIcon className="h-4 w-4" />}
            label="Overview"
            isActive={isActive("/sales/overview")}
          />
          <NavItem
            href="/sales/reports"
            icon={<FileTextIcon className="h-4 w-4" />}
            label="Reports"
            isActive={isActive("/sales/reports")}
          />
        </NavGroup>
      )}

      {siteConfig.navigation.showTransactions && (
        <NavGroup
          href="/transactions"
          icon={<ArrowLeftRightIcon className="h-4 w-4" />}
          label="Transactions"
          isActive={isActiveParent("/transactions")}
        >
          <NavItem
            href="/transactions/payments"
            icon={<CreditCardIcon className="h-4 w-4" />}
            label="Payments"
            isActive={isActive("/transactions/payments")}
            hasIndicator
          />
          <NavItem
            href="/transactions/refund"
            icon={<RefreshCwIcon className="h-4 w-4" />}
            label="Refund"
            isActive={isActive("/transactions/refund")}
          />
          <NavItem
            href="/transactions/disputes"
            icon={<AlertTriangleIcon className="h-4 w-4" />}
            label="Disputes"
            isActive={isActive("/transactions/disputes")}
          />
        </NavGroup>
      )}

      {siteConfig.navigation.showBusiness && (
        <NavGroup
          href="/business"
          icon={<BuildingIcon className="h-4 w-4" />}
          label="Business"
          isActive={isActiveParent("/business")}
        >
          <NavItem
            href="/business/account-summary"
            icon={<ReceiptIcon className="h-4 w-4" />}
            label="Account Summary"
            isActive={isActive("/business/account-summary")}
          />
          <NavItem
            href="/business/payouts"
            icon={<BankIcon className="h-4 w-4" />}
            label="Payouts"
            isActive={isActive("/business/payouts")}
          />
          <NavItem
            href="/business/store-front"
            icon={<StoreIcon className="h-4 w-4" />}
            label="Store Front"
            isActive={isActive("/business/store-front")}
          />
          <NavItem
            href="/business/reports"
            icon={<FileTextIcon className="h-4 w-4" />}
            label="Reports"
            isActive={isActive("/business/reports")}
          />
          <NavItem
            href="/business/team"
            icon={<UsersIcon className="h-4 w-4" />}
            label="Team"
            isActive={isActive("/business/team")}
          />
          <NavItem
            href="/business/profile"
            icon={<UserIcon className="h-4 w-4" />}
            label="Business Profile"
            isActive={isActive("/business/profile")}
          />
        </NavGroup>
      )}

      {siteConfig.navigation.showVerification && (
        <NavGroup
          href="/verification"
          icon={<ShieldCheckIcon className="h-4 w-4" />}
          label="Verification"
          isActive={isActiveParent("/verification")}
        >
          <NavItem
            href="/verification/kyc"
            icon={<ShieldIcon className="h-4 w-4" />}
            label="KYC"
            isActive={isActive("/verification/kyc")}
          />
          <NavItem
            href="/verification/documents"
            icon={<FileTextIcon className="h-4 w-4" />}
            label="Documents"
            isActive={isActive("/verification/documents")}
          />
        </NavGroup>
      )}

      {siteConfig.navigation.showDeveloper && (
        <NavGroup
          href="/developer"
          icon={<CodeIcon className="h-4 w-4" />}
          label="Developer"
          isActive={isActiveParent("/developer")}
        >
          <NavItem
            href="/developer/api"
            icon={<CodeIcon className="h-4 w-4" />}
            label="API"
            isActive={isActive("/developer/api")}
          />
          <NavItem
            href="/developer/webhooks"
            icon={<WebhookIcon className="h-4 w-4" />}
            label="Webhooks"
            isActive={isActive("/developer/webhooks")}
          />
        </NavGroup>
      )}

      {siteConfig.navigation.showSupport && (
        <NavGroup
          href="/support"
          icon={<LifeBuoyIcon className="h-4 w-4" />}
          label="Support"
          isActive={isActiveParent("/support")}
        >
          <NavItem
            href="/support/help"
            icon={<HelpCircleIcon className="h-4 w-4" />}
            label="Help Center"
            isActive={isActive("/support/help")}
          />
          <NavItem
            href="/support/tickets"
            icon={<TicketIcon className="h-4 w-4" />}
            label="Support Tickets"
            isActive={isActive("/support/tickets")}
          />
        </NavGroup>
      )}
    </ul>
  )
}

