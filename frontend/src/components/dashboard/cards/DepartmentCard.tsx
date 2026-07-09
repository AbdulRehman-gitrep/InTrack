import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface DepartmentCardProps {
  title: string
  count: number
  icon: LucideIcon
}

export function DepartmentCard({ title, count, icon: Icon }: DepartmentCardProps) {
  return (
    <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-full bg-blue-100">
          <Icon className="size-5 text-blue-700" />
        </div>
      </CardContent>
    </Card>
  )
}
