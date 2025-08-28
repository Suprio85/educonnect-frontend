import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, MapPin, DollarSign, Wifi, Car, Utensils, Star, MessageSquare, Eye } from "lucide-react"

export default function HousingGrid({ searchQuery, filters, viewMode }) {
  const [sortBy, setSortBy] = useState("price") // Added sort state

  // Mock data - in real app this would come from API
  const allListings = [
    {
      id: 1,
      title: "Cozy Room Near University of Toronto",
      address: "123 College Street, Toronto",
      price: 800,
      roomType: "Private Room",
      images: ["/placeholder.svg?height=200&width=300"],
      amenities: ["WiFi", "Laundry", "Kitchen Access", "Furnished"],
      university: "University of Toronto",
      distance: "0.5km",
      rating: 4.8,
      reviews: 24,
      homeowner: "Sarah Johnson",
      description: "Bright and spacious private room in a shared house, perfect for students.",
      available: true,
      inquiries: 12,
      views: 234,
    },
    {
      id: 2,
      title: "Modern Studio Downtown",
      address: "456 Bay Street, Toronto",
      price: 1200,
      roomType: "Studio",
      images: ["/placeholder.svg?height=200&width=300"],
      amenities: ["WiFi", "Gym", "Air Conditioning", "Furnished", "Parking"],
      university: "Ryerson University",
      distance: "0.8km",
      rating: 4.6,
      reviews: 18,
      homeowner: "Michael Chen",
      description: "Fully furnished modern studio with all amenities included.",
      available: true,
      inquiries: 8,
      views: 156,
    },
    {
      id: 3,
      title: "Shared Room in Student House",
      address: "789 Spadina Avenue, Toronto",
      price: 650,
      roomType: "Shared Room",
      images: ["/placeholder.svg?height=200&width=300"],
      amenities: ["WiFi", "Laundry", "Kitchen Access", "Study Room"],
      university: "University of Toronto",
      distance: "1.2km",
      rating: 4.3,
      reviews: 31,
      homeowner: "Lisa Wang",
      description: "Affordable shared room in a house with other international students.",
      available: true,
      inquiries: 15,
      views: 189,
    },
    {
      id: 4,
      title: "Luxury 1BR Near York University",
      address: "321 Keele Street, North York",
      price: 1500,
      roomType: "1 Bedroom",
      images: ["/placeholder.svg?height=200&width=300"],
      amenities: ["WiFi", "Gym", "Parking", "Air Conditioning", "Furnished", "Pet Friendly"],
      university: "York University",
      distance: "0.3km",
      rating: 4.9,
      reviews: 12,
      homeowner: "David Kim",
      description: "Luxury apartment with premium amenities and excellent location.",
      available: true,
      inquiries: 23,
      views: 298,
    },
    {
      id: 5,
      title: "Budget-Friendly Room",
      address: "654 Bathurst Street, Toronto",
      price: 550,
      roomType: "Private Room",
      images: ["/placeholder.svg?height=200&width=300"],
      amenities: ["WiFi", "Laundry", "Kitchen Access"],
      university: "OCAD University",
      distance: "1.5km",
      rating: 4.1,
      reviews: 19,
      homeowner: "Emma Rodriguez",
      description: "Affordable private room perfect for budget-conscious students.",
      available: true,
      inquiries: 7,
      views: 143,
    },
    {
      id: 6,
      title: "Spacious 2BR Apartment",
      address: "987 Queen Street West, Toronto",
      price: 1800,
      roomType: "2 Bedroom",
      images: ["/placeholder.svg?height=200&width=300"],
      amenities: ["WiFi", "Laundry", "Parking", "Air Conditioning", "Furnished"],
      university: "George Brown College",
      distance: "2.1km",
      rating: 4.7,
      reviews: 15,
      homeowner: "James Thompson",
      description: "Perfect for sharing with a roommate, includes all modern amenities.",
      available: false,
      inquiries: 31,
      views: 412,
    },
  ]

  const filteredListings = useMemo(() => {
    const filtered = allListings.filter((listing) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          listing.title.toLowerCase().includes(query) ||
          listing.address.toLowerCase().includes(query) ||
          listing.university.toLowerCase().includes(query) ||
          listing.roomType.toLowerCase().includes(query)

        if (!matchesSearch) return false
      }

      // Apply filters
      if (filters.roomType && listing.roomType !== filters.roomType) return false
      if (filters.university && listing.university !== filters.university) return false

      // Price range filter
      if (filters.priceRange) {
        const price = listing.price
        switch (filters.priceRange) {
          case "Under $500":
            if (price >= 500) return false
            break
          case "$500 - $800":
            if (price < 500 || price > 800) return false
            break
          case "$800 - $1200":
            if (price < 800 || price > 1200) return false
            break
          case "$1200 - $1500":
            if (price < 1200 || price > 1500) return false
            break
          case "$1500 - $2000":
            if (price < 1500 || price > 2000) return false
            break
          case "Over $2000":
            if (price <= 2000) return false
            break
        }
      }

      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((amenity) => listing.amenities.includes(amenity))
        if (!hasAllAmenities) return false
      }

      return true
    })

    // Sorting logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return Number.parseFloat(a.distance) - Number.parseFloat(b.distance)
        case "rating":
          return b.rating - a.rating
        case "price":
        default:
          return a.price - b.price
      }
    })

    return filtered
  }, [searchQuery, filters, allListings, sortBy])

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "WiFi":
        return Wifi
      case "Parking":
        return Car
      case "Kitchen Access":
        return Utensils
      default:
        return Home
    }
  }

  if (viewMode === "map") {
    return (
      <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Map View</h3>
          <p className="text-muted-foreground">Interactive map view would be implemented here</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">Showing {filteredListings.length} properties</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            variant={sortBy === "price" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortBy("price")}
            className={sortBy === "price" ? "bg-accent" : ""}
          >
            Price
          </Button>
          <Button
            variant={sortBy === "distance" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortBy("distance")}
            className={sortBy === "distance" ? "bg-accent" : ""}
          >
            Distance
          </Button>
          <Button
            variant={sortBy === "rating" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortBy("rating")}
            className={sortBy === "rating" ? "bg-accent" : ""}
          >
            Rating
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex">
              {/* Image */}
              <div className="w-80 flex-shrink-0">
                <img
                  src={listing.images[0] || "/placeholder.svg"}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-l-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{listing.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {listing.address}
                        </span>
                        <span className="flex items-center">
                          <Home className="h-4 w-4 mr-1" />
                          {listing.university} • {listing.distance}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{listing.rating}</span>
                        <span className="text-sm text-muted-foreground">({listing.reviews})</span>
                      </div>
                      <Badge variant={listing.available ? "default" : "secondary"}>
                        {listing.available ? "Available" : "Occupied"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-4">{listing.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center font-bold text-2xl text-accent">
                        <DollarSign className="h-5 w-5 mr-1" />
                        {listing.price}
                        <span className="text-sm font-normal text-muted-foreground ml-1">/month</span>
                      </span>
                      <Badge variant="outline">{listing.roomType}</Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {listing.views} views
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {listing.inquiries} inquiries
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {listing.amenities.slice(0, 4).map((amenity, index) => {
                        const AmenityIcon = getAmenityIcon(amenity)
                        return (
                          <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <AmenityIcon className="h-3 w-3" />
                            <span>{amenity}</span>
                          </div>
                        )
                      })}
                      {listing.amenities.length > 4 && (
                        <span className="text-xs text-muted-foreground">+{listing.amenities.length - 4} more</span>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Details
                      </Button>
                      <Button size="sm" className="bg-accent hover:bg-accent/90" disabled={!listing.available}>
                        {listing.available ? "Contact Owner" : "Not Available"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <Home className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No properties found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters to find more options.</p>
        </div>
      )}
    </div>
  )
}
