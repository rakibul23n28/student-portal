"use client";
import {
  Search,
  FileText,
  Filter,
  HelpCircle,
  CheckCircle2,
  StickyNote,
  Upload,
  Plus,
  Users,
  AlertTriangle,
  Eye,
  X,
  Download,
  Trash2,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState, useMemo } from "react";

type Phase = "mid" | "final";
type ContentType = "note" | "question" | "answer";

type MaterialContent = {
  id: string;
  type: ContentType;
  phase?: Phase;
  title: string;
  contributor: string;
  downloads: number;
  previews: number;
  semester: string;
  fileUrl: string;
};

type SemesterContent = {
  content: MaterialContent[];
  missing: string[];
};

type Course = {
  id: number;
  name: string;
  code: string;
  fullName: string;
  currentSemester: string;
  progress: number;
  semesters: {
    [semester: string]: SemesterContent;
  };
};

export function MainContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("current");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [uploadCourse, setUploadCourse] = useState("");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState<any>(null);

  const [searchedMaterialsOnDashboard, setSearchedMaterialsOnDashboard] =
    useState<
      { courseCode: string; courseName: string; courseFullName: string }[]
    >([]);

  const [materials, setMaterials] = useState<Course[]>([
    {
      id: 1,
      name: "DSA1",
      code: "CS101",
      fullName: "Data Structures and Algorithms I",
      currentSemester: "Spring 2025",
      progress: 75,
      semesters: {
        "Spring 2025": {
          content: [
            {
              id: "dsa1-notes-1",
              type: "note",
              phase: "mid",
              title: "Array Implementation Notes",
              contributor: "John Doe",
              downloads: 45,
              previews: 10,
              semester: "Spring 2025",
              fileUrl: "/mid-notes.pdf",
            },
            {
              id: "dsa1-question-1",
              type: "question",
              phase: "mid",
              title: "Mid-term Practice Questions",
              contributor: "Jane Smith",
              downloads: 32,
              previews: 8,
              semester: "Spring 2025",
              fileUrl: "/mid-questions.pdf",
            },
            {
              id: "dsa1-answer-1",
              type: "answer",
              phase: "mid",
              title: "Mid-term Answer Key",
              contributor: "Mike Johnson",
              downloads: 78,
              previews: 25,
              semester: "Spring 2025",
              fileUrl: "/mid-answers.pdf",
            },
          ],
          missing: ["final-note", "final-question", "final-answer"],
        },
        "Fall 2024": {
          content: [
            {
              id: "dsa1-notes-2",
              type: "note",
              phase: "final",
              title: "Comprehensive DSA Notes",
              contributor: "Sarah Wilson",
              downloads: 156,
              previews: 67,
              semester: "Fall 2024",
              fileUrl: "/comprehensive-notes.pdf",
            },
            {
              id: "dsa1-answer-2",
              type: "answer",
              phase: "final",
              title: "Final Exam Solutions",
              contributor: "Emily Davis",
              downloads: 112,
              previews: 45,
              semester: "Fall 2024",
              fileUrl: "/final-solutions.pdf",
            },
            {
              id: "dsa1-question-2",
              type: "question",
              phase: "final",
              title: "Practice Question Bank",
              contributor: "David Lee",
              downloads: 203,
              previews: 89,
              semester: "Fall 2024",
              fileUrl: "/question-bank.pdf",
            },
          ],
          missing: ["mid-note", "mid-question", "mid-answer"],
        },
        "Spring 2024": {
          content: [
            {
              id: "dsa1-notes-3",
              type: "note",
              phase: "mid",
              title: "Basic Data Structures",
              contributor: "Lisa Chen",
              downloads: 67,
              previews: 23,
              semester: "Spring 2024",
              fileUrl: "/basic-structures.pdf",
            },
          ],
          missing: [
            "mid-question",
            "mid-answer",
            "final-note",
            "final-question",
            "final-answer",
          ],
        },
      },
    },
    {
      id: 2,
      name: "DSA2",
      code: "CS102",
      fullName: "Data Structures and Algorithms II",
      currentSemester: "Spring 2025",
      progress: 45,
      semesters: {
        "Spring 2025": {
          content: [
            {
              id: "dsa2-notes-1",
              type: "note",
              phase: "mid",
              title: "Hash Table Implementation",
              contributor: "Current Student",
              downloads: 23,
              previews: 12,
              semester: "Spring 2025",
              fileUrl: "/hash-tables.pdf",
            },
          ],
          missing: [
            "mid-question",
            "mid-answer",
            "final-note",
            "final-question",
            "final-answer",
          ],
        },
        "Fall 2024": {
          content: [
            {
              id: "dsa2-question-1",
              type: "question",
              phase: "final",
              title: "Advanced Algorithm Problems",
              contributor: "Amy Rodriguez",
              downloads: 67,
              previews: 29,
              semester: "Fall 2024",
              fileUrl: "/advanced-problems.pdf",
            },
            {
              id: "dsa2-answer-1",
              type: "answer",
              phase: "final",
              title: "Graph Algorithms Solutions",
              contributor: "Tom Anderson",
              downloads: 45,
              previews: 18,
              semester: "Fall 2024",
              fileUrl: "/graph-solutions.pdf",
            },
          ],
          missing: ["mid-note", "mid-question", "mid-answer", "final-note"],
        },
      },
    },
    {
      id: 3,
      name: "DM",
      code: "MATH101",
      fullName: "Discrete Mathematics",
      currentSemester: "Spring 2025",
      progress: 60,
      semesters: {
        "Spring 2025": {
          content: [
            {
              id: "math101-notes-1",
              type: "note",
              phase: "mid",
              title: "Proof Techniques and Logic",
              contributor: "Prof. Thompson",
              downloads: 89,
              previews: 34,
              semester: "Spring 2025",
              fileUrl: "/proof-techniques.pdf",
            },
          ],
          missing: [
            "mid-question",
            "mid-answer",
            "final-note",
            "final-question",
            "final-answer",
          ],
        },
        "Fall 2024": {
          content: [
            {
              id: "math101-answer-1",
              type: "answer",
              phase: "final",
              title: "Logic Problems Solutions",
              contributor: "Maria Garcia",
              downloads: 56,
              previews: 21,
              semester: "Fall 2024",
              fileUrl: "/logic-solutions.pdf",
            },
            {
              id: "math101-question-1",
              type: "question",
              phase: "final",
              title: "Discrete Math Practice Questions",
              contributor: "Robert Kim",
              downloads: 78,
              previews: 31,
              semester: "Fall 2024",
              fileUrl: "/discrete-practice.pdf",
            },
          ],
          missing: ["mid-note", "mid-question", "mid-answer", "final-note"],
        },
      },
    },
  ]);

  const filterOptions = [
    {
      id: "all",
      label: "All",
      icon: Filter,
      color: "bg-gradient-to-r from-purple-500 to-blue-500",
    },
    {
      id: "note",
      label: "Notes",
      icon: StickyNote,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    {
      id: "question",
      label: "Questions",
      icon: HelpCircle,
      color: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      id: "answer",
      label: "Answers",
      icon: CheckCircle2,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    },
  ];

  const semesterOptions = [
    { id: "current", label: "Current Semester" },
    { id: "Spring 2025", label: "Spring 2025" },
    { id: "Summer 2024", label: "Summer 2024" },
    { id: "Fall 2024", label: "Fall 2024" },
    { id: "Spring 2024", label: "Spring 2024" },
    { id: "Summer 2023", label: "Summer 2023" },
    { id: "Fall 2023", label: "Fall 2023" },
    { id: "Spring 2023", label: "Spring 2023" },
  ];

  const filteredCourses = useMemo(() => {
    let filtered = materials;

    if (searchQuery.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered.filter((course) => {
        const nameMatch =
          course.name.toLowerCase().includes(query) ||
          course.fullName.toLowerCase().includes(query);
        return nameMatch;
      });
    }

    return filtered;
  }, [searchQuery, materials]);

  const getCurrentSemesterContent = (course: any, activeFilter: string) => {
    const semester =
      selectedSemester === "current"
        ? course.currentSemester
        : selectedSemester;

    const fullSemester = course.semesters?.[semester] || {
      content: [],
      missing: [
        "mid-note",
        "mid-question",
        "mid-answer",
        "final-note",
        "final-question",
        "final-answer",
      ],
    };

    const { content, missing } = fullSemester;
    const filter = activeFilter.toLowerCase();

    const filteredContent = content.filter((item: any) => {
      const type = item.type.toLowerCase();
      if (filter === "all") return true;
      if (filter.startsWith("mid"))
        return type.startsWith("mid") && type.endsWith(filter.split("-")[1]);
      if (filter.startsWith("final"))
        return type.startsWith("final") && type.endsWith(filter.split("-")[1]);
      return type.endsWith(filter);
    });

    const filteredMissing = missing.filter((type: string) => {
      const lowerType = type.toLowerCase();
      if (filter === "all") return true;
      if (filter.startsWith("mid"))
        return (
          lowerType.startsWith("mid") &&
          lowerType.endsWith(filter.split("-")[1])
        );
      if (filter.startsWith("final"))
        return (
          lowerType.startsWith("final") &&
          lowerType.endsWith(filter.split("-")[1])
        );
      return lowerType.endsWith(filter);
    });

    return {
      content: filteredContent,
      missing: filteredMissing,
    };
  };

  const getIconForContentType = (type: string) => {
    switch (type) {
      case "note":
        return StickyNote;
      case "answer":
        return CheckCircle2;
      case "question":
        return HelpCircle;
      default:
        return FileText;
    }
  };

  const handleUpload = (courseId: string, contentType: string) => {
    setUploadCourse(courseId);
    setUploadType(contentType);
    setShowUploadModal(true);
  };

  const handlePreview = (material: any) => {
    setMaterials((prevMaterials) =>
      prevMaterials.map((course) => ({
        ...course,
        semesters: Object.fromEntries(
          Object.entries(course.semesters).map(
            ([semesterKey, semesterData]: [string, any]) => [
              semesterKey,
              {
                ...semesterData,
                content: semesterData.content.map((item: any) =>
                  item.id === material.id
                    ? { ...item, previews: item.previews + 1 }
                    : item
                ),
              },
            ]
          )
        ),
      }))
    );

    setPreviewMaterial(material);
    setShowPreviewModal(true);
  };

  const handleAddCourseModal = (course: {
    courseCode: string;
    courseName: string;
    courseFullName: string;
  }) => {
    setSearchedMaterialsOnDashboard((prev) => {
      const isAlreadyAdded = prev.some(
        (c) => c.courseCode === course.courseCode
      );

      if (isAlreadyAdded) {
        return prev;
      }

      return [
        ...prev,
        {
          courseCode: course.courseCode,
          courseName: course.courseName,
          courseFullName: course.courseFullName,
        },
      ];
    });
  };

  const handleRemoveSearchedCourse = (courseCode: string) => {
    setSearchedMaterialsOnDashboard((prev) =>
      prev.filter((course) => course.courseCode !== courseCode)
    );
  };

  const getPDFContent = (material: any) => {
    const contentMap: { [key: string]: string } = {
      "Array Implementation Notes": `
# Array Implementation Notes

## Table of Contents
1. Introduction to Arrays
2. Array Operations
3. Time Complexity Analysis
4. Implementation Examples

## 1. Introduction to Arrays
Arrays are fundamental data structures that store elements in contiguous memory locations. They provide constant-time access to elements using indices.

### Key Properties:
- Fixed size (in static arrays)
- Homogeneous elements
- Random access capability
- Cache-friendly memory layout

## 2. Array Operations

### Insertion
- At beginning: O(n)
- At end: O(1) - if space available
- At arbitrary position: O(n)

### Deletion
- From beginning: O(n)
- From end: O(1)
- From arbitrary position: O(n)

### Search
- Linear search: O(n)
- Binary search (sorted): O(log n)

## 3. Implementation Examples

\`\`\`cpp
class Array {
private:
    int* data;
    int size;
    int capacity;
    
public:
    Array(int cap) : capacity(cap), size(0) {
        data = new int[capacity];
    }
    
    void insert(int index, int value) {
        if (size >= capacity) return;
        
        for (int i = size; i > index; i--) {
            data[i] = data[i-1];
        }
        data[index] = value;
        size++;
    }
};
\`\`\`
      `,
      default: `
# Study Material

## Content Preview
This is a preview of the study material. The full content includes:

- Detailed explanations
- Code examples
- Practice problems
- Solutions and answers

## Topics Covered
1. Core concepts
2. Implementation details
3. Best practices
4. Common pitfalls

## How to Use
1. Read through the material carefully
2. Try the practice problems
3. Review the solutions
4. Apply concepts to new problems

Download the full PDF to access all content and detailed explanations.
      `,
    };

    return contentMap[material.title] || contentMap.default;
  };

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-background to-accent/20 min-h-screen">
      {/* Header with Search */}
      <div className="mb-8">
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="text-center py-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent mb-2">
              Course Materials Dashboard
            </h1>
            <p className="text-muted-foreground">
              Find, share, and collaborate on study materials
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search courses, materials, contributors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-input rounded-xl bg-card/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
            />
          </div>

          {/* Filters and Semester Selection */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm rounded-xl transition-all transform hover:scale-105 shadow-md ${
                      activeFilter === filter.id
                        ? `${filter.color} text-white shadow-lg`
                        : "bg-card text-card-foreground hover:bg-accent/50 border border-border"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md border border-border">
              <span className="text-sm font-medium text-muted-foreground">
                Semester:
              </span>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 py-1 text-sm border-0 rounded-lg bg-transparent text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {semesterOptions.map((semester) => (
                  <option key={semester.id} value={semester.id}>
                    {semester.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Info */}
      {(searchQuery.trim() ||
        activeFilter !== "all" ||
        selectedSemester !== "current") && (
        <div className="mb-6 p-4 bg-info/10 border border-info/20 rounded-xl backdrop-blur-sm">
          <p className="text-sm text-info font-medium">
            📊 Showing materials for{" "}
            {selectedSemester === "current"
              ? "current semester"
              : selectedSemester}
            {searchQuery.trim() && ` matching "${searchQuery}"`}
            {activeFilter !== "all" &&
              ` in ${filterOptions.find((f) => f.id === activeFilter)?.label}`}
          </p>
        </div>
      )}

      {/* Selected Courses Bar */}
      {searchedMaterialsOnDashboard.length > 0 && (
        <div className="mb-8 p-6 bg-gradient-to-r from-chart-1/10 to-chart-2/10 rounded-xl border border-chart-1/20 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4 text-chart-1">
            📌 Quick Access Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchedMaterialsOnDashboard.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-gradient-to-br from-card to-accent/20 border border-border rounded-xl p-4 shadow-md hover:shadow-lg transition-all transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-chart-1/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-primary">
                      {item.courseCode}
                    </h4>
                    <button
                      onClick={() =>
                        handleRemoveSearchedCourse(item.courseCode)
                      }
                      className="p-1 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                      title="Remove Course"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.courseName} - {item.courseFullName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Courses Section */}
      <div className="space-y-8">
        <div className="grid gap-6">
          {filteredCourses.map((course) => {
            const semesterData = getCurrentSemesterContent(
              course,
              activeFilter
            );

            const midContent = semesterData.content.filter(
              (item: any) => item.phase === "mid"
            );

            const finalContent = semesterData.content.filter(
              (item: any) => item.phase === "final"
            );

            const midMissing = semesterData.missing.filter(
              (type: string) =>
                type.startsWith("mid") &&
                (activeFilter === "all" || type.endsWith(activeFilter))
            );

            const finalMissing = semesterData.missing.filter(
              (type: string) =>
                type.startsWith("final") &&
                (activeFilter === "all" || type.endsWith(activeFilter))
            );

            return (
              <div
                key={course.id}
                className="group border border-border rounded-2xl bg-gradient-to-br from-card to-accent/10 shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6 bg-gradient-to-r from-primary/5 to-chart-1/5 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-primary">
                          {course.name}
                        </h3>
                        <span className="px-3 py-1 text-xs bg-gradient-to-r from-chart-1 to-chart-2 text-white rounded-full shadow-md">
                          {selectedSemester === "current"
                            ? `${course.progress}% Complete`
                            : "Archive"}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{course.fullName}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-chart-1" />
                          <span className="font-medium">
                            {semesterData.content.length} shared items
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <TrendingUp className="h-4 w-4 text-chart-2" />
                          <span>Active community</span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleAddCourseModal({
                            courseCode: course.code,
                            courseName: course.name,
                            courseFullName: course.fullName,
                          })
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-success to-chart-4 text-white hover:shadow-lg rounded-xl transition-all transform hover:scale-105"
                        title="Add to Dashboard"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* MID-TERM SECTION */}
                    {(midContent.length > 0 || midMissing.length > 0) && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-8 bg-gradient-to-b from-mid-primary to-mid-accent rounded-full"></div>
                          <h4 className="text-lg font-bold text-mid-primary">
                            🔵 Mid-term Materials
                          </h4>
                        </div>

                        {midContent.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-sm font-medium text-mid-primary">
                                Available Materials
                              </span>
                              <span className="px-2 py-1 text-xs bg-success text-success-foreground rounded-full">
                                {midContent.length} items
                              </span>
                            </div>
                            <div className="space-y-3">
                              {midContent.map((item: any, index: number) => {
                                const Icon = getIconForContentType(item.type);
                                return (
                                  <div
                                    key={index}
                                    className="group/item flex items-start gap-3 p-4 bg-gradient-to-r from-mid-muted to-mid-accent/30 rounded-xl hover:shadow-md transition-all cursor-pointer border border-mid-border"
                                    onClick={() => handlePreview(item)}
                                  >
                                    <Icon className="h-5 w-5 text-mid-primary mt-0.5" />
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <p className="font-medium text-mid-primary group-hover/item:text-mid-primary">
                                          {item.title}
                                        </p>
                                        <div className="flex items-center gap-3">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handlePreview(item);
                                            }}
                                            className="flex items-center gap-1 text-xs text-mid-primary hover:text-mid-primary/80 transition-colors"
                                          >
                                            <Eye className="h-3 w-3" />
                                            <span>{item.previews}</span>
                                          </button>
                                          <div className="flex items-center gap-1 text-xs text-mid-primary">
                                            <Download className="h-3 w-3" />
                                            <span>{item.downloads}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 mt-2">
                                        <span className="inline-block px-2 py-1 text-xs bg-mid-primary text-mid-primary-foreground rounded-md">
                                          {item.type}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          by {item.contributor}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {midMissing.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium mb-3 flex items-center gap-2 text-warning">
                              <AlertTriangle className="h-4 w-4" />
                              Missing Mid-term Materials
                              <span className="px-2 py-1 text-xs bg-warning text-warning-foreground rounded-full">
                                {midMissing.length} needed
                              </span>
                            </h5>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                              {midMissing.map((type: any) => {
                                const pureType = type.split("-")[1];
                                const Icon = getIconForContentType(pureType);
                                return (
                                  <button
                                    key={type}
                                    onClick={() =>
                                      handleUpload(course.name, type)
                                    }
                                    className="group flex flex-col items-center gap-2 p-4 border-2 border-dashed border-mid-border hover:bg-mid-muted/50 rounded-xl transition-all transform hover:scale-105"
                                  >
                                    <Icon className="h-6 w-6 text-mid-primary group-hover:text-mid-primary" />
                                    <span className="text-xs font-medium text-mid-primary">
                                      Upload {pureType}
                                    </span>
                                    <Plus className="h-4 w-4 text-mid-primary" />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* FINAL-TERM SECTION */}
                    {(finalContent.length > 0 || finalMissing.length > 0) && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-8 bg-gradient-to-b from-final-primary to-final-accent rounded-full"></div>
                          <h4 className="text-lg font-bold text-final-primary">
                            🟣 Final-term Materials
                          </h4>
                        </div>

                        {finalContent.length > 0 && (
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-sm font-medium text-final-primary">
                                Available Materials
                              </span>
                              <span className="px-2 py-1 text-xs bg-success text-success-foreground rounded-full">
                                {finalContent.length} items
                              </span>
                            </div>
                            <div className="space-y-3">
                              {finalContent.map((item: any, index: number) => {
                                const Icon = getIconForContentType(item.type);
                                return (
                                  <div
                                    key={index}
                                    className="group/item flex items-start gap-3 p-4 bg-gradient-to-r from-final-muted to-final-accent/30 rounded-xl hover:shadow-md transition-all cursor-pointer border border-final-border"
                                    onClick={() => handlePreview(item)}
                                  >
                                    <Icon className="h-5 w-5 text-final-primary mt-0.5" />
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <p className="font-medium text-final-primary group-hover/item:text-final-primary">
                                          {item.title}
                                        </p>
                                        <div className="flex items-center gap-3">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handlePreview(item);
                                            }}
                                            className="flex items-center gap-1 text-xs text-final-primary hover:text-final-primary/80 transition-colors"
                                          >
                                            <Eye className="h-3 w-3" />
                                            <span>{item.previews}</span>
                                          </button>
                                          <div className="flex items-center gap-1 text-xs text-final-primary">
                                            <Download className="h-3 w-3" />
                                            <span>{item.downloads}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 mt-2">
                                        <span className="inline-block px-2 py-1 text-xs bg-final-primary text-final-primary-foreground rounded-md">
                                          {item.type}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          by {item.contributor}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {finalMissing.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium mb-3 flex items-center gap-2 text-warning">
                              <AlertTriangle className="h-4 w-4" />
                              Missing Final-term Materials
                              <span className="px-2 py-1 text-xs bg-warning text-warning-foreground rounded-full">
                                {finalMissing.length} needed
                              </span>
                            </h5>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                              {finalMissing.map((type: any) => {
                                const pureType = type.split("-")[1];
                                const Icon = getIconForContentType(pureType);
                                return (
                                  <button
                                    key={type}
                                    onClick={() =>
                                      handleUpload(course.name, type)
                                    }
                                    className="group flex flex-col items-center gap-2 p-4 border-2 border-dashed border-final-border hover:bg-final-muted/50 rounded-xl transition-all transform hover:scale-105"
                                  >
                                    <Icon className="h-6 w-6 text-final-primary group-hover:text-final-primary" />
                                    <span className="text-xs font-medium text-final-primary">
                                      Upload {pureType}
                                    </span>
                                    <Plus className="h-4 w-4 text-final-primary" />
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-card p-6 rounded-2xl border border-border w-full max-w-lg shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-primary">
              📤 Upload {uploadType} for {uploadCourse}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  placeholder={`Enter ${uploadType} title...`}
                  className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe the content..."
                  rows={3}
                  className="w-full px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="border-2 border-dashed border-primary/50 rounded-xl p-8 text-center bg-primary/5">
                <Upload className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="text-sm text-primary font-medium">
                  Drop files here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, TXT files accepted
                </p>
              </div>
              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-6 py-2 text-sm border border-border rounded-xl hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 text-sm bg-gradient-to-r from-primary to-chart-1 text-white rounded-xl hover:shadow-lg transition-all">
                  Upload & Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {showPreviewModal && previewMaterial && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-card rounded-2xl border border-border w-full max-w-5xl h-full max-h-[90vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/5 to-chart-1/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = getIconForContentType(previewMaterial.type);
                    return <Icon className="h-6 w-6 text-primary" />;
                  })()}
                  <div>
                    <h3 className="text-lg font-bold text-primary">
                      {previewMaterial.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      by {previewMaterial.contributor}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-chart-1">
                    <Eye className="h-4 w-4" />
                    <span className="font-medium">
                      {previewMaterial.previews}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-chart-2">
                    <Download className="h-4 w-4" />
                    <span className="font-medium">
                      {previewMaterial.downloads}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-accent rounded-xl transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full bg-gradient-to-br from-secondary/30 to-accent/30 rounded-b-2xl overflow-auto">
                <div className="max-w-4xl mx-auto bg-card shadow-xl min-h-full m-4 rounded-xl">
                  <div className="p-8">
                    <div className="prose dark:prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {getPDFContent(previewMaterial)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border bg-gradient-to-r from-secondary/20 to-accent/20">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  📖 Preview • Press ESC to close
                </p>
                <button className="flex items-center gap-2 px-6 py-2 text-sm bg-gradient-to-r from-success to-chart-4 text-white rounded-xl hover:shadow-lg transition-all">
                  <Download className="h-4 w-4" />
                  Download Full PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
