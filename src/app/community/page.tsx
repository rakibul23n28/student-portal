"use client";
import StudentLayout from "@/components/StudentLayout";
import {
  Users,
  Star,
  TrendingUp,
  Award,
  ThumbsUp,
  Download,
  Search,
} from "lucide-react";
import { useState } from "react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("contributors");
  const [searchQuery, setSearchQuery] = useState("");

  const topContributors = [
    {
      id: 1,
      name: "Sarah Wilson",
      avatar: "SW",
      uploads: 45,
      downloads: 2340,
      rating: 4.9,
      badge: "Top Contributor",
      specialties: ["DSA", "Mathematics"],
      joinDate: "Fall 2023",
      recentActivity: "Uploaded 'Advanced Graph Algorithms' 2 days ago",
    },
    {
      id: 2,
      name: "Alex Chen",
      avatar: "AC",
      uploads: 38,
      downloads: 1890,
      rating: 4.8,
      badge: "Expert Helper",
      specialties: ["Programming", "Algorithms"],
      joinDate: "Spring 2024",
      recentActivity: "Answered 5 questions in DSA discussion",
    },
    {
      id: 3,
      name: "Emily Davis",
      avatar: "ED",
      uploads: 32,
      downloads: 1560,
      rating: 4.7,
      badge: "Active Member",
      specialties: ["Mathematics", "Statistics"],
      joinDate: "Fall 2023",
      recentActivity: "Shared 'Linear Algebra Notes' yesterday",
    },
    {
      id: 4,
      name: "Mike Johnson",
      avatar: "MJ",
      uploads: 28,
      downloads: 1245,
      rating: 4.6,
      badge: "Rising Star",
      specialties: ["Data Structures", "Databases"],
      joinDate: "Spring 2024",
      recentActivity: "Received 10 thumbs up on recent upload",
    },
    {
      id: 5,
      name: "Lisa Chen",
      avatar: "LC",
      uploads: 24,
      downloads: 980,
      rating: 4.5,
      badge: "Active Member",
      specialties: ["Web Development", "JavaScript"],
      joinDate: "Fall 2023",
      recentActivity: "Contributed to React tutorial series",
    },
    {
      id: 6,
      name: "David Lee",
      avatar: "DL",
      uploads: 19,
      downloads: 756,
      rating: 4.4,
      badge: "Helper",
      specialties: ["Machine Learning", "Python"],
      joinDate: "Spring 2024",
      recentActivity: "Shared ML practice problems",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "upload",
      user: "Sarah Wilson",
      action: "uploaded",
      item: "Advanced Graph Algorithms",
      course: "DSA2",
      time: "2 hours ago",
      interactions: { likes: 12, downloads: 8 },
    },
    {
      id: 2,
      type: "comment",
      user: "Alex Chen",
      action: "commented on",
      item: "Binary Trees Assignment",
      course: "DSA1",
      time: "4 hours ago",
      interactions: { likes: 6 },
    },
    {
      id: 3,
      type: "achievement",
      user: "Emily Davis",
      action: "reached",
      item: "1000 total downloads milestone",
      time: "6 hours ago",
      interactions: { likes: 15 },
    },
    {
      id: 4,
      type: "upload",
      user: "Mike Johnson",
      action: "shared",
      item: "Database Design Patterns",
      course: "CS301",
      time: "1 day ago",
      interactions: { likes: 9, downloads: 23 },
    },
    {
      id: 5,
      type: "help",
      user: "Lisa Chen",
      action: "helped",
      item: "3 students with React concepts",
      time: "1 day ago",
      interactions: { likes: 8 },
    },
    {
      id: 6,
      type: "upload",
      user: "David Lee",
      action: "contributed",
      item: "ML Algorithm Implementations",
      course: "CS401",
      time: "2 days ago",
      interactions: { likes: 14, downloads: 31 },
    },
    {
      id: 7,
      type: "review",
      user: "Sarah Wilson",
      action: "reviewed and approved",
      item: "5 community submissions",
      time: "2 days ago",
      interactions: { likes: 7 },
    },
    {
      id: 8,
      type: "achievement",
      user: "Alex Chen",
      action: "earned",
      item: "Expert Helper badge",
      time: "3 days ago",
      interactions: { likes: 22 },
    },
  ];

  const communityStats = {
    totalMembers: 1247,
    activesToday: 89,
    totalUploads: 2890,
    totalDownloads: 45678,
  };

  const filteredContributors = topContributors.filter(
    (contributor) =>
      contributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contributor.specialties.some((spec) =>
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Top Contributor":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Expert Helper":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Active Member":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Rising Star":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Helper":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "upload":
        return "📤";
      case "comment":
        return "💬";
      case "achievement":
        return "🏆";
      case "help":
        return "🤝";
      case "review":
        return "✅";
      default:
        return "📌";
    }
  };

  return (
    <StudentLayout>
      <div className="flex-1 p-6 bg-background">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl mb-2">Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow students and celebrate our collaborative
            learning community
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 border border-border rounded-lg bg-card text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">
              {communityStats.totalMembers.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </div>
          <div className="p-4 border border-border rounded-lg bg-card text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">{communityStats.activesToday}</p>
            <p className="text-sm text-muted-foreground">Active Today</p>
          </div>
          <div className="p-4 border border-border rounded-lg bg-card text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-5 w-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold">
              {communityStats.totalUploads.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Materials Shared</p>
          </div>
          <div className="p-4 border border-border rounded-lg bg-card text-center">
            <div className="flex items-center justify-center mb-2">
              <Download className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">
              {communityStats.totalDownloads.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Downloads</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-secondary p-1 rounded-lg w-fit">
          {[
            { id: "contributors", label: "Top Contributors" },
            { id: "activity", label: "Recent Activity" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "contributors" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Top Contributors</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search contributors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {filteredContributors.map((contributor, index) => (
                <div
                  key={contributor.id}
                  className="border border-border rounded-lg bg-card p-6 hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                        {contributor.avatar}
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 text-yellow-50 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{contributor.name}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getBadgeColor(
                            contributor.badge
                          )}`}
                        >
                          {contributor.badge}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600">
                            {contributor.uploads}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Uploads
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600">
                            {contributor.downloads.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Downloads
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-yellow-600 flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 fill-current" />
                            {contributor.rating}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Rating
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-purple-600">
                            {contributor.joinDate}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Joined
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex gap-1">
                          {contributor.specialties.map((specialty, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {contributor.recentActivity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Recent Activity</h2>
              <p className="text-sm text-muted-foreground">
                Live updates from our community
              </p>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="border border-border rounded-lg bg-card p-4 hover:bg-accent/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">
                          {getActivityIcon(activity.type)}
                        </span>
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          <span className="text-muted-foreground">
                            {" "}
                            {activity.action}{" "}
                          </span>
                          <span className="font-medium">{activity.item}</span>
                          {activity.course && (
                            <span className="text-muted-foreground">
                              {" "}
                              in {activity.course}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                        <div className="flex items-center gap-3">
                          {activity.interactions.likes && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{activity.interactions.likes}</span>
                            </div>
                          )}
                          {activity.interactions.downloads && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Download className="h-3 w-3" />
                              <span>{activity.interactions.downloads}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="px-6 py-2 border border-border rounded-md hover:bg-accent transition-colors">
                Load More Activity
              </button>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
