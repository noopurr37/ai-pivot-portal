
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Index() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      // TODO: Implement chat functionality
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Hero Headline */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Upload Your Resume
          </h1>
          <p className="text-xl text-muted-foreground">
            Get AI-powered insights and feedback on your resume
          </p>
        </div>

        {/* Chat Interface */}
        <div className="space-y-4 bg-card p-6 rounded-lg shadow-lg">
          <Textarea
            placeholder="Personalize your Digital Twin resume."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <Button 
            onClick={handleSend}
            className="w-full"
            disabled={!message.trim()}
          >
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
}
