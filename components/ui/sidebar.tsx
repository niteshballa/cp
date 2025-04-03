"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  return (
    <div className={cn("h-full flex flex-col bg-sidebar text-sidebar-foreground", className)} {...props}>
      {children}
    </div>
  )
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

export function SidebarHeader({ className, children, ...props }: SidebarHeaderProps) {
  return (
    <div className={cn("h-14 flex items-center border-b border-sidebar-border px-4", className)} {...props}>
      {children}
    </div>
  )
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

export function SidebarContent({ className, children, ...props }: SidebarContentProps) {
  return (
    <div className={cn("flex-1 overflow-auto py-2", className)} {...props}>
      {children}
    </div>
  )
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

export function SidebarFooter({ className, children, ...props }: SidebarFooterProps) {
  return (
    <div className={cn("h-14 flex items-center border-t border-sidebar-border px-4", className)} {...props}>
      {children}
    </div>
  )
}

const navItemVariants = cva(
  "flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium transition-colors relative",
  {
    variants: {
      variant: {
        default: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active:
          "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
  icon?: React.ReactNode
  label: string
  isActive?: boolean
  hasIndicator?: boolean
  className?: string
}

export function NavItem({ href, icon, label, isActive, hasIndicator, className, ...props }: NavItemProps) {
  return (
    <li className="px-2">
      <Link
        href={href}
        className={cn(navItemVariants({ variant: isActive ? "active" : "default" }), className)}
        {...props}
      >
        {icon}
        <span className="flex-1">{label}</span>
        {hasIndicator && <span className="h-2 w-2 rounded-full bg-primary" />}
      </Link>
    </li>
  )
}

interface NavGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string
  icon?: React.ReactNode
  label: string
  isActive?: boolean
  children?: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

export function NavGroup({
  href,
  icon,
  label,
  isActive,
  children,
  defaultOpen = false,
  className,
  ...props
}: NavGroupProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen || isActive)

  return (
    <div className={cn("px-2", className)} {...props}>
      {href ? (
        <Link
          href={href}
          className={cn(navItemVariants({ variant: isActive ? "active" : "default" }), "justify-between")}
          onClick={(e) => {
            if (children) {
              e.preventDefault()
              setIsOpen(!isOpen)
            }
          }}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="flex-1 text-base">{label}</span>
          </div>
          {children && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
        </Link>
      ) : (
        <button
          type="button"
          className={cn(navItemVariants({ variant: isActive ? "active" : "default" }), "w-full justify-between")}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="flex-1 text-base">{label}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
      {isOpen && children && <ul className="mt-1 space-y-1 pl-9">{children}</ul>}
    </div>
  )
}

