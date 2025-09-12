import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SpeechFeaturesProps {
  onSpeechToText?: (text: string) => void;
  textToRead?: string;
}

export const SpeechFeatures: React.FC<SpeechFeaturesProps> = ({
  onSpeechToText,
  textToRead
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognition = useRef<any>(null);
  const { toast } = useToast();

  // Initialize Speech Recognition
  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-IN';

      recognition.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');

        if (event.results[event.results.length - 1].isFinal) {
          onSpeechToText?.(transcript);
        }
      };

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: "Please check your microphone and try again.",
          variant: "destructive"
        });
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  const startListening = () => {
    if (!recognition.current) {
      initializeSpeechRecognition();
    }

    if (recognition.current) {
      try {
        recognition.current.start();
        setIsListening(true);
        toast({
          title: "Listening...",
          description: "Speak now to convert your speech to text."
        });
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast({
          title: "Error",
          description: "Could not start speech recognition.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        toast({
          title: "Text-to-Speech Error",
          description: "Could not read the text aloud.",
          variant: "destructive"
        });
      };

      window.speechSynthesis.speak(utterance);
      
      toast({
        title: "Reading Text",
        description: "Text is being read aloud."
      });
    } else {
      toast({
        title: "Not Supported",
        description: "Text-to-speech is not supported in this browser.",
        variant: "destructive"
      });
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Speech-to-Text Button */}
      {onSpeechToText && (
        <Button
          variant={isListening ? "destructive" : "outline"}
          size="sm"
          onClick={isListening ? stopListening : startListening}
          className="flex items-center gap-2"
        >
          {isListening ? (
            <>
              <MicOff className="w-4 h-4" />
              Stop
            </>
          ) : (
            <>
              <Mic className="w-4 h-4" />
              Speak
            </>
          )}
        </Button>
      )}

      {/* Text-to-Speech Button */}
      {textToRead && (
        <Button
          variant={isSpeaking ? "destructive" : "outline"}
          size="sm"
          onClick={isSpeaking ? stopSpeaking : () => speak(textToRead)}
          className="flex items-center gap-2"
        >
          {isSpeaking ? (
            <>
              <VolumeX className="w-4 h-4" />
              Stop
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4" />
              Listen
            </>
          )}
        </Button>
      )}
    </div>
  );
};

// Extend the Window interface for TypeScript
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}