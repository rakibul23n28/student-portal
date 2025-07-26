// components/StudentLayout.tsx
import { StudentSidebar } from "@/components/StudentSidebar";
import { RightPanel } from "@/components/RightPanel";
import { ReactNode } from "react";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar: Scroll on hover only */}
      <div className="w-[16%] group max-h-screen sticky top-0">
        <div className="absolute inset-0 overflow-y-hidden group-hover:overflow-y-auto">
          <StudentSidebar />
        </div>
      </div>

      {/* MainContent */}
      <div className="flex-1">{children}</div>

      {/* RightPanel: Scroll on hover only */}
      <div className="w-[24%] group max-h-screen sticky top-0">
        <div className="absolute inset-0 overflow-y-hidden group-hover:overflow-y-auto">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
