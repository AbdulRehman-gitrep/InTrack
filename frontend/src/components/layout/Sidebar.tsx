import { ScrollArea } from "@/components/ui/scroll-area";

import SidebarHeader from "./SidebarHeader";
import SidebarNav from "./SidebarNav";
import UserMenu from "./UserMenu";

import { Role } from "@/lib/types/role";
import { siteConfig } from "@/lib/config/site";

interface SidebarProps {
  role: Role;
}

export default function Sidebar({
  role,
}: SidebarProps) {
  return (
    <aside
      className="hidden border-r bg-background lg:flex lg:flex-col"
      style={{
        width: siteConfig.sidebarWidth,
      }}
    >
      <SidebarHeader />

      <ScrollArea className="flex-1">
        <SidebarNav role={role} />
      </ScrollArea>

      <UserMenu
        name="Abdul Rehman"
        role={role}
      />
    </aside>
  );
}