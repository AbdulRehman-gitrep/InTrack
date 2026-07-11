"use client"

import { useState, useMemo } from "react"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpdateCard } from "@/components/updates/UpdateCard"

import { mockDailyUpdates } from "@/lib/mock/daily-updates"
import { mockUsers } from "@/lib/mock/users"
import { Role } from "@/lib/types/role"

export default function DailyUpdatesPage() {
  const [updates, setUpdates] = useState(mockDailyUpdates)
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
      updates.filter((u) => {
        const intern = interns.get(u.internId)
        const matchesSearch =
          u.content.toLowerCase().includes(search.toLowerCase()) ||
          (intern?.fullName.toLowerCase() ?? "").includes(search.toLowerCase())
        const matchesTab =
          tab === "all" ? true : tab === "reviewed" ? u.isReviewed : !u.isReviewed
        return matchesSearch && matchesTab
      }),
    [updates, search, tab, interns],
  )

  function handleToggleReview(id: string) {
    setUpdates((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, isReviewed: !u.isReviewed } : u,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Daily Updates</h1>
        <p className="text-sm text-muted-foreground">
          Review daily updates submitted by interns.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search updates or interns..."
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
        {filtered.map((update) => (
          <UpdateCard
            key={update.id}
            author={interns.get(update.internId)!}
            dateLabel={new Date(update.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            content={update.content}
            isReviewed={update.isReviewed}
            onToggleReview={() => handleToggleReview(update.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No daily updates found.
          </p>
        )}
      </div>
    </div>
  )
}
