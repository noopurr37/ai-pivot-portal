
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export default function ChatInput({
  inputMessage,
  onInputChange,
  onKeyPress,
  onSend,
  textareaRef,
  isLoading,
}: {
  inputMessage: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  isLoading: boolean;
}) {
  return (
    <div className="border-t bg-white dark:bg-gray-800 px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={onInputChange}
              onKeyPress={onKeyPress}
              className="min-h-[44px] max-h-[200px] resize-none pr-12 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-400"
              disabled={isLoading}
              rows={1}
            />
            <Button
              onClick={onSend}
              disabled={!inputMessage.trim() || isLoading}
              size="icon"
              className="absolute right-2 bottom-2 h-8 w-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
