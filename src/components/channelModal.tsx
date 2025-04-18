import { Avatar, AvatarImage } from "./ui/avatar";

type Channel = {
  id: number;
  image: string;
  name: string;
  tokenAdd: string;
};

type SidebarChannelListProps = {
  channel: Channel;
  channelClick: () => void;
};

export default function SidebarChannelList({
  channel,
  channelClick,
}: SidebarChannelListProps) {
  return (
    <div className="mt-2 flex flex-col items-center gap-2">
      <Avatar key={channel.id} className="w-[46px] h-[46px]">
        <AvatarImage
          src={channel.image}
          alt="Channel"
          onClick={() => channelClick()}
        />
      </Avatar>
    </div>
  );
}
