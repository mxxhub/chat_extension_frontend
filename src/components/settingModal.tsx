import { useEffect, useRef, useState } from "react";
import {
  Settings,
  Copy,
  ExternalLink,
  Clipboard,
  Zap,
  ChevronRight,
  HandCoins,
  Link,
  UserPen,
  NotepadText,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import "../index.css";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingModal = ({ isOpen, onClose }: SettingModalProps) => {
  if (!isOpen) return null;
  const [timeframe, setTimeframe] = useState("Daily");

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mainRef.current && !mainRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="">
      <div
        ref={mainRef}
        className={`absolute flex -left-full flex-col h-full bg-black text-white w-4/5 overflow-y-auto z-10 my-transition ${
          isOpen ? "left-0 shadow" : ""
        }`}
      >
        {/* Header */}
        <header className="w-full bg-black border-yellow-500">
          <button
            className="absolute top-4 left-4 z-10"
            onClick={onClose}
            title="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="relative w-full overflow-hidden">
            <img
              src="/assets/settings_header.png"
              alt="settings-profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative bg-[#121212]">
            <img
              src="/assets/image-19.png"
              alt="avatar"
              className="absolute w-16 h-16 rounded-full border-none -top-11 left-6"
            />
          </div>
          <div className="flex flex-col px-4 py-3 mt-2 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xl">JS</span>
              <span>
                <Settings
                  className="w-5 h-5 text-gray-400 cursor-pointer ml-auto"
                  onClick={onClose}
                />
              </span>
            </div>
            <div className="flex items-center">
              <span>ShockedJS</span>

              <img
                className="w-4 h-3.5 ml-2"
                alt="Twitter icon"
                src="/assets/vector.svg"
              />
            </div>
          </div>
        </header>

        {/* Wallet Section */}
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Holdings</span>
            <div className="flex items-center text-xs">
              <span className="mr-1">
                <Copy className="w-3 h-3 ml-1" />
              </span>
              <span className="text-gray-500 mr-2">6m5s...9rAF</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold mb-3">$1,516,912</h3>
            <button className="bg-gray-800 text-white text-xs px-4 py-1 rounded-xl">
              Export Wallet
            </button>
          </div>
          {/* Assets List */}
          <div className="space-y-3">
            {/* SOL */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-500 mr-2 flex items-center justify-center text-xs">
                  ≡
                </div>
                <span>1.4k Sol</span>
              </div>
              <span>$176,854</span>
            </div>

            {/* USDC */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-xs">
                  $
                </div>
                <span>1.05m USDC</span>
              </div>
              <span>$1,046,489</span>
            </div>

            {/* YZY */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-700 mr-2 flex items-center justify-center text-xs">
                  Y
                </div>
                <span>20m YZY</span>
              </div>
              <span>$240,882</span>
            </div>

            {/* DB */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-yellow-600 mr-2 flex items-center justify-center text-xs">
                  ₿
                </div>
                <span>16m DB</span>
              </div>
              <span>$22,527</span>
            </div>
          </div>
        </div>

        {/* PNL Section */}
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400">PNL</span>
            <div className="flex text-xs">
              {["Daily", "Weekly", "Monthly", "All"].map((period) => (
                <button
                  key={period}
                  className={`px-2 py-1 ${
                    timeframe === period ? "text-blue-500" : "text-white"
                  }`}
                  onClick={() => setTimeframe(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <span className="text-green-500 text-lg font-bold">
              +2,313 Sol ($428,699)
            </span>
            <button className="bg-green-400 text-black text-sm px-4 rounded-full">
              Share PNL
            </button>
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <span className="text-gray-400">Winning Trades:</span>{" "}
              <span className="text-green-500">1,829</span>
            </div>
            <div>
              <span className="text-gray-400">Losing Trades:</span>{" "}
              <span className="text-red-500">1,697</span>
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-center mb-2">
            <h3 className="font-bold">Rewards</h3>
          </div>
          <div className="mb-4">
            <span className="text-xl font-bold">55,454 Points</span>
          </div>
        </div>
        <div className="flex flex-col px-4 py-3 border-b border-gray-800">
          <div className="flex items-center h-10">
            <span>
              <HandCoins className="w-5 h-5 text-blue-400 mr-2" />
            </span>
            <span className="font-medium">Contribution</span>
          </div>
          <div className="text-gray-500 text-center w-full">COMING SOON</div>
        </div>
        {/* Quests */}
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex flex-col">
            <div className="flex items-center mb-2">
              <NotepadText className="w-5 h-5 text-blue-400 mr-2" />
              <span className="font-medium">Quests</span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-500 mr-2"></div>
                  <span>Contribute - Coming soon</span>
                </div>
                <span className="text-gray-400">+10,000 Points</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-500 mr-2"></div>
                  <span>Refer a friend</span>
                </div>
                <span className="text-gray-400">+1,000 Points</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full border border-gray-500 mr-2"></div>
                  <span>Like and RT Tweet</span>
                </div>
                <span className="text-gray-400">+1,000 Points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Referrals Section */}
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex items-center mb-3">
            <UserPen className="w-5 h-5 text-blue-400 mr-2" />
            <span className="font-medium">Referrals</span>
            <div className="ml-auto flex items-center text-xs text-gray-400">
              <span>Code: Shocked</span>
              <Link className="w-4 h-4 ml-1" />
            </div>
          </div>

          <div className="text-sm text-gray-400 mb-2">Referred total: 13</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-red-500 mr-2 flex items-center justify-center text-xs">
                  A
                </div>
                <span>Ansem</span>
              </div>
              <span className="text-xs text-gray-400">May 3rd 2025</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-500 mr-2 flex items-center justify-center text-xs">
                  P
                </div>
                <span>POE</span>
              </div>
              <span className="text-xs text-gray-400">May 1st 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
