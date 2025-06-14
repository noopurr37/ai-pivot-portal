import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VideoPlayer } from "@/components/VideoPlayer";
import { useResume } from "@/context/ResumeContext";
import { useNavigate } from "react-router-dom";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";
import { useChatAssistant } from "@/hooks/useChatAssistant";
import { useVoiceInput } from "@/hooks/useVoiceInput";
export default function Index() {
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    toast
  } = useToast();
  const navigate = useNavigate();

  // Chat functionality
  const {
    messages,
    inputMessage,
    isLoading,
    setInputMessage,
    handleSendMessage,
    handleKeyPress,
    handleInputChange,
    messagesEndRef,
    textareaRef
  } = useChatAssistant();

  // Voice input hook for chat input
  const {
    isRecording,
    isTranscribing,
    startRecording,
    stopRecording
  } = useVoiceInput({
    onResult: text => {
      // Place transcript in chat input
      setInputMessage(text ?? "");
    }
  });

  // FIX: Access setResumeText from ResumeContext
  const {
    setResumeText
  } = useResume();
  const handlePersonalizeClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setUploadedFile(file);
      toast({
        title: "File selected",
        description: `You selected: ${file.name}`
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
          setResumeText(text); // Save resume text to context
        };
        reader.readAsText(file);
      } else {
        setFilePreview(null);
        setResumeText(null);
      }
      console.log("Selected file:", file);
      event.target.value = "";
    }
  };
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFilePreview(null);
    setShowVideoPlayer(false);
  };
  const handleChatbot = () => {
    navigate('/chatbot');
  };
  const renderFilePreview = () => {
    if (!uploadedFile || !filePreview) return null;
    if (uploadedFile.type.startsWith('image/')) {
      return <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img src={filePreview} alt={uploadedFile.name} className="w-full h-full object-cover" />
          </div>
        </div>;
    } else if (uploadedFile.type.startsWith('video/')) {
      if (showVideoPlayer) {
        return <VideoPlayer src={filePreview} fileName={uploadedFile.name} onClose={() => setShowVideoPlayer(false)} />;
      } else {
        return <div className="flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer relative group" onClick={() => setShowVideoPlayer(true)}>
              <video src={filePreview} className="w-full h-full object-cover" muted />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded-full p-3">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>;
      }
    } else if (uploadedFile.type.startsWith('text/') || uploadedFile.name.endsWith('.txt') || uploadedFile.name.endsWith('.md')) {
      return <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
            <div className="p-4 text-center overflow-y-auto max-h-full">
              <pre className="whitespace-pre-wrap text-xs leading-tight">
                {filePreview.substring(0, 200)}...
              </pre>
            </div>
          </div>
        </div>;
    } else {
      return <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-sm text-gray-500 mt-2">
                Preview not available
              </p>
            </div>
          </div>
        </div>;
    }
  };
  return <div className="min-h-screen w-full text-foreground flex flex-col items-center justify-center px-4 bg-gradient-to-br from-orange-400 via-orange-300 to-orange-600">
      <div className="max-w-2xl w-full space-y-8">
        {/* Hero Headline */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">
            READ.ME
          </h1>
          <p className="text-slate-50 text-3xl font-thin">
            Humanize your Resume through a Digital Twin Profile
          </p>
        </div>

        {/* Chat Interface */}
        <div className="space-y-4 bg-card p-6 rounded-lg shadow-lg">
          <div className="flex flex-col gap-4">
            <input ref={fileInputRef} type="file" style={{
            display: "none"
          }} onChange={handleFileChange} accept="image/*,video/*,text/*,.txt,.md,.pdf,.doc,.docx" />
            <Button onClick={handlePersonalizeClick} variant="secondary" className="w-full flex items-center justify-center gap-2 rounded-lg">
              Let Me Read Your Resume
              <Upload className="h-4 w-4" />
            </Button>
            
          </div>
        </div>

        {/* File Preview Section */}
        {uploadedFile && <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Button onClick={handleRemoveFile} variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            {renderFilePreview()}
          </div>}

        {/* Embedded Chat Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Chat Header */}
          <div className="bg-yellow-100 dark:bg-yellow-900 border-b border-yellow-300 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100 p-4 flex items-center gap-2">
            <span className="text-sm">
              <strong>My name is Read Me.</strong> I can answer all questions about resumes.
            </span>
          </div>
          
          {/* Chat Messages */}
          <div className="h-96 flex flex-col">
            <div className="flex-1 overflow-hidden">
              <ChatMessages messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="border-t bg-white dark:bg-gray-800 p-4">
              <div className="flex gap-2 items-end">
                {/* Voice Input Button */}
                <div className="mb-2 flex items-center">
                  <Button type="button" size="icon" variant={isRecording ? "destructive" : "secondary"} onClick={isRecording ? stopRecording : startRecording} disabled={isLoading || isTranscribing} aria-label={isRecording ? "Stop voice input" : "Start voice input"} className={isRecording ? "animate-pulse bg-red-600 hover:bg-red-700" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"} tabIndex={-1}>
                    {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  {isTranscribing && <span className="ml-2 text-xs text-blue-600 dark:text-blue-300 animate-pulse">
                      Transcribing voice...
                    </span>}
                </div>
                <div className="flex-1">
                  <ChatInput inputMessage={inputMessage} onInputChange={handleInputChange} onKeyPress={handleKeyPress} onSend={handleSendMessage} textareaRef={textareaRef} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}

// ... end of file