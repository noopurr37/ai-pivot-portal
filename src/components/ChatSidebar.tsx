
import { Bot, Upload, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useChatSidebar } from "@/hooks/useChatSidebar";
import { ChatSidebarMessages } from "@/components/chat/ChatSidebarMessages";
import { ChatSidebarInput } from "@/components/chat/ChatSidebarInput";
import { useVoiceInput } from "@/hooks/useVoiceInput";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useResume } from "@/context/ResumeContext";

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
      setInputMessage(text);
    },
  });

  // Upload functionality
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();
  const { setResumeText } = useResume();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUploadedFile(file);
      toast({
        title: "File selected",
        description: `You selected: ${file.name}`,
      });

      // Create preview for different file types
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        setResumeText(null);
      } else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = e => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        setResumeText(null);
      } else if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = e => {
          const text = e.target?.result as string;
          setFilePreview(text);
          setResumeText(text); // Save to context for AI use
        };
        reader.readAsText(file);
      } else {
        setFilePreview(null);
        setResumeText(null);
      }
      event.target.value = "";
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFilePreview(null);
    setResumeText(null);
  };

  const renderFilePreview = () => {
    if (!uploadedFile || !filePreview) return null;

    if (uploadedFile.type.startsWith('image/')) {
      return (
        <div className="flex justify-center mb-2">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={filePreview} 
              alt={uploadedFile.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    } else if (uploadedFile.type.startsWith('video/')) {
      return (
        <div className="flex justify-center mb-2">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer relative group">
            <video 
              src={filePreview} 
              className="w-full h-full object-cover"
              muted
              controls
            />
          </div>
        </div>
      );
    } else if (uploadedFile.type.startsWith('text/') || uploadedFile.name.endsWith('.txt') || uploadedFile.name.endsWith('.md')) {
      return (
        <div className="flex justify-center mb-2">
          <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            <div className="p-2 text-center overflow-y-auto max-h-full">
              <pre className="whitespace-pre-wrap text-xs leading-tight">
                {filePreview.substring(0, 100)}...
              </pre>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center mb-2">
          <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-white shadow-lg flex items-center justify-center">
            <div className="text-center p-2">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Preview not available
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

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
        
        {/* File Upload - new */}
        <div className="p-4 border-b flex flex-col items-center gap-3 bg-muted-foreground/5">
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*,video/*,text/*,.txt,.md,.pdf,.doc,.docx"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2 rounded-lg"
          >
            Upload File for Bot
            <Upload className="h-4 w-4" />
          </Button>
          {uploadedFile && (
            <div className="w-full bg-card p-3 rounded-lg shadow flex flex-col items-center relative">
              <Button
                onClick={handleRemoveFile}
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7"
              >
                <X className="h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground mb-1 truncate w-full text-center">
                {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
              </p>
              {renderFilePreview()}
            </div>
          )}
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

