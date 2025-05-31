import { useEffect, useState, useCallback } from "react";
import type { User, Message } from "@/lib/types";
import { mockUsers, mockMessages } from "@/lib/mock-data";

interface UseChatSocketProps {
  username: string | null;
}

/**
 * Mock version of the chat socket hook for static deployment
 * Simulates real-time behavior using local state and timeouts
 */
export function useChatSocket({ username }: UseChatSocketProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isSocketInitialized, setIsSocketInitialized] = useState(false);
  const [currentUserSocketId] = useState<string>("mock-user-id");

  // Initialize mock data when username is available
  useEffect(() => {
    if (username) {
      // Add current user to the mock users list
      const currentUser: User = {
        id: currentUserSocketId,
        name: username,
        status: "online",
        position: {
          x: Math.floor(Math.random() * 600),
          y: Math.floor(Math.random() * 400),
        },
        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
      };

      // Combine current user with mock users
      setUsers([currentUser, ...mockUsers]);
      setMessages(mockMessages);
      setIsSocketInitialized(true);

      // Simulate a welcome message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-welcome-${Date.now()}`,
            type: "system",
            content: `${username} が入室しました`,
            timestamp: new Date().toISOString(),
          },
        ]);
      }, 1000);
    }
  }, [username, currentUserSocketId]);

  /**
   * Mock message sending with simulated responses
   */
  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || !username) return;

      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        type: "user",
        sender: username,
        content: content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, newMessage]);

      // Simulate another user typing and responding
      const otherUsers = mockUsers.filter((u: User) => u.name !== username);
      if (otherUsers.length > 0) {
        const randomUser =
          otherUsers[Math.floor(Math.random() * otherUsers.length)];

        // Show typing indicator
        setTypingUsers((prev) => [...prev, randomUser.name]);

        setTimeout(() => {
          // Remove typing indicator
          setTypingUsers((prev) =>
            prev.filter((name) => name !== randomUser.name)
          );

          // Add response message
          const responses = [
            `こんにちは, ${username}!`,
            `これはプレビュー用のページですよ, ${username}!`,
            `リアルタイムチャットの実装を学びましょう, ${username}!`,
          ];

          const randomResponse =
            responses[Math.floor(Math.random() * responses.length)];

          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}`,
              type: "user",
              sender: randomUser.name,
              content: randomResponse,
              timestamp: new Date().toISOString(),
            },
          ]);
        }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
      }
    },
    [username]
  );

  /**
   * Mock typing status - just logs for demonstration
   */
  const sendTypingUpdate = useCallback(
    (isTyping: boolean) => {
      console.log(
        `Mock typing update: ${username} is ${
          isTyping ? "typing" : "not typing"
        }`
      );
    },
    [username]
  );

  /**
   * Mock user movement - updates local state
   */
  const sendUserMove = useCallback(
    (newPosition: { x: number; y: number }) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.name === username ? { ...user, position: newPosition } : user
        )
      );
    },
    [username]
  );

  /**
   * Mock logout - clears state
   */
  const logout = useCallback(() => {
    setUsers([]);
    setMessages([]);
    setTypingUsers([]);
    setIsSocketInitialized(false);
  }, []);

  // Simulate random user movements
  useEffect(() => {
    if (!isSocketInitialized) return;

    const interval = setInterval(() => {
      setUsers((prev) =>
        prev.map((user) => {
          // Only move mock users, not the current user
          if (user.name === username) return user;

          return {
            ...user,
            position: {
              x: Math.max(
                50,
                Math.min(650, user.position.x + (Math.random() - 0.5) * 20)
              ),
              y: Math.max(
                50,
                Math.min(350, user.position.y + (Math.random() - 0.5) * 20)
              ),
            },
          };
        })
      );
    }, 5000); // Move every 5 seconds

    return () => clearInterval(interval);
  }, [isSocketInitialized, username]);

  return {
    users,
    messages,
    typingUsers,
    isSocketInitialized,
    currentUserSocketId,
    sendMessage,
    sendTypingUpdate,
    sendUserMove,
    logout,
  };
}
