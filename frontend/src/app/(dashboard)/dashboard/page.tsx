import { Role } from "@/lib/types/role"

import { AdminDashboard } from "@/components/dashboard/AdminDashboard"
import { BuddyDashboard } from "@/components/dashboard/BuddyDashboard"
import { InternDashboard } from "@/components/dashboard/InternDashboard"
import { ManagerDashboard } from "@/components/dashboard/ManagerDashboard"

const role: Role = Role.ADMIN

export default function DashboardPage() {
  switch (role) {
    case Role.MANAGER:
      return <ManagerDashboard />
    case Role.BUDDY:
      return <BuddyDashboard />
    case Role.INTERN:
      return <InternDashboard />
    default:
      return <AdminDashboard />
  }
}
