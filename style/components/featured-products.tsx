import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturedProducts() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-800 to-green-900 px-6 py-10 md:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl">Xbox Game Pass Ultimate</h2>
            <p className="text-white/80 md:text-lg">
              Get your first month for $1. Play hundreds of high-quality games with friends on console, PC, phones and
              tablets.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button size="lg" asChild className="bg-white text-green-800 hover:bg-white/90">
                <Link href="/xbox-game-pass/join">Join now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/20">
                <Link href="/xbox-game-pass">Learn more</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <Image
              src="/placeholder.svg?height=300&width=500"
              width={500}
              height={300}
              alt="Xbox Game Pass Ultimate"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-green-700/30 blur-3xl" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Link href="/product/office-365" className="block">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=200&width=400" alt="Microsoft 365" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">Microsoft 365</h3>
                <p className="text-sm text-muted-foreground">
                  Premium Office apps, extra cloud storage, advanced security
                </p>
                <p className="mt-2 font-medium">From $6.99/month</p>
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Link href="/product/surface-pro" className="block">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=200&width=400" alt="Surface Pro 9" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">Surface Pro 9</h3>
                <p className="text-sm text-muted-foreground">
                  The tablet flexibility you want and the laptop performance you need
                </p>
                <p className="mt-2 font-medium">From $999.99</p>
              </div>
            </Link>
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <Link href="/product/windows-11" className="block">
              <div className="relative h-48">
                <Image src="/placeholder.svg?height=200&width=400" alt="Windows 11" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold">Windows 11</h3>
                <p className="text-sm text-muted-foreground">The Windows that brings you closer to what you love</p>
                <p className="mt-2 font-medium">Free upgrade for eligible PCs</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

