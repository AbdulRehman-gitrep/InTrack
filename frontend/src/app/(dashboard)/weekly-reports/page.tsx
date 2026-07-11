"use client"

import { useState, useMemo } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UpdateCard } from "@/components/updates/UpdateCard"

import type { WeeklyReport } from "@/lib/types/update"
import { mockWeeklyReports } from "@/lib/mock/weekly-reports"
import { mockUsers } from "@/lib/mock/users"

const currentUserId = "6"

function getWeekRange(): { start: string; end: string } {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const monday = new Date(now)
  monday.setDate(now.getDate() + mondayOffset)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  return {
    start: monday.toISOString().split("T")[0],
    end: sunday.toISOString().split("T")[0],
  }
}

export default function WeeklyReportsPage() {
  const [reports, setReports] = useState(mockWeeklyReports)
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  const userMap = useMemo(
    () => new Map(mockUsers.map((u) => [u.id, u])),
    [],
  )

  const myReports = useMemo(
    () =>
      [...reports]
        .filter((r) => r.internId === currentUserId)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [reports],
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) {
      setError("Write your report before submitting.")
      return
    }
    const { start, end } = getWeekRange()
    const newReport: WeeklyReport = {
      id: String(Date.now()),
      internId: currentUserId,
      weekStart: start,
      weekEnd: end,
      content: content.trim(),
      isReviewed: false,
      createdAt: new Date().toISOString(),
    }
    setReports((prev) => [newReport, ...prev])
    setContent("")
    setError("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Weekly Reports</h1>
        <p className="text-sm text-muted-foreground">
          Submit your weekly report and view your history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Submit This Week&apos;s Report</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Summarize your work this week: what you accomplished, challenges faced, and plans for next week."
                rows={5}
                className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              {error && <p className="text-xs text-red-600">{error}</p>}
            </div>
            <Button type="submit">
              <Send className="mr-1.5 size-4" />
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Report History ({myReports.length})
        </h2>
      </div>

      <div className="space-y-4">
        {myReports.map((report) => (
          <UpdateCard
            key={report.id}
            author={userMap.get(report.internId)!}
            dateLabel={`${new Date(report.weekStart).toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(report.weekEnd).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
            title="Weekly Report"
            content={report.content}
            isReviewed={report.isReviewed}
            onToggleReview={() => {}}
          />
        ))}
        {myReports.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No reports submitted yet.
          </p>
        )}
      </div>
    </div>
  )
}
