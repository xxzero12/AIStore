import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeaturedProducts from "@/components/featured-products"
import ProductGrid from "@/components/product-grid"
import CategoryNav from "@/components/category-nav"
import SiteLayout from "@/components/site-layout"

export default function HomePage() {
  return (
    <SiteLayout>
      <section className="container px-4 py-6 md:px-6 md:py-8">
        <CategoryNav />
        <div className="mt-6">
          <FeaturedProducts />
        </div>
        <div className="mt-12">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Top Products</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="apps">Apps</TabsTrigger>
                <TabsTrigger value="games">Games</TabsTrigger>
                <TabsTrigger value="movies">Movies & TV</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-6">
              <ProductGrid category="all" />
            </TabsContent>
            <TabsContent value="apps" className="mt-6">
              <ProductGrid category="apps" />
            </TabsContent>
            <TabsContent value="games" className="mt-6">
              <ProductGrid category="games" />
            </TabsContent>
            <TabsContent value="movies" className="mt-6">
              <ProductGrid category="movies" />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </SiteLayout>
  )
}

