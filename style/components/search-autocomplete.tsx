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

// Mock search results - in a real app, this would come from an API
const searchData = [
  {
    id: 1,
    name: "Minecraft",
    category: "Games",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Microsoft 365",
    category: "Apps",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Forza Horizon 5",
    category: "Games",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Adobe Creative Cloud",
    category: "Apps",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Dune",
    category: "Movies & TV",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Halo Infinite",
    category: "Games",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Spotify",
    category: "Apps",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "The Batman",
    category: "Movies & TV",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    name: "Taylor Swift - Midnights",
    category: "Music",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 10,
    name: "Surface Pro 9",
    category: "Devices",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 11,
    name: "Xbox Series X",
    category: "Devices",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 12,
    name: "Project Hail Mary",
    category: "Books",
    image: "/placeholder.svg?height=40&width=40",
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

