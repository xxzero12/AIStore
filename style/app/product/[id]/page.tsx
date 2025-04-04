import Image from "next/image"
import { Star, Heart, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ProductReviews from "@/components/product-reviews"
import RelatedProducts from "@/components/related-products"
import SiteLayout from "@/components/site-layout"

// Mock data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    name: "Minecraft",
    category: "games",
    price: 29.99,
    rating: 4.8,
    reviewCount: 12543,
    image: "/placeholder.svg?height=600&width=600",
    description:
      "Minecraft is a game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode, crafting weapons and armor to fend off dangerous mobs.",
    developer: "Mojang Studios",
    publisher: "Xbox Game Studios",
    releaseDate: "November 18, 2011",
    features: [
      "Single player and multiplayer",
      "Creative and survival modes",
      "Infinite worlds",
      "Cross-platform play",
      "Regular updates with new content",
    ],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number.parseInt(params.id)) || products[0]

  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border bg-white">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="overflow-hidden rounded-md border">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    width={150}
                    height={150}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{product.rating}</span>
                  <span className="ml-1 text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-bold">${product.price}</p>
              <p className="text-sm text-muted-foreground">Price includes taxes</p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Add to cart</Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                Buy now
              </Button>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Developer</p>
                <p className="text-muted-foreground">{product.developer}</p>
              </div>
              <div>
                <p className="font-medium">Publisher</p>
                <p className="text-muted-foreground">{product.publisher}</p>
              </div>
              <div>
                <p className="font-medium">Release Date</p>
                <p className="text-muted-foreground">{product.releaseDate}</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mt-10">
          <TabsList className="w-full justify-start border-b bg-transparent p-0">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="related"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Related Products
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <ProductReviews productId={product.id} />
          </TabsContent>
          <TabsContent value="related" className="pt-4">
            <RelatedProducts category={product.category} currentProductId={product.id} />
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  )
}

