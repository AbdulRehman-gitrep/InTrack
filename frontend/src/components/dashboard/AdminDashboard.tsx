"use client"

import { useMemo } from "react"
import { BrainCircuit, Bug, Calendar, Code2, Database, GraduationCap, Users } from "lucide-react"

import { DepartmentCard } from "@/components/dashboard/cards/DepartmentCard"
import { StatCard } from "@/components/dashboard/cards/StatCard"
import { DashboardSection } from "@/components/dashboard/layout/DashboardSection"
import { StatsGrid } from "@/components/dashboard/layout/StatsGrid"
import { Button } from "@/components/ui/button"

interface AdminDashboardProps {
  userName?: string
}

const departments = [
  { title: "Software Engineering", count: 18, icon: Code2 },
  { title: "AI/ML", count: 7, icon: BrainCircuit },
  { title: "Data Engineering", count: 10, icon: Database },
  { title: "QA", count: 12, icon: Bug },
]

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning"
  if (hour < 17) return "Good Afternoon"
  return "Good Evening"
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function AdminDashboard({ userName = "User" }: AdminDashboardProps) {
  const greeting = useMemo(() => getGreeting(), [])
  const today = useMemo(() => getFormattedDate(), [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            System Overview
          </span>
          <h1 className="text-2xl font-bold">{greeting}, {userName}.</h1>
          <p className="text-sm text-muted-foreground">
            Here&apos;s what is happening across the internship portal today.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 self-start md:self-auto">
          <Calendar className="size-4" />
          {today}
        </Button>
      </div>

      <DashboardSection title="Overview">
        <StatsGrid>
          <StatCard
            title="Users"
            value={156}
            description="Registered users"
            icon={Users}
            iconColor="text-blue-700"
            iconBackground="bg-blue-100"
            valueClassName="text-blue-700"
            titleClassName="text-blue-700"
          />
          <StatCard
            title="Interns"
            value={42}
            description="Active interns"
            icon={GraduationCap}
            iconColor="text-green-600"
            iconBackground="bg-green-100"
            valueClassName="text-green-600"
            titleClassName="text-green-600"
          />
        </StatsGrid>
      </DashboardSection>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Department Overview</h2>
          <p className="text-sm text-muted-foreground">
            Distribution of interns across internship departments.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.title}
              title={dept.title}
              count={dept.count}
              icon={dept.icon}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
