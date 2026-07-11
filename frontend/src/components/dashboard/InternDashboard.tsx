"use client"

import { useMemo } from "react"
import { CheckCircle, Clock, FileText, ListTodo } from "lucide-react"

import { StatCard } from "@/components/dashboard/cards/StatCard"
import { DashboardHeader } from "@/components/dashboard/layout/DashboardHeader"
import { DashboardSection } from "@/components/dashboard/layout/DashboardSection"
import { StatsGrid } from "@/components/dashboard/layout/StatsGrid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { mockTasks } from "@/lib/mock/tasks"
import { mockDailyUpdates } from "@/lib/mock/daily-updates"
import { mockWeeklyReports } from "@/lib/mock/weekly-reports"
import { mockFeedback } from "@/lib/mock/feedback"
import type { TaskStatus } from "@/lib/types/task"

const currentUserId = "6"

interface InternDashboardProps {
  userName?: string
}

const statusColors: Partial<Record<TaskStatus, { bar: string; text: string; label: string }>> = {
  assigned: { bar: "bg-blue-500", text: "text-blue-700", label: "Assigned" },
  in_progress: { bar: "bg-yellow-500", text: "text-yellow-700", label: "In Progress" },
  completed: { bar: "bg-emerald-500", text: "text-emerald-700", label: "Completed" },
}

function TaskProgressCard({ tasks }: { tasks: { status: TaskStatus }[] }) {
  const total = tasks.length
  const completed = tasks.filter((t) => t.status === "completed").length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  const breakdown = useMemo(() => {
    const counts: Record<TaskStatus, number> = {
      assigned: 0,
      in_progress: 0,
      completed: 0,
      pending: 0,
    }
    tasks.forEach((t) => counts[t.status]++)
    return (Object.entries(counts) as [TaskStatus, number][]).filter(
      ([s]) => s !== "pending",
    )
  }, [tasks])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Task Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="relative size-20">
            <svg className="size-20 -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18" cy="18" r="15.5"
                fill="none" stroke="#e2e8f0" strokeWidth="3"
              />
              <circle
                cx="18" cy="18" r="15.5"
                fill="none" stroke="#10b981"
                strokeWidth="3"
                strokeDasharray={`${pct} ${100 - pct}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-emerald-600">
              {pct}%
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-900">
              {completed} of {total} tasks completed
            </p>
            <p className="text-xs text-muted-foreground">
              {total - completed} remaining
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {breakdown.map(([status, count]) => {
            const cfg = statusColors[status]!
            const width = total > 0 ? (count / total) * 100 : 0
            return (
              <div key={status} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={cfg.text}>{cfg.label}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${cfg.bar}`}
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export function InternDashboard({ userName = "User" }: InternDashboardProps) {
  const stats = useMemo(() => {
    const myTasks = mockTasks.filter((t) => t.assigneeId === currentUserId)
    const activeTasks = myTasks.filter(
      (t) => t.status === "in_progress" || t.status === "assigned",
    )
    const myUpdates = mockDailyUpdates.filter((u) => u.internId === currentUserId)
    const myReports = mockWeeklyReports.filter((r) => r.internId === currentUserId)
    const myFeedback = mockFeedback.filter((f) => f.toId === currentUserId)

    return {
      myTasks,
      activeTasks: activeTasks.length,
      updatesSubmitted: myUpdates.length,
      reportsSubmitted: myReports.length,
      feedbackReceived: myFeedback.length,
    }
  }, [])

  return (
    <div className="space-y-8">
      <DashboardHeader
        userName={userName}
        tagline="Track your tasks, updates, and progress."
        label="Intern Overview"
      />

      <DashboardSection title="Overview">
        <StatsGrid>
          <StatCard
            title="Active Tasks"
            value={stats.activeTasks}
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
            value={stats.updatesSubmitted}
            description="Submitted"
            icon={Clock}
            iconColor="text-emerald-600"
            iconBackground="bg-emerald-100"
            valueClassName="text-emerald-600"
            titleClassName="text-emerald-600"
            accentBorderClassName="border-t-[3px] border-emerald-500"
          />
          <StatCard
            title="Weekly Reports"
            value={stats.reportsSubmitted}
            description="Submitted"
            icon={FileText}
            iconColor="text-emerald-600"
            iconBackground="bg-emerald-100"
            valueClassName="text-emerald-600"
            titleClassName="text-emerald-600"
            accentBorderClassName="border-t-[3px] border-emerald-500"
          />
          <StatCard
            title="Feedback Received"
            value={stats.feedbackReceived}
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

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Task Progress</h2>
          <p className="text-sm text-slate-500">
            Track how many tasks you&apos;ve completed.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TaskProgressCard tasks={stats.myTasks} />
        </div>
      </section>
    </div>
  )
}
