import { Avatar, AvatarImage } from "./ui/avatar";

type SidebarChannelListProps = {
  channel: Channel;
  channelClick: () => void;
};

export default function SidebarChannelList({
  channel,
  channelClick,
}: SidebarChannelListProps) {
  // console.log("sidebar  component channel", channel);
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
