"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "./icons";
import { type VisibilityType } from "./visibility-selector";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const router = useRouter();

  return (
    <header className="sticky top-0 flex items-center justify-between bg-background px-2 py-1.5 md:px-2 border-b h-12">
      <div className="flex items-center gap-2">
        <SidebarToggle />
      </div>

      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Downtown Santa Monica"
          className="size-6 rounded-full"
          src="/images/dtsm-logo-circle.jpeg"
        />
        <span className="text-sm font-medium text-muted-foreground">
          Ask Sam
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              type="button"
              className="h-8 w-8 p-0"
              onClick={() => {
                router.push("/");
                router.refresh();
              }}
            >
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="end">New Chat</TooltipContent>
        </Tooltip>
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
