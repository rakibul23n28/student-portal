"use client";
import StudentLayout from "@/components/StudentLayout";
import {
  Users,
  Star,
  TrendingUp,
  Award,
  ThumbsUp,
  Download,
  Calendar,
  Search,
  Crown,
  Zap,
  Heart,
  Target,
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
      rating: 4.8,
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
        return "bg-gradient-to-r from-community-primary to-chart-5 text-white shadow-lg";
      case "Expert Helper":
        return "bg-gradient-to-r from-chart-1 to-chart-2 text-white shadow-lg";
      case "Active Member":
        return "bg-gradient-to-r from-success to-chart-4 text-white shadow-md";
      case "Rising Star":
        return "bg-gradient-to-r from-chart-3 to-final-primary text-white shadow-md";
      case "Helper":
        return "bg-gradient-to-r from-community-accent to-community-primary text-white shadow-sm";
      default:
        return "bg-gradient-to-r from-muted to-secondary text-muted-foreground";
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
      <div className="flex-1 p-6 bg-gradient-to-br from-background to-community-accent/10 min-h-screen">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-r from-community-primary to-chart-5 rounded-2xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-community-primary to-chart-5 bg-clip-text text-transparent">
              🌟 Community Hub
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Connect with fellow students and celebrate our collaborative
            learning community
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="group p-6 border border-community-border rounded-2xl bg-gradient-to-br from-card to-community-muted/20 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-chart-1 to-chart-2 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-chart-1 mb-1">
              {communityStats.totalMembers.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Members</p>
          </div>
          <div className="group p-6 border border-community-border rounded-2xl bg-gradient-to-br from-card to-community-muted/20 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-success to-chart-4 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-success mb-1">
              {communityStats.activesToday}
            </p>
            <p className="text-sm text-muted-foreground">Active Today</p>
          </div>
          <div className="group p-6 border border-community-border rounded-2xl bg-gradient-to-br from-card to-community-muted/20 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-final-primary to-chart-3 rounded-xl">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-final-primary mb-1">
              {communityStats.totalUploads.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Materials Shared</p>
          </div>
          <div className="group p-6 border border-community-border rounded-2xl bg-gradient-to-br from-card to-community-muted/20 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-community-primary to-chart-5 rounded-xl">
                <Download className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-community-primary mb-1">
              {communityStats.totalDownloads.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Downloads</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-8 bg-gradient-to-r from-community-muted/30 to-community-accent/30 p-2 rounded-2xl w-fit mx-auto shadow-lg">
          {[
            { id: "contributors", label: "🏆 Top Contributors", icon: Crown },
            { id: "activity", label: "⚡ Recent Activity", icon: Zap },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm rounded-xl font-medium transition-all transform hover:scale-105 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-community-primary to-chart-5 text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-community-muted/20"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === "contributors" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-community-primary" />
                <h2 className="text-2xl font-bold text-community-primary">
                  Top Contributors
                </h2>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search contributors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-community-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-community-primary shadow-sm"
                />
              </div>
            </div>

            <div className="grid gap-6">
              {filteredContributors.map((contributor, index) => (
                <div
                  key={contributor.id}
                  className="group border border-community-border rounded-2xl bg-gradient-to-br from-card to-community-muted/20 p-8 hover:shadow-xl transition-all transform hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-community-primary/5 to-chart-5/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-community-primary to-chart-5 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg">
                        {contributor.avatar}
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-chart-5 to-community-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                          {index + 1}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold text-community-primary">
                          {contributor.name}
                        </h3>
                        <span
                          className={`px-3 py-1 text-sm rounded-full font-medium ${getBadgeColor(
                            contributor.badge
                          )}`}
                        >
                          {contributor.badge}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                        <div className="text-center p-3 bg-chart-1/10 rounded-xl">
                          <p className="text-2xl font-bold text-chart-1 flex items-center justify-center gap-1">
                            <Target className="h-5 w-5" />
                            {contributor.uploads}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">
                            Uploads
                          </p>
                        </div>
                        <div className="text-center p-3 bg-success/10 rounded-xl">
                          <p className="text-2xl font-bold text-success flex items-center justify-center gap-1">
                            <Download className="h-5 w-5" />
                            {contributor.downloads.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">
                            Downloads
                          </p>
                        </div>
                        <div className="text-center p-3 bg-chart-5/10 rounded-xl">
                          <p className="text-2xl font-bold text-chart-5 flex items-center justify-center gap-1">
                            <Star className="h-5 w-5 fill-current" />
                            {contributor.rating}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">
                            Rating
                          </p>
                        </div>
                        <div className="text-center p-3 bg-final-primary/10 rounded-xl">
                          <p className="text-lg font-bold text-final-primary flex items-center justify-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {contributor.joinDate}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium">
                            Joined
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-medium text-community-primary">
                          Specialties:
                        </span>
                        <div className="flex gap-2">
                          {contributor.specialties.map((specialty, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs bg-gradient-to-r from-community-primary/10 to-chart-5/10 text-community-primary rounded-full border border-community-border font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-community-muted/20 rounded-xl">
                        <Heart className="h-4 w-4 text-chart-3" />
                        <p className="text-sm text-muted-foreground">
                          {contributor.recentActivity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-community-primary" />
                <h2 className="text-2xl font-bold text-community-primary">
                  Recent Activity
                </h2>
              </div>
              <p className="text-sm text-muted-foreground bg-community-muted/20 px-4 py-2 rounded-xl">
                📡 Live updates from our community
              </p>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="group border border-community-border rounded-2xl bg-gradient-to-br from-card to-community-muted/20 p-6 hover:shadow-lg transition-all transform hover:scale-105 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-community-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-community-primary to-chart-5 text-white rounded-2xl flex items-center justify-center font-bold text-sm shadow-lg">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">
                          {getActivityIcon(activity.type)}
                        </span>
                        <p className="text-sm">
                          <span className="font-semibold text-community-primary">
                            {activity.user}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            {activity.action}{" "}
                          </span>
                          <span className="font-semibold">{activity.item}</span>
                          {activity.course && (
                            <span className="text-muted-foreground"> in </span>
                          )}
                          {activity.course && (
                            <span className="px-2 py-1 text-xs bg-gradient-to-r from-community-primary/10 to-chart-5/10 text-community-primary rounded-md font-medium">
                              {activity.course}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 mt-3">
                        <span className="text-xs text-muted-foreground bg-community-muted/20 px-3 py-1 rounded-full">
                          {activity.time}
                        </span>
                        <div className="flex items-center gap-4">
                          {activity.interactions.likes && (
                            <div className="flex items-center gap-2 text-xs text-chart-3 bg-chart-3/10 px-3 py-1 rounded-full">
                              <ThumbsUp className="h-3 w-3 fill-current" />
                              <span className="font-medium">
                                {activity.interactions.likes}
                              </span>
                            </div>
                          )}
                          {activity.interactions.downloads && (
                            <div className="flex items-center gap-2 text-xs text-success bg-success/10 px-3 py-1 rounded-full">
                              <Download className="h-3 w-3" />
                              <span className="font-medium">
                                {activity.interactions.downloads}
                              </span>
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
              <button className="px-8 py-3 border border-community-border rounded-xl hover:bg-gradient-to-r hover:from-community-primary hover:to-chart-5 hover:text-white transition-all font-medium transform hover:scale-105 shadow-md">
                🔄 Load More Activity
              </button>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
