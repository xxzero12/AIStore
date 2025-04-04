"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { User, CreditCard, Settings, Package, Heart, History, Download, Bell, LogOut } from "lucide-react"
import SiteLayout from "@/components/site-layout"

// Mock user data - in a real app, this would come from an API
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=100",
  initials: "JD",
  memberSince: "January 2020",
  purchases: [
    {
      id: 1,
      name: "Minecraft",
      date: "2023-10-15",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=60",
    },
    {
      id: 2,
      name: "Microsoft 365",
      date: "2023-09-01",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=60",
    },
    {
      id: 3,
      name: "Forza Horizon 5",
      date: "2023-08-12",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=60",
    },
  ],
  wishlist: [
    {
      id: 4,
      name: "Halo Infinite",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=60",
    },
    {
      id: 5,
      name: "Surface Pro 9",
      price: 999.99,
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=60",
    },
  ],
  paymentMethods: [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "04/25",
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "5555",
      expiry: "08/24",
    },
  ],
}

export default function ProfilePage() {
  const [user] = useState(userData)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      // In a real app, you would update the user data
    }, 1000)
  }

  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="md:w-1/4">
            <div className="sticky top-20 space-y-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">Member since {user.memberSince}</p>
                </div>
              </div>

              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/profile/purchases">
                    <Package className="mr-2 h-4 w-4" />
                    Purchases
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/profile/wishlist">
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/profile/payment">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/profile/history">
                    <History className="mr-2 h-4 w-4" />
                    Browse History
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/profile/downloads">
                    <Download className="mr-2 h-4 w-4" />
                    Downloads
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/profile/notifications">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/profile/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full justify-start border-b bg-transparent p-0">
                <TabsTrigger
                  value="account"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Account
                </TabsTrigger>
                <TabsTrigger
                  value="purchases"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Purchases
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Wishlist
                </TabsTrigger>
                <TabsTrigger
                  value="payment"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Payment
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="pt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Manage your account details</CardDescription>
                      </div>
                      {!isEditing && (
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <form onSubmit={handleSaveProfile} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="submit" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save Changes"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsEditing(false)
                              setName(user.name)
                              setEmail(user.email)
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Name</p>
                            <p className="text-sm text-muted-foreground">{user.name}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Member Since</p>
                            <p className="text-sm text-muted-foreground">{user.memberSince}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 px-6 py-4">
                    <p className="text-xs text-muted-foreground">
                      Your personal information is protected by our{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="purchases" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Purchase History</CardTitle>
                    <CardDescription>View your recent purchases</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.purchases.length > 0 ? (
                      <div className="space-y-4">
                        {user.purchases.map((purchase) => (
                          <div key={purchase.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={purchase.image || "/placeholder.svg"}
                                alt={purchase.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{purchase.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Purchased on {new Date(purchase.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">${purchase.price}</p>
                              <Button variant="link" size="sm" className="h-auto p-0">
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">No purchases yet</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wishlist" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Wishlist</CardTitle>
                    <CardDescription>Products you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.wishlist.length > 0 ? (
                      <div className="space-y-4">
                        {user.wishlist.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-md">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">${item.price}</p>
                            </div>
                            <div>
                              <Button size="sm">Add to Cart</Button>
                              <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">Your wishlist is empty</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payment" className="pt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment options</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {user.paymentMethods.length > 0 ? (
                      <div className="space-y-4">
                        {user.paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-4">
                              <div className="rounded-md bg-muted p-2">
                                <CreditCard className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {method.type} •••• {method.last4}
                                </p>
                                <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground">No payment methods added</p>
                    )}
                    <div className="mt-6">
                      <Button>Add Payment Method</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SiteLayout>
  )
}

