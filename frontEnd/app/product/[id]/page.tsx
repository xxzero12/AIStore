"use client";

import Image from "next/image"
import { useState } from "react"
import { Star, Heart, Share2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import ProductReviews from "@/components/product-reviews"
import RelatedProducts from "@/components/related-products"
import SiteLayout from "@/components/site-layout"

// Update the products array to use real images from free sources
const products = [
  {
    id: 1,
    name: "Minecraft",
    category: "games",
    price: 29.99,
    rating: 4.8,
    reviewCount: 12543,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=600",
    description:
      "Minecraft is a game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things from the simplest of homes to the grandest of castles. Play in creative mode with unlimited resources or mine deep into the world in survival mode, crafting weapons and armor to fend off dangerous mobs.",
    developer: "Mojang Studios",
    publisher: "Xbox Game Studios",
    releaseDate: "November 18, 2011",
    badge: "Best Seller",
    features: [
      "Single player and multiplayer",
      "Creative and survival modes",
      "Infinite worlds",
      "Cross-platform play",
      "Regular updates with new content",
    ],
  },
  {
    id: 2,
    name: "Microsoft 365",
    category: "apps",
    price: 69.99,
    rating: 4.7,
    reviewCount: 9845,
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=600",
    description:
      "Microsoft 365 is the productivity cloud designed to help you pursue your passion and run your business. Get apps like Word, Excel, PowerPoint, and more, updated monthly with exclusive features and premium security.",
    developer: "Microsoft",
    publisher: "Microsoft Corporation",
    releaseDate: "April 21, 2020",
    features: [
      "Premium Office apps",
      "1TB OneDrive cloud storage",
      "Advanced security features",
      "Multiple device compatibility",
      "AI-powered features",
    ],
  },
  {
    id: 3,
    name: "Forza Horizon 5",
    category: "games",
    price: 59.99,
    rating: 4.9,
    reviewCount: 8752,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600",
    description:
      "Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world's greatest cars. Experience stunning graphics and immersive gameplay in one of the most beautiful racing games ever created.",
    developer: "Playground Games",
    publisher: "Xbox Game Studios",
    releaseDate: "November 9, 2021",
    badge: "New",
    features: [
      "Open world racing",
      "Stunning graphics and environments",
      "Hundreds of customizable cars",
      "Dynamic weather system",
      "Online multiplayer events",
    ],
  },
  {
    id: 4,
    name: "Adobe Creative Cloud",
    category: "apps",
    price: 52.99,
    rating: 4.5,
    reviewCount: 7462,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600",
    description:
      "Adobe Creative Cloud gives you the world's best creative apps and services so you can make anything you can imagine, wherever you're inspired. Get Photoshop, Illustrator, InDesign, and more creative apps plus all the creative assets you need.",
    developer: "Adobe Inc.",
    publisher: "Adobe Inc.",
    releaseDate: "October 15, 2018",
    features: [
      "20+ creative desktop and mobile apps",
      "100GB cloud storage",
      "Thousands of Adobe Fonts",
      "Adobe Portfolio",
      "Regular updates and new features",
    ],
  },
  {
    id: 5,
    name: "Dune",
    category: "movies",
    price: 19.99,
    rating: 4.6,
    reviewCount: 9834,
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=600",
    description:
      "A mythic and emotionally charged hero's journey, 'Dune' tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, who must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    developer: "Warner Bros. Pictures",
    publisher: "Warner Bros. Entertainment",
    releaseDate: "October 22, 2021",
    features: [
      "4K Ultra HD",
      "HDR10+",
      "Dolby Vision",
      "Dolby Atmos",
      "Director commentary and bonus features",
    ],
  },
  {
    id: 6,
    name: "Halo Infinite",
    category: "games",
    price: 59.99,
    rating: 4.4,
    reviewCount: 10235,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=600",
    description:
      "The Master Chief returns in Halo Infinite – the next chapter of the legendary franchise. When all hope is lost and humanity's fate hangs in the balance, the Master Chief is ready to confront the most ruthless foe he's ever faced.",
    developer: "343 Industries",
    publisher: "Xbox Game Studios",
    releaseDate: "December 8, 2021",
    features: [
      "Epic campaign mode",
      "Free-to-play multiplayer",
      "Forge mode for custom games",
      "Stunning next-gen graphics",
      "Cross-platform play",
    ],
  },
  {
    id: 7,
    name: "Spotify",
    category: "apps",
    price: 9.99,
    rating: 4.7,
    reviewCount: 21456,
    image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=600",
    description:
      "Spotify is a digital music service that gives you access to millions of songs. With Spotify, it's easy to find the right music or podcast for every moment – on your phone, your computer, your tablet and more.",
    developer: "Spotify AB",
    publisher: "Spotify AB",
    releaseDate: "October 7, 2008",
    features: [
      "Access to over 70 million tracks",
      "Personalized playlists",
      "Podcast library",
      "Ad-free listening",
      "Download music for offline listening",
    ],
  },
  {
    id: 8,
    name: "The Batman",
    category: "movies",
    price: 24.99,
    rating: 4.5,
    reviewCount: 7826,
    image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=600",
    description:
      "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    developer: "Warner Bros. Pictures",
    publisher: "Warner Bros. Entertainment",
    releaseDate: "March 4, 2022",
    badge: "Top Rated",
    features: [
      "4K Ultra HD",
      "HDR10+",
      "Dolby Vision",
      "Dolby Atmos",
      "Behind-the-scenes content",
    ],
  },
  {
    id: 9,
    name: "Taylor Swift - Midnights",
    category: "music",
    price: 12.99,
    rating: 4.9,
    reviewCount: 18732,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600",
    description:
      "Midnights is the tenth studio album by American singer-songwriter Taylor Swift, released through Republic Records. Announced at the 2022 MTV Video Music Awards, the album marks Swift's first body of new work since her 2020 albums Folklore and Evermore.",
    developer: "Taylor Swift",
    publisher: "Republic Records",
    releaseDate: "October 21, 2022",
    features: [
      "13 tracks on standard edition",
      "Deluxe 'Lavender Edition' with bonus tracks",
      "Digital booklet with photos and lyrics",
      "Lossless audio quality",
      "Exclusive music videos",
    ],
  },
  {
    id: 10,
    name: "Surface Pro 9",
    category: "devices",
    price: 999.99,
    rating: 4.6,
    reviewCount: 5421,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=600",
    description:
      "The Surface Pro 9 gives you sophisticated style and multitasking speed. Now with the latest 12th Gen Intel Core processors, up to 32GB RAM, and Thunderbolt 4 connectivity, enjoy a powerful, premium laptop that helps you work and play your way.",
    developer: "Microsoft",
    publisher: "Microsoft Corporation",
    releaseDate: "October 25, 2022",
    features: [
      "12th Gen Intel Core processor",
      "13\" PixelSense touchscreen",
      "All-day battery life",
      "Thunderbolt 4 connectivity",
      "Windows 11 operating system",
    ],
  },
  {
    id: 11,
    name: "Xbox Series X",
    category: "devices",
    price: 499.99,
    rating: 4.8,
    reviewCount: 11254,
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=600",
    description:
      "The Xbox Series X is the fastest, most powerful Xbox ever. With thousands of games from four generations of Xbox, there's never been a better time to experience the joy of gaming on Xbox Series X.",
    developer: "Microsoft",
    publisher: "Microsoft Corporation",
    releaseDate: "November 10, 2020",
    badge: "Limited Stock",
    features: [
      "4K gaming at up to 120 FPS",
      "8K HDR",
      "1TB custom SSD",
      "Ray tracing technology",
      "Quick Resume for multiple games",
    ],
  },
  {
    id: 12,
    name: "Project Hail Mary",
    category: "books",
    price: 14.99,
    rating: 4.7,
    reviewCount: 6843,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=600",
    description:
      "In Project Hail Mary, a lone astronaut must save the earth from disaster. Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. From the author of The Martian, Andy Weir's new novel is a riveting tale of survival in space.",
    developer: "Andy Weir",
    publisher: "Ballantine Books",
    releaseDate: "May 4, 2021",
    features: [
      "496 pages",
      "Available in hardcover, paperback, and e-book formats",
      "Audiobook narrated by Ray Porter",
      "New York Times Bestseller",
      "Goodreads Choice Award Winner",
    ],
  },
  {
    id: 13,
    name: "Xbox Game Pass Ultimate",
    category: "entertainment",
    price: 14.99,
    rating: 4.9,
    reviewCount: 14587,
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=600",
    description:
      "Xbox Game Pass Ultimate includes all the benefits of Xbox Live Gold, plus over 100 high-quality console and PC games. Play with friends on the most advanced multiplayer network, discover your next favorite game, and enjoy exclusive member deals and discounts.",
    developer: "Microsoft",
    publisher: "Microsoft Corporation",
    releaseDate: "June 9, 2019",
    badge: "Best Value",
    features: [
      "100+ high-quality games",
      "New games added all the time",
      "Xbox Live Gold included",
      "EA Play membership included",
      "Xbox Cloud Gaming (Beta)",
    ],
  },
  {
    id: 14,
    name: "Office 365 - 50% Off",
    category: "deals",
    price: 34.99,
    rating: 4.5,
    reviewCount: 8924,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600",
    description:
      "Get a special 50% off deal on Microsoft Office 365, the productivity suite that brings together the best tools for the way people work today. Get always up-to-date apps like Word, Excel, PowerPoint, and more, with smart features that help you maximize productivity.",
    developer: "Microsoft",
    publisher: "Microsoft Corporation",
    releaseDate: "April 21, 2020",
    badge: "Sale",
    features: [
      "Premium Office apps",
      "1TB OneDrive cloud storage",
      "Access on multiple devices",
      "Regular updates and new features",
      "50% discount for limited time",
    ],
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const product = products.find((p) => p.id === Number.parseInt(params.id)) || products[0];

  const handleBuyNow = async () => {
    setIsPurchasing(true);
    
    try {
      // Include additional product details in the request
      const productDetails = {
        product_id: product.id,
        quantity: 1,
        name: product.name,
        category: product.category,
        price: product.price,
        rating: product.rating,
        review_count: product.reviewCount,
        developer: product.developer,
        publisher: product.publisher
      };
      
      const response = await fetch("http://localhost:8000/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productDetails)
      });

      if (!response.ok) {
        throw new Error("Purchase failed");
      }

      const data = await response.json();
      setPurchaseData(data);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Purchase failed. Please try again.");
    } finally {
      setIsPurchasing(false);
    }
  };

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
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleBuyNow}
                disabled={isPurchasing}
              >
                {isPurchasing ? "Processing..." : "Buy now"}
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

      {/* Purchase Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Purchase Successful!</DialogTitle>
            <DialogDescription>
              Your transaction has been completed successfully.
            </DialogDescription>
          </DialogHeader>
          
          {purchaseData && (
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Product:</div>
                <div>{purchaseData.product_name}</div>
                
                <div className="font-medium">Quantity:</div>
                <div>{purchaseData.quantity}</div>
                
                <div className="font-medium">Total Price:</div>
                <div>${purchaseData.total_price.toFixed(2)}</div>
                
                <div className="font-medium">Transaction ID:</div>
                <div className="truncate">{purchaseData.transaction_id}</div>
                
                <div className="font-medium">Date:</div>
                <div>{new Date(purchaseData.purchase_date).toLocaleString()}</div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SiteLayout>
  );
}

