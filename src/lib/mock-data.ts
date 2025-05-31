import type { User, Message } from "./types";

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "ダミー一郎",
    status: "online",
    position: { x: 150, y: 120 },
    color: "hsl(210, 70%, 60%)",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Tanaka",
  },
  {
    id: "user-2",
    name: "ダミー二郎",
    status: "online",
    position: { x: 300, y: 200 },
    color: "hsl(340, 70%, 60%)",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sato",
  },
  {
    id: "user-3",
    name: "ダミー三郎",
    status: "online",
    position: { x: 450, y: 150 },
    color: "hsl(120, 70%, 60%)",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Suzuki",
  },
];

// Mock messages for demonstration
export const mockMessages: Message[] = [
  {
    id: "msg-1",
    type: "system",
    content: "ダミー一郎が入室しました",
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: "msg-2",
    type: "user",
    sender: "ダミー一郎",
    content: "皆さん、お疲れ様です！",
    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
  },
  {
    id: "msg-3",
    type: "user",
    sender: "ダミー二郎",
    content: "もくもく作業していきます！",
    timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
  },
  {
    id: "msg-4",
    type: "user",
    sender: "ダミー三郎",
    content: "React 教材進めます！！",
    timestamp: new Date(Date.now() - 600000).toISOString(), // 10 minutes ago
  },
];
