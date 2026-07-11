import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

interface UserMenuProps {
  name: string;
  role: string;
}

export default function UserMenu({
  name,
  role,
}: UserMenuProps) {
  return (
    <>
      <Separator className="bg-sidebar-border" />

      <div className="flex items-center gap-3 px-4 py-4">

        <Avatar>
          <AvatarFallback className="bg-blue-600 text-white">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">

          <p className="truncate text-sm font-semibold text-white">
            {name}
          </p>

          <p className="text-xs text-slate-400">
            {role}
          </p>

        </div>

      </div>
    </>
  );
}
