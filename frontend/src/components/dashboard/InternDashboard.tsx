import { CheckCircle, Clock, FileText, ListTodo } from "lucide-react"

import { StatCard } from "@/components/dashboard/cards/StatCard"
import { DashboardSection } from "@/components/dashboard/layout/DashboardSection"
import { StatsGrid } from "@/components/dashboard/layout/StatsGrid"

export function InternDashboard() {
  return (
    <DashboardSection title="Overview">
      <StatsGrid>
        <StatCard
          title="My Tasks"
          value={9}
          description="Assigned to you"
          icon={ListTodo}
          iconColor="text-blue-700"
          iconBackground="bg-blue-100"
          valueClassName="text-blue-700"
          titleClassName="text-blue-700"
          accentBorderClassName="border-t-[3px] border-blue-500"
        />
        <StatCard
          title="Daily Updates"
          value={5}
          description="Submitted this week"
          icon={Clock}
          iconColor="text-emerald-600"
          iconBackground="bg-emerald-100"
          valueClassName="text-emerald-600"
          titleClassName="text-emerald-600"
          accentBorderClassName="border-t-[3px] border-emerald-500"
        />
        <StatCard
          title="Weekly Report"
          value={3}
          description="Reports submitted"
          icon={FileText}
          iconColor="text-emerald-600"
          iconBackground="bg-emerald-100"
          valueClassName="text-emerald-600"
          titleClassName="text-emerald-600"
          accentBorderClassName="border-t-[3px] border-emerald-500"
        />
        <StatCard
          title="Feedback Received"
          value={4}
          description="From your buddy"
          icon={CheckCircle}
          iconColor="text-emerald-600"
          iconBackground="bg-emerald-100"
          valueClassName="text-emerald-600"
          titleClassName="text-emerald-600"
          accentBorderClassName="border-t-[3px] border-emerald-500"
        />
      </StatsGrid>
    </DashboardSection>
  )
}
