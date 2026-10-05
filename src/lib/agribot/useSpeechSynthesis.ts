"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AgriLanguage, I18N_STRINGS } from "./i18n";

export function cleanTextForSpeech(text: string): string {
  return text
    .replace(/[#*`_~]/g, "") // Remove markdown formatting
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Simplify links
    .replace(/•/g, "") // Remove bullet symbols so speaker doesn't say "bullet"
    .replace(/\s+/g, " ")
    .trim();
}

interface UseSpeechSynthesisProps {
  language: AgriLanguage;
}

export function useSpeechSynthesis({ language }: UseSpeechSynthesisProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [hasVoiceWarning, setHasVoiceWarning] = useState(false);

  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const languageRef = useRef(language);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const loadVoices = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const voices = window.speechSynthesis.getVoices();
    voicesRef.current = voices;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setIsSupported(false);
      return;
    }

    synthRef.current = window.speechSynthesis;
    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthRef.current) {
        try {
          synthRef.current.cancel();
        } catch {
          // ignore
        }
      }
    };
  }, [loadVoices]);

  const stop = useCallback(() => {
    if (synthRef.current) {
      try {
        synthRef.current.cancel();
      } catch {
        // ignore
      }
    }
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (rawText: string, targetLanguage?: AgriLanguage) => {
      if (!synthRef.current || !rawText.trim()) return;

      const langToUse = targetLanguage || languageRef.current;
      const cleanText = cleanTextForSpeech(rawText);

      // Cancel any ongoing speech
      try {
        synthRef.current.cancel();
      } catch {
        // ignore
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utteranceRef.current = utterance;
      utterance.lang = langToUse;
      utterance.rate = 0.95; // Slightly slower for clarity in rural agriculture advisories
      utterance.pitch = 1.0;

      // Find best matching voice
      const voices = voicesRef.current.length > 0 ? voicesRef.current : synthRef.current.getVoices();
      const langPrefix = langToUse.split("-")[0].toLowerCase();

      // 1. Exact match e.g. "ta-IN"
      let selectedVoice = voices.find(
        (v) => v.lang.toLowerCase() === langToUse.toLowerCase()
      );

      // 2. Starts with primary tag e.g. "ta"
      if (!selectedVoice) {
        selectedVoice = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith(langPrefix) ||
            v.lang.toLowerCase().replace("_", "-").startsWith(langPrefix)
        );
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
        setHasVoiceWarning(false);
      } else {
        // Graceful fallback to default
        setHasVoiceWarning(true);
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis error:", e);
        setIsSpeaking(false);
      };

      try {
        synthRef.current.speak(utterance);
      } catch (err) {
        console.warn("Failed to initiate speech:", err);
        setIsSpeaking(false);
      }
    },
    []
  );

  return {
    isSpeaking,
    isSupported,
    hasVoiceWarning,
    speak,
    stop,
  };
}
