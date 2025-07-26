"use client";
import StudentLayout from "@/components/StudentLayout";
import { Calculator, Trash2, TrendingUp, Award, BookOpen } from "lucide-react";
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

  const totalCredits = useMemo(() => {
    return (
      previousCredits +
      semesters.reduce(
        (total, s) => total + s.courses.reduce((sum, c) => sum + c.credits, 0),
        0
      )
    );
  }, [semesters, previousCredits]);

  const courseDataSnapshot = useMemo(
    () => semesters.map((s) => s.courses),
    [semesters]
  );
  useEffect(() => {
    setSemesters((prev) =>
      prev.map((s) => ({ ...s, gpa: calculateSemesterGPA(s.courses) }))
    );
  }, [courseDataSnapshot]);

  useEffect(() => {
    const saved = localStorage.getItem("cgpa-calculator-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSemesters((prev) => data.semesters || prev);

        setSelectedSemester(data.selectedSemester || "sem1");
        setPreviousCgpa(data.previousCgpa || 0);
        setPreviousCredits(data.previousCredits || 0);
      } catch (err) {
        console.error("Load error:", err);
      }
    }
  }, []);

  useEffect(() => {
    const save = {
      semesters,
      selectedSemester,
      previousCgpa,
      previousCredits,
    };
    localStorage.setItem("cgpa-calculator-data", JSON.stringify(save));
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
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === selectedSemester
          ? { ...s, courses: [...s.courses, course] }
          : s
      )
    );
    setNewCourse({ name: "", credits: 3, grade: "A" });
  };

  const removeCourse = (courseId: string) => {
    setSemesters((prev) =>
      prev.map((s) =>
        s.id === selectedSemester
          ? { ...s, courses: s.courses.filter((c) => c.id !== courseId) }
          : s
      )
    );
  };

  const addSemester = () => {
    const id = `sem${semesters.length + 1}`;
    const newSem: Semester = {
      id,
      name: `Semester ${semesters.length + 1}`,
      courses: [],
      gpa: 0,
    };
    setSemesters([...semesters, newSem]);
    setSelectedSemester(id);
  };

  const exportData = () => {
    const blob = new Blob(
      [JSON.stringify({ semesters, previousCgpa, previousCredits }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cgpa-calculator-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getGradeColor = (grade: string) => {
    const val = gradeScale[grade as keyof typeof gradeScale];
    if (val >= 3.7) return "text-green-600";
    if (val >= 3.0) return "text-blue-600";
    if (val >= 2.0) return "text-yellow-600";
    return "text-red-600";
  };

  const currentSemester =
    semesters.find((s) => s.id === selectedSemester) || semesters[0];

  return (
    <StudentLayout>
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="h-6 w-6 text-primary" />
            <h1 className="text-2xl">CGPA Calculator</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border p-4 rounded bg-card">
            <Award className="h-4 w-4 text-blue-500" />
            <p className="text-sm">Current CGPA</p>
            <p className="text-xl font-bold">{calculateCGPA.toFixed(2)}</p>
          </div>
          <div className="border p-4 rounded bg-card">
            <BookOpen className="h-4 w-4 text-green-500" />
            <p className="text-sm">Total Credits</p>
            <p className="text-xl font-bold">{totalCredits}</p>
          </div>
          <div className="border p-4 rounded bg-card">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <p className="text-sm">Semester GPA</p>
            <p className="text-xl font-bold">
              {currentSemester.gpa.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border p-4 rounded bg-card">
            <h3 className="text-lg font-semibold mb-2">
              Previous Academic Record
            </h3>
            <label className="block mb-2 text-sm">Previous CGPA</label>
            <input
              type="number"
              step="0.01"
              className="w-full p-2 border rounded"
              value={previousCgpa}
              onChange={(e) => setPreviousCgpa(parseFloat(e.target.value) || 0)}
            />
            <label className="block mt-4 mb-2 text-sm">Credits Completed</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={previousCredits}
              onChange={(e) =>
                setPreviousCredits(parseInt(e.target.value) || 0)
              }
            />
          </div>

          <div className="border p-4 rounded bg-card">
            <h3 className="text-lg font-semibold mb-2">Add Course</h3>
            <input
              type="text"
              placeholder="Course Name"
              className="w-full mb-2 p-2 border rounded"
              value={newCourse.name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, name: e.target.value })
              }
            />
            <select
              className="w-full mb-2 p-2 border rounded"
              value={newCourse.credits}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  credits: parseInt(e.target.value),
                })
              }
            >
              {[1, 2, 3, 4, 5, 6].map((c) => (
                <option key={c} value={c}>
                  {c} Credit
                </option>
              ))}
            </select>
            <select
              className="w-full mb-4 p-2 border rounded"
              value={newCourse.grade}
              onChange={(e) =>
                setNewCourse({ ...newCourse, grade: e.target.value })
              }
            >
              {gradeOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <button
              onClick={addCourse}
              className="w-full bg-primary text-white py-2 rounded"
            >
              Add Course
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            Courses ({currentSemester.name})
          </h3>
          {currentSemester.courses.length === 0 ? (
            <p>No courses added.</p>
          ) : (
            <ul className="space-y-2">
              {currentSemester.courses.map((c) => (
                <li
                  key={c.id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm">
                      {c.credits} credits, Grade:{" "}
                      <span className={getGradeColor(c.grade)}>{c.grade}</span>
                    </p>
                  </div>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => removeCourse(c.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={addSemester}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Semester
          </button>
          <button
            onClick={exportData}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Export Data
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
