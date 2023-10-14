"use client";

import { Smile } from "lucide-react";
import React from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Props {
  onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange }: Props) => {
  const { resolvedTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300" />
      </PopoverTrigger>
      <PopoverContent
        side="right"
        sideOffset={40}
        className="mb-16 bg-transparent border-none shadow-none drop-shadow-none"
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          theme={resolvedTheme}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
