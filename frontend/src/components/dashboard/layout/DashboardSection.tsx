import type { ReactNode } from "react"

interface DashboardSectionProps {
  title: string
  children: ReactNode
}

export function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}
