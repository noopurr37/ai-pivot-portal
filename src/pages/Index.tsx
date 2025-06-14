import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ChatSidebar";
export default function Index() {
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
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
          setFilePreview(e.target?.result as string);
        };
        reader.readAsText(file);
      } else {
        setFilePreview(null);
      }
      console.log("Selected file:", file);
      event.target.value = "";
    }
  };
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFilePreview(null);
  };
  const handleChatbot = () => {
    setIsChatOpen(true);
  };
  const renderFilePreview = () => {
    if (!uploadedFile || !filePreview) return null;
    if (uploadedFile.type.startsWith('image/')) {
      return <div className="relative">
          <img src={filePreview} alt={uploadedFile.name} className="max-w-full max-h-96 rounded-lg shadow-md" />
        </div>;
    } else if (uploadedFile.type.startsWith('video/')) {
      return <div className="relative">
          <video src={filePreview} controls className="max-w-full max-h-96 rounded-lg shadow-md">
            Your browser does not support the video tag.
          </video>
        </div>;
    } else if (uploadedFile.type.startsWith('text/') || uploadedFile.name.endsWith('.txt') || uploadedFile.name.endsWith('.md')) {
      return <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <pre className="whitespace-pre-wrap text-sm max-h-96 overflow-y-auto">
            {filePreview}
          </pre>
        </div>;
    } else {
      return <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <p className="text-gray-600 dark:text-gray-400">
            File uploaded: {uploadedFile.name}
          </p>
          <p className="text-sm text-gray-500">
            Preview not available for this file type
          </p>
        </div>;
    }
  };
  return <SidebarProvider>
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
              <input ref={fileInputRef} type="file" style={{
              display: "none"
            }} onChange={handleFileChange} accept="image/*,video/*,text/*,.txt,.md,.pdf,.doc,.docx" />
              <Button onClick={handlePersonalizeClick} variant="secondary" className="w-full flex items-center justify-center gap-2 rounded-lg">
                Let me read your resume
                <Upload className="h-4 w-4" />
              </Button>
              <Button onClick={handleChatbot} variant="secondary" className="w-full">
                Open Chatbot
              </Button>
            </div>
          </div>

          {/* File Preview Section */}
          {uploadedFile && <div className="bg-card p-6 rounded-lg shadow-lg">
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
            </div>}
        </div>
      </div>
      
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </SidebarProvider>;
}