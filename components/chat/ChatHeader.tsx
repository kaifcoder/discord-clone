import { Hash } from "lucide-react";
import React from "react";
import MoblieToggle from "../mobile-toggle";
import UserAvatar from "../UserAvatar";
import { SocketIndicator } from "../socket-indicator";
import { ChatVideoButton } from "./chat-video-button";
import { ChatAudioButton } from "./chat-audio-button";

interface Props {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ serverId, name, type, imageUrl }: Props) => {
  return (
    <div className="flex items-center h-12 px-3 font-semibold border-b-2 text-md border-neutral-200 dark:border-neutral-800">
      <MoblieToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="w-8 h-8 mr-2 md:h-8 md:w-8" />
      )}
      <p className="font-semibold text-black text-md dark:text-white">{name}</p>
      <div className="flex items-center ml-auto">
        {type === "conversation" && <ChatAudioButton />}
        {type === "conversation" && <ChatVideoButton />}
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
