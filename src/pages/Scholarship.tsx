"use client"

import { useState } from "react"
import { useParams } from "react-router-dom"
import Navigation from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  GraduationCap,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Star,
  Users,
  CheckCircle,
  ArrowLeft,
  Share,
  Bookmark,
  ExternalLink,
} from "lucide-react"

export default function ScholarshipDetailPage() {
  const params = useParams()
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Mock data - in real app this would be fetched based on params.id
  const scholarship = {
    id: params.id,
    title: "Computer Science Excellence Scholarship",
    university: "University of Toronto",
    country: "Canada",
    field: "Computer Science",
    level: "Masters",
    amount: "$25,000",
    deadline: "2024-03-15",
    description:
      "The Computer Science Excellence Scholarship is designed to support outstanding international students pursuing a Master's degree in Computer Science. This prestigious award recognizes academic excellence and provides comprehensive financial support for the duration of the program.",
    fullDescription: `This scholarship covers full tuition fees, living expenses, and research costs for exceptional students. Recipients will have access to cutting-edge research facilities, mentorship from world-renowned faculty, and opportunities to collaborate on groundbreaking projects in artificial intelligence, machine learning, and software engineering.

The program emphasizes both theoretical knowledge and practical application, preparing graduates for leadership roles in technology companies, research institutions, and entrepreneurial ventures.`,
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "Minimum GPA of 3.5/4.0 or equivalent",
      "IELTS 7.0+ or TOEFL 100+",
      "Two academic references",
      "Statement of purpose",
      "Research proposal (optional but preferred)",
    ],
    benefits: [
      "Full tuition coverage ($25,000/year)",
      "Monthly living stipend ($1,500)",
      "Research funding ($5,000)",
      "Health insurance coverage",
      "Access to university facilities",
      "Mentorship program",
      "Career development workshops",
    ],
    applicationProcess: [
      "Submit online application",
      "Upload required documents",
      "Academic references submission",
      "Interview (if shortlisted)",
      "Final selection and notification",
    ],
    type: "scholarship",
    applicants: 45,
    match: 95,
    daysLeft: 42,
    contact: {
      email: "scholarships@utoronto.ca",
      phone: "+1-416-978-2011",
      website: "https://www.utoronto.ca/scholarships",
    },
  }

  const handleApply = () => {
    // In real app, this would open application form or redirect to application page
    console.log("Apply for scholarship:", scholarship.id)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    // In real app, this would open share dialog
    console.log("Share scholarship:", scholarship.id)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scholarships
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="font-heading font-black text-3xl text-foreground mb-3">{scholarship.title}</h1>
              <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                <span className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  {scholarship.university}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {scholarship.country}
                </span>
                <Badge className="bg-green-100 text-green-800">{scholarship.type}</Badge>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Key Info Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="font-bold text-lg">{scholarship.amount}</p>
                <p className="text-xs text-muted-foreground">Funding Amount</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="font-bold text-lg">{scholarship.deadline}</p>
                <p className="text-xs text-muted-foreground">Application Deadline</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="font-bold text-lg">{scholarship.applicants}</p>
                <p className="text-xs text-muted-foreground">Applicants</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2 fill-current" />
                <p className="font-bold text-lg">{scholarship.match}%</p>
                <p className="text-xs text-muted-foreground">Match Score</p>
              </CardContent>
            </Card>
          </div>

          {/* Deadline Alert */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div className="flex-1">
                  <p className="font-medium text-yellow-800">{scholarship.daysLeft} days left to apply</p>
                  <Progress value={(scholarship.daysLeft / 90) * 100} className="mt-2 h-2" />
                </div>
                <Button className="bg-accent hover:bg-accent/90" onClick={handleApply}>
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Scholarship</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{scholarship.description}</p>
                <p className="text-muted-foreground whitespace-pre-line">{scholarship.fullDescription}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scholarship.requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Scholarship Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {scholarship.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Star className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scholarship.applicationProcess.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-muted-foreground">{step}</p>
                        {index < scholarship.applicationProcess.length - 1 && (
                          <div className="w-px h-6 bg-border ml-4 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardHeader>
                <CardTitle>Ready to Apply?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-accent hover:bg-accent/90" size="lg" onClick={handleApply}>
                  Start Application
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Save for Later
                </Button>
                <Separator />
                <div className="text-center text-sm text-muted-foreground">
                  <p>Application deadline:</p>
                  <p className="font-medium text-foreground">{scholarship.deadline}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-muted-foreground">{scholarship.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-sm text-muted-foreground">{scholarship.contact.phone}</span>
                </div>
                <Button variant="outline" className="w-full bg-transparent" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit University Website
                </Button>
              </CardContent>
            </Card>

            {/* Similar Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium text-sm mb-1">AI Research Fellowship</h4>
                  <p className="text-xs text-muted-foreground mb-2">MIT • $50,000</p>
                  <Badge variant="outline" className="text-xs">
                    PhD
                  </Badge>
                </div>
                <div className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium text-sm mb-1">Engineering Innovation Grant</h4>
                  <p className="text-xs text-muted-foreground mb-2">Oxford • $30,000</p>
                  <Badge variant="outline" className="text-xs">
                    Masters
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="w-full">
                  View More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
