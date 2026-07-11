"use client"

import { useMemo } from "react"
import { CalendarDays, ClipboardCheck, Clock, ListTodo, Users } from "lucide-react"

import { StatCard } from "@/components/dashboard/cards/StatCard"
import { DashboardHeader } from "@/components/dashboard/layout/DashboardHeader"
import { DashboardSection } from "@/components/dashboard/layout/DashboardSection"
import { StatsGrid } from "@/components/dashboard/layout/StatsGrid"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { mockUsers } from "@/lib/mock/users"
import { mockTasks } from "@/lib/mock/tasks"
import { mockDailyUpdates } from "@/lib/mock/daily-updates"
import { mockWeeklyReports } from "@/lib/mock/weekly-reports"
import { Role } from "@/lib/types/role"

import { useSession } from "@/lib/context/session"

interface ManagerDashboardProps {
  userName?: string
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
        {value}/{max}
      </span>
    </div>
  )
}

function InternProgressCard({
  intern,
  tasksCompleted,
  totalTasks,
  updatesReviewed,
  totalUpdates,
  reportsReviewed,
  totalReports,
}: {
  intern: { fullName: string; department: string }
  tasksCompleted: number
  totalTasks: number
  updatesReviewed: number
  totalUpdates: number
  reportsReviewed: number
  totalReports: number
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <Avatar className="size-9">
          <AvatarFallback className="bg-blue-100 text-sm text-blue-700">
            {intern.fullName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-sm font-semibold">{intern.fullName}</CardTitle>
          <p className="text-xs text-muted-foreground">{intern.department}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ListTodo className="size-3.5" />
            Tasks Completed
          </div>
          <ProgressBar value={tasksCompleted} max={totalTasks} color="bg-blue-500" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            Daily Updates Reviewed
          </div>
          <ProgressBar value={updatesReviewed} max={totalUpdates} color="bg-amber-500" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <ClipboardCheck className="size-3.5" />
            Weekly Reports Reviewed
          </div>
          <ProgressBar value={reportsReviewed} max={totalReports} color="bg-emerald-500" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ManagerDashboard({ userName = "User" }: ManagerDashboardProps) {
  const { user: currentUser } = useSession()
  const currentUserId = currentUser.id

  const stats = useMemo(() => {
    const interns = mockUsers.filter(
      (u) => u.role === Role.INTERN && u.managerId === currentUserId,
    )
    const activeTasks = mockTasks.filter(
      (t) => t.status === "in_progress" || t.status === "assigned",
    )
    const pendingUpdates = mockDailyUpdates.filter((u) => !u.isReviewed)
    const pendingReports = mockWeeklyReports.filter((r) => !r.isReviewed)

    return {
      assignedInterns: interns.length,
      activeTasks: activeTasks.length,
      pendingUpdates: pendingUpdates.length,
      pendingReports: pendingReports.length,
    }
  }, [])

  const internProgress = useMemo(() => {
    const myInterns = mockUsers.filter(
      (u) => u.role === Role.INTERN && u.managerId === currentUserId,
    )

    return myInterns.map((intern) => {
      const internTasks = mockTasks.filter((t) => t.assigneeId === intern.id)
      const tasksCompleted = internTasks.filter((t) => t.status === "completed").length

      const internUpdates = mockDailyUpdates.filter((u) => u.internId === intern.id)
      const updatesReviewed = internUpdates.filter((u) => u.isReviewed).length

      const internReports = mockWeeklyReports.filter((r) => r.internId === intern.id)
      const reportsReviewed = internReports.filter((r) => r.isReviewed).length

      return {
        intern,
        tasksCompleted,
        totalTasks: internTasks.length,
        updatesReviewed,
        totalUpdates: internUpdates.length,
        reportsReviewed,
        totalReports: internReports.length,
      }
    })
  }, [])

  return (
    <div className="space-y-8">
      <DashboardHeader
        userName={userName}
        tagline="Manage your interns and review their progress."
        label="Manager Overview"
      />

      <DashboardSection title="Overview">
        <StatsGrid>
          <StatCard
            title="Assigned Interns"
            value={stats.assignedInterns}
            description="Currently mentoring"
            icon={Users}
            iconColor="text-blue-700"
            iconBackground="bg-blue-100"
            valueClassName="text-blue-700"
            titleClassName="text-blue-700"
            accentBorderClassName="border-t-[3px] border-blue-500"
          />
          <StatCard
            title="Pending Daily Updates"
            value={stats.pendingUpdates}
            description="Awaiting review"
            icon={CalendarDays}
            iconColor="text-amber-600"
            iconBackground="bg-amber-100"
            valueClassName="text-amber-600"
            titleClassName="text-amber-600"
            accentBorderClassName="border-t-[3px] border-amber-500"
          />
          <StatCard
            title="Active Tasks"
            value={stats.activeTasks}
            description="Assigned to interns"
            icon={Clock}
            iconColor="text-blue-700"
            iconBackground="bg-blue-100"
            valueClassName="text-blue-700"
            titleClassName="text-blue-700"
            accentBorderClassName="border-t-[3px] border-blue-500"
          />
          <StatCard
            title="Pending Reports"
            value={stats.pendingReports}
            description="Weekly reports to review"
            icon={ClipboardCheck}
            iconColor="text-red-600"
            iconBackground="bg-red-100"
            valueClassName="text-red-600"
            titleClassName="text-red-600"
            accentBorderClassName="border-t-[3px] border-red-500"
          />
        </StatsGrid>
      </DashboardSection>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Intern Progress</h2>
          <p className="text-sm text-slate-500">
            Task completion, update reviews, and report reviews per intern.
          </p>
        </div>
        {internProgress.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internProgress.map((p) => (
              <InternProgressCard
                key={p.intern.id}
                intern={p.intern}
                tasksCompleted={p.tasksCompleted}
                totalTasks={p.totalTasks}
                updatesReviewed={p.updatesReviewed}
                totalUpdates={p.totalUpdates}
                reportsReviewed={p.reportsReviewed}
                totalReports={p.totalReports}
              />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No interns assigned to you yet.
          </p>
        )}
      </section>
    </div>
  )
}
