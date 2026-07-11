"use client"

import { useState, useMemo } from "react"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpdateCard } from "@/components/updates/UpdateCard"

import { mockWeeklyReports } from "@/lib/mock/weekly-reports"
import { mockUsers } from "@/lib/mock/users"
import { Role } from "@/lib/types/role"

export default function WeeklyReportsPage() {
  const [reports, setReports] = useState(mockWeeklyReports)
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("all")

  const interns = useMemo(
    () => new Map(
      mockUsers
        .filter((u) => u.role === Role.INTERN)
        .map((u) => [u.id, u]),
    ),
    [],
  )

  const filtered = useMemo(
    () =>
      reports.filter((r) => {
        const intern = interns.get(r.internId)
        const matchesSearch =
          r.content.toLowerCase().includes(search.toLowerCase()) ||
          (intern?.fullName.toLowerCase() ?? "").includes(search.toLowerCase())
        const matchesTab =
          tab === "all" ? true : tab === "reviewed" ? r.isReviewed : !r.isReviewed
        return matchesSearch && matchesTab
      }),
    [reports, search, tab, interns],
  )

  function handleToggleReview(id: string) {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isReviewed: !r.isReviewed } : r,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Weekly Reports</h1>
        <p className="text-sm text-muted-foreground">
          Review weekly reports submitted by interns.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search reports or interns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unreviewed">Unreviewed</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {filtered.map((report) => (
          <UpdateCard
            key={report.id}
            author={interns.get(report.internId)!}
            dateLabel={`${new Date(report.weekStart).toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(report.weekEnd).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
            title="Weekly Report"
            content={report.content}
            isReviewed={report.isReviewed}
            onToggleReview={() => handleToggleReview(report.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No weekly reports found.
          </p>
        )}
      </div>
    </div>
  )
}
