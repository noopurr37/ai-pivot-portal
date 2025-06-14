
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatVoiceInputButtonProps {
  isLoading?: boolean;
  onVoiceResult: (text: string) => void;
  className?: string;
}

export default function ChatVoiceInputButton({
  isLoading,
  onVoiceResult,
  className = "",
}: ChatVoiceInputButtonProps) {
  const {
    isRecording,
    isTranscribing,
    startRecording,
    stopRecording,
  } = useVoiceInput({
    onResult: (text) => {
      onVoiceResult(text ?? "");
    },
  });

  return (
    <div className={"flex items-center" + (className ? " " + className : "")}>
      <Button
        type="button"
        size="icon"
        variant={isRecording ? "destructive" : "secondary"}
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isLoading || isTranscribing}
        aria-label={isRecording ? "Stop voice input" : "Start voice input"}
        className={
          isRecording
            ? "animate-pulse bg-red-600 hover:bg-red-700"
            : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
        }
        tabIndex={-1}
      >
        {isRecording ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>
      {isTranscribing && (
        <span className="ml-2 text-xs text-blue-600 dark:text-blue-300 animate-pulse">
          Transcribing voice...
        </span>
      )}
    </div>
  );
}
