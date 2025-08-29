import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Search, MapPin, GraduationCap, BookOpen, Users, Star, Filter } from "lucide-react"
import  { Link } from "react-router-dom"

export default function ProfessorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedField, setSelectedField] = useState("")

  // Mock data - in real app this would come from API
  const professors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      university: "University of Toronto",
      department: "Computer Science",
      field: "Machine Learning",
      country: "Canada",
      rating: 4.9,
      students: 12,
      publications: 45,
      positions: 3,
      image: "/placeholder.svg?height=100&width=100",
      bio: "Leading researcher in deep learning and neural networks with 15+ years of experience.",
      specializations: ["Deep Learning", "Neural Networks", "Computer Vision"],
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      university: "MIT",
      department: "Electrical Engineering",
      field: "Robotics",
      country: "United States",
      rating: 4.8,
      students: 8,
      publications: 67,
      positions: 2,
      image: "/placeholder.svg?height=100&width=100",
      bio: "Expert in autonomous systems and robotic perception with industry partnerships.",
      specializations: ["Autonomous Systems", "Robotics", "AI"],
    },
    {
      id: 3,
      name: "Dr. Emma Rodriguez",
      university: "Oxford University",
      department: "Engineering",
      field: "Biomedical Engineering",
      country: "United Kingdom",
      rating: 4.7,
      students: 15,
      publications: 38,
      positions: 4,
      image: "/placeholder.svg?height=100&width=100",
      bio: "Pioneering research in medical devices and biocompatible materials.",
      specializations: ["Medical Devices", "Biomaterials", "Tissue Engineering"],
    },
  ]

  const filteredProfessors = professors.filter((prof) => {
    const matchesSearch =
      searchQuery === "" ||
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.field.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesField = selectedField === "" || prof.field === selectedField

    return matchesSearch && matchesField
  })

  const fields = [...new Set(professors.map((p) => p.field))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-foreground mb-2">Find Professors</h1>
        <p className="text-muted-foreground">Connect with leading researchers and find supervision opportunities.</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search professors, universities, or research areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="bg-transparent">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedField === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedField("")}
            className={selectedField === "" ? "bg-accent" : "bg-transparent"}
          >
            All Fields
          </Button>
          {fields.map((field) => (
            <Button
              key={field}
              variant={selectedField === field ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedField(field)}
              className={selectedField === field ? "bg-accent" : "bg-transparent"}
            >
              {field}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6">
        {filteredProfessors.map((professor) => (
          <Card key={professor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Avatar */}
                <Avatar className="w-24 h-24 flex-shrink-0">
                  <img
                    src={professor.image || "/placeholder.svg"}
                    alt={professor.name}
                    className="w-full h-full object-cover"
                  />
                </Avatar>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{professor.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-1" />
                          {professor.university}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {professor.country}
                        </span>
                        <Badge variant="outline">{professor.department}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{professor.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{professor.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {professor.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {professor.students} students
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {professor.publications} publications
                      </span>
                      <span className="text-accent font-medium">{professor.positions} open positions</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Profile
                      </Button>
                      <Link to={`/professors/${professor.id}`}>
                        <Button size="sm" >
                          Contact
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProfessors.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No professors found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria to find more professors.</p>
        </div>
      )}
    </div>
  )
}
