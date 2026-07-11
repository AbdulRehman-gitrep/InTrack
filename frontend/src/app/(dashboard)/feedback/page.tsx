"use client"

import { useMemo, useState } from "react"
import { Send } from "lucide-react"

import { FeedbackCard } from "@/components/feedback/FeedbackCard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Role } from "@/lib/types/role"
import type { Feedback } from "@/lib/types/feedback"
import { mockUsers } from "@/lib/mock/users"
import { mockFeedback } from "@/lib/mock/feedback"

const currentUserId = "4"

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState(mockFeedback)
  const [selectedIntern, setSelectedIntern] = useState("")
  const [content, setContent] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const userMap = useMemo(
    () => new Map(mockUsers.map((u) => [u.id, u])),
    [],
  )

  const myInterns = useMemo(
    () => mockUsers.filter((u) => u.role === Role.INTERN && u.buddyId === currentUserId),
    [],
  )

  const given = useMemo(
    () => feedback.filter((f) => f.fromId === currentUserId),
    [feedback],
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!selectedIntern) next.selectedIntern = "Select an intern."
    if (!content.trim()) next.content = "Write your feedback."
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const newFeedback: Feedback = {
      id: String(Date.now()),
      fromId: currentUserId,
      toId: selectedIntern,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    }
    setFeedback((prev) => [newFeedback, ...prev])
    setSelectedIntern("")
    setContent("")
    setErrors({})
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Feedback</h1>
        <p className="text-sm text-muted-foreground">
          Provide feedback to your interns.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Give Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <select
                value={selectedIntern}
                onChange={(e) => setSelectedIntern(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select an intern...</option>
                {myInterns.map((intern) => (
                  <option key={intern.id} value={intern.id}>
                    {intern.fullName} — {intern.department}
                  </option>
                ))}
              </select>
              {errors.selectedIntern && (
                <p className="text-xs text-red-600">{errors.selectedIntern}</p>
              )}
            </div>

            <div className="space-y-2">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your feedback here..."
                rows={4}
                className="flex w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              {errors.content && (
                <p className="text-xs text-red-600">{errors.content}</p>
              )}
            </div>

            <Button type="submit">
              <Send className="mr-1.5 size-4" />
              Send Feedback
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Feedback Given ({given.length})
        </h2>
      </div>

      <div className="space-y-4">
        {given.map((f) => (
          <FeedbackCard
            key={f.id}
            from={userMap.get(f.fromId)!}
            to={userMap.get(f.toId)!}
            content={f.content}
            createdAt={f.createdAt}
          />
        ))}
        {given.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No feedback given yet.
          </p>
        )}
      </div>
    </div>
  )
}
