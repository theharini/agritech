import { NextRequest, NextResponse } from "next/server";
import {
  AgriLanguage,
  AgriCrop,
  OFFLINE_CROP_ADVISORY,
  CROP_LABELS,
  SUPPORTED_LANGUAGES,
} from "@/lib/agribot/i18n";

function stripMarkdown(text: string): string {
  return text
    .replace(/[#*`_~]/g, "") // Strip bold, italic, headers, backticks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Strip links
    .trim();
}

const LANGUAGE_NAMES: Record<AgriLanguage, string> = {
  "en-IN": "English (Indian Agriculture terminology)",
  "ta-IN": "Tamil (தமிழ்)",
  "hi-IN": "Hindi (हिन्दी)",
  "ml-IN": "Malayalam (മലയാളം)",
  "te-IN": "Telugu (తెలుగు)",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, language = "en-IN", crop = "tomato", imageBase64, mimeType = "image/jpeg" } = body;

    const safeLanguage = (language as AgriLanguage) in OFFLINE_CROP_ADVISORY ? (language as AgriLanguage) : "en-IN";
    const safeCrop = (crop as AgriCrop) in (OFFLINE_CROP_ADVISORY[safeLanguage] || {}) ? (crop as AgriCrop) : "tomato";

    const langName = LANGUAGE_NAMES[safeLanguage] || "English";
    const cropLabel = CROP_LABELS[safeLanguage]?.[safeCrop] || safeCrop;

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is missing, immediately return high-quality localized fallback
    if (!apiKey) {
      const offlineAdvice =
        OFFLINE_CROP_ADVISORY[safeLanguage]?.[safeCrop] ||
        OFFLINE_CROP_ADVISORY["en-IN"].tomato;

      return NextResponse.json({
        success: true,
        reply: stripMarkdown(offlineAdvice),
        isOffline: true,
        note: "API Key not configured. Serving offline verified advisory.",
      });
    }

    const systemPrompt = `You are AgriBot, an expert agricultural advisor for Indian farmers. Reply ONLY in ${langName}. The farmer is growing ${cropLabel}. Give short, practical, bullet-point advice (max 5 bullets) on irrigation, pests, disease, fertilizer, weather, and market tips. Use simple farmer-friendly words and local units (acre, kg, litre). If an image is provided, identify the crop problem (disease, pest, nutrient deficiency), name it, and give treatment steps with organic options first. If unsure, say so and recommend contacting the local agriculture officer. Kisan helpline: 1800-180-1551. Do not use markdown bolding like ** or headings like ##, format with clear bullet points using • .`;

    const userPrompt = message?.trim()
      ? message.trim()
      : "Analyze this crop and advise me on current best practices, pest control, and irrigation.";

    // Build Gemini request contents
    const userParts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [];
    userParts.push({ text: userPrompt });

    if (imageBase64) {
      // Strip base64 header if present (e.g. data:image/jpeg;base64,...)
      const cleanedBase64 = imageBase64.includes(",")
        ? imageBase64.split(",")[1]
        : imageBase64;

      userParts.push({
        inline_data: {
          mime_type: mimeType,
          data: cleanedBase64,
        },
      });
    }

    const payload = {
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          role: "user",
          parts: userParts,
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 800,
      },
    };

    // Try gemini-2.5-flash first, then gemini-1.5-flash fallback
    const models = ["gemini-2.5-flash", "gemini-1.5-flash"];
    let apiResponseText: string | null = null;
    let usedModel = "gemini-2.5-flash";

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(18000), // 18s timeout
        });

        if (res.ok) {
          const data = await res.json();
          const candidateText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            apiResponseText = candidateText;
            usedModel = model;
            break;
          }
        } else {
          console.warn(`Gemini API ${model} failed with status:`, res.status);
        }
      } catch (err) {
        console.warn(`Gemini API error with ${model}:`, err);
      }
    }

    if (apiResponseText) {
      const cleanReply = stripMarkdown(apiResponseText);
      return NextResponse.json({
        success: true,
        reply: cleanReply,
        isOffline: false,
        model: usedModel,
      });
    }

    // If both models failed or timed out, gracefully return offline advisory
    const fallbackAdvice =
      OFFLINE_CROP_ADVISORY[safeLanguage]?.[safeCrop] ||
      OFFLINE_CROP_ADVISORY["en-IN"].tomato;

    return NextResponse.json({
      success: true,
      reply: stripMarkdown(fallbackAdvice),
      isOffline: true,
      note: "Live AI temporarily unavailable. Displaying verified crop guidance.",
    });
  } catch (error: unknown) {
    console.error("AgriBot API Route Exception:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        reply:
          "• Check soil moisture before irrigating.\n• Spray 5ml Neem Oil/L water for pest prevention.\n• Kisan Helpline: 1800-180-1551.",
        isOffline: true,
      },
      { status: 200 } // Return 200 with fallback so client doesn't crash
    );
  }
}
