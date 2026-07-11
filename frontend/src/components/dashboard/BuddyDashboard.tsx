import { CalendarCheck, MessageSquare, UserCheck, Users } from "lucide-react"

import { StatCard } from "@/components/dashboard/cards/StatCard"
import { DashboardSection } from "@/components/dashboard/layout/DashboardSection"
import { StatsGrid } from "@/components/dashboard/layout/StatsGrid"

export function BuddyDashboard() {
  return (
    <DashboardSection title="Overview">
      <StatsGrid>
        <StatCard
          title="Assigned Interns"
          value={5}
          description="Under your guidance"
          icon={Users}
          iconColor="text-blue-700"
          iconBackground="bg-blue-100"
          valueClassName="text-blue-700"
          titleClassName="text-blue-700"
          accentBorderClassName="border-t-[3px] border-blue-500"
        />
        <StatCard
          title="Recent Check-ins"
          value={12}
          description="Last 7 days"
          icon={UserCheck}
          iconColor="text-emerald-600"
          iconBackground="bg-emerald-100"
          valueClassName="text-emerald-600"
          titleClassName="text-emerald-600"
          accentBorderClassName="border-t-[3px] border-emerald-500"
        />
        <StatCard
          title="Feedback Given"
          value={8}
          description="This month"
          icon={MessageSquare}
          iconColor="text-emerald-600"
          iconBackground="bg-emerald-100"
          valueClassName="text-emerald-600"
          titleClassName="text-emerald-600"
          accentBorderClassName="border-t-[3px] border-emerald-500"
        />
        <StatCard
          title="Pending Meetings"
          value={3}
          description="Scheduled this week"
          icon={CalendarCheck}
          iconColor="text-red-600"
          iconBackground="bg-red-100"
          valueClassName="text-red-600"
          titleClassName="text-red-600"
          accentBorderClassName="border-t-[3px] border-red-500"
        />
      </StatsGrid>
    </DashboardSection>
  )
}
