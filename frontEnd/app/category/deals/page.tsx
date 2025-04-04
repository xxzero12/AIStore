import { Tag } from "lucide-react"

import CategoryHeader from "@/components/category-header"
import CategoryFilter from "@/components/category-filter"
import ProductGrid from "@/components/product-grid"
import SiteLayout from "@/components/site-layout"

// Deals-specific filters
const dealsFilters = [
  {
    name: "Category",
    options: ["Games", "Apps", "Devices", "Movies & TV", "Music", "Books"],
  },
  {
    name: "Discount",
    options: ["10% Off", "25% Off", "50% Off", "75% Off", "Special Offers"],
  },
  {
    name: "Price Range",
    options: ["Under $10", "$10-$30", "$30-$60", "Over $60"],
  },
  {
    name: "Deal Type",
    options: ["Flash Sale", "Clearance", "Bundle", "Season Sale", "Holiday Special"],
  },
]

export default function DealsPage() {
  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <CategoryHeader
          title="Deals"
          description="Save big with the latest deals and discounts across all categories. Limited-time offers, seasonal sales, and exclusive bundles await."
          icon={<Tag className="h-6 w-6" />}
          backgroundClass="bg-gradient-to-r from-green-600 to-emerald-600"
        />

        <div className="mt-8">
          <CategoryFilter filters={dealsFilters} />
          <ProductGrid category="deals" />
        </div>
      </div>
    </SiteLayout>
  )
}

