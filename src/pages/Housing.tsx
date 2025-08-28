"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import HousingFilters from "@/components/ui/house-filter"
import HousingGrid from "@/components/ui/house-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, Map } from "lucide-react"

export default function HousingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    location: "",
    priceRange: "",
    roomType: "",
    amenities: [],
    university: "",
    distance: "",
  })
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("grid") // grid or map

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      location: "",
      priceRange: "",
      roomType: "",
      amenities: [],
      university: "",
      distance: "",
    })
    setSearchQuery("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-black text-3xl text-foreground mb-2">Student Housing</h1>
          <p className="text-muted-foreground">
            Find verified accommodation near your chosen university with transparent pricing and amenities.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, university, or neighborhood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-transparent"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === "grid" ? "map" : "grid")}
                className="flex items-center space-x-2 bg-transparent"
              >
                <Map className="h-4 w-4" />
                <span>{viewMode === "grid" ? "Map View" : "Grid View"}</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <HousingFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />
            </div>
          )}

          {/* Housing Grid */}
          <div className="flex-1">
            <HousingGrid searchQuery={searchQuery} filters={filters} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  )
}
