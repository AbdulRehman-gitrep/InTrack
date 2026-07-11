"use client"

import { useState } from "react"
import { Pencil } from "lucide-react"
import { Role } from "@/lib/types/role"
import type { User, EditUserPayload } from "@/lib/types/user"
import { mockUsers } from "@/lib/mock/users"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UserFormDialog } from "@/components/users/UserFormDialog"

const roleLabels: Record<Role, string> = {
  [Role.ADMIN]: "Administrator",
  [Role.MANAGER]: "Line Manager",
  [Role.BUDDY]: "Buddy",
  [Role.INTERN]: "Intern",
}

const currentUser: User = mockUsers[0]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm font-medium text-slate-900">{label}</span>
      <span className="text-sm text-muted-foreground">{value}</span>
    </div>
  )
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>(currentUser)
  const [editOpen, setEditOpen] = useState(false)

  function handleEdit(data: EditUserPayload) {
    setUser((prev) => ({
      ...prev,
      fullName: data.fullName,
      email: data.email,
      department: data.department,
      internshipStart: data.internshipStart ?? prev.internshipStart,
      internshipEnd: data.internshipEnd ?? prev.internshipEnd,
    }))
    setEditOpen(false)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
        <Avatar className="size-20">
          <AvatarFallback className="text-2xl">
            {getInitials(user.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <h1 className="text-2xl font-bold">{user.fullName}</h1>
          <span className="mt-1 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {roleLabels[user.role]}
          </span>
          <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="mr-2 size-3.5" />
            Edit Profile
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-base font-semibold">Details</h2>
          <Separator className="my-3" />
          <InfoRow label="Full Name" value={user.fullName} />
          <Separator />
          <InfoRow label="Email" value={user.email} />
          <Separator />
          <InfoRow label="Role" value={roleLabels[user.role]} />
          <Separator />
          <InfoRow label="Department" value={user.department} />
          <Separator />
          <InfoRow label="Status" value={user.isActive ? "Active" : "Inactive"} />
          <Separator />
          <InfoRow
            label="Account Created"
            value={new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
        </CardContent>
      </Card>

      <UserFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        user={user}
        onSave={handleEdit}
      />
    </div>
  )
}
