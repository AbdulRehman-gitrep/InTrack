import { ClipboardCheck, Clock, Users, FileText } from "lucide-react"

import { StatCard } from "@/components/dashboard/cards/StatCard"
import { DashboardSection } from "@/components/dashboard/layout/DashboardSection"
import { StatsGrid } from "@/components/dashboard/layout/StatsGrid"

export function ManagerDashboard() {
  return (
    <DashboardSection title="Overview">
      <StatsGrid>
        <StatCard
          title="Assigned Interns"
          value={18}
          description="Currently mentoring"
          icon={Users}
          iconColor="text-blue-700"
          iconBackground="bg-blue-100"
          valueClassName="text-blue-700"
        />
        <StatCard
          title="Pending Reviews"
          value={7}
          description="Awaiting evaluation"
          icon={ClipboardCheck}
          iconColor="text-red-600"
          iconBackground="bg-red-100"
          valueClassName="text-red-600"
        />
        <StatCard
          title="Active Tasks"
          value={24}
          description="In progress"
          icon={Clock}
          iconColor="text-blue-700"
          iconBackground="bg-blue-100"
          valueClassName="text-blue-700"
        />
        <StatCard
          title="Weekly Reports"
          value={12}
          description="Submitted this week"
          icon={FileText}
          iconColor="text-green-600"
          iconBackground="bg-green-100"
          valueClassName="text-green-600"
        />
      </StatsGrid>
    </DashboardSection>
  )
}
