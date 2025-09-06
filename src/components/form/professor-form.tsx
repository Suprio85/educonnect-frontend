import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Upload, Mail, Phone, Globe, MapPin } from "lucide-react"

export default function ProfessorProfileForm({ professor = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: professor?.firstName || "",
    lastName: professor?.lastName || "",
    title: professor?.title || "Professor",
    department: professor?.department || "",
    university: professor?.university || "",
    bio: professor?.bio || "",
    profileImage: professor?.profileImage || null,

    // Contact Information
    email: professor?.email || "",
    phone: professor?.phone || "",
    office: professor?.office || "",
    website: professor?.website || "",

    // Academic Information
    education: professor?.education || [],
    researchInterests: professor?.researchInterests || [],
    publications: professor?.publications || [],
    awards: professor?.awards || [],

    // Research & Teaching
    currentProjects: professor?.currentProjects || [],
    courses: professor?.courses || [],
    openPositions: professor?.openPositions || [],

    // Social Links
    googleScholar: professor?.googleScholar || "",
    orcid: professor?.orcid || "",
    linkedin: professor?.linkedin || "",
    twitter: professor?.twitter || "",
  })

  const [newItems, setNewItems] = useState({
    education: "",
    researchInterest: "",
    publication: "",
    award: "",
    project: "",
    course: "",
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
            Update Professor Profile
            <Button variant="ghost" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="title">Academic Title</Label>
                  <select
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Research Professor">Research Professor</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => handleInputChange("university", e.target.value)}
                  placeholder="Harvard University"
                />
              </div>

              <div className="mt-4">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Brief professional biography..."
                  rows={4}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
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
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="office">Office Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="office"
                      value={formData.office}
                      onChange={(e) => handleInputChange("office", e.target.value)}
                      placeholder="Room 123, Science Building"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Personal Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Research Interests */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Research Interests</h3>
              <div className="flex gap-2">
                <Input
                  value={newItems.researchInterest}
                  onChange={(e) => setNewItems((prev) => ({ ...prev, researchInterest: e.target.value }))}
                  placeholder="Add research interest..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addArrayItem("researchInterests", "researchInterest"))
                  }
                />
                <Button type="button" onClick={() => addArrayItem("researchInterests", "researchInterest")} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.researchInterests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {interest}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("researchInterests", index)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Education</h3>
              <div className="flex gap-2">
                <Input
                  value={newItems.education}
                  onChange={(e) => setNewItems((prev) => ({ ...prev, education: e.target.value }))}
                  placeholder="PhD Computer Science, MIT (2010)"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addArrayItem("education", "education"))}
                />
                <Button type="button" onClick={() => addArrayItem("education", "education")} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 mt-3">
                {formData.education.map((edu, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{edu}</span>
                    <X
                      className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                      onClick={() => removeArrayItem("education", index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Publications</h3>
              <div className="flex gap-2">
                <Input
                  value={newItems.publication}
                  onChange={(e) => setNewItems((prev) => ({ ...prev, publication: e.target.value }))}
                  placeholder="Publication title and journal..."
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addArrayItem("publications", "publication"))
                  }
                />
                <Button type="button" onClick={() => addArrayItem("publications", "publication")} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2 mt-3">
                {formData.publications.map((pub, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{pub}</span>
                    <X
                      className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground"
                      onClick={() => removeArrayItem("publications", index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Academic & Social Links</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="googleScholar">Google Scholar</Label>
                  <Input
                    id="googleScholar"
                    value={formData.googleScholar}
                    onChange={(e) => handleInputChange("googleScholar", e.target.value)}
                    placeholder="https://scholar.google.com/..."
                  />
                </div>
                <div>
                  <Label htmlFor="orcid">ORCID</Label>
                  <Input
                    id="orcid"
                    value={formData.orcid}
                    onChange={(e) => handleInputChange("orcid", e.target.value)}
                    placeholder="0000-0000-0000-0000"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                    placeholder="@username"
                  />
                </div>
              </div>
            </div>

            {/* Profile Image Upload */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Profile Image</h3>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload profile image or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                Update Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
