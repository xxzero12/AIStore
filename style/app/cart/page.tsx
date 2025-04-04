"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import RelatedProducts from "@/components/related-products"
import SiteLayout from "@/components/site-layout"

// Mock cart data - in a real app, this would come from a state management solution
const initialCartItems = [
  {
    id: 1,
    name: "Minecraft",
    price: 29.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Forza Horizon 5",
    price: 59.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Microsoft 365",
    price: 69.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleApplyPromo = () => {
    if (!promoCode) return

    setIsApplyingPromo(true)
    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false)
      setPromoApplied(true)
    }, 1000)
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0 // 10% discount if promo applied
  const tax = (subtotal - discount) * 0.08 // 8% tax
  const total = subtotal - discount + tax

  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-lg border bg-card">
                <div className="p-4 md:p-6">
                  <div className="mb-4 hidden md:grid md:grid-cols-12 md:gap-4 md:text-sm md:font-medium">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div key={item.id} className="py-4 md:grid md:grid-cols-12 md:gap-4 md:py-6">
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              <Link href={`/product/${item.id}`} className="hover:text-primary">
                                {item.name}
                              </Link>
                            </h3>
                            <div className="mt-1 flex items-center md:hidden">
                              <span className="text-sm font-medium">${item.price.toFixed(2)}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <X className="mr-1 h-3 w-3" />
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className="col-span-2 hidden items-center justify-center md:flex">
                          <span className="font-medium">${item.price.toFixed(2)}</span>
                        </div>

                        <div className="col-span-2 mt-2 flex items-center justify-between md:mt-0 md:justify-center">
                          <div className="flex items-center md:hidden">
                            <span className="mr-2 text-sm font-medium">Quantity:</span>
                          </div>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                        </div>

                        <div className="col-span-2 mt-2 flex items-center justify-between md:mt-0 md:justify-end">
                          <div className="flex items-center md:hidden">
                            <span className="mr-2 text-sm font-medium">Total:</span>
                          </div>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="mb-4 text-lg font-medium">You might also like</h2>
                <RelatedProducts category="games" currentProductId={0} />
              </div>
            </div>

            <div>
              <div className="sticky top-20 rounded-lg border bg-card">
                <div className="p-4 md:p-6">
                  <h2 className="mb-4 text-lg font-medium">Order Summary</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Estimated Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyPromo}
                        disabled={!promoCode || promoApplied || isApplyingPromo}
                      >
                        {isApplyingPromo ? "Applying..." : promoApplied ? "Applied" : "Apply"}
                      </Button>
                    </div>

                    {promoApplied && (
                      <div className="rounded-md bg-green-50 p-2 text-center text-sm text-green-600">
                        Promo code applied successfully!
                      </div>
                    )}

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Proceed to Checkout</Button>

                    <div className="text-center text-xs text-muted-foreground">
                      By proceeding, you agree to our{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border bg-card py-12">
            <div className="mb-4 rounded-full bg-muted p-3">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-medium">Your cart is empty</h2>
            <p className="mb-6 text-center text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}

