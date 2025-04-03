import { redirect } from "next/navigation"

/**
 * Safely redirects to the specified path
 * This is a wrapper around Next.js redirect function that handles errors gracefully
 */
export function safeRedirect(path: string): void {
  try {
    redirect(path)
  } catch (error) {
    // If we're on the client side, use client-side navigation
    if (typeof window !== "undefined") {
      window.location.href = path
    }

    // If we're on the server side, the redirect will be handled by Next.js
    // and this catch block will never execute
  }
}

