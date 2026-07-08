"use client";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

import Sidebar from "./Sidebar";

import { Role } from "@/lib/types/role";

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role: Role;
}

export default function MobileSidebar({
  open,
  onOpenChange,
  role,
}: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[260px] p-0"
      >
        <Sidebar role={role} />
      </SheetContent>
    </Sheet>
  );
}