import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import { useLogin, usePrivy, useLogout } from "@privy-io/react-auth";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  LucideIcon,
  X,
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
  LogOut,
} from "lucide-react";
import { toShortAddress } from "../../../utils/utils";
import {
  removeChannel,
  setAuthenticated,
  setChannels,
  setUnauthenticated,
} from "../../../redux/features/auth/authSlice";
import { RootState } from "../../../redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import { chattingHistory } from "../../ui/chatting";
import ProfileCard from "../../ui/profileCard";
import { showToast } from "../../ui/toastMsg";
import { ProfileMenu } from "../../ui/profile";
import { SettingModal } from "../../settingModal";
import { ProfileModal } from "../../profileModal";
import SidebarChannelList from "../../channelModal";
import config from "../../../../config/config.json";

const HomeSection = () => {
  const userdata = useSelector((state: RootState) => state.auth.user);
  console.log("userdata: ", userdata);
  const joinedChannel = useSelector(
    (state: RootState) => state.auth.user?.channels
  );
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { login } = useLogin();
  const { logout } = useLogout();

  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const server = config.server || "localhost:4000";
  const defaultChannels: Channel[] = [
    {
      id: "1",
      image: "/assets/image-11.png",
      name: "memecoin1",
      tokenAdd: "0x1D02a7E63E2f8575E76776BE7828926fADef6029",
    },
    {
      id: "2",
      image: "/assets/image-12.png",
      name: "memecoin2",
      tokenAdd: "0x8283093bf0484c1F806976EA90f79318BDB9688a",
    },
    {
      id: "3",
      image: "/assets/image-14.png",
      name: "memecoin3",
      tokenAdd: "0x12e6e01F7D56BeC3aC5bD7Fd4fC7c9154907b332",
    },
  ];

  const [userProfile, setUserProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [plusBtn, setPlusBtn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchBtn, setSearchBtn] = useState(true);
  const [msg, setMsg] = useState("");
  const [textToCopy, setTextToCopy] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenImage, setTokenImage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [token, setToken] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const [xRaid, setXRaid] = useState<boolean>(false);
  const [tweetLink, setTweetLink] = useState<string>("");
  const [joinStatus, setJoinStatus] = useState<boolean>(false);
  const [sidebarChannels, setSidebarChannels] =
    useState<Channel[]>(defaultChannels);

  const { authenticated, user, ready } = usePrivy();
  console.log(setSidebarChannels(defaultChannels));

  interface MenuItemProps {
    Icon: LucideIcon;
    text: string;
    onClick?: () => void;
  }

  useEffect(() => {
    if (!token) return;

    const newSocket = io(server, {
      auth: { token: token },
    });

    setSocket(newSocket);

    const data = {
      userId: user?.twitter?.username || "ShockedJS",
      tokenAdd: textToCopy,
      image: tokenImage,
      name: tokenName,
      symbol: "tokenSymbol",
    };
    newSocket.emit("join:room", data);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("message:received", (receivedMsg) => {
      console.log("Received new message", receivedMsg);
      setMessages((prevMessages) => [...prevMessages, receivedMsg]);
    });

    newSocket.on("user:typing", (data) => {
      console.log("typing socket: ", data);
      setTypingStatus(true);
      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      typingTimeout.current = setTimeout(() => {
        setTypingStatus(false);
      }, 1000);
    });

    newSocket.on("user:status", (data) => {
      console.log("User status: ", data);
    });

    return () => {
      // newSocket.emit("leave:room", textToCopy);
      // newSocket.off("connect");
      // newSocket.off("message:received");
      // newSocket.off("user:typing");
      // newSocket.off("user:status");
      // newSocket.disconnect();
    };
  }, [token]);

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
    const getMessage = async () => {
      const data = {
        room: textToCopy,
        limit: 50,
      };
      const res: any = await axios.post(`${server}/messages/getMessage`, data);
      setMessages(res.data);
      console.log("getting messages", res.data);
    };
    getMessage();
  }, [textToCopy]);

  useEffect(() => {
    if (!ready && !authenticated && !user) return;

    const saveUser = async () => {
      try {
        const userData = {
          userId: user?.twitter?.username || "ShockedJS",
          displayName: user?.twitter?.name || "Leon",
          wallet: user?.wallet?.address || "0x1294724982",
          avatar: user?.twitter?.profilePictureUrl || "/assets/image-5-1.png",
          channel: {
            name: tokenName,
            image: tokenImage,
            tokenAdd: textToCopy,
            symbol: "tokenSymbol",
          },
        };

        const response = await axios.post(`${server}/auth/addUser`, userData);
        console.log("response: ", response);
        setToken(response?.data?.token);
        console.log(
          "response?.data?.channels: ",
          response?.data?.user?.channels
        );
        dispatch(setAuthenticated(response?.data?.user));
      } catch (err) {
        console.log("save user error: ", err);
      }
    };
    saveUser();
    // navigate("/");
  }, [ready, authenticated, user, dispatch]);

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

  const logoutuser = async () => {
    try {
      logout();
      showToast("success", "Logged out successfully!");
      dispatch(setUnauthenticated());
      setOpenProfile(false);
    } catch (err) {
      console.log("Logout error: ", err);
    }
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
    setJoinStatus(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTyping(textToCopy);
    setMsg(e.target.value);
  };

  const handleFileChange = () => {
    setPlusBtn(false);
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

  const handleStartRaid = () => {
    setXRaid(!xRaid);
    setPlusBtn(false);
  };

  const handleJoinChannel = async () => {
    const selected = {
      id: "",
      image: "/assets/image-11.png",
      name: "memecoin1",
      tokenAdd: "0x1D02a7E63E2f8575E76776BE7828926fADef6029",
    };

    if (socket) {
      const data = {
        userId: user?.twitter?.username || "ShockedJS",
        tokenAdd: textToCopy,
        image: tokenImage,
        name: tokenName,
        symbol: "tokenSymbol",
      };
      socket.emit("join:room", data);
      console.log(`you joined ${textToCopy}`);
    }
    dispatch(setChannels(selected));
    showToast("success", "Joined channel successfully!");
    setJoinStatus(true);
  };

  const handleLeaveChannel = () => {
    if (socket) {
      socket.emit("leave:room", textToCopy);
      console.log(`you left ${textToCopy}`);
    }

    dispatch(removeChannel(textToCopy));
    setJoinStatus(false);
    showToast("success", "Left channel successfully!");
    setPlusBtn(false);
  };

  return (
    <div className="bg-transparent flex flex-row justify-center w-full border-r border-r-[#3f414e]">
      <div className="overflow-hidden w-full max-w-[500px] min-w-[500px] h-screen">
        <div className="relative w-full h-full flex">
          {/* Sidebar */}
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
                  {joinedChannel &&
                    joinedChannel.map((channel: any) => (
                      <SidebarChannelList
                        key={channel._id}
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
                  {sidebarChannels.map((channel) => (
                    <SidebarChannelList
                      key={channel.id}
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
          <div className="flex-1 flex flex-col h-full w-[437px]">
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
                      displayName={userdata?.displayName || ""}
                      username={userdata?.userId || ""}
                      avatar={userdata?.avatar || ""}
                      _id={userdata?.id || ""}
                      bio={userdata?.bio || ""}
                      wallet={userdata?.wallet || ""}
                    />
                  )}
                </div>
                <SearchIcon
                  className="w-5 h-5 text-white cursor-pointer"
                  onClick={searchButtonHandle}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
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

              {/* Chat messages container */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-scroll bg-[#191a21] p-4 w-full"
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

                  {xRaid && (
                    <div className="w-5/6 bg-transparent z-10 items-center justify-center backdrop-blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-5">
                      <div className="text-white text-center mb-2">
                        Start Twitter Raid
                      </div>
                      <button
                        aria-label="Close"
                        className="absolute top-4 right-4 text-white hover:text-gray-300"
                        onClick={() => setXRaid(false)}
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <Input
                        className="w-full self-center placeholder:text-center text-white"
                        placeholder="Enter Tweet Link"
                        onChange={(e) => setTweetLink(e.target.value)}
                        value={tweetLink}
                      />
                    </div>
                  )}

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
                <div className="space-y-4 w-full break-all">
                  {userProfile && (
                    <ProfileCard
                      name="Orangie"
                      username="orangie"
                      avatarUrl="/assets/image-26.png"
                      mutualServerCount={1}
                      promoterTag={true}
                    />
                  )}
                  {messages.map((message: any) =>
                    chattingHistory(message, () => {
                      setUserProfile(!userProfile);
                    })
                  )}
                </div>
              </div>

              {/* Message input */}
              <div className="max-w-full bg-[#191A21] p-2">
                {typingStatus && (
                  <div className="text-white bg-transparent backdrop-blur-sm ml-1">{`${userdata?.displayName} is typing...`}</div>
                )}

                <div className="relative w-full h-[45px] bg-[100%_100%] flex items-center px-3 rounded-md border border-solid border-[#22242d]">
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
                      <MenuItem
                        Icon={Play}
                        text="Start Raid"
                        onClick={handleStartRaid}
                      />
                      <MenuItem Icon={ThumbsUp} text="Top Holders" />
                      <MenuItem Icon={TicketCheck} text="Bundle Checker" />
                      <MenuItem
                        Icon={LogOut}
                        text="Leave Channel"
                        onClick={handleLeaveChannel}
                      />
                    </div>
                  )}
                  {joinStatus ? (
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
                  ) : (
                    <button
                      className="text-white flex-auto"
                      onClick={() => handleJoinChannel()}
                    >
                      Join Channel
                    </button>
                  )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
