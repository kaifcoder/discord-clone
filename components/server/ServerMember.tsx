"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import UserAvatar from "../UserAvatar";

interface Props {
  member: Member & { profile: Profile };
  server: Server;
}

const iconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="w-4 h-4 mr-2 text-yellow-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="w-4 h-4 mr-2 text-yellow-500" />,
};

const ServerMember = ({ member, server }: Props) => {
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[member.role];

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="w-8 h-8 md:h-8 md:w-8"
      />
      {Icon}
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
    </button>
  );
};

export default ServerMember;
