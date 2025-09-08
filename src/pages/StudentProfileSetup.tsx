"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { BookOpen, GraduationCap, MapPin, Plus, Star, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function StudentProfileSetup() {
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: user?.name || "",
    dateOfBirth: "",
    phone: "",
    currentAddress: "",
    permanentAddress: "",
    
    // Academic Information
    currentEducationLevel: "undergraduate", // undergraduate, graduate, postgraduate
    currentInstitution: "",
    currentMajor: "",
    cgpa: "",
    graduationYear: "",
    
    // Preferences
    interestedUniversities: [],
    preferredLocations: [],
    preferredSubjects: [],
    favoriteTopics: [],
    researchInterests: [],
    studyLevel: "bachelor", // bachelor, master, phd
    
    // Additional Information
    careerGoals: "",
    extracurriculars: [],
    languages: [],
    budget: "",
    scholarshipInterest: true,
  })

  const [newItems, setNewItems] = useState({
    university: "",
    location: "",
    subject: "",
    topic: "",
    researchInterest: "",
    extracurricular: "",
    language: "",
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
    
    // Validation
    if (!formData.fullName || !formData.currentInstitution || !formData.cgpa) {
      toast({
        title: "Please fill required fields",
        description: "Name, current institution, and CGPA are required.",
        variant: "destructive"
      })
      return
    }

    if (formData.interestedUniversities.length === 0) {
      toast({
        title: "Add interested universities",
        description: "Please add at least one university you're interested in.",
        variant: "destructive"
      })
      return
    }

    // Save profile data (in real app, this would go to backend)
    localStorage.setItem("studentProfile", JSON.stringify(formData))
    localStorage.setItem("profileCompleted", "true")
    
    toast({
      title: "Profile completed!",
      description: "Your profile has been saved. You can now get personalized recommendations.",
    })
    
    navigate("/dashboard")
  }

  const educationLevels = [
    { value: "high-school", label: "High School" },
    { value: "undergraduate", label: "Undergraduate" },
    { value: "graduate", label: "Graduate" },
    { value: "postgraduate", label: "Postgraduate" },
  ]

  const studyLevels = [
    { value: "diploma", label: "Diploma" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD/Doctorate" },
  ]

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <GraduationCap className="h-6 w-6" />
              Complete Your Student Profile
            </CardTitle>
            <p className="text-muted-foreground">
              Help us provide personalized university and scholarship recommendations by completing your profile.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Study Budget (Annual)</Label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Select budget range</option>
                      <option value="0-10000">$0 - $10,000</option>
                      <option value="10000-25000">$10,000 - $25,000</option>
                      <option value="25000-50000">$25,000 - $50,000</option>
                      <option value="50000-100000">$50,000 - $100,000</option>
                      <option value="100000+">$100,000+</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="currentAddress">Current Address</Label>
                  <Textarea
                    id="currentAddress"
                    value={formData.currentAddress}
                    onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                    placeholder="Your current address"
                    rows={2}
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Academic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentEducationLevel">Current Education Level</Label>
                    <select
                      id="currentEducationLevel"
                      value={formData.currentEducationLevel}
                      onChange={(e) => handleInputChange("currentEducationLevel", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      {educationLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="studyLevel">Interested Study Level</Label>
                    <select
                      id="studyLevel"
                      value={formData.studyLevel}
                      onChange={(e) => handleInputChange("studyLevel", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      {studyLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="currentInstitution">Current Institution *</Label>
                    <Input
                      id="currentInstitution"
                      value={formData.currentInstitution}
                      onChange={(e) => handleInputChange("currentInstitution", e.target.value)}
                      placeholder="Your current school/college"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentMajor">Current Major/Field</Label>
                    <Input
                      id="currentMajor"
                      value={formData.currentMajor}
                      onChange={(e) => handleInputChange("currentMajor", e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cgpa">CGPA/GPA *</Label>
                    <Input
                      id="cgpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={formData.cgpa}
                      onChange={(e) => handleInputChange("cgpa", e.target.value)}
                      placeholder="3.75"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="graduationYear">Expected Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    min="2024"
                    max="2030"
                    value={formData.graduationYear}
                    onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                    placeholder="2025"
                  />
                </div>
              </div>

              {/* Interested Universities */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Interested Universities</h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newItems.university}
                    onChange={(e) => setNewItems((prev) => ({ ...prev, university: e.target.value }))}
                    placeholder="Add university name..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addArrayItem("interestedUniversities", "university"))
                    }
                  />
                  <Button type="button" onClick={() => addArrayItem("interestedUniversities", "university")} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.interestedUniversities.map((university, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {university}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("interestedUniversities", index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Preferred Locations */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Preferred Study Locations</h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newItems.location}
                    onChange={(e) => setNewItems((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Add location (city, state, country)..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addArrayItem("preferredLocations", "location"))
                    }
                  />
                  <Button type="button" onClick={() => addArrayItem("preferredLocations", "location")} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.preferredLocations.map((location, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {location}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("preferredLocations", index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Preferred Subjects */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Preferred Subjects</h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newItems.subject}
                    onChange={(e) => setNewItems((prev) => ({ ...prev, subject: e.target.value }))}
                    placeholder="Add subject/field of interest..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addArrayItem("preferredSubjects", "subject"))
                    }
                  />
                  <Button type="button" onClick={() => addArrayItem("preferredSubjects", "subject")} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.preferredSubjects.map((subject, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {subject}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("preferredSubjects", index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Favorite Topics */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Favorite Topics & Interests
                </h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newItems.topic}
                    onChange={(e) => setNewItems((prev) => ({ ...prev, topic: e.target.value }))}
                    placeholder="Add favorite topics..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addArrayItem("favoriteTopics", "topic"))
                    }
                  />
                  <Button type="button" onClick={() => addArrayItem("favoriteTopics", "topic")} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.favoriteTopics.map((topic, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {topic}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("favoriteTopics", index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Research Interests */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Research Interests
                </h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={newItems.researchInterest}
                    onChange={(e) => setNewItems((prev) => ({ ...prev, researchInterest: e.target.value }))}
                    placeholder="Add research interests (e.g., Machine Learning, Bioengineering, Climate Science)..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addArrayItem("researchInterests", "researchInterest"))
                    }
                  />
                  <Button type="button" onClick={() => addArrayItem("researchInterests", "researchInterest")} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.researchInterests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {interest}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeArrayItem("researchInterests", index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Career Goals */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Career Goals & Aspirations</h3>
                <Textarea
                  value={formData.careerGoals}
                  onChange={(e) => handleInputChange("careerGoals", e.target.value)}
                  placeholder="Describe your career goals and what you hope to achieve with your education..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                  Skip for Now
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Complete Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
