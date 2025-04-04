import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

// Mock data - in a real app, this would come from an API
const products = [
  {
    id: 1,
    name: "Minecraft",
    category: "games",
    price: 29.99,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Forza Horizon 5",
    category: "games",
    price: 59.99,
    rating: 4.9,
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
    id: 9,
    name: "Sea of Thieves",
    category: "games",
    price: 39.99,
    rating: 4.3,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 10,
    name: "Gears 5",
    category: "games",
    price: 39.99,
    rating: 4.5,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function RelatedProducts({
  category,
  currentProductId,
}: { category: string; currentProductId: number }) {
  const relatedProducts = products
    .filter((product) => product.category === category && product.id !== currentProductId)
    .slice(0, 4)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">You might also like</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="overflow-hidden rounded-lg border">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h4 className="font-medium group-hover:text-primary">{product.name}</h4>
                <div className="mt-1 flex items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                  <span className="ml-auto font-medium">${product.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

