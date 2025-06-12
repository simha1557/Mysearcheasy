"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

interface SearchFiltersProps {
  onSearch: (query: string, filters: SearchFilters) => void
}

interface SearchFilters {
  category?: string
  ageGroup?: string
  maxPrice?: number
  location?: string
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState<SearchFilters>({})
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = () => {
    onSearch(query, filters)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search activities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full p-2 border rounded-md"
              value={filters.category || ""}
              onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}
            >
              <option value="">All Categories</option>
              <option value="sports">Sports</option>
              <option value="arts">Arts</option>
              <option value="fun">Fun</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age Group</label>
            <select
              className="w-full p-2 border rounded-md"
              value={filters.ageGroup || ""}
              onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value || undefined })}
            >
              <option value="">All Ages</option>
              <option value="3-5">3-5 years</option>
              <option value="6-8">6-8 years</option>
              <option value="9-12">9-12 years</option>
              <option value="13+">13+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Max Price</label>
            <Input
              type="number"
              placeholder="$100"
              value={filters.maxPrice || ""}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) || undefined })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input
              placeholder="City or ZIP"
              value={filters.location || ""}
              onChange={(e) => setFilters({ ...filters, location: e.target.value || undefined })}
            />
          </div>
        </div>
      )}
    </div>
  )
}
