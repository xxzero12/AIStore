"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface CategoryFilterProps {
  filters: {
    name: string
    options: string[]
  }[]
  onFilterChange?: (filters: Record<string, string[]>) => void
}

export default function CategoryFilter({ filters, onFilterChange }: CategoryFilterProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})
  const [sortOption, setSortOption] = useState("Featured")

  const handleFilterChange = (filterName: string, option: string) => {
    setActiveFilters((prev) => {
      const currentOptions = prev[filterName] || []
      const newOptions = currentOptions.includes(option)
        ? currentOptions.filter((item) => item !== option)
        : [...currentOptions, option]

      const newFilters = {
        ...prev,
        [filterName]: newOptions,
      }

      // Call the callback if provided
      onFilterChange?.(newFilters)

      return newFilters
    })
  }

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <DropdownMenu key={filter.name}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                {filter.name}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuGroup>
                {filter.options.map((option) => {
                  const isActive = (activeFilters[filter.name] || []).includes(option)
                  return (
                    <DropdownMenuItem
                      key={option}
                      className="flex cursor-pointer items-center justify-between"
                      onSelect={(e) => {
                        e.preventDefault()
                        handleFilterChange(filter.name, option)
                      }}
                    >
                      {option}
                      {isActive && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 sm:flex">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                {sortOption}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setSortOption("Featured")}>Featured</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption("Price: Low to High")}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption("Price: High to Low")}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption("Newest")}>Newest</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setSortOption("Top Rated")}>Top Rated</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative w-full sm:w-auto">
          <Input type="search" placeholder="Search in this category" className="w-full sm:w-[200px]" />
        </div>
      </div>
    </div>
  )
}

