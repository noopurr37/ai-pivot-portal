
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      // TODO: Implement chat functionality
      setMessage("");
    }
  };

  const handleUpload = () => {
    console.log("Upload button clicked");
    // TODO: Implement file upload functionality
  };

  const handleChatbot = () => {
    navigate("/chatbot");
  };

  return (
    <div className="min-h-screen w-full text-foreground flex flex-col items-center justify-center px-4 bg-orange-400">
      <div className="max-w-2xl w-full space-y-8">
        {/* Hero Headline */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Upload Your Resume
          </h1>
          <p className="text-xl text-muted-foreground">
            Humanize your Resume through a Digital Twin Profile
          </p>
        </div>

        {/* Chat Interface */}
        <div className="space-y-4 bg-card p-6 rounded-lg shadow-lg">
          <div className="flex gap-2">
            <Textarea 
              placeholder="Personalize your Digital Twin resume." 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              className="min-h-[10px] resize-none flex-1" 
            />
            <Button onClick={handleUpload} variant="outline" size="icon" className="h-12 w-12 shrink-0">
              <Upload className="h-4 w-4" />
            </Button>
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
