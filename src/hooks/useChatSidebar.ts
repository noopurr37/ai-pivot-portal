
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

export function useChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const { resumeText } = useResume();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
      // NEW: Use a minimal system message as instructed
      const systemContent = "My name is Read Me. I can answer all questions about Noopur's resume.";

      const res = await fetch("/functions/v1/openai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemContent },
            ...toOpenAIMessages([...messages, userMessage])
          ],
        }),
      });

      if (!res.ok) {
        let errorText = '';
        try {
          errorText = await res.text();
        } catch (err) {
          errorText = 'No response body';
        }
        console.error(
          `Error from Edge Function (status ${res.status}):\n${errorText}`
        );
        let errorMessage = `Edge Function error (${res.status})`;
        if (res.status === 404) {
          errorMessage = "Chatbot backend not found (404). Please check that the openai-chat Edge Function is deployed.";
        }
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
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
    handleSendMessage,
    handleKeyPress,
    handleInputChange,
    messagesEndRef,
    textareaRef,
    setInputMessage,
  };
}
