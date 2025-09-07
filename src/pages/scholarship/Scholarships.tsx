import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar, DollarSign } from "lucide-react";

const Scholarships = () => {
  const scholarships = [
    {
      id: 1,
      title: "International Excellence Scholarship",
      university: "University of Toronto",
      country: "Canada",
      amount: "$25,000",
      deadline: "2024-03-15",
      field: "Engineering",
      description: "Full tuition coverage for outstanding international students in engineering programs."
    },
    {
      id: 2,
      title: "Global Leaders Program",
      university: "MIT",
      country: "United States",
      amount: "$50,000",
      deadline: "2024-02-28",
      field: "Computer Science",
      description: "Comprehensive scholarship for future technology leaders and innovators."
    },
    {
      id: 3,
      title: "Commonwealth Scholarship",
      university: "Cambridge University",
      country: "United Kingdom",
      amount: "Full Funding",
      deadline: "2024-04-10",
      field: "Research",
      description: "Full funding for PhD research programs in various fields of study."
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Scholarship Opportunities</h1>
          <p className="text-lg text-muted-foreground">
            Discover funding opportunities for your international education dreams
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search scholarships..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="australia">Australia</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Field of Study" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="medicine">Medicine</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Scholarship Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scholarships.map((scholarship) => (
            <Card key={scholarship.id} className="hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{scholarship.field}</Badge>
                  <Badge variant="outline" className="text-secondary">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {scholarship.amount}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{scholarship.title}</CardTitle>
                <CardDescription className="flex items-center text-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  {scholarship.university}, {scholarship.country}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {scholarship.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Deadline: {scholarship.deadline}
                  </div>
                  <Button size="sm">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Scholarships
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;