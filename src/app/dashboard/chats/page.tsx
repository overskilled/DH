"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  Users,
  Plus,
} from "lucide-react";

export default function TeamChat() {
  const [selectedChat, setSelectedChat] = useState("general");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any>({
    general: [
      {
        id: "1",
        senderId: "1",
        senderName: "Sarah Williams",
        content: "Good morning team! Ready for today's case reviews?",
        timestamp: new Date(Date.now() - 3600000),
        type: "text",
      },
      {
        id: "2",
        senderId: "2",
        senderName: "John Smith",
        content: "Yes, I've prepared the documents for the TechCorp case.",
        timestamp: new Date(Date.now() - 3000000),
        type: "text",
      },
      {
        id: "3",
        senderId: "3",
        senderName: "Emily Rodriguez",
        content: "@Sarah Williams The tax documents are ready for review",
        timestamp: new Date(Date.now() - 1800000),
        type: "text",
        mentions: ["1"],
      },
    ],
    litigation: [
      {
        id: "4",
        senderId: "1",
        senderName: "Sarah Williams",
        content:
          "Update on the Johnson vs. TechCorp case - discovery phase completed",
        timestamp: new Date(Date.now() - 7200000),
        type: "text",
      },
    ],
    corporate: [
      {
        id: "5",
        senderId: "2",
        senderName: "John Smith",
        content: "Merger documents are ready for final review",
        timestamp: new Date(Date.now() - 5400000),
        type: "text",
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chats = [
    {
      id: "general",
      name: "General",
      type: "general",
      participants: 12,
      unread: 3,
    },
    {
      id: "litigation",
      name: "Litigation Team",
      type: "department",
      participants: 5,
      unread: 0,
    },
    {
      id: "corporate",
      name: "Corporate Law",
      type: "department",
      participants: 4,
      unread: 1,
    },
    {
      id: "tax",
      name: "Tax Department",
      type: "department",
      participants: 3,
      unread: 0,
    },
  ];

  const users = [
    { id: "1", name: "Sarah Williams", status: "online", avatar: "" },
    { id: "2", name: "John Smith", status: "away", avatar: "" },
    { id: "3", name: "Emily Rodriguez", status: "online", avatar: "" },
    { id: "4", name: "Michael Brown", status: "offline", avatar: "" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedChat]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        senderId: "current-user",
        senderName: "You",
        content: message,
        timestamp: new Date(),
        type: "text" as const,
        mentions: extractMentions(message),
      };

      setMessages((prev: any) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage],
      }));
      setMessage("");
    }
  };

  const extractMentions = (text: string) => {
    const mentionRegex = /@(\w+\s\w+)/g;
    const mentions = [];
    let match: any;
    while ((match = mentionRegex.exec(text)) !== null) {
      const user = users.find((u) => u.name === match[1]);
      if (user) mentions.push(user.id);
    }
    return mentions;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "busy":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r bg-gray-50">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Team Chat</h2>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              New Chat
            </Button>
          </div>
        </div>

        <Tabs defaultValue="chats" className="h-full">
          <TabsList className="grid w-full grid-cols-2 mx-4 mt-2">
            <TabsTrigger value="chats">Chats</TabsTrigger>
            <TabsTrigger value="users">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="mt-4 px-4 space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat === chat.id
                    ? "bg-blue-100 border-blue-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{chat.name}</h4>
                    <p className="text-sm text-gray-600">
                      {chat.participants} members
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge variant="default" className="bg-blue-600">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="users" className="mt-4 px-4 space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                      user.status
                    )}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.status}
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b bg-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">
                {chats.find((c) => c.id === selectedChat)?.name}
              </h3>
              <p className="text-sm text-gray-600">
                {chats.find((c) => c.id === selectedChat)?.participants} members
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Video className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Users className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(messages[selectedChat] || []).map((msg: any) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.senderId === "current-user" ? "justify-end" : ""
              }`}
            >
              {msg.senderId !== "current-user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {msg.senderName
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs lg:max-w-md ${
                  msg.senderId === "current-user" ? "order-first" : ""
                }`}
              >
                {msg.senderId !== "current-user" && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">
                      {msg.senderName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg ${
                    msg.senderId === "current-user"
                      ? "bg-blue-600 text-white"
                      : msg.mentions?.length
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                {msg.senderId === "current-user" && (
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formatTime(msg.timestamp)}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Smile className="h-4 w-4" />
            </Button>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message... (use @Name to mention)"
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Use @Name to mention team members • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
