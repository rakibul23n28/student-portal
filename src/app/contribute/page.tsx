"use client";
import StudentLayout from "@/components/StudentLayout";
import {
  Upload,
  FileText,
  StickyNote,
  CheckCircle2,
  HelpCircle,
  X,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function ContributePage() {
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    type: "note",
    course: "",
    semester: "",
    tags: "",
    file: null as File | null,
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [recentUploads, setRecentUploads] = useState([
    {
      id: 1,
      title: "Linear Algebra Notes Chapter 5",
      type: "note",
      course: "MATH201",
      status: "approved",
      downloads: 23,
      uploadDate: "2025-01-20",
    },
    {
      id: 2,
      title: "Algorithm Analysis Assignment 3",
      type: "assignment",
      course: "DSA1",
      status: "pending",
      downloads: 0,
      uploadDate: "2025-01-18",
    },
    {
      id: 3,
      title: "Database Design Practice Questions",
      type: "question",
      course: "CS301",
      status: "approved",
      downloads: 67,
      uploadDate: "2025-01-15",
    },
  ]);

  const contentTypes = [
    {
      id: "note",
      label: "Notes",
      icon: StickyNote,
      description: "Study notes, lecture summaries, concept explanations",
    },
    {
      id: "assignment",
      label: "Assignments",
      icon: FileText,
      description: "Assignment solutions, project work, homework",
    },
    {
      id: "answer",
      label: "Answers",
      icon: CheckCircle2,
      description: "Exam solutions, answer keys, worked examples",
    },
    {
      id: "question",
      label: "Questions",
      icon: HelpCircle,
      description: "Practice problems, quiz questions, mock tests",
    },
  ];

  const courseOptions = [
    { id: "", label: "Select a course" },
    { id: "DSA1", label: "DSA1 - Data Structures and Algorithms I" },
    { id: "DSA2", label: "DSA2 - Data Structures and Algorithms II" },
    { id: "MATH101", label: "MATH101 - Discrete Mathematics" },
    { id: "MATH201", label: "MATH201 - Linear Algebra" },
    { id: "CS301", label: "CS301 - Database Systems" },
  ];

  const semesterOptions = [
    { id: "", label: "Select semester" },
    { id: "Spring 2025", label: "Spring 2025 (Current)" },
    { id: "Fall 2024", label: "Fall 2024" },
    { id: "Spring 2024", label: "Spring 2024" },
    { id: "Fall 2023", label: "Fall 2023" },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (
        file.type === "application/pdf" ||
        file.type.includes("document") ||
        file.type === "text/plain"
      ) {
        setUploadForm((prev) => ({ ...prev, file }));
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.title || !uploadForm.course) {
      setUploadStatus("error");
      return;
    }

    setUploadStatus("uploading");
    // Simulate upload
    setTimeout(() => {
      setUploadStatus("success");
      // Reset form
      setUploadForm({
        title: "",
        description: "",
        type: "note",
        course: "",
        semester: "",
        tags: "",
        file: null,
      });
      // Add to recent uploads
      const newUpload = {
        id: Date.now(),
        title: uploadForm.title,
        type: uploadForm.type,
        course: uploadForm.course,
        status: "pending" as const,
        downloads: 0,
        uploadDate: new Date().toISOString().split("T")[0],
      };
      setRecentUploads((prev) => [newUpload, ...prev]);

      setTimeout(() => setUploadStatus(""), 3000);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "rejected":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 dark:bg-green-900";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900";
      case "rejected":
        return "bg-red-100 dark:bg-red-900";
      default:
        return "bg-gray-100 dark:bg-gray-900";
    }
  };

  return (
    <StudentLayout>
      <div className="flex-1 p-6 bg-background">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl mb-2">Contribute Materials</h1>
          <p className="text-muted-foreground">
            Share your study materials to help fellow students succeed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <div className="border border-border rounded-lg bg-card p-6">
              <h2 className="text-lg font-semibold mb-4">
                Upload New Material
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Content Type Selection */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Content Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {contentTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() =>
                            setUploadForm((prev) => ({
                              ...prev,
                              type: type.id,
                            }))
                          }
                          className={`p-4 border rounded-lg text-left transition-all ${
                            uploadForm.type === type.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <Icon className="h-5 w-5 text-primary" />
                            <span className="font-medium">{type.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {type.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadForm.title}
                    onChange={(e) =>
                      setUploadForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter a descriptive title for your material"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) =>
                      setUploadForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Provide a detailed description of the content, topics covered, etc."
                    rows={3}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Course and Semester */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Course *
                    </label>
                    <select
                      required
                      value={uploadForm.course}
                      onChange={(e) =>
                        setUploadForm((prev) => ({
                          ...prev,
                          course: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {courseOptions.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Semester
                    </label>
                    <select
                      value={uploadForm.semester}
                      onChange={(e) =>
                        setUploadForm((prev) => ({
                          ...prev,
                          semester: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {semesterOptions.map((semester) => (
                        <option key={semester.id} value={semester.id}>
                          {semester.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <input
                    type="text"
                    value={uploadForm.tags}
                    onChange={(e) =>
                      setUploadForm((prev) => ({
                        ...prev,
                        tags: e.target.value,
                      }))
                    }
                    placeholder="Enter tags separated by commas (e.g., arrays, complexity, sorting)"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Tags help other students find your material
                  </p>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload File *
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive
                        ? "border-primary bg-primary/5"
                        : uploadForm.file
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-border hover:border-primary/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileInput}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {uploadForm.file ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="font-medium text-green-700 dark:text-green-300">
                            {uploadForm.file.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {(uploadForm.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setUploadForm((prev) => ({ ...prev, file: null }))
                          }
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">
                          Drop your file here or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Supports PDF, DOC, DOCX, TXT files
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={uploadStatus === "uploading"}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {uploadStatus === "uploading" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Share Material
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {uploadStatus === "success" && (
                  <div className="p-3 bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-md">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Material uploaded successfully! It will be reviewed and
                        published shortly.
                      </p>
                    </div>
                  </div>
                )}

                {uploadStatus === "error" && (
                  <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Please fill in all required fields and select a file.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar - Recent Uploads & Guidelines */}
          <div className="space-y-6">
            {/* Upload Guidelines */}
            <div className="border border-border rounded-lg bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Guidelines</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Ensure content is original or properly credited</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Use clear, descriptive titles and descriptions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Add relevant tags for better discoverability</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Files should be well-formatted and readable</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <span>All uploads are reviewed before publication</span>
                </div>
              </div>
            </div>

            {/* Recent Uploads */}
            <div className="border border-border rounded-lg bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">
                Your Recent Uploads
              </h3>
              <div className="space-y-3">
                {recentUploads.map((upload) => (
                  <div
                    key={upload.id}
                    className="p-3 bg-secondary/30 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{upload.title}</h4>
                      <span
                        className={`px-2 py-0.5 text-xs rounded ${getStatusBg(
                          upload.status
                        )} ${getStatusColor(upload.status)}`}
                      >
                        {upload.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {upload.course} • {upload.type}
                      </span>
                      <span>{upload.downloads} downloads</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
