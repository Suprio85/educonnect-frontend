"use client"

import ProfessorProfileForm from "@/components/form/professor-form"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Edit, Eye, GraduationCap, Mail, MapPin, Phone, Plus, Search, Trash2 } from "lucide-react"
import { useState } from "react"

export default function ProfessorManagement() {
  const [showForm, setShowForm] = useState(false)
  const [editingProfessor, setEditingProfessor] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data - in real app this would come from API
  const [professors, setProfessors] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      title: "Professor",
      department: "Computer Science",
      university: "Harvard University",
      email: "john.smith@harvard.edu",
      phone: "+1 (617) 495-1000",
      office: "Maxwell Dworkin 123",
      researchInterests: ["Machine Learning", "Artificial Intelligence", "Data Science"],
      bio: "Leading researcher in machine learning and AI with over 15 years of experience.",
      status: "active",
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson",
      title: "Associate Professor", 
      department: "Mathematics",
      university: "MIT",
      email: "sarah.johnson@mit.edu",
      phone: "+1 (617) 253-1000",
      office: "Building 2, Room 390",
      researchInterests: ["Applied Mathematics", "Statistical Analysis", "Computational Mathematics"],
      bio: "Expert in applied mathematics with focus on statistical modeling.",
      status: "active",
    },
    {
      id: 3,
      firstName: "Michael",
      lastName: "Brown",
      title: "Assistant Professor",
      department: "Physics",
      university: "Stanford University",
      email: "michael.brown@stanford.edu",
      phone: "+1 (650) 723-2300",
      office: "Varian Physics Building 108",
      researchInterests: ["Quantum Physics", "Theoretical Physics", "Particle Physics"],
      bio: "Young researcher specializing in quantum mechanics and theoretical physics.",
      status: "pending",
    },
  ])

  const filteredProfessors = professors.filter(
    (prof) =>
      prof.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.university.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSaveProfessor = (professorData) => {
    if (editingProfessor) {
      // Update existing professor
      setProfessors((prev) =>
        prev.map((prof) => (prof.id === editingProfessor.id ? { ...professorData, id: editingProfessor.id } : prof)),
      )
    } else {
      // Add new professor
      const newProfessor = {
        ...professorData,
        id: Date.now(),
        status: "pending",
      }
      setProfessors((prev) => [...prev, newProfessor])
    }
    setShowForm(false)
    setEditingProfessor(null)
  }

  const handleEditProfessor = (professor) => {
    setEditingProfessor(professor)
    setShowForm(true)
  }

  const handleDeleteProfessor = (id) => {
    if (confirm("Are you sure you want to delete this professor?")) {
      setProfessors((prev) => prev.filter((prof) => prof.id !== id))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (showForm) {
    return (
      <div className="max-w-5xl mx-auto my-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProfessorProfileForm
          professor={editingProfessor}
          onSave={handleSaveProfessor}
          onCancel={() => {
            setShowForm(false)
            setEditingProfessor(null)
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
          <h1 className="font-heading font-black text-3xl text-foreground mb-2">Professor Management</h1>
          <p className="text-muted-foreground">Manage professor profiles, approvals, and information.</p>
        </div>
        <Button onClick={() => setShowForm(true)} >
          <Plus className="mr-2 h-4 w-4" />
          Add Professor
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search professors by name, department, or university..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Professors Grid */}
      <div className="grid gap-6">
        {filteredProfessors.map((professor) => (
          <Card key={professor.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">
                      {professor.title} {professor.firstName} {professor.lastName}
                    </h3>
                    <Badge className={getStatusColor(professor.status)}>{professor.status}</Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {professor.department}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {professor.university}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {professor.email}
                    </span>
                    {professor.phone && (
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {professor.phone}
                      </span>
                    )}
                  </div>

                  {professor.bio && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {professor.bio}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {professor.researchInterests?.slice(0, 3).map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                    {professor.researchInterests?.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{professor.researchInterests.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEditProfessor(professor)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProfessor(professor.id)}
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

      {filteredProfessors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No professors found matching your search.</p>
        </div>
      )}
    </div>
  )
}
