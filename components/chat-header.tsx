"use client";

import { useRouter } from "next/navigation";
import { memo } from "react";
import { useWindowSize } from "usehooks-ts";
import Link from "next/link";
import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "./icons";
import { useSidebar } from "./ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";
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
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="sticky top-0 flex items-center justify-between bg-background px-2 py-1.5 md:px-2 border-b h-12">
      <div className="flex items-center gap-2">
        <SidebarToggle />
      </div>

      <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
        <span className="text-sm font-medium text-muted-foreground">
          Ask Sam
        </span>
        <Link href="/memory">
          <Badge
            variant="outline"
            className="text-[10px] h-5 px-1.5 flex items-center gap-1 bg-blue-50/50 text-blue-600 border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <Brain className="w-3 h-3" />
            Memory Beta
          </Badge>
        </Link>
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
