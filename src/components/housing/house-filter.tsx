"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X } from "lucide-react"

export default function HousingFilters({ filters, onFilterChange, onClearFilters }) {
  const locations = [
    "Downtown Toronto",
    "North York",
    "Scarborough",
    "Etobicoke",
    "Mississauga",
    "Markham",
    "Richmond Hill",
    "Vaughan",
  ]

  const priceRanges = ["Under $500", "$500 - $800", "$800 - $1200", "$1200 - $1500", "$1500 - $2000", "Over $2000"]

  const roomTypes = ["Private Room", "Shared Room", "Studio", "1 Bedroom", "2 Bedroom", "Entire House"]

  const universities = [
    "University of Toronto",
    "Ryerson University",
    "York University",
    "OCAD University",
    "George Brown College",
    "Seneca College",
  ]

  const distances = ["Within 1km", "Within 2km", "Within 5km", "Within 10km", "Any distance"]

  const amenitiesList = [
    "WiFi",
    "Laundry",
    "Kitchen Access",
    "Parking",
    "Gym",
    "Study Room",
    "Air Conditioning",
    "Heating",
    "Furnished",
    "Pet Friendly",
  ]

  const handleAmenityChange = (amenity, checked) => {
    const currentAmenities = filters.amenities || []
    if (checked) {
      onFilterChange("amenities", [...currentAmenities, amenity])
    } else {
      onFilterChange(
        "amenities",
        currentAmenities.filter((a) => a !== amenity),
      )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Filters
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-2 block">Location</Label>
          <Select value={filters.location} onValueChange={(value) => onFilterChange("location", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Price Range</Label>
          <Select value={filters.priceRange} onValueChange={(value) => onFilterChange("priceRange", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Room Type</Label>
          <Select value={filters.roomType} onValueChange={(value) => onFilterChange("roomType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select room type" />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Near University</Label>
          <Select value={filters.university} onValueChange={(value) => onFilterChange("university", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select university" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((university) => (
                <SelectItem key={university} value={university}>
                  {university}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-2 block">Distance</Label>
          <Select value={filters.distance} onValueChange={(value) => onFilterChange("distance", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select distance" />
            </SelectTrigger>
            <SelectContent>
              {distances.map((distance) => (
                <SelectItem key={distance} value={distance}>
                  {distance}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 block">Amenities</Label>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {amenitiesList.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={amenity}
                  checked={filters.amenities?.includes(amenity) || false}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked)}
                />
                <Label htmlFor={amenity} className="text-sm">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
