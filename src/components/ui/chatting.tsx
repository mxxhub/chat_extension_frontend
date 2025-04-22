import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";

export const chattingHistory = (message: Message, avatarClick: () => void) => {
  return (
    <div key={message.id} className="flex items-start gap-2">
      <Avatar className="w-8 h-8" onClick={avatarClick}>
        <AvatarImage
          src={message?.sender?.avatar}
          alt={message?.sender?.userId}
        />
        <AvatarFallback>{message?.sender?.userId}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-medium text-white text-[13px]">
            {message?.sender?.displayName}
          </span>
          <span className="ml-2 font-normal text-[#5a5d69] text-xs">
            {message?.timestamp}
          </span>
        </div>
        <span className="font-normal text-white text-[13px]">
          {message?.content}
        </span>
      </div>
    </div>
  );
};
