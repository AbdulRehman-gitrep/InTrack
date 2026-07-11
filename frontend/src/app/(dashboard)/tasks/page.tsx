"use client"

import { useState, useMemo } from "react"
import { Plus } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TaskStatusBadge } from "@/components/common/TaskStatusBadge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TasksTable } from "@/components/tasks/TasksTable"
import { TaskFormDialog } from "@/components/tasks/TaskFormDialog"

import type { Task, TaskStatus } from "@/lib/types/task"
import { Role } from "@/lib/types/role"
import { mockTasks } from "@/lib/mock/tasks"
import { mockUsers } from "@/lib/mock/users"

import { useSession } from "@/lib/context/session"

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
]

export default function TasksPage() {
  const { user } = useSession()
  const [tasks, setTasks] = useState(mockTasks)
  const [search, setSearch] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const isManager = user.role === Role.MANAGER
  const isBuddy = user.role === Role.BUDDY
  const isIntern = user.role === Role.INTERN

  const visibleTasks = useMemo(() => {
    if (isIntern) {
      return tasks.filter((t) => t.assigneeId === user.id)
    }
    if (isManager) {
      return tasks.filter((t) => t.createdBy === user.id)
    }
    if (isBuddy) {
      const internIds = mockUsers
        .filter((u) => u.buddyId === user.id)
        .map((u) => u.id)
      return tasks.filter((t) => internIds.includes(t.assigneeId))
    }
    return tasks
  }, [tasks, user.id, isIntern, isManager, isBuddy])

  const filtered = useMemo(
    () =>
      visibleTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [visibleTasks, search],
  )

  function handleStatusChange(taskId: string, status: TaskStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t)),
    )
  }

  function handleCreateTask(data: Omit<Task, "id" | "createdAt">) {
    const newTask: Task = {
      ...data,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setTasks((prev) => [newTask, ...prev])
    setFormOpen(false)
  }

  const interns = useMemo(
    () => mockUsers.filter((u) => u.role === Role.INTERN && u.isActive),
    [],
  )

  const userMap = useMemo(
    () => new Map(mockUsers.map((u) => [u.id, u])),
    [],
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            {isIntern ? "My Tasks" : isManager ? "Assigned Tasks" : "Intern Tasks"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isIntern
              ? "Tasks assigned to you. Update their status as you progress."
              : isManager
                ? "Tasks you have assigned to interns."
                : "Tasks assigned to your interns."}
          </p>
        </div>
        {isManager && (
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="mr-2 size-4" />
            Assign Task
          </Button>
        )}
      </div>

      <Input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      {isIntern ? (
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
      ) : (
        <TasksTable tasks={filtered} users={mockUsers} />
      )}

      {isManager && (
        <TaskFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          interns={interns}
          currentUserId={user.id}
          onSave={handleCreateTask}
        />
      )}
    </div>
  )
}
