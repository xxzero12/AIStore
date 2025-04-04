import { Laptop } from "lucide-react"

import CategoryHeader from "@/components/category-header"
import CategoryFilter from "@/components/category-filter"
import ProductGrid from "@/components/product-grid"
import SiteLayout from "@/components/site-layout"

// App-specific filters
const appFilters = [
  {
    name: "Category",
    options: ["Productivity", "Photo & Video", "Social", "Education", "Business", "Utilities"],
  },
  {
    name: "Features",
    options: ["Touch Support", "Offline Access", "Cloud Sync", "Cross-Platform"],
  },
  {
    name: "Price",
    options: ["Free", "Free Trial", "Paid", "Subscription"],
  },
]

export default function AppsPage() {
  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <CategoryHeader
          title="Apps"
          description="Enhance your productivity and creativity with the best apps for Windows. From essential tools to specialized software, find the perfect app for your needs."
          icon={<Laptop className="h-6 w-6" />}
          backgroundClass="bg-gradient-to-r from-blue-600 to-cyan-600"
        />

        <div className="mt-8">
          <CategoryFilter filters={appFilters} />
          <ProductGrid category="apps" />
        </div>
      </div>
    </SiteLayout>
  )
}

