"use client"

import { useState, useMemo } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TasksTable } from "@/components/tasks/TasksTable"
import { TaskFormDialog } from "@/components/tasks/TaskFormDialog"

import { Role } from "@/lib/types/role"
import type { Task } from "@/lib/types/task"
import { mockTasks } from "@/lib/mock/tasks"
import { mockUsers } from "@/lib/mock/users"

const currentUserId = "2"

export default function TasksPage() {
  const [tasks, setTasks] = useState(mockTasks)
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)

  const interns = useMemo(
    () => mockUsers.filter((u) => u.role === Role.INTERN),
    [],
  )

  const filtered = useMemo(
    () =>
      tasks.filter((task) => {
        const assignee = interns.find((u) => u.id === task.assigneeId)
        const matchesSearch =
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()) ||
          (assignee?.fullName.toLowerCase() ?? "").includes(search.toLowerCase())
        return matchesSearch
      }),
    [tasks, search, interns],
  )

  function handleCreate(data: Omit<Task, "id" | "createdAt">) {
    const task: Task = {
      ...data,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTasks((prev) => [task, ...prev])
    setFormOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            Tasks assigned to interns with current status.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus className="mr-1.5 size-4" />
          Assign Task
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search tasks or interns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {tasks.length} tasks
        </p>
      </div>

      <TasksTable tasks={filtered} users={interns} />

      <TaskFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        interns={interns}
        currentUserId={currentUserId}
        onSave={handleCreate}
      />
    </div>
  )
}
