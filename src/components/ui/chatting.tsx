import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { EllipsisVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ActionMenu } from "./actionMenu";
import config from "../../../config/config.json";
import { deleteMessage } from "../../redux/features/message/messageSlice";

interface ChattingHistoryProps {
  message: Message;
  avatarClick: () => void;
  editMessage: (message: Message) => void;
}

export const ChattingHistory = ({
  message,
  avatarClick,
  editMessage,
}: ChattingHistoryProps) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<"top" | "bottom">("bottom");
  const menuRef = useRef<HTMLDivElement>(null);

  const server = config.server || "http://144.172.94.181:4000";

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
    const data = {
      id: message._id,
      room: message.room,
      editor: message.sender._id,
    };
    const deletedMessage = await axios.post(
      `${server}/messages/deleteMessage`,
      data
    );
    if (!deletedMessage) return;
    dispatch(deleteMessage(deletedMessage.data?._id));
    console.log("deletedMessage", deletedMessage);
  };

  const handleEdit = () => {
    editMessage(message);
  };

  const toggleMenu = (e: React.MouseEvent) => {
    const buttonRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const menuHeight = 140;
    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow < menuHeight && spaceAbove > menuHeight) {
      setMenuPosition("top");
    } else {
      setMenuPosition("bottom");
    }

    setShowMenu((prev) => !prev);
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
        onClick={toggleMenu}
      >
        <EllipsisVertical className="w-5 h-5 text-gray-500" />
      </button>

      {showMenu && (
        <div
          ref={menuRef}
          className={`absolute right-5 z-10 ${
            menuPosition === "top" ? "bottom-full mb-2" : "mt-2"
          }`}
          onContextMenu={(e) => e.preventDefault()}
        >
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
