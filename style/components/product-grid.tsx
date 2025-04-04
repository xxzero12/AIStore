import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    name: "Minecraft",
    category: "games",
    price: 29.99,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Microsoft 365",
    category: "apps",
    price: 69.99,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Forza Horizon 5",
    category: "games",
    price: 59.99,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
    badge: "New",
  },
  {
    id: 4,
    name: "Adobe Creative Cloud",
    category: "apps",
    price: 52.99,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 5,
    name: "Dune",
    category: "movies",
    price: 19.99,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Halo Infinite",
    category: "games",
    price: 59.99,
    rating: 4.4,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Spotify",
    category: "apps",
    price: 9.99,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 8,
    name: "The Batman",
    category: "movies",
    price: 24.99,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Top Rated",
  },
  {
    id: 9,
    name: "Taylor Swift - Midnights",
    category: "music",
    price: 12.99,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 10,
    name: "Surface Pro 9",
    category: "devices",
    price: 999.99,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 11,
    name: "Xbox Series X",
    category: "devices",
    price: 499.99,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Limited Stock",
  },
  {
    id: 12,
    name: "Project Hail Mary",
    category: "books",
    price: 14.99,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 13,
    name: "Xbox Game Pass Ultimate",
    category: "entertainment",
    price: 14.99,
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Best Value",
  },
  {
    id: 14,
    name: "Office 365 - 50% Off",
    category: "deals",
    price: 34.99,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Sale",
  },
]

export default function ProductGrid({ category = "all" }) {
  const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category)

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {filteredProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-0">
            <Link href={`/product/${product.id}`}>
              <div className="relative">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                {product.badge && <Badge className="absolute left-2 top-2 bg-blue-600">{product.badge}</Badge>}
              </div>
              <div className="p-3">
                <h3 className="font-medium">{product.name}</h3>
                <div className="mt-1 flex items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                  <span className="ml-auto font-medium">${product.price}</span>
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

