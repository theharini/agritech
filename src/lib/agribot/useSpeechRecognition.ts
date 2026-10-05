"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AgriLanguage, I18N_STRINGS } from "./i18n";

// Type definitions for Web Speech API
interface SpeechRecognitionEventLike extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal?: boolean;
    };
    length: number;
  };
  resultIndex: number;
}

interface SpeechRecognitionErrorEventLike extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
}

interface UseSpeechRecognitionProps {
  language: AgriLanguage;
  onTranscriptComplete?: (transcript: string) => void;
}

export function useSpeechRecognition({
  language,
  onTranscriptComplete,
}: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const languageRef = useRef(language);
  const onTranscriptCompleteRef = useRef(onTranscriptComplete);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    onTranscriptCompleteRef.current = onTranscriptComplete;
  }, [onTranscriptComplete]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Window typing cast
    const win = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    };

    const SpeechRecognitionClass =
      win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = languageRef.current;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const res = event.results[i];
          if (res && res[0]) {
            currentTranscript += res[0].transcript;
          }
        }
        setTranscript(currentTranscript);

        // Check if final
        const lastResult = event.results[event.results.length - 1];
        if (lastResult?.isFinal && currentTranscript.trim()) {
          onTranscriptCompleteRef.current?.(currentTranscript.trim());
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        console.warn("Speech Recognition Error:", event.error);
        setIsListening(false);
        const strings = I18N_STRINGS[languageRef.current];

        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setErrorMessage(strings.micPermissionDenied);
        } else if (event.error === "no-speech") {
          setErrorMessage(strings.noSpeechDetected);
        } else {
          setErrorMessage(`Error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn("Speech recognition initialization failed:", e);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // Update recognition language when prop changes
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = language;
    }
  }, [language]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      if (!isSupported) {
        setErrorMessage(I18N_STRINGS[languageRef.current].speechNotSupported);
      }
      return;
    }

    try {
      setTranscript("");
      setErrorMessage(null);
      recognitionRef.current.lang = languageRef.current;
      recognitionRef.current.start();
    } catch {
      // In case start was called when already active
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    setTranscript,
    isSupported,
    errorMessage,
    setErrorMessage,
    startListening,
    stopListening,
  };
}
