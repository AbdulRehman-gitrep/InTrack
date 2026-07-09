"use client"

import { useMemo, useState } from "react"
import { Role } from "@/lib/types/role"
import type { User, EditUserPayload } from "@/lib/types/user"
import { mockUsers } from "@/lib/mock/users"

import { Input } from "@/components/ui/input"
import { AssignRelationshipSheet } from "@/components/users/AssignRelationshipSheet"
import { UserFormDialog } from "@/components/users/UserFormDialog"
import { UsersTable } from "@/components/users/UsersTable"

export default function InternsPage() {
  const [interns, setInterns] = useState<User[]>(() =>
    mockUsers.filter((u) => u.role === Role.INTERN),
  )
  const [search, setSearch] = useState("")
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [userFormOpen, setUserFormOpen] = useState(false)
  const [managerSheetUser, setManagerSheetUser] = useState<User | null>(null)
  const [buddySheetUser, setBuddySheetUser] = useState<User | null>(null)

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

  function handleToggleActive(userId: string) {
    setInterns((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u)),
    )
  }

  function handleEdit(data: EditUserPayload) {
    if (!editingUser) return
    setInterns((prev) =>
      prev.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              fullName: data.fullName,
              email: data.email,
              department: data.department,
              internshipStart: data.internshipStart ?? u.internshipStart,
              internshipEnd: data.internshipEnd ?? u.internshipEnd,
            }
          : u,
      ),
    )
    setEditingUser(null)
    setUserFormOpen(false)
  }

  function handleAssignManager(userId: string, managerId: string | null) {
    setInterns((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, managerId } : u)),
    )
    setManagerSheetUser(null)
  }

  function handleAssignBuddy(userId: string, buddyId: string | null) {
    setInterns((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, buddyId } : u)),
    )
    setBuddySheetUser(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Interns</h1>
        <p className="text-sm text-muted-foreground">
          View and manage all interns. Assign managers and buddies.
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
        onEdit={(user) => {
          setEditingUser(user)
          setUserFormOpen(true)
        }}
        onToggleActive={handleToggleActive}
        onAssignRole={() => {}}
        onAssignManager={setManagerSheetUser}
        onAssignBuddy={setBuddySheetUser}
      />

      <UserFormDialog
        open={userFormOpen}
        onOpenChange={(open) => {
          setUserFormOpen(open)
          if (!open) setEditingUser(null)
        }}
        user={editingUser}
        onSave={handleEdit}
      />

      {managerSheetUser && (
        <AssignRelationshipSheet
          open={!!managerSheetUser}
          onOpenChange={(open) => { if (!open) setManagerSheetUser(null) }}
          user={managerSheetUser}
          type="manager"
          onAssign={handleAssignManager}
        />
      )}

      {buddySheetUser && (
        <AssignRelationshipSheet
          open={!!buddySheetUser}
          onOpenChange={(open) => { if (!open) setBuddySheetUser(null) }}
          user={buddySheetUser}
          type="buddy"
          onAssign={handleAssignBuddy}
        />
      )}
    </div>
  )
}
