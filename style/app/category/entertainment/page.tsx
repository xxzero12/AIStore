import { Camera } from "lucide-react"

import CategoryHeader from "@/components/category-header"
import CategoryFilter from "@/components/category-filter"
import ProductGrid from "@/components/product-grid"
import SiteLayout from "@/components/site-layout"

// Entertainment-specific filters
const entertainmentFilters = [
  {
    name: "Category",
    options: ["Streaming", "Gaming", "Sports", "Events", "Kids"],
  },
  {
    name: "Type",
    options: ["Subscription", "One-time Purchase", "Free", "Trial"],
  },
  {
    name: "Platform",
    options: ["Xbox", "PC", "Mobile", "Web", "Multiple Devices"],
  },
]

export default function EntertainmentPage() {
  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <CategoryHeader
          title="Entertainment"
          description="Discover a world of entertainment options, from streaming services to live events. Find the perfect way to stay entertained."
          icon={<Camera className="h-6 w-6" />}
          backgroundClass="bg-gradient-to-r from-violet-600 to-fuchsia-600"
        />

        <div className="mt-8">
          <CategoryFilter filters={entertainmentFilters} />
          <ProductGrid category="entertainment" />
        </div>
      </div>
    </SiteLayout>
  )
}

