
import { Bot } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useChatSidebar } from "@/hooks/useChatSidebar";
import { ChatSidebarMessages } from "@/components/chat/ChatSidebarMessages";
import { ChatSidebarInput } from "@/components/chat/ChatSidebarInput";

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  const {
    messages,
    inputMessage,
    isLoading,
    handleSendMessage,
    handleKeyPress,
    handleInputChange,
    messagesEndRef,
    textareaRef,
  } = useChatSidebar();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI Assistant
          </SheetTitle>
        </SheetHeader>

        <ChatSidebarMessages 
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />

        <ChatSidebarInput
          inputMessage={inputMessage}
          onInputChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onSend={handleSendMessage}
          textareaRef={textareaRef}
          isLoading={isLoading}
        />
      </SheetContent>
    </Sheet>
  );
}
