
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Mic, MicOff } from "lucide-react";

interface ChatSidebarInputProps {
  inputMessage: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  isLoading: boolean;
  // Voice input:
  isRecording?: boolean;
  isTranscribing?: boolean;
  onVoiceInput?: () => void;
  onStopVoiceInput?: () => void;
}

export function ChatSidebarInput({
  inputMessage,
  onInputChange,
  onKeyPress,
  onSend,
  textareaRef,
  isLoading,
  isRecording,
  isTranscribing,
  onVoiceInput,
  onStopVoiceInput,
}: ChatSidebarInputProps) {
  return (
    <div className="border-t bg-white dark:bg-gray-800 p-4">
      <div className="flex gap-3 items-end">
        {/* VOICE BUTTON */}
        <div className="self-center">
          <Button
            type="button"
            onClick={isRecording ? onStopVoiceInput : onVoiceInput}
            variant={isRecording ? "destructive" : "secondary"}
            size="icon"
            disabled={isLoading || isTranscribing}
            aria-label="Voice input"
            className={
              isRecording
                ? "animate-pulse bg-red-600 hover:bg-red-700"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
            }
          >
            {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message here..."
            value={isTranscribing ? "Transcribing voice..." : inputMessage}
            onChange={onInputChange}
            onKeyPress={onKeyPress}
            className="min-h-[44px] max-h-[200px] resize-none pr-12 border-gray-300 dark:border-gray-600 focus:border-blue-600 dark:focus:border-blue-400"
            disabled={isLoading || isTranscribing}
            rows={1}
          />
          <Button
            onClick={onSend}
            disabled={!inputMessage.trim() || isLoading || isTranscribing}
            size="icon"
            className="absolute right-2 bottom-2 h-8 w-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Press Enter to send, Shift+Enter for new line
        {isTranscribing ? " · Transcribing voice..." : ""}
      </p>
    </div>
  );
}
