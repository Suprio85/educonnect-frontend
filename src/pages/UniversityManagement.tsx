"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, MapPin, Users } from "lucide-react"
import UniversityForm from "@/components/form/university-form"

export default function UniversitiesManagement() {
  const [showForm, setShowForm] = useState(false)
  const [editingUniversity, setEditingUniversity] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in real app this would come from API
  const [universities, setUniversities] = useState([
    {
      id: 1,
      name: "Harvard University",
      shortName: "Harvard",
      country: "United States",
      city: "Cambridge",
      type: "private",
      ranking: 1,
      students: 23000,
      departments: ["Computer Science", "Medicine", "Law", "Business"],
      status: "active",
    },
    {
      id: 2,
      name: "Massachusetts Institute of Technology",
      shortName: "MIT",
      country: "United States",
      city: "Cambridge",
      type: "private",
      ranking: 2,
      students: 11500,
      departments: ["Engineering", "Computer Science", "Physics", "Mathematics"],
      status: "active",
    },
    {
      id: 3,
      name: "University of Oxford",
      shortName: "Oxford",
      country: "United Kingdom",
      city: "Oxford",
      type: "public",
      ranking: 3,
      students: 24000,
      departments: ["Humanities", "Sciences", "Medicine", "Social Sciences"],
      status: "active",
    },
  ])

  const filteredUniversities = universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSaveUniversity = (universityData) => {
    if (editingUniversity) {
      // Update existing university
      setUniversities((prev) =>
        prev.map((uni) => (uni.id === editingUniversity.id ? { ...universityData, id: editingUniversity.id } : uni)),
      )
    } else {
      // Add new university
      const newUniversity = {
        ...universityData,
        id: Date.now(),
        status: "active",
      }
      setUniversities((prev) => [...prev, newUniversity])
    }
    setShowForm(false)
    setEditingUniversity(null)
  }

  const handleEditUniversity = (university) => {
    setEditingUniversity(university)
    setShowForm(true)
  }

  const handleDeleteUniversity = (id) => {
    if (confirm("Are you sure you want to delete this university?")) {
      setUniversities((prev) => prev.filter((uni) => uni.id !== id))
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "private":
        return "bg-blue-100 text-blue-800"
      case "public":
        return "bg-green-100 text-green-800"
      case "research":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (showForm) {
    return (
    <div className="max-w-3xl mx-auto my-auto px-4 sm:px-6 lg:px-8 py-16">
        <UniversityForm
          university={editingUniversity}
          onSave={handleSaveUniversity}
          onCancel={() => {
            setShowForm(false)
            setEditingUniversity(null)
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
          <h1 className="font-heading font-black text-3xl text-foreground mb-2">Universities Management</h1>
          <p className="text-muted-foreground">Manage university profiles, information, and settings.</p>
        </div>
        <Button onClick={() => setShowForm(true)} >
          <Plus className="mr-2 h-4 w-4" />
          Add University
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search universities by name, country, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Universities Grid */}
      <div className="grid gap-6">
        {filteredUniversities.map((university) => (
          <Card key={university.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{university.name}</h3>
                    <Badge className={getTypeColor(university.type)}>{university.type}</Badge>
                    {university.ranking && <Badge variant="outline">Rank #{university.ranking}</Badge>}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {university.city}, {university.country}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {university.students?.toLocaleString()} students
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {university.departments?.slice(0, 4).map((dept, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {dept}
                      </Badge>
                    ))}
                    {university.departments?.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{university.departments.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditUniversity(university)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteUniversity(university.id)}
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

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No universities found matching your search.</p>
        </div>
      )}
    </div>
  )
}
