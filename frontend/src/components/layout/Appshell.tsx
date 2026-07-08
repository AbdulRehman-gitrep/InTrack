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
}

export default function AppShell({
  children,
  role,
  title,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">

      {/* Desktop Sidebar */}

      <Sidebar role={role} />

      {/* Mobile Sidebar */}

      <MobileSidebar
        role={role}
        open={mobileOpen}
        onOpenChange={setMobileOpen}
      />

      {/* Main */}

      <div className="flex flex-1 flex-col">

        <TopBar
          title={title}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="flex-1 p-6">

          {children}

        </main>

      </div>

    </div>
  );
}