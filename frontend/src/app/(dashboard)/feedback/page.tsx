"use client"

import { useMemo } from "react"

import { FeedbackCard } from "@/components/feedback/FeedbackCard"

import { mockUsers } from "@/lib/mock/users"
import { mockFeedback } from "@/lib/mock/feedback"

const currentUserId = "6"

export default function FeedbackPage() {
  const userMap = useMemo(
    () => new Map(mockUsers.map((u) => [u.id, u])),
    [],
  )

  const received = useMemo(
    () =>
      [...mockFeedback]
        .filter((f) => f.toId === currentUserId)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
    [],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Feedback</h1>
        <p className="text-sm text-muted-foreground">
          Feedback received from your buddy and manager.
        </p>
      </div>

      <div className="space-y-4">
        {received.map((f) => (
          <FeedbackCard
            key={f.id}
            from={userMap.get(f.fromId)!}
            to={userMap.get(f.toId)!}
            content={f.content}
            createdAt={f.createdAt}
          />
        ))}
        {received.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No feedback received yet.
          </p>
        )}
      </div>
    </div>
  )
}
