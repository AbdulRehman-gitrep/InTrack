"use client"

import { useState, useMemo } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UpdateCard } from "@/components/updates/UpdateCard"

import type { DailyUpdate } from "@/lib/types/update"
import { mockDailyUpdates } from "@/lib/mock/daily-updates"
import { mockUsers } from "@/lib/mock/users"

const currentUserId = "6"

export default function DailyUpdatesPage() {
  const [updates, setUpdates] = useState(mockDailyUpdates)
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  const userMap = useMemo(
    () => new Map(mockUsers.map((u) => [u.id, u])),
    [],
  )

  const myUpdates = useMemo(
    () =>
      [...updates]
        .filter((u) => u.internId === currentUserId)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [updates],
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) {
      setError("Write your update before submitting.")
      return
    }
    const newUpdate: DailyUpdate = {
      id: String(Date.now()),
      internId: currentUserId,
      date: new Date().toISOString().split("T")[0],
      content: content.trim(),
      isReviewed: false,
      createdAt: new Date().toISOString(),
    }
    setUpdates((prev) => [newUpdate, ...prev])
    setContent("")
    setError("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Daily Updates</h1>
        <p className="text-sm text-muted-foreground">
          Submit your daily updates and view your history.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Submit Today&apos;s Update</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What did you work on today? Any blockers or achievements?"
                rows={4}
                className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              {error && <p className="text-xs text-red-600">{error}</p>}
            </div>
            <Button type="submit">
              <Send className="mr-1.5 size-4" />
              Submit Update
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Update History ({myUpdates.length})
        </h2>
      </div>

      <div className="space-y-4">
        {myUpdates.map((update) => (
          <UpdateCard
            key={update.id}
            author={userMap.get(update.internId)!}
            dateLabel={new Date(update.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            content={update.content}
            isReviewed={update.isReviewed}
            onToggleReview={() => {}}
          />
        ))}
        {myUpdates.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No updates submitted yet.
          </p>
        )}
      </div>
    </div>
  )
}
