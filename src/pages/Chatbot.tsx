
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { useChatAssistant } from "@/hooks/useChatAssistant";
import ChatVoiceInputButton from "@/components/chat/ChatVoiceInputButton";

export default function Chatbot() {
  const {
    messages,
    inputMessage,
    isLoading,
    setInputMessage,
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
      {/* Instruction  */}
      <div className="bg-yellow-100 dark:bg-yellow-900 border-b border-yellow-300 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100 p-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-yellow-700 dark:text-yellow-200" />
        <span>
          <strong>My name is Read Me.</strong> I can answer all questions about Noopur's resume.
          If you upload a resume, I will use its contents to help answer your questions.
        </span>
      </div>
      {/* Messages */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
        />
        <div className="flex gap-2 items-end px-2 pb-2">
          <ChatVoiceInputButton
            isLoading={isLoading}
            onVoiceResult={setInputMessage}
            className="mb-2"
          />
          <div className="flex-1">
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
      </div>
    </div>
  );
}

