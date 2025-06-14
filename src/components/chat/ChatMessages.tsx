
import { Card } from "@/components/ui/card";
import { Bot, User } from "lucide-react";
import type { Message } from "@/hooks/useChatAssistant";

export default function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
}: {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <Bot className="h-16 w-16 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            How can I help you today?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            I'm your AI assistant. Ask me anything and I'll do my best to help you!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                <Card className={`p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="prose prose-sm max-w-none">
                    <p className={`text-sm leading-relaxed m-0 ${
                      message.role === 'user' ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {message.content}
                    </p>
                  </div>
                </Card>
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-right text-gray-500' : 'text-left text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-gray-500">AI is thinking...</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
