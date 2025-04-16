import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/@types/global";

export const chattingHistory = (message: Message) => {
  return (
    <div key={message.id} className="flex items-start gap-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={message.avatar} alt={message.user} />
        <AvatarFallback>{message.user[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-medium text-white text-[13px]">
            {message.user}
          </span>
          <span className="ml-2 font-normal text-[#5a5d69] text-xs">
            {message.time}
          </span>
        </div>
        <span className="font-normal text-white text-[13px]">
          {message.message}
        </span>
      </div>
    </div>
  );
};
