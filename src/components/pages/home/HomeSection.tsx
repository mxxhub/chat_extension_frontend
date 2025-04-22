const sidebarChannels = [
  {
    id: 1,
    image: "/assets/image-11.png",
    name: "memecoin1",
    tokenAdd: "0xDd0892a70aB28B2B3fac1E6FAa7a4B2121dDd5e4",
  },
  {
    id: 2,
    image: "/assets/image-12.png",
    name: "memecoin2",
    tokenAdd: "0x8283093bf0484c1F806976EA90f79318BDB9688a",
  },
  {
    id: 3,
    image: "/assets/image-14.png",
    name: "memecoin3",
    tokenAdd: "0x12e6e01F7D56BeC3aC5bD7Fd4fC7c9154907b332",
  },
  {
    id: 4,
    image: "/assets/image-15.png",
    name: "memecoin4",
    tokenAdd: "0x5c5CEb764fFC6366E2d353137E69725d41856891",
  },
  {
    id: 5,
    image: "/assets/image-16.png",
    name: "memecoin5",
    tokenAdd: "0x0814A0eDE62581B4CE5C2Ae24F66358A46ea2c75",
  },
  {
    id: 6,
    image: "/assets/image-22.png",
    name: "memecoin6",
    tokenAdd: "0x190c835F37caAD3d3923f7EB8E4B4AC6a9F4721e",
  },
  {
    id: 7,
    image: "/assets/image-23.png",
    name: "memecoin7",
    tokenAdd: "0x558418c3FA620e3C6c01Cd9cFeFeA831F1E20589",
  },
  {
    id: 8,
    image: "/assets/image-17.png",
    name: "memecoin8",
    tokenAdd: "0x32CD52e43bB38197081367B11B385b10b960ECCf",
  },
  {
    id: 9,
    image: "/assets/image-18.png",
    name: "memecoin9",
    tokenAdd: "0x3E30A914c6b42f0BB620A9e22Fb57238e160D699",
  },
  {
    id: 10,
    image: "/assets/image-19.png",
    name: "memecoin10",
    tokenAdd: "0x833635A3ecd933D482423fE7C76D376381556FfC",
  },
  {
    id: 11,
    image: "/assets/image-22.png",
    name: "memecoin11",
    tokenAdd: "0xfDB120AA45c4fA586Cae67e17196Eb7a08645EC9",
  },
  {
    id: 12,
    image: "/assets/image-17.png",
    name: "memecoin12",
    tokenAdd: "0x176caBDE01214270C5cB9bfe4751F8822e6BD179",
  },
  {
    id: 13,
    image: "/assets/image-11.png",
    name: "memecoin13",
    tokenAdd: "0xC8A7383A88307527960Ce978a3708a9951DB89a0",
  },
  {
    id: 14,
    image: "/assets/image-16.png",
    name: "memecoin14",
    tokenAdd: "0xd8e9A64a1cF2E92FC6e6d7a2923eF56854190Ea8",
  },
  {
    id: 15,
    image: "/assets/image-23.png",
    name: "memecoin15",
    tokenAdd: "0xd81e99Ea9880c6F38e32D0A819D7E83C1D59E34E",
  },
  {
    id: 16,
    image: "/assets/image-11.png",
    name: "memecoin16",
    tokenAdd: "0xfACBCAd8A639F0b3ca51f7E79Fc574b7eAe19078",
  },
  {
    id: 17,
    image: "/assets/image-18.png",
    name: "memecoin17",
    tokenAdd: "0xdA2a761d25A6d7E64bB6DA19047f0d90cE8B875f",
  },
  {
    id: 18,
    image: "/assets/image-18.png",
    name: "memecoin18",
    tokenAdd: "0x92da67500F13e70694B4aD3bd9Ad8cD583f0a985",
  },
];
import { LucideIcon } from "lucide-react";
import {
  ExternalLinkIcon,
  HeartIcon,
  MenuIcon,
  MessageCircleIcon,
  RepeatIcon,
  SearchIcon,
  Smile,
  Copy,
  Check,
  CirclePlus,
  UserCircle,
  Pin,
  HandCoins,
  Play,
  ThumbsUp,
  ImagePlus,
  TicketCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLogin, usePrivy, useLogout } from "@privy-io/react-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import { chattingHistory } from "../../ui/chatting";
import { toShortAddress } from "../../../utils/utils";
import { SettingModal } from "../../settingModal";
import { ProfileMenu } from "../../ui/profile";
import { ProfileModal } from "../../profileModal";
// import FirstPage from "./FirstPage";
import ProfileCard from "../../ui/profileCard";
import { showToast } from "../../ui/toastMsg";
import SidebarChannelList from "../../channelModal";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import axios from "axios";
import { setAuthenticated } from "../../../redux/features/auth/authSlice";

import io from "socket.io-client";
// import dotenv from "dotenv";
// dotenv.config();

const HomeSection = () => {
  // const userCre = useSelector(({ state }) => auth.state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const server = process.env.SERVER || "localhost:3000";
  const server = "https://144.172.94.181:4000";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userProfile, setUserProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [plusBtn, setPlusBtn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchBtn, setSearchBtn] = useState(true);
  const [msg, setMsg] = useState("");
  const [textToCopy, setTextToCopy] = useState(
    "0xDd0892a70aB28B2B3fac1E6FAa7a4B2121dDd5e4"
  );
  const [tokenName, setTokenName] = useState("memecoin1");
  const [tokenImage, setTokenImage] = useState("/assets/image-11.png");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [token, setToken] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);

  const { login } = useLogin();
  const { logout } = useLogout();
  const { authenticated, user } = usePrivy();

  useEffect(() => {
    if (!authenticated) return;
    navigate("/");
  }, [authenticated]);

  useEffect(() => {
    if (!token) return;

    const newSocket = io("https://144.172.94.181:4000", {
      auth: { token: token },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      newSocket.emit("join:room", textToCopy);
    });

    newSocket.on("message:received", (receivedMsg) => {
      console.log("Received new message", receivedMsg);
      setMessages((prevMessages) => [...prevMessages, receivedMsg]);
    });

    newSocket.on("user:typing", (data) => {
      console.log("typing socket: ", data);
      setTypingStatus(true);
    });

    newSocket.on("uesr:status", (data) => {
      console.log("User status: ", data);
    });

    return () => {
      newSocket.emit("leave:room", textToCopy);
      newSocket.off("connect");
      newSocket.off("message:received");
      newSocket.off("user:typing");
      newSocket.off("user:status");
      newSocket.disconnect();
    };
  }, [token, textToCopy]);

  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const saveUser = async () => {
      if (!user) return;

      const userData = {
        userId: user?.twitter?.username || "ShockedJS",
        displayName: user?.twitter?.name || "Leon",
        wallet: user?.wallet?.address || "0x1294724982",
        avatar: user?.twitter?.profilePictureUrl || "/assets/image-5-1.png",
        channel: textToCopy || "",
      };

      try {
        const response = await axios.post(`${server}/auth/addUser`, userData);
        console.log("response: ", response);
        setToken(response?.data?.token);
        dispatch(setAuthenticated(response?.data?.user));
      } catch (err) {
        console.log("Error saving user: ", err);
      }
    };

    saveUser();
  }, [user]);

  useEffect(() => {
    const getMessage = async () => {
      const data = {
        room: textToCopy,
        limit: 50,
      };
      const res: any = await axios.post(`${server}/messages/getMessage`, data);
      setMessages(res.data);
    };
    getMessage();
  }, [textToCopy]);

  interface MenuItemProps {
    Icon: LucideIcon;
    text: string;
    onClick?: () => void;
  }

  const MenuItem = ({ Icon, text, onClick }: MenuItemProps) => {
    return (
      <div
        className="flex items-center px-4 py-2 text-sm text-white hover:bg-[#373b49] cursor-pointer"
        onClick={onClick}
      >
        <Icon className="mr-3 size-4" />
        <span>{text}</span>
      </div>
    );
  };

  const handleEmojiSelect = (emoji: any) => {
    setMsg((prevMsg) => prevMsg + emoji.native);
    setShowPicker(false);
  };

  const logoutuser = () => {
    try {
      logout();
      showToast("success", "Logged out successfully!");
      setOpenProfile(false);
    } catch (err) {
      console.log("Logout error: ", err);
    }
  };

  const handleFileChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".png,.jpg,.jpeg";
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        console.log("Selected file:", file);
      }
    };
    input.click();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.log("Copy failed: ", err);
    }
  };

  const searchButtonHandle = () => {
    setSearchBtn(!searchBtn);
  };

  const sendMsgHandle = (content: string, room: string) => {
    startTyping(textToCopy);
    if (!authenticated) {
      showToast("warning", "Please Login First");
      return;
    }
    const timestamp = new Date()
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toString();
    if (socket) {
      socket.emit("message:new", { content, room, timestamp });
    }
    scrollToBottom();
    setMsg("");
  };

  const plusBtnHandle = () => {
    setPlusBtn(!plusBtn);
  };

  const LoginWithTwitter = async () => {
    try {
      if (authenticated) return;

      setOpenProfile(false);

      await login();

      // if (socket) {
      //   socket.emit("join:room", textToCopy);
      //   console.log(`you joined ${textToCopy}`);
      // }
    } catch (err) {
      console.log("login error: ", err);
    }
  };

  const startTyping = (room: string) => {
    if (socket) {
      socket.emit("typing:start", room);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleProfileModalClose = () => {
    setProfileModal(false);
    setOpenProfile(false);
  };

  // const clickAvatar = () => {
  //   setUserProfile(!userProfile);
  // };

  const channelClick = (name: string, image: string, tokenAdd: string) => {
    setTokenName(name);
    setTokenImage(image);
    setTextToCopy(tokenAdd);
    setMessages([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTyping(textToCopy);
    setMsg(e.target.value);
  };

  return (
    <div className="bg-transparent flex flex-row justify-center w-full border-r border-r-[#3f414e]">
      <div className="overflow-hidden w-full max-w-[500px] min-w-[500px] h-screen">
        <div className="relative w-full h-full flex">
          {/* Sidebar */}
          <div className="h-full block md:block md:relative bg-[#22242D] border-[#22242d]">
            <div className="relative h-full">
              <div className="border-r border-r-[#3f414e] justify-items-center py-3">
                <MenuIcon
                  className="w-7 h-7 text-white cursor-pointer"
                  onClick={() => setMenu(true)}
                />
                {menu && (
                  <SettingModal isOpen={menu} onClose={() => setMenu(false)} />
                )}
              </div>
              <div className="w-[63px] h-full border-r border-r-[#3f414e] flex flex-col items-center overflow-y-scroll">
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
                  {sidebarChannels.slice(0, 3).map((channel) => (
                    <SidebarChannelList
                      channel={channel}
                      channelClick={() =>
                        channelClick(
                          channel.name,
                          channel.image,
                          channel.tokenAdd
                        )
                      }
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center">
                  <img
                    className="w-2.5 h-2.5"
                    alt="Trending"
                    src="/assets/frame-10.svg"
                  />
                  <div className="text-[#777a8c] text-[10px] ml-1">
                    Trending
                  </div>
                </div>

                {/* Trending channels */}
                <div className="mt-2 flex flex-col items-center gap-2">
                  {sidebarChannels.slice(3).map((channel) => (
                    <SidebarChannelList
                      channel={channel}
                      channelClick={() =>
                        channelClick(
                          channel.name,
                          channel.image,
                          channel.tokenAdd
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Main chat container */}
          <div className="flex-1 flex flex-col h-full">
            {/* Header */}
            <div className="h-[58px] bg-[#101114] border border-solid border-[#22242d] flex items-center px-4">
              <div className="flex items-center gap-2 overflow-x-hidden w-[230px]">
                <Avatar className="w-9 h-9">
                  <AvatarImage src={tokenImage} alt="DB" />
                  <AvatarFallback>DB</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <b className="text-white text-base font-bold">
                      {tokenName}
                    </b>
                    <b className="text-white text-[13px] font-medium">
                      {tokenName}
                    </b>
                    <Pin
                      size={12}
                      className="text-[red] fill-[red] rotate-45"
                    />
                  </div>
                  <div className="font-normal text-[#526fff] text-[13px] flex flex-row">
                    <div>{toShortAddress(textToCopy)}</div>
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1 text-white mt-[-1vh]"
                    >
                      <span>
                        {copied ? (
                          <Check size={13} className="mt-1 bg-tranparent" />
                        ) : (
                          <Copy size={13} className="mt-1 bg-tranparent" />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-4 h-4">
                    <AvatarImage src="/assets/image-5-1.png" alt="Photon" />
                  </Avatar>
                  <Avatar className="w-[23px] h-[21px]">
                    <AvatarImage src="/assets/bullx-1.png" alt="Bullx" />
                  </Avatar>
                  <Avatar className="w-3 h-3">
                    <AvatarImage
                      src="/assets/clip-path-group.png"
                      alt="axiom"
                    />
                  </Avatar>
                  <Avatar className="w-[21px] h-[21px]">
                    <AvatarImage src="/assets/image-13.png" alt="Icon" />
                  </Avatar>
                  <Avatar className="w-3 h-[13px]">
                    <AvatarImage src="/assets/layer-1.png" alt="Dexscreener" />
                  </Avatar>
                </div>
                <div className="relative group ml-2">
                  <UserCircle
                    className="w-5 h-5 text-white cursor-pointer"
                    onClick={() => setOpenProfile(!openProfile)}
                  />
                  {openProfile && (
                    <ProfileMenu
                      myProfile={() => setProfileModal(true)}
                      logout={logoutuser}
                      authenticated={authenticated}
                      login={LoginWithTwitter}
                    />
                  )}
                  {profileModal && (
                    <ProfileModal
                      isOpen={profileModal}
                      onClose={handleProfileModalClose}
                    />
                  )}
                </div>
                <SearchIcon
                  className="w-5 h-5 text-white cursor-pointer"
                  onClick={searchButtonHandle}
                />
              </div>
            </div>
            {/* {authenticated ? ( */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Banner */}
              <div className="w-full">
                <img
                  className="w-full max-h-[129px] object-cover"
                  alt="Banner"
                  src="/assets/image-1.png"
                />
              </div>

              {/* Twitter/Website tabs */}
              <div className="w-full h-[31px] bg-[#101114] border border-solid border-[#22242d] flex items-center justify-evenly">
                <div className="flex items-center">
                  <img
                    className="w-4 h-3.5"
                    alt="Twitter icon"
                    src="/assets/vector.svg"
                  />
                  <span className="ml-1 font-medium text-white text-[13px]">
                    Twitter
                  </span>
                </div>
                <Separator
                  orientation="vertical"
                  className="h-[30px] mx-4 bg-[#5B5E69]"
                />
                <div className="flex items-center">
                  <ExternalLinkIcon className="w-4 h-4 text-white" />
                  <span className="ml-1 font-medium text-white text-[13px]">
                    Website
                  </span>
                </div>
              </div>

              {/* Chat messages container with scrolling */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-scroll bg-[#191a21] p-4"
              >
                {/* Twitter Raid section */}
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <img
                      className="w-[13px] h-[11px]"
                      alt="Twitter icon"
                      src="/assets/vector.svg"
                    />
                    <span className="ml-2 font-bold text-white text-[13px]">
                      Twitter Raid
                    </span>
                  </div>

                  <Card className="w-full max-w-full bg-[#15202b] rounded-lg border-none">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src="/assets/image-28.png"
                            alt="Andy Ayrey"
                          />
                          <AvatarFallback>AA</AvatarFallback>
                        </Avatar>
                        <div className="ml-2 flex-1">
                          <div className="font-normal text-white text-[13px]">
                            Andy Ayrey
                            <img
                              className="inline-block w-3.5 h-3.5 ml-1"
                              alt="Verified"
                              src="/assets/image-10.png"
                            />
                            <br />
                            <span className="text-[#5a5d69]">@AndyAyrey</span>
                          </div>
                          <div className="mt-4 font-normal text-white text-[13px]">
                            timeline cleanse
                          </div>
                        </div>
                        <img
                          className="w-[137px] h-[126px] ml-auto"
                          alt="Tweet image"
                          src="/assets/image-27.png"
                        />
                      </div>

                      {/* Tweet engagement metrics */}
                      <div className="flex items-center justify-evenly mt-8">
                        <div className="flex items-center">
                          <HeartIcon className="w-4 h-4 text-[red] fill-[red]" />
                          <span className="ml-2 font-normal text-white text-[13px]">
                            597
                          </span>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="h-[23px] bg-[#5B5E69]"
                        />
                        <div className="flex items-center">
                          <MessageCircleIcon className="w-4 h-3.5 text-white" />
                          <span className="ml-2 font-normal text-white text-[13px]">
                            64
                          </span>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="h-[23px] bg-[#5B5E69]"
                        />
                        <div className="flex items-center">
                          <RepeatIcon className="w-4 h-3.5 text-white" />
                          <span className="ml-2 font-normal text-white text-[13px]">
                            199
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                {/* Chat messages */}
                <div className="space-y-4">
                  {userProfile && (
                    <ProfileCard
                      name="Orangie"
                      username="orangie"
                      avatarUrl="/assets/image-26.png"
                      mutualServerCount={1}
                      promoterTag={true}
                    />
                  )}
                  {messages.map((message) =>
                    chattingHistory(message, () => {
                      setUserProfile(!userProfile);
                    })
                  )}
                </div>
              </div>

              {/* Message input */}
              <div className="max-w-full bg-[#22242D] p-2">
                {typingStatus && (
                  <div className="text-white">Andy is typing...</div>
                )}

                <div className="relative w-full h-[45px] bg-[100%_100%] flex items-center px-3 rounded-md">
                  <CirclePlus
                    className="w-5 h-5 text-[#777a8c] cursor-pointer"
                    onClick={plusBtnHandle}
                  />
                  {plusBtn && (
                    <div className="absolute bottom-full mb-2 left-0 w-48 bg-[#22242D] rounded-md shadow-lg py-1 z-50">
                      <MenuItem
                        Icon={ImagePlus}
                        text="Add Image"
                        onClick={handleFileChange}
                      />
                      <MenuItem Icon={Play} text="Start Raid" />
                      <MenuItem Icon={ThumbsUp} text="Top Holders" />
                      <MenuItem Icon={TicketCheck} text="Bundle Checker" />
                    </div>
                  )}
                  <Input
                    className="border-none bg-transparent text-[#dbd6d6] text-sm h-full focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Write a message..."
                    value={msg}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMsgHandle(msg, textToCopy);
                      }
                    }}
                  />
                  <div className="flex items-center gap-2 ml-auto">
                    <HandCoins className="w-5 h-5 text-[green] hidden sm:block cursor-pointer" />
                    <Smile
                      className="w-[18px] h-[18px] text-[#777a8c] cursor-pointer"
                      onClick={() => setShowPicker((prev) => !prev)}
                    />
                    {showPicker && (
                      <div
                        ref={popupRef}
                        className="absolute z-20 right-9 bottom-5 w-30"
                      >
                        <Picker
                          data={data}
                          onEmojiSelect={handleEmojiSelect}
                          theme="dark"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* ) : (
              <FirstPage />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
