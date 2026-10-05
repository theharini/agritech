"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Camera,
  Send,
  X,
  Trash2,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  Wifi,
  WifiOff,
} from "lucide-react";
import {
  AgriLanguage,
  AgriCrop,
  SUPPORTED_LANGUAGES,
  CROPS_LIST,
  CROP_LABELS,
  I18N_STRINGS,
  OFFLINE_CROP_ADVISORY,
} from "@/lib/agribot/i18n";
import { useSpeechRecognition } from "@/lib/agribot/useSpeechRecognition";
import { useSpeechSynthesis } from "@/lib/agribot/useSpeechSynthesis";

const LOCAL_STORAGE_LANG_KEY = "agribot_preferred_language";
const LOCAL_STORAGE_CROP_KEY = "agribot_preferred_crop";

export function AgriBotVoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<AgriLanguage>("en-IN");
  const [crop, setCrop] = useState<AgriCrop>("tomato");
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCameraMenu, setShowCameraMenu] = useState(false);

  // Advisory State
  const [advisoryResponse, setAdvisoryResponse] = useState<string | null>(null);
  const [responseIsOffline, setResponseIsOffline] = useState(false);
  const [statusMessageState, setStatusMessageState] = useState<
    "idle" | "listening" | "thinking" | "ready"
  >("idle");

  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  // Initialize from LocalStorage and Online Status
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      try {
        const savedLang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY) as AgriLanguage;
        if (savedLang && SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)) {
          setLanguage(savedLang);
        }

        const savedCrop = localStorage.getItem(LOCAL_STORAGE_CROP_KEY) as AgriCrop;
        if (savedCrop && CROPS_LIST.includes(savedCrop)) {
          setCrop(savedCrop);
        }
      } catch {
        // Ignore localStorage access issues
      }

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  // Save changes to LocalStorage
  const handleLanguageChange = (newLang: AgriLanguage) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, newLang);
    } catch {}
  };

  const handleCropChange = (newCrop: AgriCrop) => {
    setCrop(newCrop);
    try {
      localStorage.setItem(LOCAL_STORAGE_CROP_KEY, newCrop);
    } catch {}
  };

  // Text-To-Speech
  const { isSpeaking, speak, stop: stopSpeech, hasVoiceWarning } = useSpeechSynthesis({
    language,
  });

  // Speech-To-Text
  const {
    isListening,
    transcript,
    setTranscript,
    errorMessage: sttError,
    setErrorMessage: setSttError,
    startListening,
    stopListening,
  } = useSpeechRecognition({
    language,
    onTranscriptComplete: (finalTranscript) => {
      setInputText(finalTranscript);
      handleSendQuery(finalTranscript);
    },
  });

  // Keep live transcript visible in input
  useEffect(() => {
    if (isListening && transcript) {
      setInputText(transcript);
      setStatusMessageState("listening");
    } else if (!isListening && statusMessageState === "listening") {
      if (!isLoading) {
        setStatusMessageState(advisoryResponse ? "ready" : "idle");
      }
    }
  }, [isListening, transcript, advisoryResponse, isLoading, statusMessageState]);

  // Handle client-side canvas compression for images
  const processImageFile = (file: File) => {
    setShowCameraMenu(false);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 1024;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.82);
          setSelectedImage(compressedBase64);
        }
      };
      if (typeof e.target?.result === "string") {
        img.src = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  // Query Execution (Backend or Offline Fallback)
  const handleSendQuery = async (queryText?: string) => {
    const textToSend = queryText !== undefined ? queryText : inputText;
    const currentStrings = I18N_STRINGS[language];

    // If both empty and no image, provide default help
    if (!textToSend.trim() && !selectedImage) {
      return;
    }

    setIsLoading(true);
    setStatusMessageState("thinking");
    setSttError(null);

    // If browser is offline, instantly use offline verified advisory
    if (!navigator.onLine || !isOnline) {
      const offlineText =
        OFFLINE_CROP_ADVISORY[language]?.[crop] ||
        OFFLINE_CROP_ADVISORY["en-IN"].tomato;
      setAdvisoryResponse(offlineText);
      setResponseIsOffline(true);
      setIsLoading(false);
      setStatusMessageState("ready");
      speak(offlineText, language);
      return;
    }

    try {
      const res = await fetch("/api/agribot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend || currentStrings.defaultImagePrompt,
          language,
          crop,
          imageBase64: selectedImage || undefined,
          mimeType: "image/jpeg",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || OFFLINE_CROP_ADVISORY[language][crop];
        setAdvisoryResponse(replyText);
        setResponseIsOffline(Boolean(data.isOffline));
        setStatusMessageState("ready");
        // Automatically speak response
        speak(replyText, language);
      } else {
        throw new Error("Server responded with error");
      }
    } catch (err) {
      console.warn("AgriBot API fetch error, switching to offline fallback:", err);
      const fallback =
        OFFLINE_CROP_ADVISORY[language]?.[crop] ||
        OFFLINE_CROP_ADVISORY["en-IN"].tomato;
      setAdvisoryResponse(fallback);
      setResponseIsOffline(true);
      setStatusMessageState("ready");
      speak(fallback, language);
    } finally {
      setIsLoading(false);
      setInputText("");
      // Keep or clear image as preferred (we keep preview until query completes, then clear)
      setSelectedImage(null);
    }
  };

  // Toggle Speak / Stop
  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeech();
    } else if (advisoryResponse) {
      speak(advisoryResponse, language);
    }
  };

  // Clear Advisory
  const handleClear = () => {
    stopSpeech();
    setAdvisoryResponse(null);
    setInputText("");
    setSelectedImage(null);
    setStatusMessageState("idle");
    setTranscript("");
    setSttError(null);
  };

  const strings = I18N_STRINGS[language];

  // Helper for status text
  const getMicStatusText = () => {
    if (sttError) return sttError;
    if (isListening) return strings.listening;
    if (isLoading || statusMessageState === "thinking") return strings.thinking;
    if (advisoryResponse || statusMessageState === "ready") return strings.advisoryReady;
    return strings.tapToSpeak;
  };

  return (
    <>
      {/* 1. Floating Pill Button at Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={strings.voiceAdvisory}
          className="flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-medium rounded-full shadow-lg shadow-emerald-900/40 hover:shadow-emerald-600/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/30 backdrop-blur-sm"
        >
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white/20">
            <Mic className="w-4 h-4 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </div>
          <span className="text-sm font-semibold tracking-wide drop-shadow-sm">
            {strings.voiceAdvisory}
          </span>
        </button>
      </div>

      {/* 2. Chat Panel (Dark Navy Card, Rounded Corners, Emerald Accents) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={strings.title}
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[440px] max-h-[85vh] flex flex-col bg-[#0B1528] border border-emerald-500/30 rounded-2xl shadow-2xl shadow-black/80 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0F2027]/90 via-[#203A43]/90 to-[#0F2027]/90 border-b border-emerald-500/20 text-white">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 shadow-inner">
                <span className="text-lg">🌽</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-emerald-100 flex items-center gap-1.5">
                  AgriBot Voice Assistant
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Status Chip */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  isOnline
                    ? "bg-emerald-950/70 text-emerald-300 border-emerald-500/40"
                    : "bg-amber-950/70 text-amber-300 border-amber-500/40"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }`}
                />
                <span>{isOnline ? strings.onlineStatus : strings.offlineStatus}</span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => {
                  stopSpeech();
                  stopListening();
                  setIsOpen(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Zone */}
          <div
            ref={chatScrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar text-slate-100 text-sm"
          >
            {/* Settings Row (Language & Crop Selectors) */}
            <div className="grid grid-cols-2 gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              {/* Language Dropdown */}
              <div>
                <label className="block text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  {strings.languageLabel}
                </label>
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as AgriLanguage)}
                  className="w-full bg-[#111C33] text-xs font-medium text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Crop Dropdown */}
              <div>
                <label className="block text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                  {strings.cropLabel}
                </label>
                <select
                  value={crop}
                  onChange={(e) => handleCropChange(e.target.value as AgriCrop)}
                  className="w-full bg-[#111C33] text-xs font-medium text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  {CROPS_LIST.map((cropKey) => (
                    <option key={cropKey} value={cropKey} className="bg-slate-900 text-white">
                      {CROP_LABELS[language][cropKey] || cropKey}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Voice Warning if applicable */}
            {hasVoiceWarning && (
              <div className="p-2 bg-amber-950/40 border border-amber-600/30 rounded-lg text-xs text-amber-300">
                {strings.noVoiceWarning}
              </div>
            )}

            {/* Dashed-Border Mic Zone */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-slate-900/40 transition-all">
              <div className="relative mb-3">
                {isListening && (
                  <span className="absolute -inset-2.5 rounded-full bg-emerald-500/30 animate-ping" />
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (isListening) {
                      stopListening();
                    } else {
                      stopSpeech();
                      startListening();
                    }
                  }}
                  className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 shadow-xl ${
                    isListening
                      ? "bg-red-600 text-white shadow-red-600/50 scale-105"
                      : "bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-emerald-500/40 hover:scale-105 active:scale-95"
                  }`}
                  aria-label={isListening ? "Stop Listening" : "Start Voice Input"}
                >
                  {isListening ? (
                    <MicOff className="w-7 h-7 animate-bounce" />
                  ) : (
                    <Mic className="w-7 h-7" />
                  )}
                </button>
              </div>

              {/* Status Line */}
              <p className="text-xs font-medium text-center text-slate-300 px-2 line-clamp-2">
                {getMicStatusText()}
              </p>
            </div>

            {/* Response Card (shown when an advisory response is ready) */}
            {advisoryResponse && (
              <div className="p-4 rounded-xl bg-[#0F1B30] border border-emerald-500/30 shadow-lg space-y-3 animate-in fade-in duration-300">
                {/* Badge Row */}
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold ${
                      responseIsOffline
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {responseIsOffline ? strings.offlineResponse : strings.onlineResponse}
                  </span>

                  <span className="text-[11px] text-slate-400">
                    {CROP_LABELS[language][crop]}
                  </span>
                </div>

                {/* Advice text with bullet points */}
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-1">
                  {advisoryResponse}
                </div>

                {/* Action Buttons: Speak Toggle & Clear */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={handleToggleSpeak}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                      isSpeaking
                        ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400"
                        : "bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                    }`}
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-4 h-4 animate-pulse" />
                        <span>{strings.speaking}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>{strings.speak}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleClear}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{strings.clear}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Image Thumbnail Preview (if attached) */}
          {selectedImage && (
            <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-emerald-500/50">
                  <img
                    src={selectedImage}
                    alt="Crop preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs text-slate-300">
                  <p className="font-semibold text-emerald-400">Crop Image Attached</p>
                  <p className="text-[10px] text-slate-400">Ready for Gemini diagnosis</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                aria-label={strings.removeImage}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Camera Menu Modal / Popup */}
          {showCameraMenu && (
            <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex-1 py-1.5 px-2 rounded-lg text-xs bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 flex items-center justify-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{strings.takePhoto}</span>
              </button>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="flex-1 py-1.5 px-2 rounded-lg text-xs bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 flex items-center justify-center gap-1.5"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{strings.chooseGallery}</span>
              </button>
            </div>
          )}

          {/* Hidden File Inputs for Camera and Gallery */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                processImageFile(e.target.files[0]);
              }
            }}
          />
          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                processImageFile(e.target.files[0]);
              }
            }}
          />

          {/* Input Bar (Camera on left, text input, send on right) */}
          <div className="p-3 bg-[#0B1528] border-t border-emerald-500/20 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCameraMenu(!showCameraMenu)}
              className={`p-2.5 rounded-xl border transition-all ${
                selectedImage
                  ? "bg-emerald-600 text-white border-emerald-400"
                  : "bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700"
              }`}
              aria-label="Upload crop photo"
            >
              <Camera className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  e.preventDefault();
                  handleSendQuery();
                }
              }}
              placeholder={strings.inputPlaceholder}
              className="flex-1 bg-slate-900/90 text-slate-100 placeholder-slate-500 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />

            <button
              type="button"
              disabled={isLoading || (!inputText.trim() && !selectedImage)}
              onClick={() => handleSendQuery()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 disabled:opacity-40 disabled:hover:from-emerald-600 disabled:hover:to-green-600 text-white shadow-md shadow-emerald-950 transition-all cursor-pointer"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
