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
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Browse Materials", url: "/browse-materials", icon: BookOpen },
  { title: "Contribute", url: "/contribute", icon: Upload },
  { title: "Community", url: "/community", icon: Users },
  { title: "CGPA Calculator", url: "/cgpa", icon: Settings },
];

export function StudentSidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    document.documentElement.classList.toggle("bg-black", newDarkMode);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between border-r border-border bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm shadow-inner">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-neutral-900 rounded-lg flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Student Collaboration
            </p>
            <p className="text-xs text-muted-foreground">
              Share & Learn Together
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">
              Navigation
            </p>
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <a
                    key={item.title}
                    href={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition  ${
                      isActive
                        ? "bg-neutral-900 text-white font-semibold hover:bg-neutral-900/80"
                        : "text-muted-foreground hover:bg-neutral-900/15"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Impact Box */}
          <div className="mt-6 bg-muted/30 border border-border rounded-xl p-4 space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Your Impact
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Uploads</span>
                <span className="font-semibold text-foreground">12</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Downloads</span>
                <span className="font-semibold text-foreground">234</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Helped Students</span>
                <span className="font-semibold text-foreground">45</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-3">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Theme</span>
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 flex items-center rounded-full p-1 transition duration-300 border border-border 
              ${isDarkMode ? "bg-neutral-900/90" : "bg-secondary"}`}
            aria-label="Toggle theme"
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 
                ${
                  isDarkMode
                    ? "translate-x-7 bg-background"
                    : "translate-x-0 bg-white"
                }`}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-muted-foreground" />
              )}
            </span>
            <Moon className="absolute left-2 top-1.5 h-3 w-3 text-muted-foreground" />
            <Sun className="absolute right-2 top-1.5 h-3 w-3 text-yellow-400" />
          </button>
        </div>

        <a
          href="/settings"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition
            ${
              pathname === "/settings" ? "bg-accent text-accent-foreground" : ""
            }
          `}
        >
          <Settings className="h-4 w-4" />
          Settings
        </a>
      </div>
    </div>
  );
}
