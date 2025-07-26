// app/student-dashboard/page.tsx (or wherever you use it)
import StudentLayout from "@/components/StudentLayout";
import { MainContent } from "@/components/MainContent";

export default function StudentDashboardPage() {
  return (
    <StudentLayout>
      <MainContent />
    </StudentLayout>
  );
}
