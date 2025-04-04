import type React from "react"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import NavigationBar from "@/components/navigation-bar"

interface SiteLayoutProps {
  children: React.ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <NavigationBar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

