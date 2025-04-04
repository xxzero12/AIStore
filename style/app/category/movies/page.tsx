import { Film } from "lucide-react"

import CategoryHeader from "@/components/category-header"
import CategoryFilter from "@/components/category-filter"
import ProductGrid from "@/components/product-grid"
import SiteLayout from "@/components/site-layout"

// Movie-specific filters
const movieFilters = [
  {
    name: "Genre",
    options: ["Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Family", "Documentary"],
  },
  {
    name: "Format",
    options: ["HD", "4K UHD", "HDR", "Dolby Vision", "Dolby Atmos"],
  },
  {
    name: "Release Year",
    options: ["2023", "2022", "2021", "2020", "2010-2019", "Before 2010"],
  },
  {
    name: "Price",
    options: ["Rent", "Buy", "Under $10", "$10-$20", "Over $20"],
  },
]

export default function MoviesPage() {
  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <CategoryHeader
          title="Movies & TV"
          description="Stream or download the latest blockbusters, TV shows, and exclusive content. Find new releases, classics, and everything in between."
          icon={<Film className="h-6 w-6" />}
          backgroundClass="bg-gradient-to-r from-red-600 to-orange-600"
        />

        <div className="mt-8">
          <CategoryFilter filters={movieFilters} />
          <ProductGrid category="movies" />
        </div>
      </div>
    </SiteLayout>
  )
}

