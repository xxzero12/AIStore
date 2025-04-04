import Link from "next/link"
import { Gamepad2, Laptop, Film, Music, BookOpen, Headphones, Camera, Tv } from "lucide-react"

export default function CategoryNav() {
  const categories = [
    { name: "Games", icon: Gamepad2, href: "/category/games" },
    { name: "Apps", icon: Laptop, href: "/category/apps" },
    { name: "Movies & TV", icon: Film, href: "/category/movies" },
    { name: "Music", icon: Music, href: "/category/music" },
    { name: "Books", icon: BookOpen, href: "/category/books" },
    { name: "Devices", icon: Headphones, href: "/category/devices" },
    { name: "Entertainment", icon: Camera, href: "/category/entertainment" },
    { name: "Deals", icon: Tv, href: "/category/deals" },
  ]

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="flex flex-col items-center gap-1 rounded-lg p-2 text-sm hover:bg-muted"
          >
            <category.icon className="h-6 w-6" />
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

