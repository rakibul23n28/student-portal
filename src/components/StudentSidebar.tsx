"use client";

import {
  Home,
  BookOpen,
  Sun,
  Moon,
  Settings,
  User,
  Upload,
  Users,
  Calculator,
  HelpCircle,
  ListChecks,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Browse Materials",
    url: "/browse-materials",
    icon: BookOpen,
  },
  {
    title: "Contribute",
    url: "/contribute",
    icon: Upload,
  },
  {
    title: "Community",
    url: "/community",
    icon: Users,
  },
  {
    title: "CGPA Calculator",
    url: "/cgpa",
    icon: Calculator,
  },
];

const upcomingItems = [
  {
    title: "Tasting Questions",
    url: "#",
    icon: ListChecks,
  },
  {
    title: "AI Help",
    url: "#",
    icon: HelpCircle,
  },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <div className="w-full bg-card border-r border-border flex flex-col justify-between h-screen">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold">Student Collaboration</p>
            <p className="text-xs text-muted-foreground">rhasan2310530</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Navigation
            </p>
            {menuItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <a
                  key={item.title}
                  href={item.url}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              );
            })}
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Upcoming...
            </p>
            {upcomingItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <a
                  key={item.title}
                  href={item.url}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              );
            })}
          </div>

          {/* Contribution Stats */}
          <div className="mt-6 p-3 bg-secondary/30 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Your Impact
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Uploads</span>
                <span className="text-sm font-medium">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Downloads</span>
                <span className="text-sm font-medium">234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Helped Students
                </span>
                <span className="text-sm font-medium">45</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex p-4 border-t border-border gap-2">
        <button
          onClick={toggleTheme}
          className="w-1/2 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          {isDarkMode ? "Light" : "Dark"}
        </button>
        <a
          href="/settings"
          className={`w-1/2 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-colors ${
            pathname === "/settings" ? "bg-primary text-primary-foreground" : ""
          }`}
        >
          <Settings className="h-4 w-4" />
          Settings
        </a>
      </div>
    </div>
  );
}
