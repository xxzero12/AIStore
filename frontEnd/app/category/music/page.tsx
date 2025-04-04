import { Music } from "lucide-react"

import CategoryHeader from "@/components/category-header"
import CategoryFilter from "@/components/category-filter"
import ProductGrid from "@/components/product-grid"
import SiteLayout from "@/components/site-layout"

// Music-specific filters
const musicFilters = [
  {
    name: "Genre",
    options: ["Pop", "Rock", "Hip-Hop", "R&B", "Country", "Electronic", "Classical", "Jazz"],
  },
  {
    name: "Format",
    options: ["Album", "Single", "EP", "Compilation"],
  },
  {
    name: "Release Year",
    options: ["2023", "2022", "2021", "2020", "2010-2019", "Before 2010"],
  },
  {
    name: "Price",
    options: ["Under $5", "$5-$10", "Over $10", "Subscription"],
  },
]

export default function MusicPage() {
  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <CategoryHeader
          title="Music"
          description="Discover new artists, albums, and songs across all genres. Stream or download your favorite music and create the perfect playlist for any occasion."
          icon={<Music className="h-6 w-6" />}
          backgroundClass="bg-gradient-to-r from-pink-600 to-purple-600"
        />

        <div className="mt-8">
          <CategoryFilter filters={musicFilters} />
          <ProductGrid category="music" />
        </div>
      </div>
    </SiteLayout>
  )
}

