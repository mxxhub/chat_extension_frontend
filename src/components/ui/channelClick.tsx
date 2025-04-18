import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

type Channel = {
  id: string;
  image: string;
};

type SidebarChannelListProps = {
  sidebarChannels: Channel[];
  channelClick: () => void;
};

export default function SidebarChannelList({
  sidebarChannels,
  channelClick,
}: SidebarChannelListProps) {
  return (
    <div className="mt-2 flex flex-col items-center gap-2">
      {sidebarChannels.slice(0, 3).map((channel) => (
        <Avatar key={channel.id} className="w-[46px] h-[46px]">
          <AvatarImage
            src={channel.image}
            alt="Channel"
            onClick={() => channelClick()}
          />
        </Avatar>
      ))}
    </div>
  );
}
