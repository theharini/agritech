import {
  SCHEMES_DATABASE,
  FAQ_ITEMS,
  CROP_PRICE_DATA,
  BLOG_ARTICLES,
  NEWS_ITEMS,
} from "./db";

export interface KnowledgeChunk {
  id: string;
  sourceType: "Scheme" | "FAQ" | "Advisory" | "Market" | "News" | "Blog";
  titleEn: string;
  titleTa: string;
  textEn: string;
  textTa: string;
  keywords: string[];
}

export interface RetrievalResult {
  chunk: KnowledgeChunk;
  similarity: number;
}

export interface ChatResponse {
  answer: string;
  sources: { title: string; type: string }[];
  isFound: boolean;
}

// Build Comprehensive Knowledge Base Chunks
export function buildKnowledgeBase(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  // 1. Schemes
  SCHEMES_DATABASE.forEach((scheme) => {
    chunks.push({
      id: `chunk-scheme-${scheme.id}`,
      sourceType: "Scheme",
      titleEn: scheme.titleEn,
      titleTa: scheme.titleTa,
      textEn: `Scheme: ${scheme.titleEn}. Authority: ${scheme.authority}. Summary: ${scheme.summaryEn}. Benefits: ${scheme.benefitsEn}. Eligibility: ${scheme.eligibilityEn}. Mandatory Documents: ${scheme.documentsEn.join(", ")}. Portal: ${scheme.portalUrl}`,
      textTa: `திட்டம்: ${scheme.titleTa}. துறை: ${scheme.authority}. சுருக்கம்: ${scheme.summaryTa}. நன்மைகள்: ${scheme.benefitsTa}. தகுதி: ${scheme.eligibilityTa}. ஆவணங்கள்: ${scheme.documentsTa.join(", ")}. இணையதளம்: ${scheme.portalUrl}`,
      keywords: [
        "scheme",
        "subsidy",
        "grant",
        "apply",
        "eligibility",
        "documents",
        "kisan",
        "pm-kisan",
        "pmfby",
        "insurance",
        "soil health",
        "kalaignar",
        "மானியம்",
        "திட்டம்",
        "விண்ணப்பம்",
        "தகுதி",
        "காப்பீடு",
        "ஆதார்",
        "பட்டா",
      ],
    });
  });

  // 2. FAQs
  FAQ_ITEMS.forEach((faq) => {
    chunks.push({
      id: `chunk-faq-${faq.id}`,
      sourceType: "FAQ",
      titleEn: faq.questionEn,
      titleTa: faq.questionTa,
      textEn: `Question: ${faq.questionEn}. Answer: ${faq.answerEn}`,
      textTa: `கேள்வி: ${faq.questionTa}. பதில்: ${faq.answerTa}`,
      keywords: [
        "faq",
        "question",
        "answer",
        "intermediaries",
        "fertilizer",
        "calculator",
        "npk",
        "payment",
        "rental",
        "tractor",
        "drone",
        "கேள்வி",
        "பதில்",
        "உரம்",
        "கணக்கீடு",
        "வாடகை",
        "டிராக்டர்",
      ],
    });
  });

  // 3. Crop & Fertilizer Advisory
  const advisoryData = [
    {
      id: "advisory-paddy",
      titleEn: "Rice / Paddy Fertilizer & Water Management Guide",
      titleTa: "நெல் பயிர் உர மேலாண்மை மற்றும் பாசன வழிகாட்டி",
      textEn:
        "For Paddy in Alluvial & Clay soils, standard NPK ratio recommendation is 120:40:40 kg/acre. Apply 5 tons well-decomposed FYM (Farm Yard Manure) per acre before final puddling. Apply Nitrogen in 3 splits (basal, tillering, panicle initiation). Maintain 2-5 cm standing water layer during critical flowering stage.",
      textTa:
        "வண்டல் மற்றும் களிமண் நிலங்களில் நெல் சாகுபடிக்கு பரிந்துரைக்கப்படும் NPK உர அளவு 120:40:40 கிலோ/ஏக்கர். கடைசி உழவின் போது ஏக்கருக்கு 5 டன் மக்கிய தொழு உரம் இடவும். தழைச்சத்தை மூன்று தவணைகளாக இட வேண்டும். பூக்கும் தருணத்தில் வயலில் 2-5 செ.மீ நீர் தேங்க வேண்டும்.",
      keywords: [
        "paddy",
        "rice",
        "fertilizer",
        "npk",
        "alluvial",
        "compost",
        "irrigation",
        "nitrogen",
        "potash",
        "நெல்",
        "உரம்",
        "வண்டல்",
        "தழைச்சத்து",
        "பாசனம்",
        "மண்புழு உரம்",
      ],
    },
    {
      id: "advisory-wheat",
      titleEn: "Wheat Fertilizer & Soil Health Recommendation",
      titleTa: "கோதுமை உர மேலாண்மை மற்றும் மண்வள வழிகாட்டி",
      textEn:
        "For Wheat in Sandy Loam or Black soil, recommended NPK is 100:60:40 kg/acre. Apply entire Phosphorus (SSP) and Potash (MOP) as basal dose. Provide first irrigation at Crown Root Initiation (CRI) stage, typically 21 days after sowing.",
      textTa:
        "மணல் கலந்த வண்டல் அல்லது கரிசல் மண்ணில் கோதுமைக்கு பரிந்துரைக்கப்படும் NPK 100:60:40 கிலோ/ஏக்கர். பாஸ்பரஸ் மற்றும் பொட்டாஷ் உரங்களை அடியுரமாக இட வேண்டும். விதைத்த 21 நாட்களுக்குள் முதல் பாசனம் வழங்க வேண்டும்.",
      keywords: [
        "wheat",
        "fertilizer",
        "npk",
        "soil",
        "irrigation",
        "sowing",
        "basal",
        "கோதுமை",
        "உரம்",
        "கரிசல் மண்",
        "பாசனம்",
      ],
    },
    {
      id: "advisory-cotton",
      titleEn: "Cotton Nutrient Management & Pest Protection",
      titleTa: "பருத்தி பயிர் ஊட்டச்சத்து மற்றும் பூச்சி மேலாண்மை",
      textEn:
        "For Cotton in Black Regur soil, recommended NPK is 80:40:40 kg/acre with micronutrient spray (Magnesium Sulphate 0.5% + Borax 0.1%) at flowering. For whitefly control, install yellow sticky traps and spray Diafenthiuron 50% WP @ 250g/acre.",
      textTa:
        "கரிசல் மண்ணில் பருத்திக்கு NPK 80:40:40 கிலோ/ஏக்கர். பூக்கும் தருணத்தில் மெக்னீசியம் சல்பேட் மற்றும் போராக்ஸ் தெளிக்கவும். வெள்ளை ஈ தாக்குதலை கட்டுப்படுத்த ஏக்கருக்கு 10 மஞ்சள் ஒட்டுப் பொறிகளை அமைக்கவும்.",
      keywords: [
        "cotton",
        "pest",
        "whitefly",
        "npk",
        "black soil",
        "regur",
        "borax",
        "spray",
        "பருத்தி",
        "கரிசல்",
        "வெள்ளை ஈ",
        "பூச்சி",
        "உரம்",
      ],
    },
    {
      id: "advisory-tomato",
      titleEn: "Tomato & Vegetable Blossom Rot & Disease Guide",
      titleTa: "தக்காளி மற்றும் காய்கறி நோய் தடுப்பு வழிகாட்டி",
      textEn:
        "Blossom end rot in tomato is caused by Calcium (Ca) deficiency and uneven watering. Spray Calcium Nitrate @ 2g/liter on foliage twice during fruit formation and avoid prolonged dry spells between irrigation.",
      textTa:
        "தக்காளியில் பழ அழுகல் நோய் கால்சியம் குறைபாடு மற்றும் சீரற்ற பாசனத்தால் ஏற்படுகிறது. பழம் பிடிக்கும் தருணத்தில் கால்சியம் நைட்ரேட் லிட்டருக்கு 2 கிராம் வீதம் தெளிக்கவும்.",
      keywords: [
        "tomato",
        "vegetable",
        "rot",
        "calcium",
        "deficiency",
        "watering",
        "தக்காளி",
        "காய்கறி",
        "கால்சியம்",
        "அழுகல்",
        "நோய்",
      ],
    },
  ];

  advisoryData.forEach((adv) => {
    chunks.push({
      id: adv.id,
      sourceType: "Advisory",
      titleEn: adv.titleEn,
      titleTa: adv.titleTa,
      textEn: adv.textEn,
      textTa: adv.textTa,
      keywords: adv.keywords,
    });
  });

  // 4. Market Prices
  Object.values(CROP_PRICE_DATA).forEach((crop) => {
    chunks.push({
      id: `chunk-market-${crop.id}`,
      sourceType: "Market",
      titleEn: `Current Market Price for ${crop.id.toUpperCase()}`,
      titleTa: `${crop.id.toUpperCase()} விளைபொருளின் தற்போதைய சந்தை விலை`,
      textEn: `Crop: ${crop.id}. Benchmark APMC Mandi Price: ₹${crop.currentPrice} per quintal. 24-hour variation: ${crop.change > 0 ? "+" : ""}${crop.change}%. Trend: ${crop.trend}. Mandi baseline benchmark is ₹${crop.mandiBenchmark} per quintal.`,
      textTa: `பயிர்: ${crop.id}. ஒழுங்குமுறை விற்பனைக்கூட தற்போதைய விலை: குவிண்டாலுக்கு ₹${crop.currentPrice}. 24 மணி நேர மாற்றம்: ${crop.change}%. விலை போக்கு: ${crop.trend === "increasing" ? "விலை ஏற்றம்" : "விலை குறைவு"}.`,
      keywords: [
        "price",
        "market",
        "mandi",
        "rate",
        "quintal",
        "trend",
        crop.id,
        "விலை",
        "சந்தை",
        "மண்டி",
        "குவிண்டால்",
      ],
    });
  });

  // 5. News & Blogs
  NEWS_ITEMS.forEach((news) => {
    chunks.push({
      id: `chunk-news-${news.id}`,
      sourceType: "News",
      titleEn: news.titleEn,
      titleTa: news.titleTa,
      textEn: `News Title: ${news.titleEn}. Source: ${news.source}. Summary: ${news.summaryEn}`,
      textTa: `செய்தி: ${news.titleTa}. மூலம்: ${news.source}. சுருக்கம்: ${news.summaryTa}`,
      keywords: ["news", "msp", "monsoon", "weather", "forecast", "subsidy", "செய்தி", "மழை", "பருவமழை"],
    });
  });

  BLOG_ARTICLES.forEach((blog) => {
    chunks.push({
      id: `chunk-blog-${blog.id}`,
      sourceType: "Blog",
      titleEn: blog.titleEn,
      titleTa: blog.titleTa,
      textEn: `Article: ${blog.titleEn}. Author: ${blog.author}. Details: ${blog.summaryEn} ${blog.contentEn}`,
      textTa: `கட்டுரை: ${blog.titleTa}. ஆசிரியர்: ${blog.author}. விவரம்: ${blog.summaryTa} ${blog.contentTa}`,
      keywords: ["blog", "drone", "fair price", "technology", "கட்டுரை", "ட்ரோன்", "நியாய விலை"],
    });
  });

  return chunks;
}

const KNOWLEDGE_BASE = buildKnowledgeBase();

// Tokenize words into lower-case clean stems
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0B80-\u0BFF]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

// Compute Cosine Similarity between Query and Document Chunks
export function searchKnowledgeBase(query: string, topK = 3): RetrievalResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const results: RetrievalResult[] = [];

  KNOWLEDGE_BASE.forEach((chunk) => {
    const docTokens = tokenize(
      `${chunk.titleEn} ${chunk.titleTa} ${chunk.textEn} ${chunk.textTa} ${chunk.keywords.join(" ")}`
    );

    const docTokenSet = new Set(docTokens);
    let matchCount = 0;
    let boost = 0;

    queryTokens.forEach((qToken) => {
      if (docTokenSet.has(qToken)) {
        matchCount++;
      }
      // Check keyword tags specifically for extra weighting
      if (chunk.keywords.some((k) => k.toLowerCase().includes(qToken))) {
        boost += 0.5;
      }
      // Check exact title match
      if (
        chunk.titleEn.toLowerCase().includes(qToken) ||
        chunk.titleTa.toLowerCase().includes(qToken)
      ) {
        boost += 0.8;
      }
    });

    if (matchCount > 0) {
      const denom = Math.sqrt(queryTokens.length) * Math.sqrt(Math.min(docTokens.length, 50));
      const rawSimilarity = (matchCount + boost) / Math.max(denom, 1);
      results.push({
        chunk,
        similarity: rawSimilarity,
      });
    }
  });

  results.sort((a, b) => b.similarity - a.similarity);
  return results.slice(0, topK);
}

// Grounded RAG Generator
export async function queryRAG(
  query: string,
  language: "en" | "ta"
): Promise<ChatResponse> {
  const topMatches = searchKnowledgeBase(query, 3);

  // If no good match found or query is completely irrelevant
  const MIN_SIMILARITY_THRESHOLD = 0.12;
  const isFound = topMatches.length > 0 && topMatches[0].similarity >= MIN_SIMILARITY_THRESHOLD;

  if (!isFound) {
    const noMatchMessage =
      language === "ta"
        ? "மன்னிக்கவும், இந்த கேள்விக்கு எங்கள் சரிபார்க்கப்பட்ட விவசாய அறிவுத் தளத்தில் நேரடி தகவல் கிடைக்கவில்லை. தயவுசெய்து ஆலோசனை பிரிவில் உள்ள வேளாண் விஞ்ஞானிகளை அணுகவும் அல்லது பயிர், உரம், அரசுத் திட்டப் பெயர்களை (எ.கா: PM-KISAN, நெல் உரம், கோதுமை விலை) குறிப்பிட்டு மீண்டும் கேட்கவும்."
        : "No specific verified agricultural information was found in our knowledge base for this query. Please check with our certified Agronomists in the Advisors section or rephrase your inquiry with specific crop, fertilizer, or scheme names (e.g. PM-KISAN, Paddy fertilizer, Wheat market price).";

    return {
      answer: noMatchMessage,
      sources: [],
      isFound: false,
    };
  }

  const primaryMatch = topMatches[0];
  const sources = topMatches.map((m) => ({
    title: language === "ta" ? m.chunk.titleTa : m.chunk.titleEn,
    type: m.chunk.sourceType,
  }));

  // Build Context Synthesizer
  let synthesizedAnswer = "";

  if (language === "ta") {
    synthesizedAnswer = `**${primaryMatch.chunk.titleTa}**\n\n${primaryMatch.chunk.textTa}`;

    if (topMatches.length > 1 && topMatches[1].similarity > 0.15) {
      synthesizedAnswer += `\n\n📌 **கூடுதல் தகவல் (${topMatches[1].chunk.titleTa}):**\n${topMatches[1].chunk.textTa}`;
    }

    synthesizedAnswer += `\n\n*(தகவல் மூலம்: அக்ரிடெக் வேளாண் களஞ்சியம் - ${primaryMatch.chunk.sourceType})*`;
  } else {
    synthesizedAnswer = `**${primaryMatch.chunk.titleEn}**\n\n${primaryMatch.chunk.textEn}`;

    if (topMatches.length > 1 && topMatches[1].similarity > 0.15) {
      synthesizedAnswer += `\n\n📌 **Related Guidance (${topMatches[1].chunk.titleEn}):**\n${topMatches[1].chunk.textEn}`;
    }

    synthesizedAnswer += `\n\n*(Verified Source: AgriTech Knowledge Base - ${primaryMatch.chunk.sourceType})*`;
  }

  return {
    answer: synthesizedAnswer,
    sources,
    isFound: true,
  };
}
