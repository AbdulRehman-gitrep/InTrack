import AppShell from "@/components/layout/Appshell";

import { Role } from "@/lib/types/role";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      role={Role.ADMIN}
      title="Dashboard"
    >
      {children}
    </AppShell>
  );
}