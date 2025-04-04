import { Gamepad2 } from "lucide-react"

import CategoryHeader from "@/components/category-header"
import CategoryFilter from "@/components/category-filter"
import ProductGrid from "@/components/product-grid"
import SiteLayout from "@/components/site-layout"

// Game-specific filters
const gameFilters = [
  {
    name: "Genre",
    options: ["Action", "Adventure", "RPG", "Strategy", "Simulation", "Sports", "Racing"],
  },
  {
    name: "Features",
    options: ["Multiplayer", "Single Player", "Co-op", "Controller Support", "Cloud Gaming"],
  },
  {
    name: "Age Rating",
    options: ["E (Everyone)", "E10+ (Everyone 10+)", "T (Teen)", "M (Mature)"],
  },
  {
    name: "Price",
    options: ["Free", "Under $10", "$10-$30", "$30-$60", "Over $60"],
  },
]

export default function GamesPage() {
  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <CategoryHeader
          title="Games"
          description="Discover the latest and greatest games for PC, Xbox, and more. From action-packed adventures to immersive RPGs, find your next gaming obsession."
          icon={<Gamepad2 className="h-6 w-6" />}
          backgroundClass="bg-gradient-to-r from-indigo-600 to-purple-700"
        />

        <div className="mt-8">
          <CategoryFilter filters={gameFilters} />
          <ProductGrid category="games" />
        </div>
      </div>
    </SiteLayout>
  )
}

