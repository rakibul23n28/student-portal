"use client";
import StudentLayout from "@/components/StudentLayout";
import {
  Calculator,
  Plus,
  Trash2,
  TrendingUp,
  Award,
  BookOpen,
  BarChart3,
  Target,
  Zap,
  Star,
  Brain,
  History,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
}

interface Semester {
  id: string;
  name: string;
  courses: Course[];
  gpa: number;
}

export default function CGPACalculatorPage() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: "sem1",
      name: "Semester 1",
      courses: [],
      gpa: 0,
    },
  ]);
  const [selectedSemester, setSelectedSemester] = useState("sem1");
  const [newCourse, setNewCourse] = useState({
    name: "",
    credits: 3,
    grade: "A",
  });
  const [previousCgpa, setPreviousCgpa] = useState(0);
  const [previousCredits, setPreviousCredits] = useState(0);

  const gradeScale = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0.0,
  };

  const gradeOptions = Object.keys(gradeScale);

  // Calculate GPA for a specific semester
  const calculateSemesterGPA = (courses: Course[]) => {
    if (courses.length === 0) return 0;

    const totalCredits = courses.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    const totalGradePoints = courses.reduce(
      (sum, course) => sum + course.credits * course.gradePoints,
      0
    );

    return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  };

  // Calculate cumulative CGPA including previous academic record
  const calculateCGPA = useMemo(() => {
    const allCourses = semesters.flatMap((s) => s.courses);
    const currentCredits = allCourses.reduce((sum, c) => sum + c.credits, 0);
    const currentPoints = allCourses.reduce(
      (sum, c) => sum + c.credits * c.gradePoints,
      0
    );
    const totalCredits = previousCredits + currentCredits;
    const totalPoints = previousCgpa * previousCredits + currentPoints;
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  }, [semesters, previousCgpa, previousCredits]);

  // Calculate total credits including previous
  const totalCredits = useMemo(() => {
    return (
      previousCredits +
      semesters.reduce(
        (total, semester) =>
          total +
          semester.courses.reduce((sum, course) => sum + course.credits, 0),
        0
      )
    );
  }, [semesters, previousCredits]);

  // Course data snapshot for effect dependency
  const courseDataSnapshot = useMemo(
    () => semesters.map((s) => s.courses),
    [semesters]
  );

  // Update semester GPA when courses change
  useEffect(() => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((semester) => ({
        ...semester,
        gpa: calculateSemesterGPA(semester.courses),
      }))
    );
  }, [courseDataSnapshot]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("cgpa-calculator-data");
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setSemesters((prev) => data.semesters || prev);
        setSelectedSemester(data.selectedSemester || "sem1");
        setPreviousCgpa(data.previousCgpa || 0);
        setPreviousCredits(data.previousCredits || 0);
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever data changes
  useEffect(() => {
    const dataToSave = {
      semesters,
      selectedSemester,
      previousCgpa,
      previousCredits,
    };
    localStorage.setItem("cgpa-calculator-data", JSON.stringify(dataToSave));
  }, [semesters, selectedSemester, previousCgpa, previousCredits]);

  const addCourse = () => {
    if (!newCourse.name.trim()) return;

    const course: Course = {
      id: Date.now().toString(),
      name: newCourse.name,
      credits: newCourse.credits,
      grade: newCourse.grade,
      gradePoints: gradeScale[newCourse.grade as keyof typeof gradeScale],
    };

    setSemesters((prevSemesters) =>
      prevSemesters.map((semester) =>
        semester.id === selectedSemester
          ? { ...semester, courses: [...semester.courses, course] }
          : semester
      )
    );

    setNewCourse({ name: "", credits: 3, grade: "A" });
  };

  const removeCourse = (courseId: string) => {
    setSemesters((prevSemesters) =>
      prevSemesters.map((semester) =>
        semester.id === selectedSemester
          ? {
              ...semester,
              courses: semester.courses.filter(
                (course) => course.id !== courseId
              ),
            }
          : semester
      )
    );
  };

  const addSemester = () => {
    const newSemesterId = `sem${semesters.length + 1}`;
    const newSemester: Semester = {
      id: newSemesterId,
      name: `Semester ${semesters.length + 1}`,
      courses: [],
      gpa: 0,
    };
    setSemesters([...semesters, newSemester]);
    setSelectedSemester(newSemesterId);
  };

  const removeSemester = (semesterId: string) => {
    if (semesters.length <= 1) return;

    setSemesters((prevSemesters) =>
      prevSemesters.filter((semester) => semester.id !== semesterId)
    );

    if (selectedSemester === semesterId) {
      setSelectedSemester(
        semesters[0].id === semesterId ? semesters[1].id : semesters[0].id
      );
    }
  };

  const getGradeColor = (grade: string) => {
    const gradeValue = gradeScale[grade as keyof typeof gradeScale];
    if (gradeValue >= 3.7) return "text-success";
    if (gradeValue >= 3.0) return "text-cgpa-primary";
    if (gradeValue >= 2.0) return "text-warning";
    return "text-destructive";
  };

  const getCGPAStatus = (cgpa: number) => {
    if (cgpa >= 3.8)
      return {
        status: "Excellent",
        color: "text-success",
        bg: "bg-gradient-to-r from-success/10 to-chart-4/10 border-success/20",
        emoji: "🌟",
      };
    if (cgpa >= 3.5)
      return {
        status: "Very Good",
        color: "text-cgpa-primary",
        bg: "bg-gradient-to-r from-cgpa-primary/10 to-chart-1/10 border-cgpa-primary/20",
        emoji: "🎯",
      };
    if (cgpa >= 3.0)
      return {
        status: "Good",
        color: "text-warning",
        bg: "bg-gradient-to-r from-warning/10 to-chart-5/10 border-warning/20",
        emoji: "👍",
      };
    if (cgpa >= 2.0)
      return {
        status: "Satisfactory",
        color: "text-community-primary",
        bg: "bg-gradient-to-r from-community-primary/10 to-chart-5/10 border-community-primary/20",
        emoji: "📈",
      };
    return {
      status: "Needs Improvement",
      color: "text-destructive",
      bg: "bg-gradient-to-r from-destructive/10 to-chart-3/10 border-destructive/20",
      emoji: "💪",
    };
  };

  const currentSemester =
    semesters.find((sem) => sem.id === selectedSemester) || semesters[0];
  const cgpaStatus = getCGPAStatus(calculateCGPA);

  return (
    <StudentLayout>
      <div className="flex-1 min-h-screen bg-gradient-to-br from-background to-cgpa-accent/10">
        <div className="flex sm:flex-row flex-col">
          {/* Main Content */}
          <div className="flex-2 p-6 overflow-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-gradient-to-r from-cgpa-primary to-chart-1 rounded-2xl shadow-lg">
                  <Calculator className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cgpa-primary to-chart-1 bg-clip-text text-transparent">
                  🎯 CGPA Calculator
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Track your complete academic performance and calculate your
                cumulative GPA with style
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="group border border-cgpa-border rounded-2xl bg-gradient-to-br from-card to-cgpa-muted/20 p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-cgpa-primary to-chart-1 rounded-xl">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-center text-sm text-cgpa-primary font-medium">
                    Current CGPA
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <span className="text-3xl font-bold text-cgpa-primary">
                    {calculateCGPA.toFixed(2)}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium border ${cgpaStatus.bg} ${cgpaStatus.color}`}
                  >
                    {cgpaStatus.emoji} {cgpaStatus.status}
                  </span>
                </div>
              </div>

              <div className="group border border-cgpa-border rounded-2xl bg-gradient-to-br from-card to-cgpa-muted/20 p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-success to-chart-4 rounded-xl">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-center text-success font-medium">
                    Total Credits
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl font-bold text-success">
                    {totalCredits}
                  </span>
                  {previousCredits > 0 && (
                    <span className="text-xs text-muted-foreground bg-success/10 px-2 py-1 rounded-md">
                      +{previousCredits} previous
                    </span>
                  )}
                </div>
              </div>

              <div className="group border border-cgpa-border rounded-2xl bg-gradient-to-br from-card to-cgpa-muted/20 p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-final-primary to-chart-3 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-center text-final-primary font-medium">
                    Current Semester GPA
                  </p>
                </div>
                <span className="text-3xl font-bold text-final-primary">
                  {currentSemester.gpa.toFixed(2)}
                </span>
              </div>

              <div className="group border border-cgpa-border rounded-2xl bg-gradient-to-br from-card to-cgpa-muted/20 p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <div className="flex flex-col  items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-community-primary to-chart-5 rounded-xl">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-center text-community-primary font-medium">
                    Semesters
                  </p>
                </div>
                <p className="text-3xl text-center font-bold text-community-primary">
                  {semesters.length}
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Previous Academic Record */}
              <div className="border border-cgpa-border rounded-2xl bg-gradient-to-br from-card to-cgpa-muted/20 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <History className="h-6 w-6 text-cgpa-primary" />
                  <h2 className="text-xl font-bold text-cgpa-primary">
                    📚 Previous Academic Record
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-cgpa-primary">
                      Previous CGPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={previousCgpa}
                      onChange={(e) =>
                        setPreviousCgpa(parseFloat(e.target.value) || 0)
                      }
                      placeholder="e.g., 3.75"
                      className="w-full px-4 py-3 border border-cgpa-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cgpa-primary shadow-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      💡 Enter your CGPA from previous semesters/years
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3 text-cgpa-primary">
                      Credits Completed
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={previousCredits}
                      onChange={(e) =>
                        setPreviousCredits(parseInt(e.target.value) || 0)
                      }
                      placeholder="e.g., 45"
                      className="w-full px-4 py-3 border border-cgpa-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cgpa-primary shadow-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      📊 Total credits from previous academic work
                    </p>
                  </div>
                </div>
              </div>

              {/* Semester Selection */}
              <div className="border border-cgpa-border rounded-2xl bg-gradient-to-br from-card to-cgpa-muted/20 p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-cgpa-primary" />
                    <h2 className="text-xl font-bold text-cgpa-primary">
                      📚 Semester Management
                    </h2>
                  </div>
                  <button
                    onClick={addSemester}
                    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cgpa-primary to-chart-1 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-medium"
                  >
                    <Plus className="h-4 w-4" />
                    Add Semester
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {semesters.map((semester) => (
                    <div key={semester.id} className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedSemester(semester.id)}
                        className={`group px-6 py-3 rounded-xl text-sm transition-all transform hover:scale-105 font-medium ${
                          selectedSemester === semester.id
                            ? "bg-gradient-to-r from-cgpa-primary to-chart-1 text-white shadow-lg"
                            : "bg-cgpa-muted text-cgpa-primary hover:bg-cgpa-secondary/30 border border-cgpa-border"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          <span>{semester.name}</span>
                        </div>
                        <div className="text-xs opacity-90 mt-1">
                          GPA: {semester.gpa.toFixed(2)}
                        </div>
                      </button>
                      {semesters.length > 1 && (
                        <button
                          onClick={() => removeSemester(semester.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Course List */}
              <div className="border border-cgpa-border rounded-2xl bg-gradient-to-br from-card to-cgpa-muted/20 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="h-6 w-6 text-cgpa-primary" />
                  <h3 className="text-xl font-bold text-cgpa-primary">
                    📋 {currentSemester.name} Courses (
                    {currentSemester.courses.length})
                  </h3>
                </div>

                {currentSemester.courses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="p-4 bg-gradient-to-r from-cgpa-primary/10 to-chart-1/10 rounded-2xl w-fit mx-auto mb-4">
                      <BookOpen className="h-12 w-12 text-cgpa-primary mx-auto" />
                    </div>
                    <p className="text-muted-foreground text-lg">
                      No courses added yet. Add your first course using the form
                      on the right! 🚀
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentSemester.courses.map((course) => (
                      <div
                        key={course.id}
                        className="group flex items-center justify-between p-6 bg-gradient-to-r from-cgpa-muted/20 to-cgpa-accent/20 rounded-xl hover:shadow-md transition-all border border-cgpa-border"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-cgpa-primary mb-2">
                            {course.name}
                          </h4>
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-2 px-3 py-1 bg-chart-1/10 rounded-lg">
                              <BookOpen className="h-4 w-4 text-chart-1" />
                              <span className="font-medium text-chart-1">
                                {course.credits} credits
                              </span>
                            </div>
                            <div
                              className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                                getGradeColor(course.grade) === "text-success"
                                  ? "bg-success/10"
                                  : getGradeColor(course.grade) ===
                                    "text-cgpa-primary"
                                  ? "bg-cgpa-primary/10"
                                  : getGradeColor(course.grade) ===
                                    "text-warning"
                                  ? "bg-warning/10"
                                  : "bg-destructive/10"
                              }`}
                            >
                              <Target className="h-4 w-4" />
                              <span
                                className={`font-semibold ${getGradeColor(
                                  course.grade
                                )}`}
                              >
                                Grade: {course.grade} ({course.gradePoints})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-final-primary/10 rounded-lg">
                              <Award className="h-4 w-4 text-final-primary" />
                              <span className="font-medium text-final-primary">
                                Points:{" "}
                                {(course.credits * course.gradePoints).toFixed(
                                  1
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeCourse(course.id)}
                          className="p-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Add Course Form */}
          <div className="flex-1 w-96 bg-gradient-to-b from-background to-cgpa-accent/10 border-l border-cgpa-border p-6 space-y-8 overflow-auto">
            {/* Add Course Form */}
            <div className="border border-cgpa-border rounded-2xl bg-gradient-to-br from-card to-cgpa-muted/20 p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="h-6 w-6 text-cgpa-primary" />
                <h3 className="text-lg font-bold text-cgpa-primary">
                  ➕ Add Course to Semester
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3 text-cgpa-primary">
                    Select Semester
                  </label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full px-4 py-3 border border-cgpa-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cgpa-primary shadow-sm"
                  >
                    {semesters.map((semester) => (
                      <option key={semester.id} value={semester.id}>
                        {semester.name} (GPA: {semester.gpa.toFixed(2)})
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-2">
                    🎯 Choose which semester to add the course to
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-cgpa-primary">
                    Course Name
                  </label>
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) =>
                      setNewCourse((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="e.g., Data Structures"
                    className="w-full px-4 py-3 border border-cgpa-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cgpa-primary shadow-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    📚 Enter the full course name
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-cgpa-primary">
                    Credits
                  </label>
                  <select
                    value={newCourse.credits}
                    onChange={(e) =>
                      setNewCourse((prev) => ({
                        ...prev,
                        credits: parseInt(e.target.value),
                      }))
                    }
                    className="w-full px-4 py-3 border border-cgpa-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cgpa-primary shadow-sm"
                  >
                    {[1, 2, 3, 4, 5, 6].map((credit) => (
                      <option key={credit} value={credit}>
                        {credit} Credit{credit > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-2">
                    ⭐ Select the number of credits
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3 text-cgpa-primary">
                    Grade
                  </label>
                  <select
                    value={newCourse.grade}
                    onChange={(e) =>
                      setNewCourse((prev) => ({
                        ...prev,
                        grade: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-cgpa-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-cgpa-primary shadow-sm"
                  >
                    {gradeOptions.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade} ({gradeScale[grade as keyof typeof gradeScale]}{" "}
                        points)
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-2">
                    🎯 Select your achieved grade
                  </p>
                </div>

                <button
                  onClick={addCourse}
                  disabled={!newCourse.name.trim()}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cgpa-primary to-chart-1 text-white rounded-xl hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-semibold"
                >
                  🚀 Add Course to {currentSemester.name}
                </button>

                {newCourse.name.trim() && (
                  <div className="p-4 bg-gradient-to-r from-cgpa-primary/10 to-chart-1/10 rounded-xl border border-cgpa-border">
                    <h4 className="font-semibold text-cgpa-primary mb-2">
                      📊 Course Preview
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Course:</span>
                        <span className="font-medium">{newCourse.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Credits:</span>
                        <span className="font-medium">{newCourse.credits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grade:</span>
                        <span
                          className={`font-medium ${getGradeColor(
                            newCourse.grade
                          )}`}
                        >
                          {newCourse.grade} (
                          {
                            gradeScale[
                              newCourse.grade as keyof typeof gradeScale
                            ]
                          }
                          )
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-cgpa-border pt-2">
                        <span>Grade Points:</span>
                        <span className="font-bold text-cgpa-primary">
                          {(
                            newCourse.credits *
                            gradeScale[
                              newCourse.grade as keyof typeof gradeScale
                            ]
                          ).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
