"use client"

import { useState, useMemo } from "react"

import { Input } from "@/components/ui/input"
import { TasksTable } from "@/components/tasks/TasksTable"

import { Role } from "@/lib/types/role"
import { mockTasks } from "@/lib/mock/tasks"
import { mockUsers } from "@/lib/mock/users"

export default function TasksPage() {
  const [search, setSearch] = useState("")

  const interns = useMemo(
    () => mockUsers.filter((u) => u.role === Role.INTERN),
    [],
  )

  const filtered = useMemo(
    () =>
      mockTasks.filter((task) => {
        const assignee = interns.find((u) => u.id === task.assigneeId)
        const matchesSearch =
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()) ||
          (assignee?.fullName.toLowerCase() ?? "").includes(search.toLowerCase())
        return matchesSearch
      }),
    [search, interns],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <p className="text-sm text-muted-foreground">
          Tasks assigned to interns.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search tasks or interns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {mockTasks.length} tasks
        </p>
      </div>

      <TasksTable tasks={filtered} users={interns} />
    </div>
  )
}
