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
  id: string;
  chainId: string;
  image: string;
  name: string;
  symbol: string;
  tokenAdd: string;
}

declare interface MenuItemProps {
  Icon: LucideIcon;
  text: string;
  onClick?: () => void;
}
