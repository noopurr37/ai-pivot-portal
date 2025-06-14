
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { useChatAssistant } from "@/hooks/useChatAssistant";

export default function Chatbot() {
  const {
    messages,
    inputMessage,
    isLoading,
    handleSendMessage,
    handleKeyPress,
    handleInputChange,
    messagesEndRef,
    textareaRef,
  } = useChatAssistant();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="border-b bg-white dark:bg-gray-800 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/")}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">AI Assistant</h1>
            </div>
          </div>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput
          inputMessage={inputMessage}
          onInputChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onSend={handleSendMessage}
          textareaRef={textareaRef}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
