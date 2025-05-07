import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { X, Edit, MapPin, Calendar, Twitter } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { showToast } from "./ui/toastMsg";
import axios from "axios";
import { setUser } from "../redux/features/auth/authSlice";
import config from "../../config/config.json";

interface SignupModalProps {
  isOpen: boolean;
  displayName: string;
  username: string;
  avatar: string;
  _id: string;
  bio: string;
  wallet: string;
  onClose: () => void;
}

export const ProfileModal = ({
  isOpen,
  onClose,
  _id,
  displayName,
  username,
  avatar,
  bio,
  wallet,
}: SignupModalProps) => {
  if (!isOpen) return null;
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [display, setDisplay] = useState<string>(displayName);
  const [biodata, setBiodata] = useState<string>(bio || "");
  const [walletAdd, setWalletAdd] = useState<string>(wallet || "");
  const [image, setImage] = useState<string>(avatar || "");
  const [userId, setUserId] = useState<string>(username || "");
  const server = config.server || "localhost:4000";
  const modalRef = useRef<HTMLDivElement>(null);
  console.log(setImage, setUserId);
  const handleSave = async () => {
    try {
      const response = await axios.post(`${server}/auth/updateUser`, {
        _id: _id,
        userId: username,
        displayName: display,
        wallet: walletAdd,
        bio: biodata,
      });
      console.log("userdata updated: ", response);
      showToast("success", "User data updated successfully");
      setIsEditing(false);
      console.log("userdata updated: ", response.data.user);
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden w-full max-w-sm transform transition-all duration-300 ease-in-out animate-modal-in border border-gray-700">
        <div className="relative h-32 bg-gradient-to-r">
          <div className="relative w-full">
            <img
              src="/assets/settings_header.png"
              alt="settings-profile"
              className="w-full h-full"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute z-100 top-4 right-4 p-1 rounded-full bg-black/30 text-white hover:bg-black/40 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute z-100 top-4 right-14 p-1 rounded-full bg-black/30 text-white hover:bg-black/40 transition-colors duration-200"
            aria-label="Edit profile"
          >
            <Edit size={18} />
          </button>
        </div>

        <div className="relative px-6 pb-6">
          <div className="absolute -top-14 left-7">
            <Avatar className="w-24 h-24">
              <AvatarImage src={image} alt={display} />
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
                  placeholder="Enter your name"
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
                  placeholder="Enter your username"
                  disabled={true}
                  value={username}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={biodata}
                  onChange={(e) => setBiodata(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your bio"
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
                  placeholder="Enter your wallet address"
                  disabled={true}
                />
              </div>

              <div className="pt-4 flex space-x-3">
                <Button
                  className="bg-[#f21d1d] hover:bg-[#c43131] text-white w-full"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#1DA1F2] hover:bg-[#0d8ddf] text-white w-full"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-1 mb-6">
                <h2 className="text-2xl font-bold text-white">{display}</h2>
                <p className="text-blue-400">{userId}</p>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-gray-300 leading-relaxed">{biodata}</p>

                <div className="flex items-center text-gray-300">
                  <MapPin size={18} className="mr-2" />
                  <span>Canada</span>
                </div>

                <div className="flex items-center text-gray-300">
                  <Calendar size={18} className="mr-2" />
                  <span>Joined January 2022</span>
                </div>

                <div className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200">
                  <a className="flex items-center text-gray-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                    <span className="mr-2">
                      <Twitter size={18} />
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
