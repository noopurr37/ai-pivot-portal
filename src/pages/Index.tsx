
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Index() {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      // TODO: Implement chat functionality
      setMessage("");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      toast({
        title: "File selected",
        description: `You selected: ${file.name}`,
      });
      // TODO: Add file upload logic here, e.g., upload to Supabase
      console.log("Selected file:", file);
    }
  };

  const handleChatbot = () => {
    navigate("/chatbot");
  };

  return (
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
          <div className="flex gap-2">
            <Button onClick={handleUploadClick} variant="outline" size="icon" className="h-12 w-12 shrink-0">
              <Upload className="h-4 w-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <Button onClick={handleSend} className="w-full" disabled={!message.trim()}>
            Personalize
          </Button>
          <Button onClick={handleChatbot} variant="secondary" className="w-full">
            Open Chatbot
          </Button>
        </div>
      </div>
    </div>
  );
}
