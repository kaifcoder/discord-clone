"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useParams, useRouter } from "next/navigation";

interface Props {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);
  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);
    if (type === "channel") {
      router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
    if (type === "member") {
      router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center w-full px-2 py-2 transition rounded-md group gap-x-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
      >
        <Search className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold transition text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">
          Search
        </p>
        <kbd className=" font-medium text-muted-foreground  pointer-events-none inline-flex h-5 select-none gap-1 items-center rounded border bg-muted px-1.5 font-mono text-[10px] ml-auto">
          <span className="text-xs">CTRL</span> K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search" />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;
            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() =>
                        onClick({
                          id,
                          type,
                        })
                      }
                    >
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
