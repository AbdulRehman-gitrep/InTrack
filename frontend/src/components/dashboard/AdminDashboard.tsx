"use client"

import { BrainCircuit, Bug, Code2, Database, GraduationCap, Users } from "lucide-react"

import { DepartmentCard } from "@/components/dashboard/cards/DepartmentCard"
import { StatCard } from "@/components/dashboard/cards/StatCard"
import { DashboardSection } from "@/components/dashboard/layout/DashboardSection"
import { DashboardHeader } from "@/components/dashboard/layout/DashboardHeader"
import { StatsGrid } from "@/components/dashboard/layout/StatsGrid"

interface AdminDashboardProps {
  userName?: string
}

const departments = [
  { title: "Software Engineering", count: 18, icon: Code2, iconColor: "text-blue-600", iconBackground: "bg-blue-100", titleClassName: "text-blue-600", accentBorderClassName: "border-t-[3px] border-blue-500" },
  { title: "AI/ML", count: 7, icon: BrainCircuit, iconColor: "text-violet-600", iconBackground: "bg-violet-100", titleClassName: "text-violet-600", accentBorderClassName: "border-t-[3px] border-violet-500" },
  { title: "Data Engineering", count: 10, icon: Database, iconColor: "text-orange-600", iconBackground: "bg-orange-100", titleClassName: "text-orange-600", accentBorderClassName: "border-t-[3px] border-orange-500" },
  { title: "QA", count: 12, icon: Bug, iconColor: "text-red-500", iconBackground: "bg-red-100", titleClassName: "text-red-500", accentBorderClassName: "border-t-[3px] border-red-500" },
]

export function AdminDashboard({ userName = "User" }: AdminDashboardProps) {
  return (
    <div className="space-y-8">
      <DashboardHeader
        userName={userName}
        tagline="Here&apos;s what is happening across the internship portal today."
        label="System Overview"
      />

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
            accentBorderClassName="border-t-[3px] border-blue-500"
          />
          <StatCard
            title="Interns"
            value={42}
            description="Active interns"
            icon={GraduationCap}
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
          <h2 className="text-2xl font-bold text-slate-900">Department Overview</h2>
          <p className="text-sm text-slate-500">
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
              iconColor={dept.iconColor}
              iconBackground={dept.iconBackground}
              titleClassName={dept.titleClassName}
              accentBorderClassName={dept.accentBorderClassName}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
