"use client"

import { useMemo, useState } from "react"
import { Role } from "@/lib/types/role"
import type { User } from "@/lib/types/user"
import { mockUsers } from "@/lib/mock/users"

import { Input } from "@/components/ui/input"
import { UsersTable } from "@/components/users/UsersTable"

const currentUserId = "4"

export default function InternsPage() {
  const role = Role.BUDDY

  const interns = useMemo<User[]>(() => {
    const all = mockUsers.filter((u) => u.role === Role.INTERN)
    if (role === Role.BUDDY) {
      return all.filter((u) => u.buddyId === currentUserId)
    }
    return all
  }, [])

  const [search, setSearch] = useState("")

  const filtered = useMemo(
    () =>
      interns.filter(
        (u) =>
          u.fullName.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()) ||
          u.department.toLowerCase().includes(search.toLowerCase()),
      ),
    [interns, search],
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Interns</h1>
        <p className="text-sm text-muted-foreground">
          Interns assigned to you.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search interns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <p className="text-sm text-muted-foreground">
          {filtered.length} of {interns.length} interns
        </p>
      </div>

      <UsersTable
        users={filtered}
        role={role}
        onEdit={() => {}}
        onToggleActive={() => {}}
        onAssignRole={() => {}}
        onAssignManager={() => {}}
        onAssignBuddy={() => {}}
      />
    </div>
  )
}
