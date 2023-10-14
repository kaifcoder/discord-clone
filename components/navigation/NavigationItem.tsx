"use client";
import React from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

import { cn } from "@/lib/utils";
import ActionTooltip from "../action-tooltip";

interface NavigationItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const NavigationItem = ({ id, name, imageUrl }: NavigationItemProps) => {
  const router = useRouter();
  const { serverId }: any = useParams();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip label={name} side="right" align="center">
      <button onClick={onClick} className="relative flex items-center group">
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full w-[4px] transition-all",
            serverId !== id && "group-hover:h-[20px]",
            serverId === id ? "h-[36px]" : "h-[8px]"
          )}
        />
        <div
          className={cn(
            "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all  overflow-hidden",
            serverId === id && "bg-primary/10 text-primary rounded-[16px]"
          )}
        >
          <Image src={imageUrl} alt={name} fill objectFit="cover" />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
