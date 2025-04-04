"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useOnClickOutside } from "@/hooks/use-click-outside"

// Update the searchData array to use real images from free sources
const searchData = [
  {
    id: 1,
    name: "Minecraft",
    category: "Games",
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=40",
  },
  {
    id: 2,
    name: "Microsoft 365",
    category: "Apps",
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec?q=80&w=40",
  },
  {
    id: 3,
    name: "Forza Horizon 5",
    category: "Games",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=40",
  },
  {
    id: 4,
    name: "Adobe Creative Cloud",
    category: "Apps",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=40",
  },
  {
    id: 5,
    name: "Dune",
    category: "Movies & TV",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=40",
  },
  {
    id: 6,
    name: "Halo Infinite",
    category: "Games",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=40",
  },
  {
    id: 7,
    name: "Spotify",
    category: "Apps",
    image: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?q=80&w=40",
  },
  {
    id: 8,
    name: "The Batman",
    category: "Movies & TV",
    image: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=40",
  },
  {
    id: 9,
    name: "Taylor Swift - Midnights",
    category: "Music",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=40",
  },
  {
    id: 10,
    name: "Surface Pro 9",
    category: "Devices",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=40",
  },
  {
    id: 11,
    name: "Xbox Series X",
    category: "Devices",
    image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=40",
  },
  {
    id: 12,
    name: "Project Hail Mary",
    category: "Books",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=40",
  },
]

export default function SearchAutocomplete() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<typeof searchData>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useOnClickOutside(searchRef, () => setIsOpen(false))

  useEffect(() => {
    if (searchQuery.length > 1) {
      // Filter results based on search query
      const filteredResults = searchData.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setResults(filteredResults)
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsOpen(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setIsOpen(false)
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-sm md:max-w-md">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search apps, games, movies..."
            className="w-full rounded-full bg-muted pl-8 pr-10 md:w-[300px] lg:w-[400px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery.length > 1 && setIsOpen(true)}
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-2 hover:bg-transparent"
              onClick={clearSearch}
            >
              <X className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </form>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-lg border bg-background shadow-lg">
          <div className="p-2">
            <h3 className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Suggestions</h3>
            <div className="max-h-[60vh] overflow-auto">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-muted"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 truncate">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-2 border-t pt-2">
              <Button variant="ghost" className="w-full justify-start text-sm text-primary" onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search for "{searchQuery}"
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

