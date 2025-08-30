import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MessageCircle, ThumbsUp, Clock, Plus } from "lucide-react";
import CreateThreadModal from "@/components/forum/create-thread-modal";

const Forum = () => {
  const forumPosts = [
    {
      id: 1,
      title: "Tips for writing a strong SOP for Canadian universities?",
      author: "Sarah Khan",
      authorAvatar: "SK",
      category: "Application Tips",
      replies: 23,
      likes: 45,
      timeAgo: "2 hours ago",
      preview: "I'm applying for Computer Science programs in Canada and struggling with my Statement of Purpose. What are some key points I should include?",
      isAnswered: true
    },
    {
      id: 2,
      title: "Cost of living in Boston for international students",
      author: "Ahmed Rahman",
      authorAvatar: "AR",
      category: "Living Expenses",
      replies: 15,
      likes: 32,
      timeAgo: "5 hours ago",
      preview: "Planning to study at MIT. Can anyone share their experience about monthly expenses, housing costs, and food budget?",
      isAnswered: false
    },
    {
      id: 3,
      title: "Visa interview preparation - What to expect?",
      author: "Fatima Ali",
      authorAvatar: "FA",
      category: "Visa & Immigration",
      replies: 41,
      likes: 78,
      timeAgo: "1 day ago",
      preview: "My F-1 visa interview is next week. What are common questions asked? Any tips for success?",
      isAnswered: true
    }
  ];

  const categories = [
    "All Topics", "Application Tips", "Scholarships", "Visa & Immigration", 
    "Living Expenses", "University Life", "Research Opportunities"
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">Student Forum</h1>
            <p className="text-lg text-muted-foreground">
              Connect with fellow students, share experiences, and get answers
            </p>
          </div>
          <CreateThreadModal>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                New Thread
              </Button>
            </CreateThreadModal>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  className={`cursor-pointer hover:bg-primary hover:text-primary-foreground ${category === "All Topics" ? "" : "border border-primary"}`}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Forum Posts */}
            <div className="space-y-4">
              {forumPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-card transition-all duration-300 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" />
                          <AvatarFallback>{post.authorAvatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg mb-1">{post.title}</CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>by {post.author}</span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {post.timeAgo}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge>{post.category}</Badge>
                        {post.isAnswered && (
                          <Badge className="bg-secondary text-secondary-foreground">
                            Answered
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.preview}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.replies} replies
                        </span>
                        <span className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.likes} likes
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Discussion
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Popular Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Scholarship Applications</span>
                  <Badge>127</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Visa Processing</span>
                  <Badge>89</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">University Rankings</span>
                  <Badge>76</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Living Costs</span>
                  <Badge>54</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Be respectful and helpful to fellow students</p>
                <p>• Search before posting to avoid duplicates</p>
                <p>• Use clear, descriptive titles</p>
                <p>• Share accurate information only</p>
                <p>• Keep discussions relevant to study abroad</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forum;