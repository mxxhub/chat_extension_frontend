import { useEffect, useRef, useState } from "react";
import { Search, X, Globe } from "lucide-react";
import { formatMarketCap } from "../utils/utils";

interface Token {
  id: string;
  name: string;
  shortName: string;
  imageUrl: string;
  marketCap: string;
  daysSince?: number;
  monthsSince?: number;
  category: "history" | "trending";
  hasTwitter?: boolean;
  hasWebsite?: boolean;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  color: Colors;
  sidebarChannels: Channel[];
}

const SearchModal = ({
  isOpen,
  onClose,
  color,
  sidebarChannels,
}: SearchModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const defaultTokens: Token[] = [
    {
      id: "hosico",
      name: "Hosico",
      shortName: "Hosico",
      imageUrl: "/assets/image-15.png",
      marketCap: "$31.85M",
      category: "history",
    },
    {
      id: "pork",
      name: "PORK",
      shortName: "PORK",
      imageUrl: "/assets/image-16.png",
      marketCap: "$1.40M",
      category: "history",
    },
    {
      id: "house",
      name: "House",
      shortName: "Housecoin",
      imageUrl: "/assets/image-12.png",
      marketCap: "$59.12M",
      monthsSince: 1,
      category: "trending",
      hasTwitter: true,
      hasWebsite: true,
    },
    {
      id: "gork",
      name: "gork",
      shortName: "New XAI gork",
      imageUrl: "/assets/image-13.png",
      marketCap: "$46.25M",
      daysSince: 5,
      category: "trending",
      hasTwitter: true,
    },
    {
      id: "chillhouse",
      name: "CHILLHOUSE",
      shortName: "Chill House",
      imageUrl: "/assets/image-14.png",
      marketCap: "$4.57M",
      daysSince: 6,
      category: "trending",
      hasTwitter: true,
    },
    {
      id: "troll",
      name: "TROLL",
      shortName: "TROLL",
      imageUrl: "/assets/image-6.png",
      marketCap: "$25.93M",
      daysSince: 15,
      category: "trending",
      hasTwitter: true,
      hasWebsite: true,
    },
    {
      id: "neet",
      name: "neet",
      shortName: "NotInEmploymentEduc...",
      imageUrl: "/assets/image-7.png",
      marketCap: "$10.87M",
      daysSince: 9,
      category: "trending",
      hasTwitter: true,
    },
    {
      id: "fartcoin",
      name: "Fartcoin",
      shortName: "Fartcoin",
      imageUrl: "/assets/image-11.png",
      marketCap: "$1.09B",
      monthsSince: 6,
      category: "trending",
      hasTwitter: true,
      hasWebsite: true,
    },
    {
      id: "trencher",
      name: "TRENCHER",
      shortName: "trencher",
      imageUrl: "/assets/image-9.png",
      marketCap: "$8.89M",
      daysSince: 12,
      category: "trending",
      hasTwitter: true,
      hasWebsite: true,
    },
    {
      id: "boopa",
      name: "Boopa",
      shortName: "Boopa",
      imageUrl: "/assets/image-10.png",
      marketCap: "$4.61M",
      daysSince: 4,
      category: "trending",
      hasTwitter: true,
      hasWebsite: true,
    },
  ];
  const [tokens, setTokens] = useState<Token[]>(defaultTokens);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const clearSearch = () => {
    setSearchText("");
    setIsFocused(false);
    !isFocused && onClose();
  };

  const clearHistory = () => {
    setTokens(defaultTokens.filter((token) => token.category !== "history"));
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          color.chatBackground
        } ${isOpen ? "opacity-50" : "opacity-0 pointer-events-none"}`}
      ></div>
      <div
        ref={modalRef}
        className={`fixed left-full top-0 flex flex-col w-full max-w-md mx-auto z-50 ${
          color.chatBackground
        } text-white h-screen ${
          isOpen ? "opacity-100 -translate-x-full" : "opacity-0 -translate-x-0"
        } transition-all duration-300`}
      >
        <div className={`flex items-center p-4 ${color.settingsColor}`}>
          <Search size={20} className="text-gray-400 mr-2" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search Contract Address"
            className="flex-1 bg-transparent outline-none text-gray-300 text-sm sm:text-base"
            onFocus={() => setIsFocused(true)}
          />
          <button onClick={clearSearch} aria-label="Clear search">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div
            className={`pt-2 pb-4 border-b ${color.outlineColor} ${
              color.mainColor
            } max-h-fit ${
              isFocused ? "opacity-100 h-fit" : "opacity-0 h-0"
            } transition-all duration-300 ease-out`}
          >
            <div className="flex justify-between px-4 py-2">
              <h2 className="text-gray-400 text-xs sm:text-sm">History</h2>
              <button
                className="text-gray-400 text-xs sm:text-sm"
                aria-label="Clear history"
                onClick={clearHistory}
              >
                Clear
              </button>
            </div>
            <div className="flex gap-2 sm:gap-4 px-2 sm:px-4 overflow-x-auto pb-1 scrollbar-hide">
              {tokens
                .filter((token) => token.category === "history")
                .map((token) => (
                  <div
                    key={token.id}
                    className="flex flex-col items-center flex-shrink-0"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-2 sm:mr-3">
                        <img
                          src={token.imageUrl}
                          alt={token.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-4 font-medium text-white truncate w-full">
                          {token.name}
                        </span>
                        <span className="text-4 text-white truncate w-full">
                          {token.marketCap}
                          {"  "}
                          <small className="text-gray-400">MC</small>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className={`pt-2 ${color.chatBackground}`}>
            <div className="px-4 py-2">
              <h2 className="text-gray-400 text-xs sm:text-sm">Trending</h2>
            </div>
            <div className="flex flex-col">
              {sidebarChannels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex items-center justify-between px-2 sm:px-4 py-2 sm:py-3"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden mr-2 sm:mr-3">
                      <img
                        src={channel.image}
                        alt={channel.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-sm sm:text-base">
                          {channel.name}
                        </span>
                        <span className="text-xs text-gray-400 ml-1 hidden xs:inline">
                          {channel.symbol}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        {/* {channel.daysSince && <span>{token.daysSince}d</span>}
                        {channel.monthsSince && (
                          <span>{channel.monthsSince}mo</span>
                        )} */}
                        {channel.twitter && (
                          <a href={channel.twitter} target="_blank">
                            <img
                              className="w-2 h-2 sm:w-3 sm:h-3 ml-2"
                              alt="Twitter icon"
                              src="/assets/vector.svg"
                            />
                          </a>
                        )}
                        {channel.website && (
                          <a href={channel.website} target="_blank">
                            <Globe size={12} className="ml-2" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-medium text-xs sm:text-sm">
                      {formatMarketCap(Number(channel.marketCap))}
                      {"  "}
                      <small className="text-gray-400">MC</small>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
