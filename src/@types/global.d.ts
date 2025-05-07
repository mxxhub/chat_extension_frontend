declare interface User {
  _id: string;
  userId: string;
  displayName: string;
  wallet: string;
  bio: string;
  avatar?: string;
  channels: Channel[];
  isOnline: boolean;
  lastSeen?: Date;
}

declare interface Message {
  _id: string;
  sender: User;
  content: string;
  room: string;
  timestamp?: string;
  createdAt: string;
}

declare interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

declare interface MessageState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

declare interface Channel {
  id: number;
  chainId: string;
  name: string;
  symbol: string;
  tokenAdd: string;
  image: string;
  banner: string;
  twitter?: string;
  website?: string;
  marketCap?: string;
}

declare interface MenuItemProps {
  Icon: LucideIcon;
  text: string;
  onClick?: () => void;
}

declare interface Colors {
  chatBackground: string;
  mainColor: string;
  outlineColor: string;
  buttonColor: string;
  highlightsColor: string;
  settingsColor: string;
}

declare interface Token {
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
