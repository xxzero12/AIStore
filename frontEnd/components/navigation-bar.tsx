"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronLeft, Home, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Define main navigation sections
const mainNavItems = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/category/games" },
  { name: "Apps", href: "/category/apps" },
  { name: "Movies & TV", href: "/category/movies" },
  { name: "Music", href: "/category/music" },
  { name: "Books", href: "/category/books" },
  { name: "Devices", href: "/category/devices" },
  { name: "Xbox Game Pass", href: "/xbox-game-pass" },
  { name: "Deals", href: "/category/deals" },
]

export default function NavigationBar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; href: string }[]>([])
  const [showNavigationBar, setShowNavigationBar] = useState(true)

  // Don't show navigation bar on auth pages or home page
  useEffect(() => {
    if (pathname.startsWith("/auth/") || pathname === "/") {
      setShowNavigationBar(false)
    } else {
      setShowNavigationBar(true)
    }
  }, [pathname])

  // Generate breadcrumbs based on current path
  useEffect(() => {
    const generateBreadcrumbs = () => {
      const paths = pathname.split("/").filter(Boolean)
      const crumbs = [{ name: "Home", href: "/" }]

      let currentPath = ""
      paths.forEach((path) => {
        currentPath += `/${path}`

        // Format the name (capitalize, replace hyphens with spaces)
        let name = path.replace(/-/g, " ")
        name = name.charAt(0).toUpperCase() + name.slice(1)

        // Special case for Xbox Game Pass
        if (path === "xbox-game-pass") {
          name = "Xbox Game Pass"
        }

        crumbs.push({ name, href: currentPath })
      })

      setBreadcrumbs(crumbs)
    }

    generateBreadcrumbs()
  }, [pathname])

  if (!showNavigationBar) {
    return null
  }

  return (
    <div className="sticky top-0 z-50 border-b bg-background">
      <div className="container flex h-10 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.back()} aria-label="Go back">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Breadcrumbs for larger screens */}
          <div className="hidden items-center text-sm md:flex">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <ChevronLeft className="mx-1 h-3 w-3 rotate-180 text-muted-foreground" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="text-muted-foreground hover:text-foreground">
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Current page name for mobile */}
          <div className="md:hidden">
            {breadcrumbs.length > 0 && <span className="font-medium">{breadcrumbs[breadcrumbs.length - 1].name}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild aria-label="Home">
            <Link href="/">
              <Home className="h-4 w-4" />
            </Link>
          </Button>

          <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Navigation menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="mt-6 flex flex-col gap-4">
                <h2 className="text-lg font-medium">Navigation</h2>
                <nav className="flex flex-col gap-2">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`rounded-md px-3 py-2 text-sm hover:bg-muted ${
                        pathname === item.href ? "bg-muted font-medium" : ""
                      }`}
                      onClick={() => setIsNavOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}

