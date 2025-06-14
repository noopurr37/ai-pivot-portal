
import { Bot } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useChatSidebar } from "@/hooks/useChatSidebar";
import { ChatSidebarMessages } from "@/components/chat/ChatSidebarMessages";
import { ChatSidebarInput } from "@/components/chat/ChatSidebarInput";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { useRef } from "react";

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
    setInputMessage,
  } = useChatSidebar();

  // Use voice input
  const lastInputMessageRef = useRef<string | null>(null);

  const {
    isRecording,
    isTranscribing,
    startRecording,
    stopRecording,
  } = useVoiceInput({
    onResult: (text) => {
      // Set the result to the input box
      setInputMessage(text);
    },
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0 flex flex-col">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI Assistant
          </SheetTitle>
        </SheetHeader>
        {/* Instruction */}
        <div className="bg-yellow-100 dark:bg-yellow-900 border-b border-yellow-300 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100 p-4 flex items-center gap-2">
          <Bot className="h-5 w-5 text-yellow-700 dark:text-yellow-200" />
          <span>
            <strong>My name is Read Me.</strong> I can answer all questions about Noopur's resume.
            If you upload a resume, I will use its contents to help answer your questions.
          </span>
        </div>
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
          isRecording={isRecording}
          isTranscribing={isTranscribing}
          onVoiceInput={startRecording}
          onStopVoiceInput={stopRecording}
        />
      </SheetContent>
    </Sheet>
  );
}
