"use client";

import { useState } from "react";
import { Bell, Flame, Upload } from "lucide-react";

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

const ITEMS_PER_PAGE = 10;

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
    <div className="space-y-4 h-screen">
      {/* Tabs */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("collab")}
            className={`flex items-center gap-1 px-3 py-1 rounded-md ${
              activeTab === "collab"
                ? "bg-neutral-900 text-white"
                : "hover:bg-secondary"
            }`}
          >
            <Bell className="h-4 w-4" />
            Collab
          </button>
          <button
            onClick={() => setActiveTab("urgent")}
            className={`flex items-center gap-1 px-3 py-1 rounded-md ${
              activeTab === "urgent"
                ? "bg-neutral-900 text-white"
                : "hover:bg-secondary"
            }`}
          >
            <Flame className="h-4 w-4" />
            Urgent
          </button>
        </div>
      </div>

      {/* Collab Feed */}
      {activeTab === "collab" && (
        <div className="border border-border rounded-xl bg-white/60 backdrop-blur-sm shadow-md text-card-foreground">
          <div className="flex justify-between items-center px-6 pt-6 pb-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <Bell className="h-5 w-5 text-indigo-500" />
              Collab Feed
            </div>
          </div>

          <div className="px-6 pb-6 pt-0">
            <div className="h-[450px] overflow-y-auto space-y-4">
              {paginatedCollab.map((n) => (
                <div
                  key={n.id}
                  className="p-4 rounded-lg bg-indigo-100/40 hover:bg-indigo-100 transition space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {n.title}
                    </p>
                    <span className="text-xs text-gray-500">{n.time}</span>
                  </div>

                  <button className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 hover:underline font-medium">
                    <Upload className="h-4 w-4" />
                    Upload
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 pt-6">
              {Array.from({ length: totalCollabPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCollabPage(page)}
                    className={`w-8 h-8 text-sm rounded-full transition ${
                      page === collabPage
                        ? "bg-indigo-600 text-white shadow"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Urgent Feed */}
      {activeTab === "urgent" && (
        <div className="border border-border rounded-xl bg-white/60 backdrop-blur-sm shadow-md text-card-foreground">
          <div className="flex justify-between items-center px-6 pt-6 pb-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-red-700">
              <Flame className="h-5 w-5 text-red-600" />
              Urgent Feed
              <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-md">
                {urgent.length}
              </span>
            </div>
          </div>

          <div className="px-6 pb-6 pt-0">
            <div className="h-[450px] overflow-y-auto space-y-4">
              {paginatedUrgent.map((n) => (
                <div
                  key={n.id}
                  className="p-4 rounded-lg bg-red-100/50 hover:bg-red-100 transition space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-gray-800">
                      {n.title}
                    </p>
                    <span className="text-xs text-gray-500">{n.time}</span>
                  </div>

                  <p className="text-xs text-gray-600">
                    <strong>{n.studentId}:</strong> {n.message}
                  </p>

                  <div className="flex gap-2 items-center justify-between text-sm">
                    <a
                      className="text-red-600 hover:underline"
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View the file
                    </a>
                    <button className="flex items-center gap-1 text-red-700 hover:text-red-800 hover:underline font-medium">
                      <Upload className="h-4 w-4" />
                      Upload
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 pt-6">
              {Array.from({ length: totalUrgentPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setUrgentPage(page)}
                    className={`w-8 h-8 text-sm rounded-full transition ${
                      page === urgentPage
                        ? "bg-red-600 text-white shadow"
                        : "text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
