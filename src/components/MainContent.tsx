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
} from "lucide-react";
import { useState, useMemo } from "react";

type Phase = "mid" | "final";
type ContentType = "note" | "question" | "answer";

type MaterialContent = {
  id: string;
  type: ContentType;
  phase?: Phase; // Only used for mid/final classification
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
    { id: "all", label: "All", icon: Filter },
    { id: "note", label: "Notes", icon: StickyNote },
    { id: "question", label: "Questions", icon: HelpCircle },
    { id: "answer", label: "Answers", icon: CheckCircle2 },
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

    // Filter by search query
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

    // Normalize filter
    const filter = activeFilter.toLowerCase();

    // Filter logic
    const filteredContent = content.filter((item: any) => {
      const type = item.type.toLowerCase();
      if (filter === "all") return true;
      if (filter.startsWith("mid"))
        return type.startsWith("mid") && type.endsWith(filter.split("-")[1]);
      if (filter.startsWith("final"))
        return type.startsWith("final") && type.endsWith(filter.split("-")[1]);
      return type.endsWith(filter); // For generic filter like 'note', 'question'
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
    // Increment preview count
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
      "Hash Table Implementation": `
# Hash Table Implementation

## Overview
Hash tables provide average O(1) time complexity for insertion, deletion, and lookup operations.

## Implementation Details

### Hash Function
A good hash function should:
- Be deterministic
- Distribute keys uniformly
- Be fast to compute

### Collision Resolution
1. **Chaining**: Store multiple values in linked lists
2. **Open Addressing**: Find alternative slots

### Code Example
\`\`\`cpp
class HashTable {
private:
    vector<list<pair<int, int>>> table;
    int size;
    
    int hash(int key) {
        return key % size;
    }
    
public:
    HashTable(int s) : size(s) {
        table.resize(size);
    }
    
    void insert(int key, int value) {
        int index = hash(key);
        table[index].push_back({key, value});
    }
};
\`\`\`
      `,
      "Proof Techniques and Logic": `
# Proof Techniques and Logic

## Types of Proofs

### 1. Direct Proof
- Start with hypothesis
- Use logical steps
- Arrive at conclusion

### 2. Proof by Contradiction
- Assume negation of conclusion
- Derive contradiction
- Original statement must be true

### 3. Mathematical Induction
- Base case
- Inductive step
- Conclusion

## Logical Operators
- AND (∧)
- OR (∨)  
- NOT (¬)
- IMPLIES (→)
- IF AND ONLY IF (↔)

## Example Proof
**Theorem**: The sum of two even integers is even.

**Proof**: Let a and b be even integers.
Then a = 2k and b = 2m for some integers k, m.
Therefore: a + b = 2k + 2m = 2(k + m)
Since (k + m) is an integer, a + b is even. ∎
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
    <div className="p-6 bg-background">
      {/* Header with Search */}
      <div className="mb-8">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search courses, materials, contributors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Filters and Semester Selection */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => {
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      activeFilter === filter.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Semester:</span>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-3 py-1.5 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
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
        <div className="mb-4 p-3 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Showing materials for{" "}
            {selectedSemester === "current"
              ? "current semester"
              : selectedSemester}
            {searchQuery.trim() && ` matching "${searchQuery}"`}
            {activeFilter !== "all" &&
              ` in ${filterOptions.find((f) => f.id === activeFilter)?.label}`}
          </p>
        </div>
      )}

      {/* Courses Section */}
      <div className="space-y-6">
        <div>
          <div className="mb-6">
            {searchedMaterialsOnDashboard.length > 0 && (
              <div className="p-4 gap-4 text-white  flex bg-gray-900/10 rounded-lg flex-wrap items-center justify-center">
                {searchedMaterialsOnDashboard.map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer border-border last:border-0 bg-gray-900 rounded-md flex-1 "
                  >
                    <button className="p-2 w-full">
                      <div className="flex items-center justify-between">
                        <h4 className="text-md font-semibold">
                          {item.courseCode}
                        </h4>
                        <button
                          onClick={() =>
                            handleRemoveSearchedCourse(item.courseCode)
                          }
                          className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-md transition-colors"
                          title="Remove Course"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex">
                        <p className="text-sm text-muted-foreground">
                          {item.courseName} - {item.courseFullName}
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4">
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
                  className="w-full border border-border rounded-lg bg-card text-card-foreground"
                >
                  <div className="p-6 pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">
                            {course.name}
                          </h3>
                          <span className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                            {selectedSemester === "current"
                              ? `${course.progress}% Complete`
                              : "Archive"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {course.fullName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>
                              {semesterData.content.length} shared items
                            </span>
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
                          className="p-2 flex items-center gap-1 bg-green-100 text-primary hover:bg-primary/10 rounded-md transition-colors"
                          title="Add Course"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-6">
                    <div className="flex flex-col md:flex-row md:gap-6">
                      {/* MID-TERM SECTION */}
                      {(midContent.length > 0 || midMissing.length > 0) && (
                        <div className="space-y-4 flex-1">
                          <h4 className="text-md font-semibold text-foreground">
                            Mid-term Materials
                          </h4>

                          {midContent.length > 0 && (
                            <div>
                              <div className="text-sm font-medium mb-2 flex items-center gap-2">
                                Available Materials
                                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                                  {midContent.length} items
                                </span>
                              </div>
                              <div className="space-y-2 mt-5">
                                {midContent.map((item: any, index: number) => {
                                  const Icon = getIconForContentType(item.type);
                                  return (
                                    <div
                                      key={index}
                                      className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                                      onClick={() => handlePreview(item)}
                                    >
                                      <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                          <p className="text-sm font-medium">
                                            {item.title}
                                          </p>
                                          <div className="flex items-center gap-3">
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                handlePreview(item);
                                              }}
                                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                                            >
                                              <Eye className="h-3 w-3" />
                                              <span>{item.previews}</span>
                                            </button>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                              <Download className="h-3 w-3" />
                                              <span>{item.downloads}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
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
                              <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                Missing Mid-term Materials
                                <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded">
                                  {midMissing.length} needed
                                </span>
                              </h5>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {midMissing.map((type: any) => {
                                  const pureType = type.split("-")[1];
                                  const Icon = getIconForContentType(pureType);
                                  return (
                                    <button
                                      key={type}
                                      onClick={() =>
                                        handleUpload(course.name, type)
                                      }
                                      className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-border hover:bg-accent/50 rounded-lg transition-colors"
                                    >
                                      <Icon className="h-6 w-6 text-muted-foreground" />
                                      <span className="text-xs font-medium">
                                        Upload {pureType}
                                      </span>
                                      <Plus className="h-4 w-4 text-primary" />
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
                        <div className="space-y-4 flex-1">
                          <h4 className="text-md font-semibold text-foreground">
                            Final-term Materials
                          </h4>

                          {finalContent.length > 0 && (
                            <div>
                              <div className="text-sm font-medium mb-2 flex items-center gap-2">
                                Available Materials
                                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded">
                                  {finalContent.length} items
                                </span>
                              </div>
                              <div className="space-y-2">
                                {finalContent.map(
                                  (item: any, index: number) => {
                                    const Icon = getIconForContentType(
                                      item.type
                                    );
                                    return (
                                      <div
                                        key={index}
                                        className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                                        onClick={() => handlePreview(item)}
                                      >
                                        <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium">
                                              {item.title}
                                            </p>
                                            <div className="flex items-center gap-3">
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handlePreview(item);
                                                }}
                                                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                                              >
                                                <Eye className="h-3 w-3" />
                                                <span>{item.previews}</span>
                                              </button>
                                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Download className="h-3 w-3" />
                                                <span>{item.downloads}</span>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary rounded">
                                              {item.type}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                              by {item.contributor}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}

                          {finalMissing.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium mb-2 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                Missing Final-term Materials
                                <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded">
                                  {finalMissing.length} needed
                                </span>
                              </h5>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {finalMissing.map((type: any) => {
                                  const pureType = type.split("-")[1];
                                  const Icon = getIconForContentType(pureType);
                                  return (
                                    <button
                                      key={type}
                                      onClick={() =>
                                        handleUpload(course.name, type)
                                      }
                                      className="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-border hover:bg-accent/50 rounded-lg transition-colors"
                                    >
                                      <Icon className="h-6 w-6 text-muted-foreground" />
                                      <span className="text-xs font-medium">
                                        Upload {pureType}
                                      </span>
                                      <Plus className="h-4 w-4 text-primary" />
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
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg border border-border w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Upload {uploadType} for Course {uploadCourse}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  placeholder={`Enter ${uploadType} title...`}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Describe the content..."
                  rows={3}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drop files here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, TXT files accepted
                </p>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Upload & Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {showPreviewModal && previewMaterial && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = getIconForContentType(previewMaterial.type);
                    return <Icon className="h-5 w-5 text-primary" />;
                  })()}
                  <div>
                    <h3 className="font-semibold">{previewMaterial.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      by {previewMaterial.contributor}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{previewMaterial.previews}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>{previewMaterial.downloads}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* PDF Content */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full bg-secondary/30 rounded-b-lg overflow-auto">
                <div className="max-w-4xl mx-auto bg-card shadow-lg min-h-full">
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
            <div className="p-4 border-t border-border bg-secondary/20">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Preview • Click outside or press ESC to close
                </p>
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
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
