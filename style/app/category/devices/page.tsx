import { Laptop } from "lucide-react"

import CategoryHeader from "@/components/category-header"
import CategoryFilter from "@/components/category-filter"
import ProductGrid from "@/components/product-grid"
import SiteLayout from "@/components/site-layout"

// Device-specific filters
const deviceFilters = [
  {
    name: "Category",
    options: ["Laptops", "Tablets", "Desktops", "Gaming", "Accessories", "Audio"],
  },
  {
    name: "Brand",
    options: ["Microsoft", "Xbox", "Surface", "HP", "Dell", "Lenovo", "ASUS"],
  },
  {
    name: "Price Range",
    options: ["Under $100", "$100-$500", "$500-$1000", "$1000-$2000", "Over $2000"],
  },
  {
    name: "Features",
    options: ["Touch Screen", "Detachable", "Gaming", "Business", "Student"],
  },
]

export default function DevicesPage() {
  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <CategoryHeader
          title="Devices"
          description="Shop the latest Surface computers, Xbox consoles, accessories, and more. Find the perfect device to match your lifestyle and needs."
          icon={<Laptop className="h-6 w-6" />}
          backgroundClass="bg-gradient-to-r from-slate-700 to-slate-900"
        />

        <div className="mt-8">
          <CategoryFilter filters={deviceFilters} />
          <ProductGrid category="devices" />
        </div>
      </div>
    </SiteLayout>
  )
}

