"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title: string;
  onMenuClick?: () => void;
}

export default function TopBar({
  title,
  onMenuClick,
}: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-6">

     

      <Button
        variant="ghost"
        size="icon"
        className="mr-3 lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      

      <h1 className="text-xl font-semibold text-foreground">
        {title}
      </h1>

    </header>
  );
}