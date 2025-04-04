"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SiteFooter() {
  const pathname = usePathname()

  // Don't show footer on auth pages
  if (pathname.startsWith("/auth/")) {
    return null
  }

  return (
    <footer className="border-t bg-muted/40">
      {/* Main footer content with links */}
      <div className="container grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Microsoft Store</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/profile" className="text-sm text-muted-foreground hover:text-primary">
                Account profile
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Download Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Returns
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Order tracking
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Education</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Microsoft in education
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Office for students
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Office 365 for schools
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Deals for students & parents
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Business</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Microsoft Cloud
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Microsoft Security
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Azure
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Dynamics 365
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Developers & IT</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Developer Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Microsoft Learn
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Microsoft Tech Community
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom footer with copyright and links */}
      <div className="border-t border-muted">
        <div className="container flex flex-col items-center justify-between px-4 py-6 md:flex-row">
          <p className="mb-4 text-center text-sm text-muted-foreground md:mb-0 md:text-left">
            &copy; {new Date().getFullYear()} Microsoft. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Use
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Trademarks
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

