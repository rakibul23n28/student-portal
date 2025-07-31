"use client";
import StudentLayout from "@/components/StudentLayout";
import {
  Upload,
  FileText,
  StickyNote,
  CheckCircle2,
  HelpCircle,
  Plus,
  X,
  Calendar,
  User,
  Tag,
  AlertCircle,
  Award,
  TrendingUp,
  Sparkles,
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
      color: "from-contribute-primary to-chart-4",
    },
    {
      id: "answer",
      label: "Answers",
      icon: CheckCircle2,
      description: "Exam solutions, answer keys, worked examples",
      color: "from-contribute-accent to-success",
    },
    {
      id: "question",
      label: "Questions",
      icon: HelpCircle,
      description: "Practice problems, quiz questions, mock tests",
      color: "from-success to-contribute-primary",
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
        return "text-success";
      case "pending":
        return "text-warning";
      case "rejected":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-success/10 border-success/20";
      case "pending":
        return "bg-warning/10 border-warning/20";
      case "rejected":
        return "bg-destructive/10 border-destructive/20";
      default:
        return "bg-muted/10 border-border";
    }
  };

  return (
    <StudentLayout>
      <div className="flex-1 p-6 bg-gradient-to-br from-background to-contribute-accent/10 min-h-screen">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-contribute-primary to-chart-4 rounded-2xl">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-contribute-primary to-chart-4 bg-clip-text text-transparent">
              🌟 Contribute Materials
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Share your knowledge and help fellow students succeed in their
            academic journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <div className="border border-contribute-border rounded-2xl bg-gradient-to-br from-card to-contribute-muted/20 p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-6 w-6 text-contribute-primary" />
                <h2 className="text-xl font-bold text-contribute-primary">
                  Upload New Material
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Content Type Selection */}
                <div>
                  <label className="block text-sm font-medium mb-4 text-contribute-primary">
                    Content Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
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
                          className={`group relative overflow-hidden p-6 border-2 rounded-xl text-left transition-all transform hover:scale-105 ${
                            uploadForm.type === type.id
                              ? "border-contribute-primary bg-gradient-to-r from-contribute-muted to-contribute-accent/30 shadow-lg"
                              : "border-contribute-border hover:border-contribute-primary/50 bg-card"
                          }`}
                        >
                          <div
                            className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                              background: `linear-gradient(135deg, var(--contribute-primary), var(--chart-4))`,
                              opacity: "0.05",
                            }}
                          />
                          <div className="relative">
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`p-2 rounded-lg bg-gradient-to-r ${type.color}`}
                              >
                                <Icon className="h-5 w-5 text-white" />
                              </div>
                              <span className="font-semibold text-contribute-primary">
                                {type.label}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {type.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-contribute-primary">
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
                    className="w-full px-4 py-3 border border-contribute-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-contribute-primary shadow-sm"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-contribute-primary">
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
                    rows={4}
                    className="w-full px-4 py-3 border border-contribute-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-contribute-primary shadow-sm"
                  />
                </div>

                {/* Course and Semester */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-contribute-primary">
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
                      className="w-full px-4 py-3 border border-contribute-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-contribute-primary shadow-sm"
                    >
                      {courseOptions.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3 text-contribute-primary">
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
                      className="w-full px-4 py-3 border border-contribute-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-contribute-primary shadow-sm"
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
                  <label className="block text-sm font-medium mb-3 text-contribute-primary">
                    Tags
                  </label>
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
                    className="w-full px-4 py-3 border border-contribute-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-contribute-primary shadow-sm"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    💡 Tags help other students find your material
                  </p>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-3 text-contribute-primary">
                    Upload File *
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
                      dragActive
                        ? "border-contribute-primary bg-contribute-muted/20 shadow-lg"
                        : uploadForm.file
                        ? "border-success bg-success/10 shadow-md"
                        : "border-contribute-border hover:border-contribute-primary/50 bg-contribute-muted/10"
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
                      <div className="flex items-center justify-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-success to-chart-4 rounded-2xl">
                          <FileText className="h-8 w-8 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-success text-lg">
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
                          className="p-2 hover:bg-destructive/10 rounded-full transition-colors"
                        >
                          <X className="h-5 w-5 text-destructive" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="p-4 bg-gradient-to-r from-contribute-primary to-chart-4 rounded-2xl w-fit mx-auto mb-4">
                          <Upload className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-contribute-primary font-medium text-lg mb-2">
                          Drop your file here or click to browse
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supports PDF, DOC, DOCX, TXT files up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={uploadStatus === "uploading"}
                    className="w-full px-6 py-4 bg-gradient-to-r from-contribute-primary to-chart-4 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 font-semibold text-lg"
                  >
                    {uploadStatus === "uploading" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading your material...
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5" />
                        🚀 Share Material with Community
                      </>
                    )}
                  </button>
                </div>

                {/* Status Messages */}
                {uploadStatus === "success" && (
                  <div className="p-4 bg-gradient-to-r from-success/10 to-chart-4/10 border border-success/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <p className="text-success font-medium">
                        🎉 Material uploaded successfully! It will be reviewed
                        and published shortly.
                      </p>
                    </div>
                  </div>
                )}

                {uploadStatus === "error" && (
                  <div className="p-4 bg-gradient-to-r from-destructive/10 to-chart-3/10 border border-destructive/20 rounded-xl">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-destructive" />
                      <p className="text-destructive font-medium">
                        ⚠️ Please fill in all required fields and select a file.
                      </p>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar - Recent Uploads & Guidelines */}
          <div className="space-y-8">
            {/* Upload Guidelines */}
            <div className="border border-contribute-border rounded-2xl bg-gradient-to-br from-card to-contribute-muted/20 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-6 w-6 text-contribute-primary" />
                <h3 className="text-lg font-bold text-contribute-primary">
                  📋 Guidelines
                </h3>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 p-3 bg-contribute-muted/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  <span>Ensure content is original or properly credited</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-contribute-muted/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  <span>Use clear, descriptive titles and descriptions</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-contribute-muted/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  <span>Add relevant tags for better discoverability</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-contribute-muted/20 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                  <span>Files should be well-formatted and readable</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <span>All uploads are reviewed before publication</span>
                </div>
              </div>
            </div>

            {/* Recent Uploads */}
            <div className="border border-contribute-border rounded-2xl bg-gradient-to-br from-card to-contribute-muted/20 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="h-6 w-6 text-contribute-primary" />
                <h3 className="text-lg font-bold text-contribute-primary">
                  📈 Your Recent Uploads
                </h3>
              </div>
              <div className="space-y-4">
                {recentUploads.map((upload) => (
                  <div
                    key={upload.id}
                    className={`p-4 rounded-xl border ${getStatusBg(
                      upload.status
                    )} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-sm leading-snug">
                        {upload.title}
                      </h4>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(
                          upload.status
                        )} bg-card shadow-sm`}
                      >
                        {upload.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="font-medium">
                        {upload.course} • {upload.type}
                      </span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>{upload.downloads} downloads</span>
                      </div>
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
