"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { BellIcon, MenuIcon, UserIcon, SettingsIcon, LogOutIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TopBarProps {
  onMenuClick?: () => void
  isDarkMode: boolean
  pageTitle?: string
  pageDescription?: string
  isMenuOpen?: boolean
}

export function TopBar({
  onMenuClick,
  isDarkMode,
  pageTitle = "Dashboard",
  pageDescription = "Overview of your account and recent activity",
  isMenuOpen
}: TopBarProps) {
  return (
    <div className="flex items-center justify-between h-20 px-4 bg-background">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-3">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="flex flex-col">
          <h1 className="text-2xl md:text-2xl font-semibold tracking-tight leading-none">{pageTitle}</h1>
          <p className="text-sm text-muted-foreground mt-1">{pageDescription}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>
        <ProfileDropdown isDarkMode={isDarkMode} />
      </div>
    </div>
  )
}

function ProfileDropdown({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600">AJ</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={cn(isDarkMode ? "bg-background border-[#2a2a2a] rounded-xl overflow-hidden" : "bg-background rounded-xl overflow-hidden")}
        sideOffset={8}
        alignOffset={0}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-lg focus:bg-accent focus:text-accent-foreground">
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-lg focus:bg-accent focus:text-accent-foreground">
          <SettingsIcon className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-lg focus:bg-accent focus:text-accent-foreground">
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}