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
      <Separator />

      <div className="flex items-center gap-3 p-4">

        <Avatar>
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">

          <p className="truncate text-sm font-semibold">
            {name}
          </p>

          <p className="text-xs text-muted-foreground">
            {role}
          </p>

        </div>

      </div>
    </>
  );
}