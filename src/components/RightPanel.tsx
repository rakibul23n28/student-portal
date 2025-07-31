"use client";

import { useState } from "react";
import { Bell, Flame, Upload, Clock, User, ExternalLink } from "lucide-react";

type Collab = {
  id: number;
  title: string;
  time: string;
  published: boolean;
};

type Urgent = {
  id: number;
  title: string;
  studentId: string;
  message: string;
  url: string;
  time: string;
  published: boolean;
};

const ITEMS_PER_PAGE = 5;

const collab: Collab[] = [
  {
    id: 1,
    title: "Fall24 Mid Questions - DSA",
    time: "2 hours ago",
    published: true,
  },
  {
    id: 2,
    title: "Fall24 Final Questions - DBMS",
    time: "3 days ago",
    published: true,
  },
  {
    id: 3,
    title: "Fall24 Mid Answer - DBMS",
    time: "2 hours ago",
    published: false,
  },
  {
    id: 4,
    title: "Fall24 Final Answer - SPL",
    time: "3 days ago",
    published: false,
  },
  {
    id: 5,
    title: "Fall24 Mid Answer - SPL",
    time: "2 hours ago",
    published: false,
  },
  {
    id: 6,
    title: "Fall24 Final Answer - SPL",
    time: "3 days ago",
    published: false,
  },
  {
    id: 7,
    title: "Fall24 Mid Answer - SPL",
    time: "2 hours ago",
    published: false,
  },
];

const urgent: Urgent[] = [
  {
    id: 1,
    title: "DBMS Lab Assignment Needed",
    studentId: "011231530",
    message: "needs DBMS Lab assignment urgently.",
    time: "30 mins ago",
    published: true,
    url: "https://www.google.com/assignment.pdf",
  },
  {
    id: 2,
    title: "DBMS Lab Assignment Needed",
    studentId: "011231530",
    message: "needs DBMS Lab assignment urgently. Please help him.",
    time: "30 mins ago",
    published: true,
    url: "https://www.google.com/assignment.pdf",
  },
  {
    id: 3,
    title: "DBMS Lab Assignment Needed",
    studentId: "011231530",
    message: "needs DBMS Lab assignment urgently. Please help him.",
    time: "30 mins ago",
    published: true,
    url: "https://www.google.com/assignment.pdf",
  },
  {
    id: 4,
    title: "DBMS Lab Assignment Needed",
    studentId: "011231530",
    message: "needs DBMS Lab assignment urgently.",
    time: "30 mins ago",
    published: true,
    url: "https://www.google.com/assignment.pdf",
  },
  {
    id: 5,
    title: "DBMS Lab Assignment Needed",
    studentId: "011231530",
    message: "needs DBMS Lab assignment urgently.",
    time: "30 mins ago",
    published: true,
    url: "https://www.google.com/assignment.pdf",
  },
  {
    id: 6,
    title: "DBMS Lab Assignment Needed",
    studentId: "011231530",
    message: "needs DBMS Lab assignment urgently.",
    time: "30 mins ago",
    published: true,
    url: "https://www.google.com/assignment.pdf",
  },
];

export function RightPanel() {
  const [activeTab, setActiveTab] = useState<"collab" | "urgent">("collab");
  const [collabPage, setCollabPage] = useState(1);
  const [urgentPage, setUrgentPage] = useState(1);

  const paginatedCollab = collab.slice(
    (collabPage - 1) * ITEMS_PER_PAGE,
    collabPage * ITEMS_PER_PAGE
  );
  const paginatedUrgent = urgent.slice(
    (urgentPage - 1) * ITEMS_PER_PAGE,
    urgentPage * ITEMS_PER_PAGE
  );

  const totalCollabPages = Math.ceil(collab.length / ITEMS_PER_PAGE);
  const totalUrgentPages = Math.ceil(urgent.length / ITEMS_PER_PAGE);

  return (
    <div className="w-full bg-gradient-to-b from-background to-accent/10 border-l border-border p-6 space-y-6 min-h-screen">
      {/* Tabs */}
      <div className="flex items-center gap-2 p-2 bg-gradient-to-r from-secondary/50 to-accent/50 rounded-xl backdrop-blur-sm border border-border shadow-md">
        <button
          onClick={() => setActiveTab("collab")}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all flex-1 justify-center transform hover:scale-105 ${
            activeTab === "collab"
              ? "bg-gradient-to-r from-chart-1 to-chart-2 text-white shadow-lg"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
          }`}
        >
          <Bell className="h-4 w-4" />
          Collab
        </button>
        <button
          onClick={() => setActiveTab("urgent")}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all flex-1 justify-center transform hover:scale-105 ${
            activeTab === "urgent"
              ? "bg-gradient-to-r from-destructive to-chart-3 text-white shadow-lg"
              : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
          }`}
        >
          <Flame className="h-4 w-4" />
          Urgent
        </button>
      </div>

      {/* Collab Feed */}
      {activeTab === "collab" && (
        <div className=" border border-border rounded-2xl bg-gradient-to-br from-card to-chart-1/5 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-gradient-to-r from-chart-1/10 to-chart-2/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-chart-1 to-chart-2 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-chart-1">🔔 Collab Feed</h3>
                <p className="text-xs text-muted-foreground">
                  Latest material requests
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-3 max-h-[400px] overflow-x-hidden">
              {paginatedCollab.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden p-2 rounded-xl bg-gradient-to-r from-chart-1/5 to-chart-2/5 hover:from-chart-1/10 hover:to-chart-2/10 transition-all transform hover:scale-105 border border-chart-1/20 shadow-sm hover:shadow-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-chart-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-medium text-chart-1 group-hover:text-chart-1/90 leading-snug">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-card/50 px-2 py-1 rounded-md">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>

                    <button className="flex items-center gap-2 text-sm text-white bg-gradient-to-r from-chart-1 to-chart-2 hover:from-chart-2 hover:to-chart-1 px-3 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md">
                      <Upload className="h-4 w-4" />
                      Upload Material
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalCollabPages > 1 && (
              <div className="flex justify-center gap-2 mt-6 pt-4 border-t border-border">
                {Array.from({ length: totalCollabPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCollabPage(page)}
                      className={`w-8 h-8 text-sm rounded-lg transition-all transform hover:scale-110 ${
                        page === collabPage
                          ? "bg-gradient-to-r from-chart-1 to-chart-2 text-white shadow-md"
                          : "text-muted-foreground hover:bg-chart-1/10 hover:text-chart-1"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Urgent Feed */}
      {activeTab === "urgent" && (
        <div className="border border-border rounded-2xl bg-gradient-to-br from-card to-destructive/5 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-gradient-to-r from-destructive/10 to-chart-3/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-destructive to-chart-3 rounded-lg">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-destructive">🔥 Urgent Feed</h3>
                  <p className="text-xs text-muted-foreground">
                    Critical material needs
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs bg-gradient-to-r from-destructive to-chart-3 text-white rounded-full font-medium shadow-md">
                  {urgent.length} active
                </span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-3 max-h-[400px] overflow-x-hidden">
              {paginatedUrgent.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden p-2 rounded-xl bg-gradient-to-r from-destructive/5 to-chart-3/5 hover:from-destructive/10 hover:to-chart-3/10 transition-all transform hover:scale-105 border border-destructive/20 shadow-sm hover:shadow-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <p className="text-sm font-medium text-destructive group-hover:text-destructive/90 leading-snug">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground bg-card/50 px-2 py-1 rounded-md">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>

                    <div className="mb-4 p-3 bg-card/30 rounded-lg border border-destructive/10">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-3 w-3 text-destructive" />
                        <span className="text-xs font-medium text-destructive">
                          {item.studentId}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.message}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center justify-between">
                      <a
                        className="flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 hover:underline font-medium"
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View file
                      </a>
                      <button className="flex items-center gap-2 text-xs text-white bg-gradient-to-r from-destructive to-chart-3 hover:from-chart-3 hover:to-destructive px-3 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md">
                        <Upload className="h-3 w-3" />
                        Help Out
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalUrgentPages > 1 && (
              <div className="flex justify-center gap-2 mt-6 pt-4 border-t border-border">
                {Array.from({ length: totalUrgentPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setUrgentPage(page)}
                      className={`w-8 h-8 text-sm rounded-lg transition-all transform hover:scale-110 ${
                        page === urgentPage
                          ? "bg-gradient-to-r from-destructive to-chart-3 text-white shadow-md"
                          : "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
