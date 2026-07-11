"use client";

import { useState } from "react";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import TopBar from "./Topbar";

import { Role } from "@/lib/types/role";

interface AppShellProps {
  children: React.ReactNode;
  role: Role;
  title: string;
  titleClassName?: string;
}

export default function AppShell({
  children,
  role,
  title,
  titleClassName,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      <Sidebar role={role} />

      <MobileSidebar
        role={role}
        open={mobileOpen}
        onOpenChange={setMobileOpen}
      />

      <div className="flex flex-1 flex-col overflow-hidden">

        <TopBar
          title={title}
          titleClassName={titleClassName}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6">

          {children}

        </main>

      </div>

    </div>
  );
}