import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ActionMenu } from "./actionMenu";
import axios from "axios";
import config from "../../../config/config.json";

interface ChattingHistoryProps {
  message: Message;
  avatarClick: () => void;
}

export const ChattingHistory = ({
  message,
  avatarClick,
}: ChattingHistoryProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const server = config.server || "http://localhost:4000";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(message.content);
    } catch (err) {
      console.log("Copy failed: ", err);
    }
  };

  const handleDelete = async () => {
    console.log("message", message);
    const data = {
      id: message._id,
      room: message.room,
      editor: message.sender._id,
    };
    await axios.post(`${server}/messages/deleteMessage`, data);
  };

  const handleEdit = () => {
    console.log("edit");
  };

  return (
    <div
      key={message._id}
      className="flex items-start gap-2 relative group hover:bg-[#1e2025] rounded-lg p-2"
    >
      <Avatar className="w-8 h-8 cursor-pointer" onClick={avatarClick}>
        <AvatarImage
          src={message?.sender?.avatar}
          alt={message?.sender?.userId}
        />
        <AvatarFallback>{message?.sender?.userId}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col pr-8">
        <div className="flex items-center">
          <span className="font-medium text-white text-[13px]">
            {message?.sender?.userId}
          </span>
          <span className="ml-2 font-normal text-[#5a5d69] text-xs">
            {message?.timestamp}
          </span>
        </div>
        <span className="font-normal text-white text-[13px]">
          {message?.content}
        </span>
      </div>

      <button
        aria-label="Options"
        className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      >
        <EllipsisVertical className="w-5 h-5 text-gray-500" />
      </button>

      {showMenu && (
        <div ref={menuRef} className="absolute right-5 mt-2 z-10">
          <ActionMenu
            handleCopy={handleCopy}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      )}
    </div>
  );
};
