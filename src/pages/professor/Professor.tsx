import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { MapPin, GraduationCap, BookOpen, Users, Star, Mail, Globe, Calendar, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function ProfessorProfilePage() {

    const id = useParams();

  const professor = {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Professor of Computer Science",
    university: "University of Toronto",
    department: "Computer Science",
    field: "Machine Learning",
    country: "Canada",
    rating: 4.9,
    students: 12,
    publications: 45,
    positions: 3,
    image: "/placeholder.svg?height=200&width=200",
    email: "sarah.johnson@utoronto.ca",
    website: "https://cs.toronto.edu/~sjohnson",
    bio: "Dr. Sarah Johnson is a leading researcher in deep learning and neural networks with over 15 years of experience in academia and industry. She has published extensively in top-tier conferences and journals, and her work has been cited over 5,000 times. She is passionate about mentoring the next generation of researchers and has supervised over 30 graduate students.",
    specializations: ["Deep Learning", "Neural Networks", "Computer Vision", "Natural Language Processing"],
    education: [
      { degree: "PhD in Computer Science", institution: "Stanford University", year: "2008" },
      { degree: "MS in Computer Science", institution: "MIT", year: "2004" },
      { degree: "BS in Computer Engineering", institution: "UC Berkeley", year: "2002" },
    ],
    experience: [
      { position: "Professor", institution: "University of Toronto", period: "2015 - Present" },
      { position: "Associate Professor", institution: "University of Toronto", period: "2012 - 2015" },
      { position: "Research Scientist", institution: "Google DeepMind", period: "2008 - 2012" },
    ],
    openPositions: [
      {
        id: 1,
        title: "PhD Research Assistant - Machine Learning",
        type: "PhD",
        deadline: "2024-03-20",
        description: "Seeking a motivated PhD student to work on cutting-edge deep learning research.",
      },
      {
        id: 2,
        title: "Master's Thesis Supervision - NLP",
        type: "Masters",
        deadline: "2024-02-28",
        description: "Opportunity to work on natural language processing projects with real-world applications.",
      },
    ],
    recentPublications: [
      {
        title: "Advances in Deep Learning for Computer Vision",
        journal: "Nature Machine Intelligence",
        year: "2024",
      },
      {
        title: "Neural Architecture Search for Efficient Models",
        journal: "ICML 2023",
        year: "2023",
      },
      {
        title: "Transformer Models for Medical Image Analysis",
        journal: "Medical Image Analysis",
        year: "2023",
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link to="/professors">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Professors
        </Button>
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <Avatar className="w-32 h-32 flex-shrink-0">
                  <img
                    src={professor.image || "/placeholder.svg"}
                    alt={professor.name}
                    className="w-full h-full object-cover"
                  />
                </Avatar>
                <div className="flex-1">
                  <h1 className="font-heading font-black text-3xl mb-2">{professor.name}</h1>
                  <p className="text-lg text-muted-foreground mb-3">{professor.title}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {professor.university}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {professor.country}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{professor.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <Button variant="outline" className="bg-transparent">
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Professor
                    </Button>
                    <Button variant="outline" className="bg-transparent">
                      <Globe className="mr-2 h-4 w-4" />
                      Visit Website
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{professor.bio}</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Research Specializations</h4>
                <div className="flex flex-wrap gap-2">
                  {professor.specializations.map((spec, index) => (
                    <Badge key={index} >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Open Positions */}
          <Card>
            <CardHeader>
              <CardTitle>Open Positions ({professor.positions})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {professor.openPositions.map((position) => (
                  <div key={position.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{position.title}</h4>
                      <Badge variant="outline">{position.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{position.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        Deadline: {position.deadline}
                      </span>
                      <Button size="sm" variant="secondary">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Publications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Publications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {professor.recentPublications.map((pub, index) => (
                  <div key={index} className="border-l-2 border-accent pl-4">
                    <h4 className="font-semibold text-sm">{pub.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {pub.journal} • {pub.year}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    Current Students
                  </span>
                  <span className="font-semibold">{professor.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Publications
                  </span>
                  <span className="font-semibold">{professor.publications}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center text-sm">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Open Positions
                  </span>
                  <span className="font-semibold">{professor.positions}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {professor.education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-sm">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution} • {edu.year}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {professor.experience.map((exp, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-sm">{exp.position}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exp.institution} • {exp.period}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
