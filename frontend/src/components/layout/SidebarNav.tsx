import SidebarItem from "./SidebarItem";

import { navigation } from "@/lib/config/navigation";
import { Role } from "@/lib/types/role";

interface SidebarNavProps {
  role: Role;
}

export default function SidebarNav({
  role,
}: SidebarNavProps) {
  const items = navigation.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <nav className="flex flex-col gap-1 px-4 py-4">
      {items.map((item) => (
        <SidebarItem
          key={item.href}
          title={item.title}
          href={item.href}
          icon={item.icon}
        />
      ))}
    </nav>
  );
}