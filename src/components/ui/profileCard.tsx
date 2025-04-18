import { MoreVertical, User, MessageSquare } from "lucide-react";

interface ProfileCardProps {
  name: string;
  username: string;
  avatarUrl: string;
  mutualServerCount: number;
  promoterTag?: boolean;
}

export default function ProfileCard({
  name,
  username,
  avatarUrl,
}: // mutualServerCount,
// promoterTag = false,
ProfileCardProps) {
  return (
    <div className="relative">
      <div className="w-60 h-auto overflow-y-scroll rounded-xl bg-[#2b2d31] p-5 text-white shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#232428] relative">
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-400 rounded-full border-2 border-[#2b2d31]" />
          </div>
          <div className="flex gap-2 mr-2">
            <User className="w-5 h-5 cursor-pointer" />
            <MoreVertical className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        <div className="mb-2">
          <h3 className="flex items-center text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">{username}</p>
        </div>

        {/* <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center gap-2">
          <span className="bg-emerald-500 text-xs px-2 py-0.5 rounded-full">
            {mutualServerCount} Mutual Server
          </span>
        </div>
        {promoterTag && (
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-xs px-2 py-0.5 rounded-full">
              Promoters
            </span>
          </div>
        )}
      </div> */}

        <button className="mt-4 flex items-center justify-center w-full bg-[#404249] hover:bg-[#4a4d55] text-sm py-2 rounded-lg transition">
          <MessageSquare className="w-4 h-4 mr-2" />
          Message {name}
        </button>
      </div>
    </div>
  );
}
