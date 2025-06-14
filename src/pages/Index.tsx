import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ChatSidebar";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ResumeProvider, useResume } from "@/context/ResumeContext";

export default function Index() {
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    toast
  } = useToast();
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
      } else if (file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = e => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
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
    setIsChatOpen(true);
  };
  const renderFilePreview = () => {
    if (!uploadedFile || !filePreview) return null;

    if (uploadedFile.type.startsWith('image/')) {
      return (
        <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={filePreview} 
              alt={uploadedFile.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    } else if (uploadedFile.type.startsWith('video/')) {
      if (showVideoPlayer) {
        return (
          <VideoPlayer 
            src={filePreview} 
            fileName={uploadedFile.name}
            onClose={() => setShowVideoPlayer(false)}
          />
        );
      } else {
        return (
          <div className="flex justify-center">
            <div 
              className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg cursor-pointer relative group"
              onClick={() => setShowVideoPlayer(true)}
            >
              <video 
                src={filePreview} 
                className="w-full h-full object-cover"
                muted
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded-full p-3">
                  <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else if (uploadedFile.type.startsWith('text/') || uploadedFile.name.endsWith('.txt') || uploadedFile.name.endsWith('.md')) {
      return (
        <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            <div className="p-4 text-center overflow-y-auto max-h-full">
              <pre className="whitespace-pre-wrap text-xs leading-tight">
                {filePreview.substring(0, 200)}...
              </pre>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center">
          <div className="w-64 h-64 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-white shadow-lg flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {uploadedFile.name}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Preview not available
              </p>
            </div>
          </div>
        </div>
      );
    }
  };
  return (
    <ResumeProvider>
      <div className="min-h-screen w-full text-foreground flex flex-col items-center justify-center px-4 bg-gradient-to-br from-orange-400 via-orange-300 to-orange-600">
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
              <input 
                ref={fileInputRef} 
                type="file" 
                style={{ display: "none" }} 
                onChange={handleFileChange} 
                accept="image/*,video/*,text/*,.txt,.md,.pdf,.doc,.docx" 
              />
              <Button onClick={handlePersonalizeClick} variant="secondary" className="w-full flex items-center justify-center gap-2 rounded-lg">
                Let Me Read Your Resume
                <Upload className="h-4 w-4" />
              </Button>
              <Button onClick={handleChatbot} variant="secondary" className="w-full">
                Open Chatbot
              </Button>
            </div>
          </div>

          {/* File Preview Section */}
          {uploadedFile && (
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Uploaded File</h3>
                <Button onClick={handleRemoveFile} variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                </p>
                {renderFilePreview()}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </ResumeProvider>
  );
}
