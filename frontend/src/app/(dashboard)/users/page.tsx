"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Role } from "@/lib/types/role"
import type { User, CreateUserPayload, EditUserPayload } from "@/lib/types/user"
import { mockUsers } from "@/lib/mock/users"

import { Button } from "@/components/ui/button"
import { AssignRelationshipSheet } from "@/components/users/AssignRelationshipSheet"
import { AssignRoleSheet } from "@/components/users/AssignRoleSheet"
import { UserFormDialog } from "@/components/users/UserFormDialog"
import { UsersTable } from "@/components/users/UsersTable"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [userFormOpen, setUserFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [roleSheetUser, setRoleSheetUser] = useState<User | null>(null)
  const [managerSheetUser, setManagerSheetUser] = useState<User | null>(null)
  const [buddySheetUser, setBuddySheetUser] = useState<User | null>(null)

  let nextId = String(users.length + 1)

  function handleCreate(data: CreateUserPayload | EditUserPayload) {
    const payload = data as CreateUserPayload
    const newUser: User = {
      id: nextId,
      fullName: payload.fullName,
      email: payload.email,
      role: payload.role,
      department: payload.department,
      isActive: true,
      managerId: null,
      buddyId: null,
      internshipStart: payload.internshipStart ?? null,
      internshipEnd: payload.internshipEnd ?? null,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setUsers((prev) => [...prev, newUser])
    nextId = String(Number(nextId) + 1)
    setUserFormOpen(false)
  }

  function handleEdit(data: CreateUserPayload | EditUserPayload) {
    if (!editingUser) return
    const payload = data as EditUserPayload
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              fullName: payload.fullName,
              email: payload.email,
              department: payload.department,
              internshipStart: payload.internshipStart ?? u.internshipStart,
              internshipEnd: payload.internshipEnd ?? u.internshipEnd,
            }
          : u,
      ),
    )
    setEditingUser(null)
    setUserFormOpen(false)
  }

  function handleToggleActive(userId: string) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: !u.isActive } : u)),
    )
  }

  function handleAssignRole(userId: string, role: Role) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role } : u)),
    )
    setRoleSheetUser(null)
  }

  function handleAssignManager(userId: string, managerId: string | null) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, managerId } : u)),
    )
    setManagerSheetUser(null)
  }

  function handleAssignBuddy(userId: string, buddyId: string | null) {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, buddyId } : u)),
    )
    setBuddySheetUser(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage all users, roles, and assignments.
          </p>
        </div>
        <Button onClick={() => setUserFormOpen(true)}>
          <Plus className="mr-2 size-4" />
          Create User
        </Button>
      </div>

      <UsersTable
        users={users}
        onEdit={(user) => {
          setEditingUser(user)
          setUserFormOpen(true)
        }}
        onToggleActive={handleToggleActive}
        onAssignRole={setRoleSheetUser}
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
        onSave={editingUser ? handleEdit : handleCreate}
      />

      {roleSheetUser && (
        <AssignRoleSheet
          open={!!roleSheetUser}
          onOpenChange={(open) => { if (!open) setRoleSheetUser(null) }}
          user={roleSheetUser}
          onAssign={handleAssignRole}
        />
      )}

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
