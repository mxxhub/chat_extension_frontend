import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { SettingModal } from "../../settingModal";
import SidebarChannelList from "../../channelModal";

type SidebarProps = {
  joinedChannels: Channel[];
  sidebarChannels: Channel[];
  onChannelClick: (channel: Channel) => void;
  setJoinStatus: (status: boolean) => void;
};

const Sidebar = ({
  joinedChannels,
  sidebarChannels,
  onChannelClick,
  setJoinStatus,
}: SidebarProps) => {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <div className="h-full block md:block md:relative bg-[#22242D] border-[#22242d]">
      <div className="relative h-full w-[63px]">
        <div className="border-r border-r-[#3f414e] justify-items-center py-3">
          <MenuIcon
            className="w-7 h-7 text-white cursor-pointer"
            onClick={() => setMenu(true)}
          />
          {menu && (
            <SettingModal isOpen={menu} onClose={() => setMenu(false)} />
          )}
        </div>
        <div className="h-full border-r border-r-[#3f414e] flex flex-col items-center overflow-y-scroll">
          <div className="mt-4 relative">
            <div className="text-[#777a8c] text-[10px] ml-4">Pinned</div>
            <img
              className="w-[9px] h-[9px] absolute top-1 left-[3px]"
              alt="Pin"
              src="/assets/vector-5.svg"
            />
          </div>

          {/* Pinned channels */}
          <div className="mt-2 flex flex-col items-center gap-2">
            {joinedChannels &&
              joinedChannels.map((channel: any) => (
                <SidebarChannelList
                  key={channel._id}
                  channel={channel}
                  channelClick={() => {
                    onChannelClick(channel);
                    setJoinStatus(true);
                  }}
                />
              ))}
          </div>

          <div className="mt-4 flex items-center">
            <img
              className="w-2.5 h-2.5"
              alt="Trending"
              src="/assets/frame-10.svg"
            />
            <div className="text-[#777a8c] text-[10px] ml-1">Trending</div>
          </div>

          {/* Trending channels */}
          <div className="mt-2 flex flex-col items-center gap-2">
            {sidebarChannels.map((channel) => (
              <SidebarChannelList
                key={channel.id}
                channel={channel}
                channelClick={() => {
                  onChannelClick(channel);
                  setJoinStatus(false);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
