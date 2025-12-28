import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import RBotLogo from "@/components/RBotLogo";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import TypingIndicator from "@/components/TypingIndicator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WEBHOOK_URL = "https://rahulkhichad.app.n8n.cloud/webhook-test/MyChatBot";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          message: content,
          timestamp: new Date().toISOString(),
          conversation_id: Date.now().toString(),
        }),
      });

      // Since we're using no-cors, we can't read the response
      // Simulate an assistant response for demo purposes
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Message sent to webhook successfully. Your request is being processed.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      toast({
        title: "Message sent",
        description: "Your message was sent to the webhook.",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex-shrink-0 py-4 px-6 flex items-center justify-between border-b border-border/50">
        <RBotLogo className="scale-75 origin-left" />
        <div className="text-xs text-muted-foreground">Powered by n8n</div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {!hasMessages ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
            <RBotLogo className="mb-8 scale-110" />
            <p className="text-muted-foreground text-lg mb-12">How can I help you today?</p>
            <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        ) : (
          /* Chat View */
          <>
            <div className="flex-1 overflow-y-auto chat-scrollbar px-6 py-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                  />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input at bottom */}
            <div className="flex-shrink-0 px-6 py-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
              <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
