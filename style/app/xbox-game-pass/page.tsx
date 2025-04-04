import Image from "next/image"
import Link from "next/link"
import { Check, Gamepad2, TabletsIcon as Devices, Download, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import SiteLayout from "@/components/site-layout"

export default function XboxGamePassPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-16 md:py-24">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <Badge className="mb-4 w-fit bg-green-500 text-white hover:bg-green-600">Xbox Game Pass</Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Unlimited Access to Over 100 High-Quality Games
              </h1>
              <p className="mb-6 text-lg text-white/80 md:text-xl">
                Play new games on day one. Plus, enjoy all the benefits of EA Play.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild className="bg-green-500 text-white hover:bg-green-600">
                  <Link href="/xbox-game-pass/join">Join Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="#compare-plans">Compare Plans</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=400&width=600" alt="Xbox Game Pass" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">Why Xbox Game Pass?</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Gamepad2 className="mb-4 h-12 w-12 text-green-500" />
                <h3 className="mb-2 text-xl font-bold">Play Day One Releases</h3>
                <p className="text-muted-foreground">
                  Play new games the day they release, including Xbox Game Studios titles.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Devices className="mb-4 h-12 w-12 text-green-500" />
                <h3 className="mb-2 text-xl font-bold">Play Across Devices</h3>
                <p className="text-muted-foreground">
                  Play on console, PC, and supported mobile devices via cloud gaming.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Download className="mb-4 h-12 w-12 text-green-500" />
                <h3 className="mb-2 text-xl font-bold">Download and Play</h3>
                <p className="text-muted-foreground">Download games directly to your console or PC for offline play.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Clock className="mb-4 h-12 w-12 text-green-500" />
                <h3 className="mb-2 text-xl font-bold">New Games Every Month</h3>
                <p className="text-muted-foreground">
                  The Game Pass library is constantly updated with new games added regularly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Games Showcase */}
      <section className="bg-muted py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">Featured Games</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { title: "Starfield", image: "/placeholder.svg?height=300&width=300", badge: "New Release" },
              { title: "Forza Horizon 5", image: "/placeholder.svg?height=300&width=300" },
              { title: "Halo Infinite", image: "/placeholder.svg?height=300&width=300" },
              { title: "Sea of Thieves", image: "/placeholder.svg?height=300&width=300" },
              { title: "Microsoft Flight Simulator", image: "/placeholder.svg?height=300&width=300" },
              { title: "Age of Empires IV", image: "/placeholder.svg?height=300&width=300" },
              { title: "Minecraft", image: "/placeholder.svg?height=300&width=300" },
              { title: "Gears 5", image: "/placeholder.svg?height=300&width=300" },
            ].map((game, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                {game.badge && <Badge className="absolute left-2 top-2 bg-green-500">{game.badge}</Badge>}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="font-bold">{game.title}</h3>
                  <p className="text-sm">Included with Game Pass</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/category/games">View All Games</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Plans Comparison */}
      <section id="compare-plans" className="py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">Choose Your Plan</h2>
          <Tabs defaultValue="ultimate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pc">PC Game Pass</TabsTrigger>
              <TabsTrigger value="console">Console Game Pass</TabsTrigger>
              <TabsTrigger value="ultimate">Game Pass Ultimate</TabsTrigger>
            </TabsList>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left">Features</th>
                    <th className="p-4 text-center">PC Game Pass</th>
                    <th className="p-4 text-center">Console Game Pass</th>
                    <th className="p-4 text-center">Game Pass Ultimate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Monthly Price</td>
                    <td className="p-4 text-center">$9.99</td>
                    <td className="p-4 text-center">$10.99</td>
                    <td className="p-4 text-center">$16.99</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Games Library</td>
                    <td className="p-4 text-center">100+ PC Games</td>
                    <td className="p-4 text-center">100+ Console Games</td>
                    <td className="p-4 text-center">100+ PC & Console Games</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">New Day One Releases</td>
                    <td className="p-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                    <td className="p-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">EA Play Membership</td>
                    <td className="p-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Cloud Gaming</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Xbox Live Gold</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Member Discounts</td>
                    <td className="p-4 text-center">Up to 20%</td>
                    <td className="p-4 text-center">Up to 20%</td>
                    <td className="p-4 text-center">Up to 20%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <TabsContent value="pc" className="mt-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-xl font-bold">PC Game Pass</h3>
                <p className="mb-4 text-muted-foreground">
                  Get unlimited access to over 100 high-quality PC games on Windows 10/11. Includes new releases from
                  Xbox Game Studios and EA Play.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild className="bg-green-500 text-white hover:bg-green-600">
                    <Link href="/xbox-game-pass/join?plan=pc">Join Now for $9.99/month</Link>
                  </Button>
                  <Button variant="outline">First Month $1</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="console" className="mt-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-xl font-bold">Console Game Pass</h3>
                <p className="mb-4 text-muted-foreground">
                  Get unlimited access to over 100 high-quality console games on Xbox Series X|S and Xbox One. Includes
                  new releases from Xbox Game Studios.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild className="bg-green-500 text-white hover:bg-green-600">
                    <Link href="/xbox-game-pass/join?plan=console">Join Now for $10.99/month</Link>
                  </Button>
                  <Button variant="outline">First Month $1</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ultimate" className="mt-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-xl font-bold">Game Pass Ultimate</h3>
                <p className="mb-4 text-muted-foreground">
                  Get all the benefits of PC Game Pass and Console Game Pass, plus cloud gaming, Xbox Live Gold, and EA
                  Play. Play across devices.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button asChild className="bg-green-500 text-white hover:bg-green-600">
                    <Link href="/xbox-game-pass/join?plan=ultimate">Join Now for $16.99/month</Link>
                  </Button>
                  <Button variant="outline">First Month $1</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted py-16">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {[
              {
                question: "What is Xbox Game Pass?",
                answer:
                  "Xbox Game Pass is a subscription service that gives you unlimited access to a library of over 100 high-quality games for console, PC, or both, depending on your plan. New games are added all the time, including day one releases from Xbox Game Studios.",
              },
              {
                question: "What's the difference between the plans?",
                answer:
                  "PC Game Pass gives you access to the Game Pass library on Windows 10/11 PCs. Console Game Pass is for Xbox consoles. Game Pass Ultimate includes both, plus cloud gaming, Xbox Live Gold, and EA Play membership.",
              },
              {
                question: "Can I download games or do I have to stream them?",
                answer:
                  "You can download all games to your console or PC for full-fidelity gameplay. Cloud gaming (available with Game Pass Ultimate) lets you stream games to supported devices.",
              },
              {
                question: "How often are new games added?",
                answer:
                  "New games are added regularly, typically several per month. Xbox Game Studios titles are added on their release day.",
              },
              {
                question: "Can I cancel my subscription?",
                answer:
                  "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.",
              },
            ].map((faq, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-lg font-bold">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-16">
        <div className="container px-4 text-center md:px-6">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Start Playing?</h2>
          <p className="mb-8 text-lg text-white/80">Join Xbox Game Pass today and get your first month for just $1.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="bg-white text-green-800 hover:bg-white/90">
              <Link href="/xbox-game-pass/join">Join Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link href="#compare-plans">Compare Plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}

