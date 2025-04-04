import { BookOpen } from "lucide-react"

import CategoryHeader from "@/components/category-header"
import CategoryFilter from "@/components/category-filter"
import ProductGrid from "@/components/product-grid"
import SiteLayout from "@/components/site-layout"

// Book-specific filters
const bookFilters = [
  {
    name: "Genre",
    options: ["Fiction", "Non-Fiction", "Mystery", "Sci-Fi", "Fantasy", "Biography", "Self-Help"],
  },
  {
    name: "Format",
    options: ["eBook", "Audiobook", "PDF", "Print"],
  },
  {
    name: "Release Year",
    options: ["2023", "2022", "2021", "2020", "2010-2019", "Before 2010"],
  },
  {
    name: "Price",
    options: ["Free", "Under $5", "$5-$10", "$10-$20", "Over $20"],
  },
]

export default function BooksPage() {
  return (
    <SiteLayout>
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <CategoryHeader
          title="Books"
          description="Explore bestsellers, new releases, and classics in digital format. Find your next great read from a vast collection of eBooks and audiobooks."
          icon={<BookOpen className="h-6 w-6" />}
          backgroundClass="bg-gradient-to-r from-amber-600 to-yellow-600"
        />

        <div className="mt-8">
          <CategoryFilter filters={bookFilters} />
          <ProductGrid category="books" />
        </div>
      </div>
    </SiteLayout>
  )
}

