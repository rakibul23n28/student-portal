"use client";
import StudentLayout from "@/components/StudentLayout";
import {
  Search,
  ExternalLink,
  Star,
  Users,
  BookOpen,
  Globe,
  Zap,
  Code,
  Calculator,
  FileText,
  Video,
  Headphones,
} from "lucide-react";
import { useState } from "react";

export default function BrowseMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const studentWebsites = [
    {
      id: 1,
      name: "Khan Academy",
      description:
        "Free online courses, lessons and practice for students in math, science, and more.",
      url: "https://www.khanacademy.org",
      category: "education",
      rating: 4.9,
      users: "120M+",
      icon: BookOpen,
      color: "bg-green-500",
      features: ["Free", "Interactive", "Progress Tracking"],
    },
    {
      id: 2,
      name: "Coursera",
      description:
        "Online courses from top universities and companies worldwide.",
      url: "https://www.coursera.org",
      category: "education",
      rating: 4.8,
      users: "100M+",
      icon: Globe,
      color: "bg-blue-500",
      features: ["University Courses", "Certificates", "Specializations"],
    },
    {
      id: 3,
      name: "Stack Overflow",
      description:
        "The largest online community for programmers to learn and share knowledge.",
      url: "https://stackoverflow.com",
      category: "programming",
      rating: 4.7,
      users: "50M+",
      icon: Code,
      color: "bg-orange-500",
      features: ["Q&A", "Community", "Code Examples"],
    },
    {
      id: 4,
      name: "GitHub",
      description:
        "Platform for version control and collaboration for software developers.",
      url: "https://github.com",
      category: "programming",
      rating: 4.8,
      users: "100M+",
      icon: Code,
      color: "bg-gray-800",
      features: ["Version Control", "Collaboration", "Open Source"],
    },
    {
      id: 5,
      name: "Quizlet",
      description:
        "Study tools including flashcards, practice tests, and games.",
      url: "https://quizlet.com",
      category: "study",
      rating: 4.6,
      users: "60M+",
      icon: Zap,
      color: "bg-purple-500",
      features: ["Flashcards", "Study Games", "Practice Tests"],
    },
    {
      id: 6,
      name: "Wolfram Alpha",
      description:
        "Computational knowledge engine for mathematics, science, and more.",
      url: "https://www.wolframalpha.com",
      category: "tools",
      rating: 4.7,
      users: "5M+",
      icon: Calculator,
      color: "bg-red-500",
      features: ["Math Solver", "Step-by-step", "Computational"],
    },
    {
      id: 7,
      name: "Grammarly",
      description:
        "Writing assistant that helps with grammar, spelling, and style.",
      url: "https://www.grammarly.com",
      category: "tools",
      rating: 4.5,
      users: "30M+",
      icon: FileText,
      color: "bg-green-600",
      features: ["Grammar Check", "Writing Tips", "Plagiarism"],
    },
    {
      id: 8,
      name: "YouTube EDU",
      description:
        "Educational videos and tutorials on every subject imaginable.",
      url: "https://www.youtube.com/education",
      category: "education",
      rating: 4.6,
      users: "2B+",
      icon: Video,
      color: "bg-red-600",
      features: ["Video Tutorials", "Free Content", "Diverse Topics"],
    },
    {
      id: 9,
      name: "Spotify for Students",
      description:
        "Music streaming service with student discounts and study playlists.",
      url: "https://www.spotify.com/student",
      category: "productivity",
      rating: 4.8,
      users: "400M+",
      icon: Headphones,
      color: "bg-green-500",
      features: ["Student Discount", "Study Playlists", "Background Music"],
    },
    {
      id: 10,
      name: "Notion",
      description:
        "All-in-one workspace for note-taking, project management, and collaboration.",
      url: "https://www.notion.so",
      category: "productivity",
      rating: 4.7,
      users: "30M+",
      icon: FileText,
      color: "bg-gray-700",
      features: ["Note-taking", "Templates", "Collaboration"],
    },
    {
      id: 11,
      name: "Chegg Study",
      description:
        "Textbook solutions, expert Q&A, and study tools for students.",
      url: "https://www.chegg.com",
      category: "study",
      rating: 4.3,
      users: "3M+",
      icon: BookOpen,
      color: "bg-blue-600",
      features: ["Textbook Solutions", "Expert Help", "Study Tools"],
    },
    {
      id: 12,
      name: "MIT OpenCourseWare",
      description: "Free lecture notes, exams, and videos from MIT courses.",
      url: "https://ocw.mit.edu",
      category: "education",
      rating: 4.9,
      users: "10M+",
      icon: Globe,
      color: "bg-red-700",
      features: ["Free MIT Courses", "Lecture Notes", "No Registration"],
    },
  ];

  const categories = [
    { id: "all", label: "All Categories", count: studentWebsites.length },
    {
      id: "education",
      label: "Education",
      count: studentWebsites.filter((w) => w.category === "education").length,
    },
    {
      id: "programming",
      label: "Programming",
      count: studentWebsites.filter((w) => w.category === "programming").length,
    },
    {
      id: "study",
      label: "Study Tools",
      count: studentWebsites.filter((w) => w.category === "study").length,
    },
    {
      id: "tools",
      label: "Productivity",
      count: studentWebsites.filter((w) => w.category === "tools").length,
    },
    {
      id: "productivity",
      label: "Lifestyle",
      count: studentWebsites.filter((w) => w.category === "productivity")
        .length,
    },
  ];

  const filteredWebsites = studentWebsites.filter((website) => {
    const matchesSearch =
      website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.features.some((feature) =>
        feature.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || website.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <StudentLayout>
      <div className="flex-1 p-6 bg-background">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              📚 Browse Student Resources
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Discover popular websites and tools to enhance your learning
            experience
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search websites, tools, or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6 p-3 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Found {filteredWebsites.length} resource
            {filteredWebsites.length !== 1 ? "s" : ""}
            {searchQuery.trim() && ` matching "${searchQuery}"`}
            {selectedCategory !== "all" &&
              ` in ${categories.find((c) => c.id === selectedCategory)?.label}`}
          </p>
        </div>

        {/* Websites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebsites.map((website) => {
            const Icon = website.icon;
            return (
              <div
                key={website.id}
                className="border border-border rounded-lg bg-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`p-3 rounded-lg ${website.color} flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {website.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{website.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{website.users}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {website.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {website.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <a
                    href={website.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredWebsites.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No websites found matching your criteria.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try adjusting your search or category filter.
            </p>
          </div>
        )}

        {/* Popular Categories */}
        {searchQuery === "" && selectedCategory === "all" && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl mb-6">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.slice(1).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors text-left"
                >
                  <h3 className="font-medium">{category.label}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count} resources
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
