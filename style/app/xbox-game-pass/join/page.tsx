"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Check, CreditCard, Calendar, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SiteLayout from "@/components/site-layout"

const plans = {
  pc: {
    name: "PC Game Pass",
    price: 9.99,
    firstMonthPrice: 1,
    features: [
      "Access to 100+ high-quality PC games",
      "New games added all the time",
      "Xbox Game Studios titles the same day as release",
      "Member discounts and deals",
      "EA Play membership included",
    ],
  },
  console: {
    name: "Console Game Pass",
    price: 10.99,
    firstMonthPrice: 1,
    features: [
      "Access to 100+ high-quality console games",
      "New games added all the time",
      "Xbox Game Studios titles the same day as release",
      "Member discounts and deals",
    ],
  },
  ultimate: {
    name: "Game Pass Ultimate",
    price: 16.99,
    firstMonthPrice: 1,
    features: [
      "Access to 100+ high-quality console and PC games",
      "Play across devices with cloud gaming",
      "New games added all the time",
      "Xbox Game Studios titles the same day as release",
      "Member discounts and deals",
      "Xbox Live Gold included",
      "EA Play membership included",
    ],
  },
}

export default function JoinGamePassPage() {
  const searchParams = useSearchParams()
  const initialPlan = searchParams.get("plan") || "ultimate"
  const [selectedPlan, setSelectedPlan] = useState(initialPlan as keyof typeof plans)
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [promoApplied, setPromoApplied] = useState(true) // First month $1 promo
  const [step, setStep] = useState(1)

  // Form state
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (initialPlan in plans) {
      setSelectedPlan(initialPlan as keyof typeof plans)
    }
  }, [initialPlan])

  const handlePlanChange = (plan: keyof typeof plans) => {
    setSelectedPlan(plan)
  }

  const handleContinue = () => {
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setStep(3)
      window.scrollTo(0, 0)
    }, 2000)
  }

  const calculateTotal = () => {
    const plan = plans[selectedPlan]
    if (promoApplied) {
      return billingCycle === "monthly" ? plan.firstMonthPrice : plan.firstMonthPrice * 3
    }
    return billingCycle === "monthly" ? plan.price : plan.price * 3
  }

  return (
    <SiteLayout>
      <div className="container min-h-screen px-4 py-8 md:px-6 md:py-12">
        {step === 1 && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold md:text-4xl">Join Xbox Game Pass</h1>
              <p className="mt-2 text-muted-foreground">
                Choose your plan and start playing hundreds of high-quality games.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="rounded-lg border">
                  <div className="p-6">
                    <h2 className="mb-4 text-xl font-bold">Select Your Plan</h2>

                    <RadioGroup
                      value={selectedPlan}
                      onValueChange={(value) => handlePlanChange(value as keyof typeof plans)}
                      className="space-y-4"
                    >
                      {Object.entries(plans).map(([key, plan]) => (
                        <div
                          key={key}
                          className={`relative rounded-lg border p-4 transition-all hover:border-primary ${
                            selectedPlan === key ? "border-primary bg-primary/5" : ""
                          }`}
                        >
                          <RadioGroupItem value={key} id={`plan-${key}`} className="absolute right-4 top-4" />
                          <div className="pr-8">
                            <Label htmlFor={`plan-${key}`} className="text-lg font-medium hover:cursor-pointer">
                              {plan.name}
                            </Label>
                            <div className="mt-1 flex items-baseline gap-2">
                              <span className="text-2xl font-bold">
                                ${promoApplied ? plan.firstMonthPrice : plan.price}
                              </span>
                              <span className="text-muted-foreground">
                                {promoApplied ? "first month, then " : ""}${plan.price}/month
                              </span>
                            </div>
                            <ul className="mt-4 space-y-2">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                                  <span className="text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>

                    <div className="mt-6">
                      <h3 className="mb-3 text-lg font-medium">Billing Cycle</h3>
                      <RadioGroup
                        value={billingCycle}
                        onValueChange={setBillingCycle}
                        className="flex flex-col gap-3 sm:flex-row"
                      >
                        <div
                          className={`flex-1 rounded-lg border p-4 transition-all hover:border-primary ${
                            billingCycle === "monthly" ? "border-primary bg-primary/5" : ""
                          }`}
                        >
                          <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
                          <Label htmlFor="monthly" className="flex cursor-pointer flex-col">
                            <span className="font-medium">Monthly</span>
                            <span className="text-sm text-muted-foreground">
                              Billed monthly at $
                              {promoApplied ? plans[selectedPlan].firstMonthPrice : plans[selectedPlan].price}
                            </span>
                          </Label>
                        </div>
                        <div
                          className={`flex-1 rounded-lg border p-4 transition-all hover:border-primary ${
                            billingCycle === "quarterly" ? "border-primary bg-primary/5" : ""
                          }`}
                        >
                          <RadioGroupItem value="quarterly" id="quarterly" className="sr-only" />
                          <Label htmlFor="quarterly" className="flex cursor-pointer flex-col">
                            <span className="font-medium">Quarterly</span>
                            <span className="text-sm text-muted-foreground">
                              Billed every 3 months at $
                              {(promoApplied ? plans[selectedPlan].firstMonthPrice : plans[selectedPlan].price) * 3}
                            </span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="sticky top-20 rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>{plans[selectedPlan].name}</span>
                        <span>${plans[selectedPlan].price}/month</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Billing cycle</span>
                        <span>{billingCycle === "monthly" ? "Monthly" : "Quarterly"}</span>
                      </div>

                      {promoApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>First month discount</span>
                          <span>-${(plans[selectedPlan].price - plans[selectedPlan].firstMonthPrice).toFixed(2)}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between font-bold">
                        <span>Total due today</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {promoApplied ? (
                          <p>
                            You'll be charged ${calculateTotal().toFixed(2)} today. After your first{" "}
                            {billingCycle === "monthly" ? "month" : "3 months"}, you'll be charged $
                            {billingCycle === "monthly" ? plans[selectedPlan].price : plans[selectedPlan].price * 3}
                            per {billingCycle === "monthly" ? "month" : "3 months"} unless you cancel.
                          </p>
                        ) : (
                          <p>
                            You'll be charged ${calculateTotal().toFixed(2)} today and every{" "}
                            {billingCycle === "monthly" ? "month" : "3 months"}
                            unless you cancel.
                          </p>
                        )}
                      </div>
                    </div>

                    <Button className="mt-6 w-full bg-green-500 text-white hover:bg-green-600" onClick={handleContinue}>
                      Continue
                    </Button>

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Shield className="h-4 w-4" />
                      <span>Secure checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold md:text-4xl">Payment Information</h1>
              <p className="mt-2 text-muted-foreground">Complete your subscription to {plans[selectedPlan].name}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="rounded-lg border">
                  <div className="p-6">
                    <h2 className="mb-4 text-xl font-bold">Account Information</h2>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                      </div>
                    </div>

                    <Separator className="my-6" />

                    <h2 className="mb-4 text-xl font-bold">Payment Method</h2>

                    <Tabs defaultValue="card" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="card">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>
                      <TabsContent value="card" className="mt-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="cardNumber"
                              className="pl-10"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="expiryDate"
                                className="pl-10"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal" className="mt-4">
                        <div className="rounded-lg border border-dashed p-6 text-center">
                          <p className="mb-4 text-muted-foreground">
                            You will be redirected to PayPal to complete your payment.
                          </p>
                          <Image
                            src="/placeholder.svg?height=40&width=150"
                            alt="PayPal"
                            width={150}
                            height={40}
                            className="mx-auto"
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Your payment information is encrypted and secure.
                      </span>
                    </div>
                  </div>
                  <div className="border-t bg-muted/50 p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-green-500 text-white hover:bg-green-600"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Complete Subscription"}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>

              <div>
                <div className="sticky top-20 rounded-lg border bg-card">
                  <div className="p-6">
                    <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>{plans[selectedPlan].name}</span>
                        <span>${plans[selectedPlan].price}/month</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Billing cycle</span>
                        <span>{billingCycle === "monthly" ? "Monthly" : "Quarterly"}</span>
                      </div>

                      {promoApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>First month discount</span>
                          <span>-${(plans[selectedPlan].price - plans[selectedPlan].firstMonthPrice).toFixed(2)}</span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between font-bold">
                        <span>Total due today</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {promoApplied ? (
                          <p>
                            You'll be charged ${calculateTotal().toFixed(2)} today. After your first{" "}
                            {billingCycle === "monthly" ? "month" : "3 months"}, you'll be charged $
                            {billingCycle === "monthly" ? plans[selectedPlan].price : plans[selectedPlan].price * 3}
                            per {billingCycle === "monthly" ? "month" : "3 months"} unless you cancel.
                          </p>
                        ) : (
                          <p>
                            You'll be charged ${calculateTotal().toFixed(2)} today and every{" "}
                            {billingCycle === "monthly" ? "month" : "3 months"}
                            unless you cancel.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 rounded-lg bg-muted p-4">
                      <h3 className="mb-2 font-medium">Subscription includes:</h3>
                      <ul className="space-y-1 text-sm">
                        {plans[selectedPlan].features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="mx-auto max-w-2xl rounded-lg border p-8 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-4 text-3xl font-bold">Subscription Confirmed!</h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Thank you for subscribing to Xbox Game Pass{" "}
              {selectedPlan === "ultimate" ? "Ultimate" : selectedPlan === "pc" ? "PC" : "Console"}. Your subscription
              is now active.
            </p>
            <div className="mb-8 rounded-lg bg-muted p-6">
              <h2 className="mb-2 text-xl font-medium">Next Steps</h2>
              <ul className="space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 text-green-500" />
                  <span>
                    Download the Xbox app on your{" "}
                    {selectedPlan === "pc" || selectedPlan === "ultimate" ? "PC" : "console"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 text-green-500" />
                  <span>Sign in with your Microsoft account</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 text-green-500" />
                  <span>Browse and install games from the Game Pass library</span>
                </li>
                {selectedPlan === "ultimate" && (
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 text-green-500" />
                    <span>Try cloud gaming on your mobile device</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild className="bg-green-500 text-white hover:bg-green-600">
                <Link href="/category/games">Browse Games</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/profile">Go to My Account</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  )
}

