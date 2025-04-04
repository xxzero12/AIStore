"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import SearchAutocomplete from "@/components/search-autocomplete"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ApiStatus from "@/components/api-status"

export default function SiteHeader() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Don't show header on auth pages
  if (pathname.startsWith("/auth/")) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="mr-2 md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
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
                  className="h-6 w-6 text-primary"
                >
                  <rect width="10" height="10" x="2" y="2" rx="2" />
                  <rect width="10" height="10" x="12" y="2" rx="2" />
                  <rect width="10" height="10" x="2" y="12" rx="2" />
                  <rect width="10" height="10" x="12" y="12" rx="2" />
                </svg>
                <span className="text-xl font-semibold">Microsoft Store</span>
              </Link>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/category/games"
                  className="text-lg font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Games
                </Link>
                <Link
                  href="/category/apps"
                  className="text-lg font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Apps
                </Link>
                <Link
                  href="/category/movies"
                  className="text-lg font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Movies & TV
                </Link>
                <Link
                  href="/category/devices"
                  className="text-lg font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Devices
                </Link>
                <Link
                  href="/category/deals"
                  className="text-lg font-medium hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Deals
                </Link>
                <Link
                  href="/xbox-game-pass"
                  className="text-lg font-medium text-green-600 hover:text-green-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Xbox Game Pass
                </Link>
              </nav>
              <div className="mt-auto space-y-4">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    Sign in
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    Create account
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2">
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
            className="h-6 w-6 text-primary"
          >
            <rect width="10" height="10" x="2" y="2" rx="2" />
            <rect width="10" height="10" x="12" y="2" rx="2" />
            <rect width="10" height="10" x="2" y="12" rx="2" />
            <rect width="10" height="10" x="12" y="12" rx="2" />
          </svg>
          <span className="text-xl font-semibold">Microsoft Store</span>
        </Link>

        <nav className="mx-6 hidden items-center gap-6 md:flex">
          <Link href="/category/games" className="text-sm font-medium hover:text-primary">
            Games
          </Link>
          <Link href="/category/apps" className="text-sm font-medium hover:text-primary">
            Apps
          </Link>
          <Link href="/category/movies" className="text-sm font-medium hover:text-primary">
            Movies & TV
          </Link>
          <Link href="/category/devices" className="text-sm font-medium hover:text-primary">
            Devices
          </Link>
          <Link href="/category/deals" className="text-sm font-medium hover:text-primary">
            Deals
          </Link>
          <Link href="/xbox-game-pass" className="text-sm font-medium text-green-600 hover:text-green-700">
            Xbox Game Pass
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4 md:gap-6">
          <div className="hidden md:block">
            <SearchAutocomplete />
          </div>
          <div className="hidden md:block">
            <ApiStatus />
          </div>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              3
            </span>
            <span className="sr-only">Cart</span>
          </Link>
          <Link href="/profile">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Link>
          <Button variant="outline" size="sm" asChild className="hidden md:inline-flex">
            <Link href="/auth/login">Sign in</Link>
          </Button>
        </div>
      </div>
      <div className="border-t py-2 md:hidden">
        <div className="container px-4">
          <SearchAutocomplete />
        </div>
      </div>
    </header>
  )
}

