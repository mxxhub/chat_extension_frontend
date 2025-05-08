import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
// import { usePrivy } from "@privy-io/react-auth";
import { useLogin, usePrivy, useLogout } from "@privy-io/react-auth";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  LucideIcon,
  // X,
  ExternalLinkIcon,
  // HeartIcon,
  MenuIcon,
  // MessageCircleIcon,
  // RepeatIcon,
  SearchIcon,
  Smile,
  Copy,
  Check,
  CirclePlus,
  // UserCircle,
  Pin,
  HandCoins,
  Play,
  // ThumbsUp,
  ImagePlus,
  // TicketCheck,
  LogOut,
  EllipsisVertical,
} from "lucide-react";
import {
  formatMarketCap,
  getCurrentTabUrl,
  toShortAddress,
} from "../../../utils/utils";
import {
  removeChannel,
  setAuthenticated,
  setChannels,
  setUnauthenticated,
} from "../../../redux/features/auth/authSlice";
import { RootState } from "../../../redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
// import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import { ChattingHistory } from "../../ui/chatting";
import ProfileCard from "../../ui/profileCard";
import { showToast } from "../../ui/toastMsg";
import SettingModal from "../../settingModal";
import SidebarChannelList from "../../channelModal";
import config from "../../../../config/config.json";
import {
  addMessage,
  setMessages,
  updateMessage,
} from "../../../redux/features/message/messageSlice";
import SearchModal from "../../searchModal";
import ProfileMenu from "../../ui/profile";

const HomeSection = () => {
  const userdata = useSelector((state: RootState) => state.auth.user);
  const messages = useSelector((state: RootState) => state.message.messages);
  console.log("userdata: ", userdata);
  console.log("messages: ", messages);
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

  const [userProfile, setUserProfile] = useState(false);
  const [menu, setMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [plusBtn, setPlusBtn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState("");
  const [textToCopy, setTextToCopy] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenImage, setTokenImage] = useState("");
  const [banner, setBanner] = useState("");
  const [marketCap, setMarketCap] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  // const [messages, setMessages] = useState<Message[]>([]);
  const [typingStatus, setTypingStatus] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [token, setToken] = useState<string>("");
  const [socket, setSocket] = useState<any>(null);
  const [xRaid, setXRaid] = useState<boolean>(false);
  // const [tweetLink, setTweetLink] = useState<string>("");
  const [joinStatus, setJoinStatus] = useState<boolean>(false);
  const [sidebarChannels, setSidebarChannels] = useState<Channel[]>([]);
  const [chainId, setChainId] = useState<string>("ethereum");
  console.log(chainId);
  const [editState, setEditState] = useState<boolean>(false);
  const [editedMessage, setEditedMessage] = useState<Message | null>(null);
  const [color, setColor] = useState<Colors>({
    chatBackground: "bg-[#15171A]",
    mainColor: "bg-[#0D0D10]",
    outlineColor: "border-[#1E2025]",
    buttonColor: "text-[#98989B]",
    highlightsColor: "text-[#459C6E]",
    settingsColor: "bg-[#1E1E21]",
  });
  const [searchModal, setSearchModal] = useState(false);

  const { authenticated, user, ready } = usePrivy();

  interface MenuItemProps {
    Icon: LucideIcon;
    text: string;
    onClick?: () => void;
  }

  console.log("token: ", token);
  useEffect(() => {
    if (!token) return;
    console.log("server: ", server);

    const newSocket = io(server, {
      auth: { token: token },
    });

    setSocket(newSocket);

    const data = {
      userId: user?.twitter?.username || "ShockedJS",
      tokenAdd: textToCopy,
      image: tokenImage,
      name: tokenName,
      symbol: tokenSymbol,
    };
    newSocket.emit("join:room", data);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("message:received", (receivedMsg) => {
      dispatch(addMessage(receivedMsg));
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
        setPlusBtn(false);
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
      dispatch(setMessages(res.data));
      console.log("getting messages", res.data);
    };
    getMessage();
  }, [textToCopy, authenticated]);

  useEffect(() => {
    const exists = joinedChannel?.find((each) => each.tokenAdd === textToCopy);
    if (!exists) return;
    if (socket) {
      socket.emit("join:room", textToCopy);
      console.log(`you joined ${textToCopy}`);
    }
  }, [socket, tokenName, tokenImage, tokenSymbol]);

  useEffect(() => {
    // if (!ready && !authenticated && !user) return;

    const saveUser = async () => {
      try {
        const userData = {
          userId: user?.twitter?.username || "ShockedJS",
          displayName: user?.twitter?.name || "Leon",
          wallet: user?.wallet?.address || "0x1294724982",
          avatar: user?.twitter?.profilePictureUrl || "/assets/image-5-1.png",
          channel: {
            chainId: chainId,
            name: tokenName,
            symbol: tokenSymbol,
            tokenAdd: textToCopy,
            image: tokenImage,
            banner: banner,
            twitter: twitter,
            website: website,
            marketCap: marketCap,
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

  const fetchTokenInfo = async () => {
    try {
      const tokenInfo = await getCurrentTabUrl();

      if (!tokenInfo) return;

      await setTokenImage(tokenInfo.image);
      await setTokenName(tokenInfo.name);
      await setTokenSymbol(tokenInfo.symbol);
      await setChainId(tokenInfo.chainId);
      await setTextToCopy(tokenInfo.address);
      await setBanner(tokenInfo.banner);
      await setMarketCap(tokenInfo.marketCap);
      await setTwitter(tokenInfo.twitter);
      await setWebsite(tokenInfo.website);

      const newChannel: Channel = {
        id: sidebarChannels.length + 1,
        chainId: tokenInfo.chainId,
        image: tokenInfo.image,
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        tokenAdd: tokenInfo.address,
        banner: tokenInfo.banner,
        twitter: tokenInfo.twitter,
        website: tokenInfo.website,
        marketCap: tokenInfo.marketCap,
      };

      setSidebarChannels((prev) => {
        const exists = prev.some(
          (channel) => channel.tokenAdd === tokenInfo.address
        );
        if (exists) return prev;
        return [...prev, newChannel];
      });
    } catch (error) {
      console.error("Error fetching token info:", error);
    }
  };

  useEffect(() => {
    fetchTokenInfo();

    const handleTabUrlChange = (message: any) => {
      if (message.type === "TAB_URL_UPDATED") {
        console.log("URL changed to:", message.url);
        fetchTokenInfo();
      }
    };

    chrome.runtime.onMessage.addListener(handleTabUrlChange);

    return () => {
      chrome.runtime.onMessage.removeListener(handleTabUrlChange);
    };
  }, []);

  const LoginWithTwitter = async () => {
    try {
      if (authenticated) return;

      setOpenProfile(false);
      await login();
    } catch (err) {
      console.log("login error: ", err);
    }
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
    setSearchModal(!searchModal);
  };

  const sendMsgHandle = async (content: string, room: string) => {
    // if (!authenticated) {
    //   showToast("warning", "Please Login First");
    //   return;
    // }
    const timestamp = new Date()
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toString();

    if (!editState && socket) {
      console.log("sending message");
      socket.emit("message:new", { content, room, timestamp });
    }
    scrollToBottom();
    setMsg("");
  };

  const plusBtnHandle = () => {
    if (!joinStatus) return;
    setPlusBtn(!plusBtn);
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

  // const clickAvatar = () => {
  //   setUserProfile(!userProfile);
  // };

  const channelClick = (
    chainId: string,
    name: string,
    symbol: string,
    tokenAdd: string,
    image: string,
    channelBanner: string,
    twitter: string,
    website: string,
    marketCap: string
  ) => {
    // if (!authenticated) {
    //   showToast("warning", "Please Login First");
    //   return;
    // }
    setChainId(chainId);
    setTokenName(name);
    setTokenSymbol(symbol);
    setTextToCopy(tokenAdd);
    setTokenImage(image);
    setBanner(channelBanner);
    setTwitter(twitter);
    setWebsite(website);
    setMarketCap(marketCap);
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
    console.log("starting raid");
    setXRaid(!xRaid);
    setPlusBtn(false);
  };

  const handleJoinChannel = async () => {
    // if (!authenticated) {
    //   showToast("warning", "Please Login First");
    //   return;
    // }
    const selected = sidebarChannels.find(
      (channel) => channel.tokenAdd == textToCopy
    );
    if (!selected) return;
    console.log(selected);
    // const selected: Channel = {
    //   id: "",
    //   chainId: "ethereum",
    //   image: "/assets/image-11.png",
    //   name: "memecoin1",
    //   symbol: "memecoin1",
    //   tokenAdd: "0x1D02a7E63E2f8575E76776BE7828926fADef6029",
    //   banner: "",
    //   twitter: "",
    //   website: "",
    //   marketCap: "",
    // };

    if (socket) {
      const data = {
        chainId: selected.chainId,
        name: selected.name,
        symbol: selected.symbol,
        tokenAdd: selected.tokenAdd,
        image: selected.image,
        banner: selected.banner || "",
        twitter: selected.twitter || "",
        website: selected.website || "",
        marketCap: selected.marketCap || "",
      };
      socket.emit("join:room", data);
      console.log(`you joined ${textToCopy}`);
    }
    dispatch(setChannels(selected));
    const filteredChannels = sidebarChannels.filter(
      (channel) => channel.tokenAdd !== textToCopy
    );
    setSidebarChannels(filteredChannels);
    showToast("success", "Joined channel successfully!");
    setJoinStatus(true);
  };

  const handleLeaveChannel = () => {
    if (socket) {
      socket.emit("leave:room", textToCopy);
      console.log(`you left ${textToCopy}`);
    }

    dispatch(removeChannel(textToCopy));
    showToast("success", "Left channel successfully!");
    setPlusBtn(false);
  };

  const editMessage = async (message: Message) => {
    console.log("editing message");
    setMsg(message.content);
    setEditedMessage(message);
    setEditState(true);
  };

  const handleEditMessage = async (message: Message) => {
    console.log("editing message", message);
    const editedMessage = await axios.post(`${server}/messages/editMessage`, {
      id: message._id,
      content: msg,
    });
    dispatch(updateMessage(editedMessage.data));
    setEditState(false);
    setMsg("");
    showToast("success", "Message updated successfully!");
  };

  return (
    <div
      className={`relative bg-transparent flex flex-row justify-center w-full`}
    >
      <SettingModal
        isOpen={menu}
        onClose={() => setMenu(false)}
        color={color}
      />

      <div className="overflow-hidden w-full min-w-0 sm:min-w-[500px] h-screen">
        <div className="relative w-full h-full flex">
          {/* Sidebar */}
          <div
            className={`h-full sm:block md:block md:relative ${color.mainColor} ${color.outlineColor}`}
          >
            <div className="relative h-full w-[63px]">
              <div className="border-r border-r-[#3f414e] justify-items-center py-3">
                <MenuIcon
                  className="w-7 h-7 text-white cursor-pointer"
                  onClick={() => setMenu(true)}
                />
              </div>
              <div className="h-full border-r border-r-[#3f414e] flex flex-col items-center">
                <div className="mt-4 relative">
                  <div className="text-[#777a8c] text-[10px] ml-4">Joined</div>
                  <img
                    className="w-[9px] h-[9px] absolute top-1 left-[3px]"
                    alt="Pin"
                    src="/assets/vector-5.svg"
                  />
                </div>

                {/* Pinned channels */}
                <div className="mt-2 flex flex-col items-center gap-2 max-h-[180px] overflow-y-scroll">
                  {joinedChannel &&
                    joinedChannel.map((channel: any) => (
                      <SidebarChannelList
                        key={channel._id}
                        channel={channel}
                        channelClick={() => {
                          channelClick(
                            channel.chainId,
                            channel.name,
                            channel.symbol,
                            channel.tokenAdd,
                            channel.image,
                            channel.banner,
                            channel.twitter || "",
                            channel.website || "",
                            channel.marketCap || ""
                          );
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
                  <div className="text-[#777a8c] text-[10px] ml-1">
                    Trending
                  </div>
                </div>

                {/* Trending channels */}
                <div className="mt-2 flex flex-col items-center gap-2 overflow-y-scroll">
                  {sidebarChannels.map((channel: Channel) => (
                    <SidebarChannelList
                      key={channel.id}
                      channel={channel}
                      channelClick={() => {
                        channelClick(
                          channel.chainId,
                          channel.name,
                          channel.symbol,
                          channel.tokenAdd,
                          channel.image,
                          channel.banner,
                          channel.twitter || "",
                          channel.website || "",
                          channel.marketCap || ""
                        );
                        setJoinStatus(false);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Main chat container */}
          <div className="flex-1 flex flex-col h-full w-full max-w-full">
            {/* Header */}
            <div
              className={`flex items-center justify-between h-[58px] ${color.mainColor} ${color.outlineColor}] px-4`}
            >
              <div className="flex items-center gap-1 overflow-x-hidden">
                <Avatar className="w-7 h-7 mr-3">
                  <AvatarImage src={tokenImage} alt="DB" />
                  <AvatarFallback>{tokenSymbol}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center space-x-1">
                    <b className="text-white text-sm font-bold truncate max-w-[100px]">
                      {tokenName}
                    </b>
                    <b className="text-white text-xs font-medium">
                      {tokenSymbol}
                    </b>
                    <Pin
                      size={12}
                      className="text-[red] fill-[red] rotate-45"
                    />
                  </div>
                  <div
                    className={`font-normal ${color.highlightsColor} text-xs flex flex-row items-center`}
                  >
                    <div className="truncate max-w-[62px] w-[62px]">
                      {toShortAddress(textToCopy)}
                    </div>
                    <button onClick={handleCopy} className="text-white">
                      <span>
                        {copied ? (
                          <Check size={13} className="mr-1 bg-transparent" />
                        ) : (
                          <Copy size={13} className="mr-1 bg-transparent" />
                        )}
                      </span>
                    </button>
                    <div className="flex items-center gap-1 ml-1 overflow-x-auto">
                      {/* <a
                        href="https://photon-sol.tinyastro.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                      > */}
                      <Avatar
                        className="w-3 h-3"
                        onClick={() =>
                          setColor({
                            chatBackground: "bg-[#26272F]",
                            mainColor: "bg-[#22232C]",
                            outlineColor: "border-[#31323B]",
                            buttonColor: "text-[#B5B7DA]",
                            highlightsColor: "text-[#8E9DFF]",
                            settingsColor: "bg-[#2D2F37]",
                          })
                        }
                      >
                        <AvatarImage src="/assets/image-5-1.png" alt="Photon" />
                      </Avatar>
                      {/* </a>
                      <a
                        href="https://axiom.trade/"
                        target="_blank"
                        rel="noopener noreferrer"
                      > */}
                      <Avatar
                        className="w-3 h-3"
                        onClick={() =>
                          setColor({
                            chatBackground: "bg-[#141519]",
                            mainColor: "bg-[#101114]",
                            outlineColor: "border-[#22242D]",
                            buttonColor: "text-[#777A8C]",
                            highlightsColor: "text-[#526FFF]",
                            settingsColor: "bg-[#191A21]",
                          })
                        }
                      >
                        <AvatarImage
                          src="/assets/clip-path-group.png"
                          alt="axiom"
                        />
                      </Avatar>
                      {/* </a>
                      <a
                        href="https://neo.bullx.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                      > */}
                      <Avatar
                        className="w-[23px] h-[21px]"
                        onClick={() =>
                          setColor({
                            chatBackground: "bg-[#15171A]",
                            mainColor: "bg-[#0D0D10]",
                            outlineColor: "border-[#1E2025]",
                            buttonColor: "text-[#98989B]",
                            highlightsColor: "text-[#459C6E]",
                            settingsColor: "bg-[#1E1E21]",
                          })
                        }
                      >
                        <AvatarImage src="/assets/bullx-1.png" alt="Bullx" />
                      </Avatar>
                      {/* </a>
                      <a
                        href={`https://dexscreener.com/${chainId}/${textToCopy}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      > */}
                      <Avatar className="w-3 h-[13px]">
                        <AvatarImage
                          src="/assets/layer-1.png"
                          alt="Dexscreener"
                        />
                      </Avatar>
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center flex-col ml-6 text-center">
                <span className="text-gray-500 text-xs">Mkt Cap</span>
                <span className={`${color.highlightsColor} text-sm`}>
                  {formatMarketCap(Number(marketCap))}
                </span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <SearchIcon
                  className={`w-5 h-5 ${color.buttonColor} cursor-pointer`}
                  onClick={searchButtonHandle}
                />
                <div className="relative group">
                  <EllipsisVertical
                    className="text-white cursor-pointer w-5 h-5"
                    onClick={() => setOpenProfile(!openProfile)}
                  />
                  {openProfile && (
                    <ProfileMenu
                      logout={logoutuser}
                      authenticated={authenticated}
                      login={LoginWithTwitter}
                      setVisibility={() => setOpenProfile(false)}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              {/* Banner */}
              <div className="w-full">
                <img
                  // className="w-full max-h-[80px] sm:max-h-[129px] object-cover"
                  className="w-full object-cover max-h-[200px]"
                  alt="Banner"
                  src={banner}
                />
              </div>

              {/* Twitter/Website tabs */}
              <div
                className={`w-full h-[31px] ${color.mainColor} flex items-center justify-evenly`}
              >
                {twitter && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={twitter}
                    className="flex items-center"
                  >
                    <img
                      className="w-3 h-3 sm:w-4 sm:h-3.5"
                      alt="Twitter icon"
                      src="/assets/vector.svg"
                    />
                    <span className="ml-1 font-medium text-white text-xs sm:text-[13px]">
                      Twitter
                    </span>
                  </a>
                )}
                {website && twitter && (
                  <Separator
                    orientation="vertical"
                    className="h-[30px] bg-[#5B5E69]"
                  />
                )}
                {website && (
                  <>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={website}
                      className="flex items-center"
                    >
                      <ExternalLinkIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      <span className="ml-1 font-medium text-white text-xs sm:text-[13px]">
                        Website
                      </span>
                    </a>
                  </>
                )}
              </div>

              {/* Chat messages container */}
              <div
                ref={scrollRef}
                className={`flex-1 overflow-y-auto ${color.chatBackground} p-2 sm:p-4 w-full`}
              >
                {/* Twitter Raid section */}
                {/* <div className="mt-2 sm:mt-4">
                  <div className="flex items-center mb-2">
                    <img
                      className="w-[11px] h-[9px] sm:w-[13px] sm:h-[11px]"
                      alt="Twitter icon"
                      src="/assets/vector.svg"
                    />
                    <span className="ml-2 font-bold text-white text-xs sm:text-[13px]">
                      Twitter Raid
                    </span>
                  </div>

                  {xRaid && (
                    <div className="w-5/6 bg-transparent z-10 items-center justify-center backdrop-blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-3 sm:p-5">
                      <div className="text-white text-center mb-2">
                        Start Twitter Raid
                      </div>
                      <button
                        aria-label="Close"
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300"
                        onClick={() => setXRaid(false)}
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <Input
                        className="w-full self-center placeholder:text-center text-white text-sm"
                        placeholder="Enter Tweet Link"
                        onChange={(e) => setTweetLink(e.target.value)}
                        value={tweetLink}
                      />
                    </div>
                  )}

                  <Card className="w-full max-w-full bg-[#15202b] rounded-lg border-none">
                    <CardContent className="p-2 sm:p-4">
                      <div className="flex items-start">
                        <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                          <AvatarImage
                            src="/assets/image-28.png"
                            alt="Andy Ayrey"
                          />
                          <AvatarFallback>AA</AvatarFallback>
                        </Avatar>
                        <div className="ml-2 flex-1">
                          <div className="font-normal text-white text-xs sm:text-[13px]">
                            Andy Ayrey
                            <img
                              className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 ml-1"
                              alt="Verified"
                              src="/assets/image-10.png"
                            />
                            <br />
                            <span className="text-[#5a5d69]">@AndyAyrey</span>
                          </div>
                          <div className="mt-2 sm:mt-4 font-normal text-white text-xs sm:text-[13px]">
                            timeline cleanse
                          </div>
                        </div>
                        <img
                          className="w-[100px] h-[90px] sm:w-[137px] sm:h-[126px] ml-auto object-cover"
                          alt="Tweet image"
                          src="/assets/image-27.png"
                        />
                      </div>

                      <div className="flex items-center justify-evenly mt-4 sm:mt-8">
                        <div className="flex items-center">
                          <HeartIcon className="w-3 h-3 sm:w-4 sm:h-4 text-[red] fill-[red]" />
                          <span className="ml-1 sm:ml-2 font-normal text-white text-xs sm:text-[13px]">
                            597
                          </span>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="h-[20px] sm:h-[23px] bg-[#5B5E69]"
                        />
                        <div className="flex items-center">
                          <MessageCircleIcon className="w-3 h-3 sm:w-4 sm:h-3.5 text-white" />
                          <span className="ml-1 sm:ml-2 font-normal text-white text-xs sm:text-[13px]">
                            64
                          </span>
                        </div>
                        <Separator
                          orientation="vertical"
                          className="h-[20px] sm:h-[23px] bg-[#5B5E69]"
                        />
                        <div className="flex items-center">
                          <RepeatIcon className="w-3 h-3 sm:w-4 sm:h-3.5 text-white" />
                          <span className="ml-1 sm:ml-2 font-normal text-white text-xs sm:text-[13px]">
                            199
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div> */}
                {/* Chat messages */}
                <div className="space-y-3 sm:space-y-4 w-full break-all relative">
                  {userProfile && (
                    <ProfileCard
                      name={userdata?.displayName || ""}
                      username={userdata?.userId || ""}
                      avatarUrl={userdata?.avatar || ""}
                      mutualServerCount={1}
                      promoterTag={true}
                    />
                  )}
                  {messages &&
                    messages.map((message: any) => (
                      <ChattingHistory
                        key={message._id}
                        message={message}
                        avatarClick={() => {
                          setUserProfile(!userProfile);
                        }}
                        editMessage={editMessage}
                      />
                    ))}
                </div>
              </div>

              {/* Message input */}
              <div className={`max-w-full ${color.settingsColor} p-2`}>
                {typingStatus && (
                  <div className="text-white text-xs sm:text-sm bg-transparent backdrop-blur-sm ml-1">{`${userdata?.displayName} is typing...`}</div>
                )}

                <div className="relative w-full h-[40px] sm:h-[45px] bg-[100%_100%] flex items-center px-2 sm:px-3 rounded-md  border-[#22242d]">
                  <CirclePlus
                    className="w-4 h-4 sm:w-5 sm:h-5 text-[#777a8c] cursor-pointer"
                    onClick={plusBtnHandle}
                  />
                  {plusBtn && (
                    <div
                      ref={popupRef}
                      className={`absolute bottom-full mb-2 left-0 w-36 sm:w-48 bg-[#22242D] rounded-md shadow-lg py-1 z-50 text-xs sm:text-sm`}
                    >
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
                      <MenuItem
                        Icon={LogOut}
                        text="Leave Channel"
                        onClick={handleLeaveChannel}
                      />
                    </div>
                  )}
                  {joinStatus ? (
                    <Input
                      className="border-none bg-transparent text-[#dbd6d6] text-xs sm:text-sm h-full focus:outline-none focus:ring-0 focus:border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder={
                        editState ? "Edit message..." : "Write a message..."
                      }
                      value={msg}
                      onChange={(e) => handleInputChange(e)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          !editState
                            ? sendMsgHandle(msg, textToCopy)
                            : editedMessage && handleEditMessage(editedMessage);
                        }
                      }}
                    />
                  ) : (
                    <button
                      className="text-white text-xs sm:text-sm w-full"
                      onClick={() => handleJoinChannel()}
                    >
                      Join Channel
                    </button>
                  )}
                  <div className="flex items-center gap-1 sm:gap-2 ml-auto">
                    <HandCoins className="w-4 h-4 sm:w-5 sm:h-5 text-[green] sm:block cursor-pointer" />
                    <Smile
                      className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-[#777a8c] cursor-pointer"
                      onClick={() => {
                        if (!joinStatus) return;
                        setShowPicker((prev) => !prev);
                      }}
                    />
                    <div
                      ref={popupRef}
                      className={`absolute z-20 right-2 sm:right-9 bottom-12 sm:bottom-5 w-30 scale-75 sm:scale-100 origin-bottom-right opacity-0 ${
                        showPicker
                          ? "opacity-100 pointer-events-auto"
                          : "pointer-events-none"
                      } transition-opacity duration-300`}
                    >
                      <Picker
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        theme="dark"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SearchModal
        isOpen={searchModal}
        onClose={() => setSearchModal(false)}
        color={color}
        sidebarChannels={sidebarChannels}
      />
    </div>
  );
};

export default HomeSection;
