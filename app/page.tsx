import { redirect } from "next/navigation"

export default function HomePage() {
  // Always redirect to home page
  redirect("/home")

  // This will never be rendered
  return null
}

