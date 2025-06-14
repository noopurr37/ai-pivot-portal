
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useResume } from "@/context/ResumeContext";

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const toOpenAIMessages = (messages: Message[]) =>
  messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

// EMBEDDED: Flowise API endpoint for inference
const FLOWISE_API_URL = "https://cloud.flowiseai.com/api/v1/prediction/9064846d-e68d-4a0f-8a1d-ef017f7197df";

export function useChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { resumeText } = useResume();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Prepare payload for Flowise API
      const payload: Record<string, any> = { question: inputMessage };

      // Optionally, attach resume text if you wish to send user context
      // if (resumeText) payload.resume = resumeText;

      const res = await fetch(FLOWISE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorText = '';
        try {
          errorText = await res.text();
        } catch (err) {
          errorText = 'No response body';
        }
        let errorMessage = `Flowise API error (${res.status})`;
        if (errorText) {
          errorMessage += `: ${errorText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      // Expecting Flowise returns { text: "answer" } or { response: "answer" }
      const reply = data.text ?? data.response ?? JSON.stringify(data);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: reply,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "API Error",
        description: error?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    const textarea = e.target;
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    textarea.style.height = Math.min(scrollHeight, 200) + 'px';
  };

  return {
    messages,
    inputMessage,
    isLoading,
    setInputMessage,
    handleSendMessage,
    handleKeyPress,
    handleInputChange,
    messagesEndRef,
    textareaRef,
  };
}

