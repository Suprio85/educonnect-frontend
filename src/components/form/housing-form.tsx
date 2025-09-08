"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, DollarSign, Home, MapPin, Plus, Upload, Users, X } from "lucide-react"
import { useState } from "react"

export default function HousingForm({ housing = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    // Basic Information
    title: housing?.title || "",
    description: housing?.description || "",
    type: housing?.type || "apartment",
    status: housing?.status || "available",

    // Location Details
    address: housing?.address || "",
    city: housing?.city || "",
    state: housing?.state || "",
    zipCode: housing?.zipCode || "",
    country: housing?.country || "United States",
    university: housing?.university || "",
    distanceToUniversity: housing?.distanceToUniversity || "",

    // Property Details
    price: housing?.price || "",
    priceType: housing?.priceType || "monthly",
    bedrooms: housing?.bedrooms || 1,
    bathrooms: housing?.bathrooms || 1,
    sqft: housing?.sqft || "",
    furnished: housing?.furnished || false,
    petFriendly: housing?.petFriendly || false,

    // Landlord Information
    landlordName: housing?.landlordName || "",
    landlordEmail: housing?.landlordEmail || "",
    landlordPhone: housing?.landlordPhone || "",
    propertyManagement: housing?.propertyManagement || "",

    // Additional Details
    amenities: housing?.amenities || [],
    rules: housing?.rules || [],
    utilities: housing?.utilities || [],
    parking: housing?.parking || "none",
    availableFrom: housing?.availableFrom || "",
    leaseDuration: housing?.leaseDuration || "12 months",
    images: housing?.images || [],
  })

  const [newItems, setNewItems] = useState({
    amenity: "",
    rule: "",
    utility: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addArrayItem = (arrayName, itemKey) => {
    const value = newItems[itemKey].trim()
    if (value) {
      setFormData((prev) => ({
        ...prev,
        [arrayName]: [...prev[arrayName], value],
      }))
      setNewItems((prev) => ({
        ...prev,
        [itemKey]: "",
      }))
    }
  }

  const removeArrayItem = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 py-14">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {housing ? "Edit Housing Listing" : "Create New Housing Listing"}
            <Button variant="ghost" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Listing Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Modern Studio Near Harvard University"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Property Type *</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange("type", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="studio">Studio</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="shared">Shared Room</option>
                      <option value="dorm">Dormitory</option>
                      <option value="townhouse">Townhouse</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="available">Available</option>
                      <option value="rented">Rented</option>
                      <option value="pending">Pending</option>
                      <option value="maintenance">Under Maintenance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe the property, its features, and nearby amenities..."
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Main Street"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Cambridge"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="Massachusetts"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      placeholder="02138"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="university">Nearby University</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => handleInputChange("university", e.target.value)}
                      placeholder="Harvard University"
                    />
                  </div>
                  <div>
                    <Label htmlFor="distanceToUniversity">Distance to University</Label>
                    <Input
                      id="distanceToUniversity"
                      value={formData.distanceToUniversity}
                      onChange={(e) => handleInputChange("distanceToUniversity", e.target.value)}
                      placeholder="5 minutes walk"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Property Details</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Rent Amount *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", parseInt(e.target.value))}
                        placeholder="2500"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="priceType">Price Type</Label>
                    <select
                      id="priceType"
                      value={formData.priceType}
                      onChange={(e) => handleInputChange("priceType", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="monthly">Per Month</option>
                      <option value="weekly">Per Week</option>
                      <option value="daily">Per Day</option>
                      <option value="semester">Per Semester</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="sqft">Square Feet</Label>
                    <Input
                      id="sqft"
                      type="number"
                      value={formData.sqft}
                      onChange={(e) => handleInputChange("sqft", parseInt(e.target.value))}
                      placeholder="800"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="bedrooms"
                        type="number"
                        min="0"
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange("bedrooms", parseInt(e.target.value))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      min="0"
                      step="0.5"
                      value={formData.bathrooms}
                      onChange={(e) => handleInputChange("bathrooms", parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="parking">Parking</Label>
                    <select
                      id="parking"
                      value={formData.parking}
                      onChange={(e) => handleInputChange("parking", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="none">No Parking</option>
                      <option value="street">Street Parking</option>
                      <option value="garage">Garage</option>
                      <option value="driveway">Driveway</option>
                      <option value="assigned">Assigned Spot</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="furnished"
                      checked={formData.furnished}
                      onChange={(e) => handleInputChange("furnished", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="furnished">Furnished</Label>
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="petFriendly"
                      checked={formData.petFriendly}
                      onChange={(e) => handleInputChange("petFriendly", e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="petFriendly">Pet Friendly</Label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="availableFrom">Available From</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="availableFrom"
                        type="date"
                        value={formData.availableFrom}
                        onChange={(e) => handleInputChange("availableFrom", e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="leaseDuration">Lease Duration</Label>
                    <select
                      id="leaseDuration"
                      value={formData.leaseDuration}
                      onChange={(e) => handleInputChange("leaseDuration", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="1 month">1 Month</option>
                      <option value="3 months">3 Months</option>
                      <option value="6 months">6 Months</option>
                      <option value="12 months">12 Months</option>
                      <option value="24 months">24 Months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Landlord Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Landlord/Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landlordName">Landlord Name *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="landlordName"
                      value={formData.landlordName}
                      onChange={(e) => handleInputChange("landlordName", e.target.value)}
                      placeholder="John Smith"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="propertyManagement">Property Management Company</Label>
                  <Input
                    id="propertyManagement"
                    value={formData.propertyManagement}
                    onChange={(e) => handleInputChange("propertyManagement", e.target.value)}
                    placeholder="ABC Property Management"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="landlordEmail">Contact Email *</Label>
                  <Input
                    id="landlordEmail"
                    type="email"
                    value={formData.landlordEmail}
                    onChange={(e) => handleInputChange("landlordEmail", e.target.value)}
                    placeholder="landlord@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="landlordPhone">Contact Phone</Label>
                  <Input
                    id="landlordPhone"
                    value={formData.landlordPhone}
                    onChange={(e) => handleInputChange("landlordPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Amenities</h3>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newItems.amenity}
                  onChange={(e) => setNewItems((prev) => ({ ...prev, amenity: e.target.value }))}
                  placeholder="Add amenity (e.g., WiFi, Laundry, Gym)..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addArrayItem("amenities", "amenity"))
                  }
                />
                <Button type="button" onClick={() => addArrayItem("amenities", "amenity")} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {amenity}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("amenities", index)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Utilities */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Utilities Included</h3>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newItems.utility}
                  onChange={(e) => setNewItems((prev) => ({ ...prev, utility: e.target.value }))}
                  placeholder="Add utility (e.g., Electricity, Water, Internet)..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addArrayItem("utilities", "utility"))
                  }
                />
                <Button type="button" onClick={() => addArrayItem("utilities", "utility")} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.utilities.map((utility, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {utility}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("utilities", index)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h3 className="text-lg font-semibold mb-4">House Rules</h3>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newItems.rule}
                  onChange={(e) => setNewItems((prev) => ({ ...prev, rule: e.target.value }))}
                  placeholder="Add rule (e.g., No smoking, No parties after 10 PM)..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addArrayItem("rules", "rule"))
                  }
                />
                <Button type="button" onClick={() => addArrayItem("rules", "rule")} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.rules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{rule}</span>
                    <X
                      className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                      onClick={() => removeArrayItem("rules", index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Images Upload */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Property Images</h3>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload property images or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB each (max 10 images)</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {housing ? "Update Listing" : "Create Listing"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
