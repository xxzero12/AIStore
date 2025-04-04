"use client"

import { useSearchParams } from "next/navigation"

import CategoryFilter from "@/components/category-filter"
import ProductGrid from "@/components/product-grid"
import SiteLayout from "@/components/site-layout"

// Search-specific filters
const searchFilters = [
  {
    name: "Category",
    options: ["All", "Games", "Apps", "Movies & TV", "Music", "Books", "Devices"],
  },
  {
    name: "Price Range",
    options: ["Free", "Under $10", "$10-$30", "$30-$60", "Over $60"],
  },
  {
    name: "Rating",
    options: ["4★ & Up", "3★ & Up", "2★ & Up", "1★ & Up"],
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">Search Results</h1>
          <p className="mt-2 text-muted-foreground">
            Showing results for <span className="font-medium text-foreground">"{query}"</span>
          </p>
        </div>

        <div className="mt-8">
          <CategoryFilter filters={searchFilters} />

          {/* In a real app, you would filter products based on the search query */}
          <ProductGrid category="all" />
        </div>
      </div>
    </SiteLayout>
  )
}

