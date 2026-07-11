"use client"

import { useState, useMemo } from "react"

import { Input } from "@/components/ui/input"
import { TaskStatusBadge } from "@/components/common/TaskStatusBadge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { TaskStatus } from "@/lib/types/task"
import { mockTasks } from "@/lib/mock/tasks"
import { Role } from "@/lib/types/role"
import { mockUsers } from "@/lib/mock/users"

const currentUserId = "6"

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(
    mockTasks.filter((t) => t.assigneeId === currentUserId),
  )
  const [search, setSearch] = useState("")

  const userMap = useMemo(
    () => new Map(mockUsers.map((u) => [u.id, u])),
    [],
  )

  const filtered = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [tasks, search],
  )

  function handleStatusChange(taskId: string, status: TaskStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Tasks assigned to you. Update their status as you progress.
        </p>
      </div>

      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="space-y-3">
        {filtered.map((task) => {
          const creator = userMap.get(task.createdBy)
          return (
            <Card key={task.id}>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold">
                    {task.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                </div>
                <TaskStatusBadge status={task.status} />
              </CardHeader>
              <CardContent className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {creator && (
                    <>
                      <Avatar className="size-6">
                        <AvatarFallback className="bg-blue-100 text-xs text-blue-700">
                          {creator.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>Assigned by {creator.fullName}</span>
                    </>
                  )}
                </div>
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task.id, e.target.value as TaskStatus)
                  }
                  className="h-8 rounded-lg border border-input bg-transparent px-2 text-xs shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>
          )
        })}
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No tasks assigned to you.
          </p>
        )}
      </div>
    </div>
  )
}
