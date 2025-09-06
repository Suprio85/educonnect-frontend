"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DollarSign, Edit, Eye, Home, MapPin, Plus, Search, Trash2, Users } from "lucide-react"
import { useState } from "react"

export default function HousingManagement() {
  const [showForm, setShowForm] = useState(false)
  const [editingHouse, setEditingHouse] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in real app this would come from API
  const [houses, setHouses] = useState([
    {
      id: 1,
      title: "Modern Studio Near Harvard",
      type: "studio",
      price: 2500,
      location: "Cambridge, MA",
      address: "123 Harvard Street, Cambridge, MA 02138",
      bedrooms: 0,
      bathrooms: 1,
      sqft: 450,
      description: "Beautiful modern studio apartment just 5 minutes walk from Harvard University.",
      amenities: ["WiFi", "Laundry", "Parking", "AC", "Furnished"],
      images: [],
      landlord: "John Doe",
      contact: "john.doe@email.com",
      phone: "+1 (617) 555-0123",
      status: "available",
      university: "Harvard University",
      datePosted: "2024-01-15",
    },
    {
      id: 2,
      title: "Shared Apartment - MIT Area",
      type: "shared",
      price: 1200,
      location: "Cambridge, MA",
      address: "456 MIT Avenue, Cambridge, MA 02139",
      bedrooms: 1,
      bathrooms: 1,
      sqft: 600,
      description: "Share a 3-bedroom apartment with other graduate students near MIT campus.",
      amenities: ["WiFi", "Kitchen", "Study Room", "Bike Storage"],
      images: [],
      landlord: "Jane Smith",
      contact: "jane.smith@email.com",
      phone: "+1 (617) 555-0456",
      status: "available",
      university: "MIT",
      datePosted: "2024-01-20",
    },
    {
      id: 3,
      title: "Luxury 2BR Near Stanford",
      type: "apartment",
      price: 3800,
      location: "Palo Alto, CA",
      address: "789 Stanford Road, Palo Alto, CA 94305",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      description: "Luxury 2-bedroom apartment with modern amenities, perfect for students or young professionals.",
      amenities: ["WiFi", "Gym", "Pool", "Parking", "Balcony", "Dishwasher"],
      images: [],
      landlord: "Mike Johnson",
      contact: "mike.johnson@email.com",
      phone: "+1 (650) 555-0789",
      status: "rented",
      university: "Stanford University",
      datePosted: "2024-01-10",
    },
  ])

  const filteredHouses = houses.filter(
    (house) =>
      house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSaveHouse = (houseData) => {
    if (editingHouse) {
      // Update existing house
      setHouses((prev) =>
        prev.map((house) => (house.id === editingHouse.id ? { ...houseData, id: editingHouse.id } : house)),
      )
    } else {
      // Add new house
      const newHouse = {
        ...houseData,
        id: Date.now(),
        status: "available",
        datePosted: new Date().toISOString().split('T')[0],
      }
      setHouses((prev) => [...prev, newHouse])
    }
    setShowForm(false)
    setEditingHouse(null)
  }

  const handleEditHouse = (house) => {
    setEditingHouse(house)
    setShowForm(true)
  }

  const handleDeleteHouse = (id) => {
    if (confirm("Are you sure you want to delete this housing listing?")) {
      setHouses((prev) => prev.filter((house) => house.id !== id))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "rented":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "studio":
        return "bg-blue-100 text-blue-800"
      case "apartment":
        return "bg-purple-100 text-purple-800"
      case "shared":
        return "bg-orange-100 text-orange-800"
      case "dorm":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (showForm) {
    return (
      <div className="max-w-5xl mx-auto my-auto px-4 sm:px-6 lg:px-8 py-16">
        <HouseForm
          house={editingHouse}
          onSave={handleSaveHouse}
          onCancel={() => {
            setShowForm(false)
            setEditingHouse(null)
          }}
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto my-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 mt-20">
        <div>
          <h1 className="font-heading font-black text-3xl text-foreground mb-2">Housing Management</h1>
          <p className="text-muted-foreground">Manage housing listings, approvals, and tenant information.</p>
        </div>
        <Button onClick={() => setShowForm(true)} >
          <Plus className="mr-2 h-4 w-4" />
          Add Housing
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search housing by title, location, university, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Housing Grid */}
      <div className="grid gap-6">
        {filteredHouses.map((house) => (
          <Card key={house.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{house.title}</h3>
                    <Badge className={getTypeColor(house.type)}>{house.type}</Badge>
                    <Badge className={getStatusColor(house.status)}>{house.status}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {house.location}
                    </span>
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${house.price}/month
                    </span>
                    <span className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      {house.bedrooms} bed, {house.bathrooms} bath
                    </span>
                    {house.sqft && (
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {house.sqft} sqft
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground mb-3">
                    <p className="font-medium">University: {house.university}</p>
                    <p>Landlord: {house.landlord} • {house.contact}</p>
                    <p>Address: {house.address}</p>
                  </div>

                  {house.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {house.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {house.amenities?.slice(0, 5).map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {house.amenities?.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{house.amenities.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditHouse(house)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteHouse(house.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHouses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No housing listings found matching your search.</p>
        </div>
      )}
    </div>
  )
}

// Simple House Form Component (you can expand this)
function HouseForm({ house = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: house?.title || "",
    type: house?.type || "apartment",
    price: house?.price || "",
    location: house?.location || "",
    address: house?.address || "",
    bedrooms: house?.bedrooms || 1,
    bathrooms: house?.bathrooms || 1,
    sqft: house?.sqft || "",
    description: house?.description || "",
    university: house?.university || "",
    landlord: house?.landlord || "",
    contact: house?.contact || "",
    phone: house?.phone || "",
    amenities: house?.amenities || [],
  })

  const [newAmenity, setNewAmenity] = useState("")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }))
      setNewAmenity("")
    }
  }

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {house ? "Edit Housing Listing" : "Add New Housing Listing"}
          </h2>
          <Button variant="ghost" onClick={onCancel}>
            ×
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="studio">Studio</option>
                <option value="apartment">Apartment</option>
                <option value="shared">Shared</option>
                <option value="dorm">Dorm</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price per month *</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange("price", parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bedrooms</label>
              <Input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => handleInputChange("bedrooms", parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bathrooms</label>
              <Input
                type="number"
                step="0.5"
                value={formData.bathrooms}
                onChange={(e) => handleInputChange("bathrooms", parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location *</label>
              <Input
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="City, State"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">University</label>
              <Input
                value={formData.university}
                onChange={(e) => handleInputChange("university", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Address</label>
            <Input
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="123 Main St, City, State, ZIP"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              rows={4}
              placeholder="Describe the property..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Landlord Name</label>
              <Input
                value={formData.landlord}
                onChange={(e) => handleInputChange("landlord", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <Input
                type="email"
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amenities</label>
            <div className="flex gap-2 mb-3">
              <Input
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                placeholder="Add amenity..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
              />
              <Button type="button" onClick={addAmenity} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenity, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {amenity}
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="ml-1 text-xs"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {house ? "Update Listing" : "Create Listing"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
