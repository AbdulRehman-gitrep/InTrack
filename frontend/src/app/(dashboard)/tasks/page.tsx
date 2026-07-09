import { TaskStatusBadge } from "@/components/common/TaskStatusBadge"

const sampleTasks = [
  { id: 1, title: "Onboarding documentation", status: "assigned" as const },
  { id: 2, title: "Review intern report", status: "in_progress" as const },
  { id: 3, title: "Submit weekly summary", status: "completed" as const },
  { id: 4, title: "Schedule 1:1 meeting", status: "pending" as const },
]

export default function TasksPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Tasks</h1>
      <div className="space-y-2">
        {sampleTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <span className="text-sm font-medium">{task.title}</span>
            <TaskStatusBadge status={task.status} />
          </div>
        ))}
      </div>
    </div>
  )
}
