
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/ChatSidebar";

export default function Index() {
  const [message, setMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const handlePersonalizeClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      toast({
        title: "File selected",
        description: `You selected: ${file.name}`,
      });
      // TODO: Add file upload logic here
      console.log("Selected file:", file);
      // You may want to clear the file input here for UX reasons:
      event.target.value = "";
    }
  };

  const handleChatbot = () => {
    setIsChatOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full text-foreground flex flex-col items-center justify-center px-4 bg-gradient-to-br from-orange-400 via-orange-300 to-orange-600">
        <div className="max-w-2xl w-full space-y-8">
          {/* Hero Headline */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight">
              READ.ME
            </h1>
            <p className="text-xl text-muted-foreground">
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
              />
              <Button
                onClick={handlePersonalizeClick}
                className="w-full flex items-center justify-center gap-2"
                variant="secondary"
              >
                Let me read your resume
                <Upload className="h-4 w-4" />
              </Button>
              <Button onClick={handleChatbot} variant="secondary" className="w-full">
                Open Chatbot
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </SidebarProvider>
  );
}
