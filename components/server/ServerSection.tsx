"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import ActionTooltip from "../action-tooltip";
import { Plus, Settings } from "lucide-react";
import { useModalStore } from "@/hooks/use-modal-store";

interface Props {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: Props) => {
  const { onOpen } = useModalStore();
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <div className="space-x-2">
        {role !== MemberRole.GUEST && sectionType === "channels" && (
          <ActionTooltip label="Create Channel" side="top">
            <button
              onClick={() => onOpen("createChannel", { channelType })}
              className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              <Plus className="w-4 h-4 " />
            </button>
          </ActionTooltip>
        )}
        {role === MemberRole.ADMIN && sectionType === "members" && (
          <ActionTooltip label="Manage Members" side="top">
            <button
              onClick={() => onOpen("members", { server })}
              className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              <Settings className="w-4 h-4 " />
            </button>
          </ActionTooltip>
        )}
      </div>
    </div>
  );
};

export default ServerSection;
