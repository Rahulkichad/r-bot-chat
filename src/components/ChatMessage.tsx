import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 animate-fade-in ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
          isUser
            ? "bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground shadow-md shadow-primary/20"
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <span className="font-bold text-sm">R</span>}
      </div>
      <div
        className={`flex-1 max-w-[80%] ${isUser ? "text-right" : "text-left"}`}
      >
        <div
          className={`inline-block px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-muted text-foreground rounded-tr-md"
              : "bg-card text-foreground border border-border rounded-tl-md"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
