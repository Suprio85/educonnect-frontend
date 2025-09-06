import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, MapPin, Globe, Phone, Mail } from "lucide-react"

export default function UniversityForm({ university = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: university?.name || "",
    shortName: university?.shortName || "",
    description: university?.description || "",
    website: university?.website || "",
    email: university?.email || "",
    phone: university?.phone || "",
    address: university?.address || "",
    city: university?.city || "",
    country: university?.country || "",
    established: university?.established || "",
    type: university?.type || "public",
    ranking: university?.ranking || "",
    departments: university?.departments || [],
    programs: university?.programs || [],
    tuitionRange: university?.tuitionRange || { min: "", max: "" },
    logo: university?.logo || null,
    images: university?.images || [],
  })

  const [newDepartment, setNewDepartment] = useState("")
  const [newProgram, setNewProgram] = useState("")

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTuitionChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      tuitionRange: {
        ...prev.tuitionRange,
        [type]: value,
      },
    }))
  }

  const addDepartment = () => {
    if (newDepartment.trim()) {
      setFormData((prev) => ({
        ...prev,
        departments: [...prev.departments, newDepartment.trim()],
      }))
      setNewDepartment("")
    }
  }

  const removeDepartment = (index) => {
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.filter((_, i) => i !== index),
    }))
  }

  const addProgram = () => {
    if (newProgram.trim()) {
      setFormData((prev) => ({
        ...prev,
        programs: [...prev.programs, newProgram.trim()],
      }))
      setNewProgram("")
    }
  }

  const removeProgram = (index) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {university ? "Edit University" : "Add New University"}
            <Button variant="ghost" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">University Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Harvard University"
                  required
                />
              </div>
              <div>
                <Label htmlFor="shortName">Short Name</Label>
                <Input
                  id="shortName"
                  value={formData.shortName}
                  onChange={(e) => handleInputChange("shortName", e.target.value)}
                  placeholder="Harvard"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Brief description of the university..."
                rows={4}
                required
              />
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://university.edu"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="admissions@university.edu"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="123 University Ave"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Cambridge"
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  placeholder="United States"
                />
              </div>
            </div>

            {/* University Details */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="established">Established Year</Label>
                <Input
                  id="established"
                  type="number"
                  value={formData.established}
                  onChange={(e) => handleInputChange("established", e.target.value)}
                  placeholder="1636"
                />
              </div>
              <div>
                <Label htmlFor="type">University Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="research">Research</option>
                  <option value="liberal-arts">Liberal Arts</option>
                </select>
              </div>
              <div>
                <Label htmlFor="ranking">World Ranking</Label>
                <Input
                  id="ranking"
                  type="number"
                  value={formData.ranking}
                  onChange={(e) => handleInputChange("ranking", e.target.value)}
                  placeholder="1"
                />
              </div>
            </div>

            {/* Tuition Range */}
            <div>
              <Label>Tuition Range (USD per year)</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Input
                    value={formData.tuitionRange.min}
                    onChange={(e) => handleTuitionChange("min", e.target.value)}
                    placeholder="Minimum"
                    type="number"
                  />
                </div>
                <div>
                  <Input
                    value={formData.tuitionRange.max}
                    onChange={(e) => handleTuitionChange("max", e.target.value)}
                    placeholder="Maximum"
                    type="number"
                  />
                </div>
              </div>
            </div>

            {/* Departments */}
            <div>
              <Label>Departments</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  placeholder="Add department..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDepartment())}
                />
                <Button type="button" onClick={addDepartment} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.departments.map((dept, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {dept}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeDepartment(index)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div>
              <Label>Programs Offered</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newProgram}
                  onChange={(e) => setNewProgram(e.target.value)}
                  placeholder="Add program..."
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addProgram())}
                />
                <Button type="button" onClick={addProgram} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.programs.map((program, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {program}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeProgram(index)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <Label>University Logo</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload logo or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {university ? "Update University" : "Create University"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
