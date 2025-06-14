
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export function useVoiceInput({ onResult }: { onResult: (text: string) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    setError(null);
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError("Microphone not supported.");
      toast({
        title: "Microphone not supported",
        variant: "destructive",
      });
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };
      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsTranscribing(true);
        // Combine into a single Blob
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        // Read as base64 for sending
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const base64Audio = (reader.result as string).split(",")[1];
            // Send to Supabase Edge Function for transcription
            const res = await fetch("/functions/v1/voice-to-text", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ audio: base64Audio }),
            });
            const data = await res.json();
            if (res.ok && data.text) {
              onResult(data.text);
              setIsTranscribing(false);
            } else {
              setError(data.error || "Transcription failed");
              setIsTranscribing(false);
              toast({
                title: "Transcription failed",
                description: data.error,
                variant: "destructive",
              });
            }
          } catch (err: any) {
            setError(err?.message || "Transcription failed");
            setIsTranscribing(false);
            toast({
              title: "Voice to text error",
              description: err?.message,
              variant: "destructive",
            });
          }
        };
        reader.readAsDataURL(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err: any) {
      setError("Could not start microphone: " + err?.message);
      toast({
        title: "Microphone error",
        description: err?.message,
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return { isRecording, isTranscribing, error, startRecording, stopRecording };
}
