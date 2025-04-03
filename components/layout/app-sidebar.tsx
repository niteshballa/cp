"use client"

import React from "react"

import { useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeIcon,
  BarChart3Icon,
  ArrowLeftRightIcon,
  BuildingIcon,
  UsersIcon,
  CreditCardIcon,
  FileTextIcon,
  SettingsIcon,
  ChevronRightIcon,
  WalletIcon,
  CircleDollarSignIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  CodeIcon,
  KeyIcon,
  GitBranchIcon,
  LinkIcon,
  RocketIcon,
  ShoppingBagIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getEnvConfig } from "@/lib/env-config"

interface AppSidebarProps {
  collapsed?: boolean
  isMobile?: boolean
  isOpen?: boolean
  onToggle?: () => void
  onClose?: () => void
  isDarkMode: boolean
}

type NavItemType = {
  href: string
  ico: LucideIcon
  label: string
  badge?: string
}

type NavGroupType = {
  title: string
  icon: LucideIcon
  items: NavItemType[]
}

export function AppSidebar({
  collapsed = false,
  isMobile = false,
  isOpen = false,
  onToggle,
  onClose,
  isDarkMode,
}: AppSidebarProps) {
  const pathname = usePathname()
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    transactions: pathname?.startsWith("/transactions") || false,
    business: pathname?.startsWith("/business") || false,
    settings: pathname?.startsWith("/settings") || false,
    developers: pathname?.startsWith("/developers") || false,
    connectors: pathname?.startsWith("/connectors") || false,
  })
  const [testMode, setTestMode] = useState(true)
  const envConfig = getEnvConfig()

  // Toggle group expansion - memoized to prevent unnecessary re-renders
  const toggleGroup = useCallback((title: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }, [])

  // Toggle test mode - memoized to prevent unnecessary re-renders
  const toggleTestMode = useCallback(() => {
    setTestMode((prev) => !prev)
  }, [])

  // Memoize navigation items to prevent unnecessary re-renders
  // New order: Get Started -> Home -> Products -> (Wallet commented out)
  const mainNavItems: NavItemType[] = useMemo(() => {
    const items = [
      {
        href: "/get-started",
        ico: RocketIcon,
        label: "Get Started"
      },
      {
        href: "/home",
        ico: HomeIcon,
        label: "Home",
      },
      {
        href: "/products",
        ico: ShoppingBagIcon,
        label: "Products"
      },
      {
        href: "/wallet",
        ico: WalletIcon,
        label: "Wallet",
      },
    ]

    return items
  }, [])

  // Navigation groups - memoized with the new order
  const navGroups: NavGroupType[] = useMemo(() => {
    const groups = [
      {
        title: "Transactions",
        icon: ArrowLeftRightIcon,
        items: [
          {
            href: "/transactions/payments",
            ico: CreditCardIcon,
            label: "Payments",
          },
          {
            href: "/transactions/refund",
            ico: CircleDollarSignIcon,
            label: "Refunds",
          },
          // {
          //   href: "/transactions/disputes",
          //   icon: FileTextIcon,
          //   label: "Disputes",
          //   badge: "3",
          // },
        ],
      },
      {
        title: "Connectors",
        icon: LinkIcon,
        items: [
          {
            href: "/connectors",
            ico: LinkIcon,
            label: "Payment Processors",
          },
        ],
      },
    ]

    // Add Workflow section if is_direct is true
    if (envConfig.isDirect) {
      groups.push({
        title: "Workflow",
        icon: GitBranchIcon,
        items: [
          {
            href: "/workflow/routing",
            ico: GitBranchIcon,
            label: "Routing Rules",
          },
        ],
      })
    }

    // Always add Business section
    /* The above code is adding a new group to an array called `groups`. This group is related to the
    "Business" category and contains two items: "Payouts" and "Reports". Each item has a `href` property
    for the link, an `ico` property for the icon, and a `label` property for the text label. The icons
    used for the items are `CircleDollarSignIcon` and `BarChart3Icon` respectively. */
    // groups.push({
    //   title: "Business",
    //   icon: BuildingIcon,
    //   items: [
    //     {
    //       href: "/business/payouts",
    //       ico: CircleDollarSignIcon,
    //       label: "Payouts",
    //     },
    //     {
    //       href: "/business/reports",
    //       ico: BarChart3Icon,
    //       label: "Reports",
    //     },
    //   ],
    // })

    // Add Developers and Settings sections
    groups.push(
      {
        title: "Developers",
        icon: CodeIcon,
        items: [
          {
            href: "/developers/api-keys",
            ico: KeyIcon,
            label: "API Keys",
          },
        ],
      },
      {
        title: "Settings",
        icon: SettingsIcon,
        items: [
          {
            href: "/settings/business-details",
            ico: BuildingIcon,
            label: "Business Details",
          },
          {
            href: "/settings/business-profiles",
            ico: UsersIcon,
            label: "Business Profiles",
          },
          {
            href: "/settings/users",
            ico: UsersIcon,
            label: "Users",
          },
          {
            href: "/settings/brand",
            ico: FileTextIcon,
            label: "Brand",
          },
        ],
      },
    )

    return groups
  }, [envConfig.isDirect])

  // Check if a route is active - memoized
  const isActive = useCallback(
    (href: string) => {
      return pathname === href
    },
    [pathname],
  )

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r",
        isDarkMode
          ? "bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] text-white border-[#2a2a2a]"
          : "bg-white text-gray-800 border-gray-200",
        isMobile ? "w-full" : collapsed ? "w-[70px]" : "w-64",
      )}
    >
      {/* Sidebar header - now centered and aligned with menu items */}
      <div
        className={cn(
          "flex h-16 items-center border-b",
          isDarkMode ? "border-[#2a2a2a]" : "border-gray-200",
          collapsed ? "justify-center px-2" : "px-3",
        )}
      >
        <div
          className={cn("flex items-center gap-3 overflow-hidden", !isMobile && !collapsed && "cursor-pointer")}
          onClick={!isMobile && !collapsed ? onToggle : undefined}
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
            <span className="text-black font-bold text-sm">{envConfig.companyName.charAt(0)}</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className={cn("font-semibold truncate", isDarkMode ? "text-white" : "text-gray-900")}>
                {envConfig.companyName}
              </span>
              <span className={cn("text-xs truncate", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                Powered by "GreenBanana logo"
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar content - scrollable */}
      <ScrollArea className="flex-1">
        <div className={cn("py-3", collapsed ? "px-2" : "px-3")}>
          <nav className="space-y-1">
            {/* Main navigation items */}
            {mainNavItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.ico}
                label={item.label}
                badge={item.badge}
                isActive={isActive(item.href)}
                collapsed={collapsed}
                onClick={isMobile ? onClose : undefined}
                isDarkMode={isDarkMode}
              />
            ))}

            {/* Navigation groups */}
            {navGroups.map((group) => (
              <div key={group.title}>
                {!collapsed ? (
                  <>
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium mt-1",
                        isDarkMode
                          ? "text-gray-300 hover:text-white hover:bg-[#2a2a2a]"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <group.icon className="h-5 w-5" />
                        <span>{group.title}</span>
                      </div>
                      <ChevronRightIcon
                        className={cn("h-4 w-4 transition-transform", expandedGroups[group.title] ? "rotate-90" : "")}
                      />
                    </button>
                    {expandedGroups[group.title] && (
                      <div
                        className={cn(
                          "ml-2 pl-4 border-l space-y-1 mt-1",
                          isDarkMode ? "border-[#2a2a2a]" : "border-gray-200",
                        )}
                      >
                        {group.items.map((item) => (
                          <NavItem
                            key={item.href}
                            href={item.href}
                            icon={item.ico}
                            label={item.label}
                            badge={item.badge}
                            isActive={isActive(item.href)}
                            collapsed={collapsed}
                            isSubItem
                            onClick={isMobile ? onClose : undefined}
                            isDarkMode={isDarkMode}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="relative group mt-1">
                    <button
                      className={cn(
                        "flex items-center justify-center w-full p-2 rounded-md transition-colors",
                        pathname?.startsWith(`/${group.title.toLowerCase()}`)
                          ? isDarkMode
                            ? "bg-[#2a2a2a] text-white"
                            : "bg-gray-100 text-gray-900 font-medium"
                          : isDarkMode
                            ? "text-gray-300 hover:text-white hover:bg-[#2a2a2a]"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                      )}
                    >
                      <group.icon className="h-5 w-5" />
                    </button>
                    <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
                      <div
                        className={cn(
                          "rounded-md shadow-lg py-2 w-48 border",
                          isDarkMode ? "bg-[#1a1a1a] border-[#2a2a2a]" : "bg-white border-gray-200",
                        )}
                      >
                        <div
                          className={cn(
                            "px-3 py-1 text-xs font-medium",
                            isDarkMode ? "text-gray-400" : "text-gray-500",
                          )}
                        >
                          {group.title}
                        </div>
                        <div className="mt-1 space-y-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 text-sm",
                                isActive(item.href)
                                  ? isDarkMode
                                    ? "text-white bg-[#2a2a2a]"
                                    : "text-gray-900 bg-gray-100"
                                  : isDarkMode
                                    ? "text-gray-300 hover:bg-[#2a2a2a]"
                                    : "text-gray-700 hover:bg-gray-100",
                              )}
                              onClick={isMobile ? onClose : undefined}
                            >
                              <item.ico className="h-4 w-4" />
                              <span>{item.label}</span>
                              {item.badge && (
                                <Badge
                                  variant="outline"
                                  className={cn("ml-auto text-xs", isDarkMode ? "bg-[#2a2a2a]" : "bg-gray-100")}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </ScrollArea>

      {/* Sidebar footer */}
      <div className={cn("border-t p-3", isDarkMode ? "border-[#2a2a2a]" : "border-gray-200")}>
        <div className="flex items-center gap-3">
          <Avatar className={cn("h-9 w-9 border-2", isDarkMode ? "border-[#2a2a2a]" : "border-gray-200")}>
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600">A</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="overflow-hidden">
              <p
                className={cn("text-sm font-medium leading-none truncate", isDarkMode ? "text-white" : "text-gray-900")}
              >
                Alice Johnson
              </p>
              <p className={cn("text-xs truncate", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                alice@example.com
              </p>
            </div>
          )}
        </div>

        {/* Mode toggle */}
        <div className={cn("mt-3", collapsed ? "px-0" : "")}>
          {!collapsed ? (
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => setTestMode(true)}
                className={cn(
                  "w-full",
                  testMode
                    ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
                    : isDarkMode
                      ? "bg-transparent border border-[#2a2a2a] text-gray-400 hover:bg-[#2a2a2a]"
                      : "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
                )}
              >
                <AlertCircleIcon className="h-4 w-4 mr-1" />
                Test
              </Button>
              <Button
                onClick={() => setTestMode(false)}
                className={cn(
                  "w-full",
                  !testMode
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
                    : isDarkMode
                      ? "bg-transparent border border-[#2a2a2a] text-gray-400 hover:bg-[#2a2a2a]"
                      : "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
                )}
              >
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                Live
              </Button>
            </div>
          ) : (
            <Button
              onClick={toggleTestMode}
              className={cn(
                "w-full flex justify-center items-center",
                testMode
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0"
                  : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0",
              )}
            >
              {testMode ? <AlertCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Memoize NavItem to prevent unnecessary re-renders
const NavItem = React.memo(function NavItem({
  href,
  icon: Icon,
  label,
  badge,
  isActive,
  collapsed,
  isSubItem,
  onClick,
  isDarkMode,
}: {
  href: string
  icon: LucideIcon
  label: string
  badge?: string
  isActive?: boolean
  collapsed?: boolean
  isSubItem?: boolean
  onClick?: () => void
  isDarkMode: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors mt-1",
        isActive
          ? isDarkMode
            ? "bg-[#2a2a2a] text-white font-medium"
            : "bg-gray-100 text-gray-900 font-medium"
          : isDarkMode
            ? "text-gray-300 hover:text-white hover:bg-[#2a2a2a]"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100",
        collapsed ? "justify-center px-2" : "",
        isSubItem && !collapsed ? "py-1.5" : "",
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />

      {!collapsed && (
        <>
          <span className="truncate flex-1">{label}</span>
          {badge && (
            <Badge variant="outline" className={cn("ml-auto text-xs", isDarkMode ? "bg-[#2a2a2a]" : "bg-gray-100")}>
              {badge}
            </Badge>
          )}
        </>
      )}

      {collapsed && badge && (
        <div className="absolute top-0 right-0 -mt-1 -mr-1">
          <Badge className="h-4 w-4 p-0 flex items-center justify-center rounded-full text-[10px] bg-emerald-500 text-white">
            {badge}
          </Badge>
        </div>
      )}
    </Link>
  )
})