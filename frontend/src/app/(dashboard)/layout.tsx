import AppShell from "@/components/layout/Appshell";

import { Role } from "@/lib/types/role";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      role={Role.MANAGER}
      title="Dashboard"
      titleClassName="text-blue-700"
    >
      {children}
    </AppShell>
  );
}