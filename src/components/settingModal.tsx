import { useEffect, useRef, useState } from "react";
import {
  Settings,
  Copy,
  HandCoins,
  Link,
  UserPen,
  NotepadText,
  X,
  Check,
} from "lucide-react";
import "../index.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ProfileModal } from "./profileModal";
import { toShortAddress } from "../utils/utils";

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  color: Colors;
}

const SettingModal = ({ isOpen, onClose, color }: SettingModalProps) => {
  const userdata = useSelector((state: RootState) => state.auth.user);
  const mainRef = useRef<HTMLDivElement>(null);
  const [timeframe, setTimeframe] = useState("Daily");
  const [profileModal, setProfileModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mainRef.current && !mainRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleProfileModalClose = () => {
    setProfileModal(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userdata?.wallet || "");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log("Copy failed: ", err);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          color.chatBackground
        } ${isOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
      ></div>
      <div
        ref={mainRef}
        className={`fixed left-0 top-0 flex flex-col h-full ${
          color.chatBackground
        } text-white w-full xs:w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 overflow-y-auto z-50 transform transition-all duration-300 opacity-0 ${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        {/* Header */}
        <header
          className={`w-full ${color.chatBackground} border-yellow-500 relative`}
        >
          <button
            className="absolute top-4 left-4 z-10"
            onClick={onClose}
            title="Close"
          >
            <X className="w-5 h-5 text-white z-10" />
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
              src={userdata?.avatar || ""}
              alt="avatar"
              className="absolute w-16 h-16 sm:w-18 sm:h-18 rounded-full border-none -top-10 sm:-top-12 left-4 sm:left-6"
            />
          </div>
          <div className="flex flex-col px-3 sm:px-4 py-2 sm:py-3 mt-2 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg sm:text-xl">
                {userdata?.displayName}
              </span>
              <span>
                <Settings
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-pointer ml-auto"
                  onClick={() => setProfileModal(true)}
                />

                {profileModal && (
                  <ProfileModal
                    isOpen={profileModal}
                    onClose={handleProfileModalClose}
                    _id={userdata?._id || ""}
                    displayName={userdata?.displayName || ""}
                    username={userdata?.userId || ""}
                    avatar={userdata?.avatar || ""}
                    bio={userdata?.bio || ""}
                    wallet={userdata?.wallet || ""}
                  />
                )}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-sm sm:text-base">{userdata?.userId}</span>
              <a href={`https://x.com/${userdata?.userId}`}>
                <img
                  className="w-3 h-3 sm:w-4 sm:h-3.5 ml-2 cursor-pointer"
                  alt="Twitter icon"
                  src="/assets/vector.svg"
                />
              </a>
            </div>
          </div>
        </header>

        {/* Wallet Section */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-800">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="text-gray-400 text-sm sm:text-base">Holdings</span>
            <div className="flex items-center text-xs">
              <span className="mr-1">
                <button
                  onClick={handleCopy}
                  className="w-3 h-3 ml-1 text-white"
                >
                  <span>
                    {copied ? (
                      <Check size={13} className="mr-2 bg-transparent" />
                    ) : (
                      <Copy size={13} className="mr-2 bg-transparent" />
                    )}
                  </span>
                </button>
              </span>
              <span className="text-gray-500 mr-2 text-xs sm:text-xs">
                {toShortAddress(userdata?.wallet || "")}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
              $1,516,912
            </h3>
            <button className="bg-gray-800 text-white text-xs px-3 sm:px-4 py-1 rounded-xl">
              Export Wallet
            </button>
          </div>
          {/* Assets List */}
          <div className="space-y-2 sm:space-y-3">
            {/* SOL */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-500 mr-2 flex items-center justify-center text-xs">
                  ≡
                </div>
                <span className="text-sm sm:text-base">1.4k Sol</span>
              </div>
              <span className="text-sm sm:text-base">$176,854</span>
            </div>

            {/* USDC */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-xs">
                  $
                </div>
                <span className="text-sm sm:text-base">1.05m USDC</span>
              </div>
              <span className="text-sm sm:text-base">$1,046,489</span>
            </div>

            {/* YZY */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-700 mr-2 flex items-center justify-center text-xs">
                  Y
                </div>
                <span className="text-sm sm:text-base">20m YZY</span>
              </div>
              <span className="text-sm sm:text-base">$240,882</span>
            </div>

            {/* DB */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-600 mr-2 flex items-center justify-center text-xs">
                  ₿
                </div>
                <span className="text-sm sm:text-base">16m DB</span>
              </div>
              <span className="text-sm sm:text-base">$22,527</span>
            </div>
          </div>
        </div>

        {/* PNL Section */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-800">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <span className="text-gray-400 text-sm sm:text-base">PNL</span>
            <div className="flex text-xs overflow-x-auto">
              {["Daily", "Weekly", "Monthly", "All"].map((period) => (
                <button
                  key={period}
                  className={`px-1 sm:px-2 py-1 ${
                    timeframe === period
                      ? `${color.highlightsColor}`
                      : "text-white"
                  } text-xs sm:text-sm whitespace-nowrap`}
                  onClick={() => setTimeframe(period)}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-2 sm:mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-green-500 text-base sm:text-lg font-bold mb-2 sm:mb-0">
              +2,313 Sol ($428,699)
            </span>
            <button className="bg-green-400 text-black text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full w-fit">
              Share PNL
            </button>
          </div>

          <div className="flex justify-between text-xs sm:text-sm">
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
        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-800">
          <div className="flex items-center mb-1 sm:mb-2">
            <h3 className="font-bold text-sm sm:text-base">Rewards</h3>
          </div>
          <div className="mb-2 sm:mb-4">
            <span className="text-lg sm:text-xl font-bold">55,454 Points</span>
          </div>
        </div>
        <div className="p-4 border-b border-gray-800">
          <div
            className={`flex flex-col px-3 sm:px-4 py-2 sm:py-3 ${color.settingsColor} rounded-md`}
          >
            <div className="flex items-center h-8 sm:h-10">
              <span>
                <HandCoins
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${color.highlightsColor} mr-2`}
                />
              </span>
              <span className="font-medium text-sm sm:text-base">
                Contribution
              </span>
            </div>
            <div className="text-gray-500 text-center w-full text-sm sm:text-base">
              COMING SOON
            </div>
          </div>
        </div>
        {/* Quests */}
        <div className="p-4 border-b border-gray-800">
          <div
            className={`px-3 sm:px-4 py-2 sm:py-3 ${color.settingsColor} rounded-md`}
          >
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <NotepadText
                  className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 ${color.highlightsColor}`}
                />
                <span className="font-medium text-sm sm:text-base">Quests</span>
              </div>

              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-500 mr-2"></div>
                    <span>Contribute - Coming soon</span>
                  </div>
                  <span className="text-gray-400">+10,000 Points</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-500 mr-2"></div>
                    <span>Refer a friend</span>
                  </div>
                  <span className="text-gray-400">+1,000 Points</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-500 mr-2"></div>
                    <span>Like and RT Tweet</span>
                  </div>
                  <span className="text-gray-400">+1,000 Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referrals Section */}
        <div className="p-4 border-b border-gray-800">
          <div
            className={`px-3 sm:px-4 py-2 sm:py-3 ${color.settingsColor} rounded-md`}
          >
            <div className="flex items-center mb-2 sm:mb-3">
              <UserPen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2" />
              <span className="font-medium text-sm sm:text-base">
                Referrals
              </span>
              <div className="ml-auto flex items-center text-xs text-gray-400">
                <span className="text-xs">Code: Shocked</span>
                <Link className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </div>
            </div>

            <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
              Referred total: 13
            </div>

            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-500 mr-2 flex items-center justify-center text-xs">
                    A
                  </div>
                  <span className="text-sm sm:text-base">Ansem</span>
                </div>
                <span className="text-xs text-gray-400">May 3rd 2025</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 mr-2 flex items-center justify-center text-xs">
                    P
                  </div>
                  <span className="text-sm sm:text-base">POE</span>
                </div>
                <span className="text-xs text-gray-400">May 1st 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingModal;
