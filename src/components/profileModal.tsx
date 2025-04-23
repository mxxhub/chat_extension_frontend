import { useState } from "react";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  X,
  Edit,
  MapPin,
  Calendar,
  Globe,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { Avatar } from "./ui/avatar";

interface SignupModalProps {
  isOpen: boolean;
  displayName: string;
  username: string;
  avatar: string;
  onClose: () => void;
}

export const ProfileModal = ({
  isOpen,
  onClose,
  displayName,
  username,
  avatar,
}: SignupModalProps) => {
  if (!isOpen) return null;
  const [isEditing, setIsEditing] = useState(false);
  const [display, setDisplay] = useState<string>(displayName);
  const [uname, setUname] = useState<string>(username);
  const [image, setImage] = useState<string>(avatar);
  const [bio, setBio] = useState<string>("");
  const [walletAdd, setWalletAdd] = useState<string>("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden w-full max-w-sm transform transition-all duration-300 ease-in-out animate-modal-in border border-gray-700">
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-800">
          <button
            // onClick={closeModal}
            className="absolute top-4 right-4 p-1 rounded-full bg-black/30 text-white hover:bg-black/40 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={18} onClick={onClose} />
          </button>

          <button
            // onClick={() => setIsEditing(true)}
            className="absolute top-4 right-14 p-1 rounded-full bg-black/30 text-white hover:bg-black/40 transition-colors duration-200"
            aria-label="Edit profile"
          >
            <Edit size={18} onClick={() => setIsEditing(!isEditing)} />
          </button>
          {/* )} */}
        </div>

        <div className="relative px-6 pb-6">
          <div className="absolute -top-14 left-7">
            <Avatar className="w-24 h-24">
              <AvatarImage src={avatar} alt="Andy Ayrey" />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="px-6 pt-6 pb-8">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  name="name"
                  value={display}
                  onChange={(e) => setDisplay(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  name="username"
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Wallet Address
                </label>
                <input
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  name="wallet"
                  value={walletAdd}
                  onChange={(e) => setWalletAdd(e.target.value)}
                />
              </div>

              <div className="pt-4 flex space-x-3">
                <Button
                  className="bg-[#f21d1d] hover:bg-[#c43131] text-white w-full"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button className="bg-[#1DA1F2] hover:bg-[#0d8ddf] text-white w-full">
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-1 mb-6">
                <h2 className="text-2xl font-bold text-white">{displayName}</h2>
                <p className="text-blue-400">{username}</p>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-gray-300 leading-relaxed">
                  Passionate about decoding market trends and crafting strategic
                  trades that capitalize on volatility. Always analyzing,
                  adapting, and refining my edge in global markets.
                </p>

                <div className="flex items-center text-gray-300">
                  <MapPin size={18} className="mr-2" />
                  <span>Canada</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Calendar size={18} className="mr-2" />
                  <span>Joined January 2022</span>
                </div>

                <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  <Globe size={18} className="mr-2" />
                  <a className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                    <span className="mr-2">
                      <X />
                    </span>
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
