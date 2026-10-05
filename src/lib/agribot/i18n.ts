export type AgriLanguage = "en-IN" | "ta-IN" | "hi-IN" | "ml-IN" | "te-IN";

export type AgriCrop =
  | "tomato"
  | "rice"
  | "wheat"
  | "cotton"
  | "sugarcane"
  | "groundnut"
  | "maize"
  | "chilli"
  | "banana"
  | "coconut";

export interface LanguageOption {
  code: AgriLanguage;
  name: string;
  nativeName: string;
  label: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en-IN", name: "English", nativeName: "English (Indian Agri)", label: "English (Indian Agri)" },
  { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்", label: "தமிழ் (Tamil)" },
  { code: "hi-IN", name: "Hindi", nativeName: "हिन्दी", label: "हिन्दी (Hindi)" },
  { code: "ml-IN", name: "Malayalam", nativeName: "മലയാളം", label: "മലയാളം (Malayalam)" },
  { code: "te-IN", name: "Telugu", nativeName: "తెలుగు", label: "తెలుగు (Telugu)" },
];

export const CROPS_LIST: AgriCrop[] = [
  "tomato",
  "rice",
  "wheat",
  "cotton",
  "sugarcane",
  "groundnut",
  "maize",
  "chilli",
  "banana",
  "coconut",
];

export const CROP_LABELS: Record<AgriLanguage, Record<AgriCrop, string>> = {
  "en-IN": {
    tomato: "Tomato (टमाटर)",
    rice: "Rice (Paddy / चावल)",
    wheat: "Wheat (गेहूं)",
    cotton: "Cotton (कपास)",
    sugarcane: "Sugarcane (गन्ना)",
    groundnut: "Groundnut (मूंगफली)",
    maize: "Maize (मक्का)",
    chilli: "Chilli (मिर्च)",
    banana: "Banana (केला)",
    coconut: "Coconut (नारियल)",
  },
  "ta-IN": {
    tomato: "Tomato (தக்காளி)",
    rice: "Rice (நெல்)",
    wheat: "Wheat (கோதுமை)",
    cotton: "Cotton (பருத்தி)",
    sugarcane: "Sugarcane (கரும்பு)",
    groundnut: "Groundnut (வேர்க்கடலை)",
    maize: "Maize (மக்காச்சோளம்)",
    chilli: "Chilli (மிளகாய்)",
    banana: "Banana (வாழை)",
    coconut: "Coconut (தென்னை)",
  },
  "hi-IN": {
    tomato: "Tomato (टमाटर)",
    rice: "Rice (धान / चावल)",
    wheat: "Wheat (गेहूं)",
    cotton: "Cotton (कपास)",
    sugarcane: "Sugarcane (गन्ना)",
    groundnut: "Groundnut (मूंगफली)",
    maize: "Maize (मक्का)",
    chilli: "Chilli (मिर्च)",
    banana: "Banana (केला)",
    coconut: "Coconut (नारियल)",
  },
  "ml-IN": {
    tomato: "Tomato (തക്കാളി)",
    rice: "Rice (നെല്ല്)",
    wheat: "Wheat (ഗോതമ്പ്)",
    cotton: "Cotton (പരുത്തി)",
    sugarcane: "Sugarcane (കരിമ്പ്)",
    groundnut: "Groundnut (നിലക്കടല)",
    maize: "Maize (ചോളം)",
    chilli: "Chilli (മുളക്)",
    banana: "Banana (വാഴ)",
    coconut: "Coconut (തെങ്ങ്)",
  },
  "te-IN": {
    tomato: "Tomato (టమోటా)",
    rice: "Rice (వరి / బియ్యం)",
    wheat: "Wheat (గోధుమ)",
    cotton: "Cotton (పత్తి)",
    sugarcane: "Sugarcane (చెరకు)",
    groundnut: "Groundnut (వేరుశనగ)",
    maize: "Maize (మొక్కజొన్న)",
    chilli: "Chilli (మిరప)",
    banana: "Banana (అరటి)",
    coconut: "Coconut (కొబ్బరి)",
  },
};

export interface AgribotI18nStrings {
  title: string;
  onlineStatus: string;
  offlineStatus: string;
  languageLabel: string;
  cropLabel: string;
  tapToSpeak: string;
  listening: string;
  thinking: string;
  advisoryReady: string;
  inputPlaceholder: string;
  onlineResponse: string;
  offlineResponse: string;
  speak: string;
  speaking: string;
  clear: string;
  voiceAdvisory: string;
  takePhoto: string;
  chooseGallery: string;
  removeImage: string;
  micPermissionDenied: string;
  noSpeechDetected: string;
  speechNotSupported: string;
  noVoiceWarning: string;
  defaultImagePrompt: string;
  offlineAdvisoryHeading: string;
}

export const I18N_STRINGS: Record<AgriLanguage, AgribotI18nStrings> = {
  "en-IN": {
    title: "🌾 AgriBot Voice Assistant",
    onlineStatus: "Online (Gemini 2.5 Flash)",
    offlineStatus: "Offline Mode",
    languageLabel: "🔤 Language:",
    cropLabel: "🌱 Crop:",
    tapToSpeak: "Tap to speak",
    listening: "Listening...",
    thinking: "Thinking...",
    advisoryReady: "Advisory ready! Listen or read below 🎧",
    inputPlaceholder: "Type crop question or click mic...",
    onlineResponse: "Online Response",
    offlineResponse: "Offline Mode Response",
    speak: "Speak",
    speaking: "Speaking...",
    clear: "Clear",
    voiceAdvisory: "Voice Advisory",
    takePhoto: "Take Photo",
    chooseGallery: "Choose from Gallery",
    removeImage: "Remove Image",
    micPermissionDenied: "Microphone permission was denied. Please allow microphone access in your browser settings.",
    noSpeechDetected: "No speech was detected. Please try tapping the mic and speaking again.",
    speechNotSupported: "Speech Recognition is not supported on this browser. You can type your query in the input bar below.",
    noVoiceWarning: "No native voice available for this language on your device. Speech will use the closest default voice.",
    defaultImagePrompt: "Analyze this crop image and tell me the problem and the solution.",
    offlineAdvisoryHeading: "🌾 Offline AgriBot Advisory:",
  },
  "ta-IN": {
    title: "🌾 அக்ரிபாட் குரல் உதவியாளர்",
    onlineStatus: "ஆன்லைன் (Gemini 2.5 Flash)",
    offlineStatus: "ஆஃப்லைன் பயன்முறை",
    languageLabel: "🔤 மொழி:",
    cropLabel: "🌱 பயிர்:",
    tapToSpeak: "பேச தட்டவும்",
    listening: "கேட்கிறது...",
    thinking: "சிந்திக்கிறது...",
    advisoryReady: "ஆலோசனை தயார்! கீழே கேட்கவும் அல்லது படிக்கவும் 🎧",
    inputPlaceholder: "பயிர் கேள்வியை தட்டச்சு செய்யவும் அல்லது மைக் அழுத்தவும்...",
    onlineResponse: "ஆன்லைன் பதில்",
    offlineResponse: "ஆஃப்லைன் பயன்முறை பதில்",
    speak: "பேசு",
    speaking: "பேசுகிறது...",
    clear: "அழிக்க",
    voiceAdvisory: "குரல் ஆலோசனை",
    takePhoto: "புகைப்படம் எடுக்கவும்",
    chooseGallery: "கேலரியில் இருந்து தேர்வு செய்யவும்",
    removeImage: "படத்தை நீக்கு",
    micPermissionDenied: "மைக்ரோஃபோன் அனுமதி மறுக்கப்பட்டது. தயவுசெய்து உலாவி அமைப்புகளில் அனுமதி வழங்கவும்.",
    noSpeechDetected: "குரல் எதுவும் கேட்கவில்லை. தயவுசெய்து மீண்டும் மைக்கை அழுத்தி பேசவும்.",
    speechNotSupported: "இந்த உலாவியில் குரல் அங்கீகாரம் ஆதரிக்கப்படவில்லை. கீழே உள்ள உள்ளீட்டுப் பட்டியில் தட்டச்சு செய்யலாம்.",
    noVoiceWarning: "உங்கள் சாதனத்தில் இந்த மொழிக்கான நேரடி குரல் இல்லை. இயல்புநிலை குரல் பயன்படுத்தப்படும்.",
    defaultImagePrompt: "இந்த பயிர் புகைப்படத்தை ஆய்வு செய்து பிரச்சனை மற்றும் அதற்கான தீர்வை கூறவும்.",
    offlineAdvisoryHeading: "🌾 ஆஃப்லைன் அக்ரிபாட் விவசாய ஆலோசனை:",
  },
  "hi-IN": {
    title: "🌾 एग्रीबॉट वॉयस असिस्टेंट",
    onlineStatus: "ऑनलाइन (Gemini 2.5 Flash)",
    offlineStatus: "ऑफलाइन मोड",
    languageLabel: "🔤 भाषा:",
    cropLabel: "🌱 फसल:",
    tapToSpeak: "बोलने के लिए टैप करें",
    listening: "सुन रहा है...",
    thinking: "सोच रहा है...",
    advisoryReady: "सलाह तैयार है! नीचे सुनें या पढ़ें 🎧",
    inputPlaceholder: "फसल से जुड़ा सवाल लिखें या माइक दबाएं...",
    onlineResponse: "ऑनलाइन प्रतिक्रिया",
    offlineResponse: "ऑफलाइन मोड प्रतिक्रिया",
    speak: "बोलें",
    speaking: "बोल रहा है...",
    clear: "साफ़ करें",
    voiceAdvisory: "वॉयस एडवाइजरी",
    takePhoto: "फोटो खींचें",
    chooseGallery: "गैलरी से चुनें",
    removeImage: "तस्वीर हटाएं",
    micPermissionDenied: "माइक्रोफ़ोन की अनुमति अस्वीकृत की गई। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।",
    noSpeechDetected: "कोई आवाज़ नहीं सुनाई दी। कृपया दोबारा माइक दबाकर बोलें।",
    speechNotSupported: "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है। आप नीचे लिखकर पूछ सकते हैं।",
    noVoiceWarning: "इस भाषा के लिए कोई आवाज़ उपलब्ध नहीं है। डिफ़ॉल्ट आवाज़ का उपयोग होगा।",
    defaultImagePrompt: "इस फसल की तस्वीर का विश्लेषण करें और समस्या व समाधान बताएं।",
    offlineAdvisoryHeading: "🌾 ऑफलाइन एग्रीबॉट कृषि सलाह:",
  },
  "ml-IN": {
    title: "🌾 അഗ്രിബോട്ട് വോയ്‌സ് അസിസ്റ്റന്റ്",
    onlineStatus: "ഓൺലൈൻ (Gemini 2.5 Flash)",
    offlineStatus: "ഓഫ്‌ലൈൻ മോഡ്",
    languageLabel: "🔤 ഭാഷ:",
    cropLabel: "🌱 വിള:",
    tapToSpeak: "സംസാരിക്കാൻ ടാപ്പ് ചെയ്യുക",
    listening: "കേൾക്കുന്നു...",
    thinking: "ചിന്തിക്കുന്നു...",
    advisoryReady: "ഉപദേശം തയ്യാർ! താഴെ കേൾക്കുക അല്ലെങ്കിൽ വായിക്കുക 🎧",
    inputPlaceholder: "വിള സംശയങ്ങൾ ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ മൈക്ക് അമർത്തുക...",
    onlineResponse: "ഓൺലൈൻ പ്രതികരണം",
    offlineResponse: "ഓഫ്‌ലൈൻ മോഡ് പ്രതികരണം",
    speak: "കേൾക്കുക",
    speaking: "സംസാരിക്കുന്നു...",
    clear: "മായ്ക്കുക",
    voiceAdvisory: "വോയ്‌സ് അഡ്വൈസറി",
    takePhoto: "ഫോട്ടോ എടുക്കുക",
    chooseGallery: "ഗാലറിയിൽ നിന്ന് തിരഞ്ഞെടുക്കുക",
    removeImage: "ചിത്രം നീക്കംചെയ്യുക",
    micPermissionDenied: "മൈക്രോഫോൺ അനുമതി നിഷേധിച്ചു. ബ്രൗസർ ക്രമീകരണത്തിൽ അനുമതി നൽകുക.",
    noSpeechDetected: "ശബ്ദം ലഭിച്ചില്ല. ദയവായി വീണ്ടും മൈക്ക് അമർത്തി സംസാരിക്കുക.",
    speechNotSupported: "ഈ ബ്രൗസറിൽ സ്പീച്ച് റെക്കഗ്നിഷൻ പിന്തുണയ്ക്കുന്നില്ല. താഴെ ടൈപ്പ് ചെയ്യാം.",
    noVoiceWarning: "ഈ ഭാഷയ്ക്ക് വോയ്‌സ് ലഭ്യമല്ല. ഡിഫോൾട്ട് വോയ്‌സ് ഉപയോഗിക്കും.",
    defaultImagePrompt: "ഈ വിള ചിത്രം പരിശോധിച്ച് പ്രശ്നവും പരിഹാരവും വ്യക്തമാക്കുക.",
    offlineAdvisoryHeading: "🌾 ഓഫ്‌ലൈൻ അഗ്രിബോട്ട് കാർഷിക നിർദ്ദേശം:",
  },
  "te-IN": {
    title: "🌾 అగ్రిబాట్ వాయిస్ అసిస్టెంట్",
    onlineStatus: "ఆన్‌లైన్ (Gemini 2.5 Flash)",
    offlineStatus: "ఆఫ్‌లైన్ మోడ్",
    languageLabel: "🔤 భాష:",
    cropLabel: "🌱 పంట:",
    tapToSpeak: "మాట్లాడటానికి నొక్కండి",
    listening: "వింటోంది...",
    thinking: "ఆలోచిస్తోంది...",
    advisoryReady: "సలహా సిద్ధంగా ఉంది! క్రింద వినండి లేదా చదవండి 🎧",
    inputPlaceholder: "పంట ప్రశ్నను టైప్ చేయండి లేదా మైక్ నొక్కండి...",
    onlineResponse: "ఆన్‌లైన్ స్పందన",
    offlineResponse: "ఆఫ్‌లైన్ మోడ్ స్పందన",
    speak: "వినండి",
    speaking: "మాట్లాడుతోంది...",
    clear: "క్లియర్",
    voiceAdvisory: "వాయిస్ సలహా",
    takePhoto: "ఫోటో తీయండి",
    chooseGallery: "గ్యాలరీ నుండి ఎంచుకోండి",
    removeImage: "చిత్రాన్ని తీసివేయి",
    micPermissionDenied: "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి.",
    noSpeechDetected: "స్వరమేదీ వినిపించలేదు. దయచేసి మళ్ళీ మైక్ నొక్కి మాట్లాడండి.",
    speechNotSupported: "ఈ బ్రౌజర్‌లో స్పీచ్ రికగ్నిషన్ సపోర్ట్ లేదు. క్రింద టైప్ చేయవచ్చు.",
    noVoiceWarning: "ఈ భాషకు ప్రత్యక్ష వాయిస్ లేదు. డిఫాల్ట్ వాయిస్ ఉపయోగించబడుతుంది.",
    defaultImagePrompt: "ఈ పంట చిత్రాన్ని విశ్లేషించి సమస్యను మరియు పరిష్కారాన్ని చెప్పండి.",
    offlineAdvisoryHeading: "🌾 ఆఫ్‌లైన్ అగ్రిబాట్ వ్యవసాయ సలహా:",
  },
};

export const OFFLINE_CROP_ADVISORY: Record<AgriLanguage, Record<AgriCrop, string>> = {
  "en-IN": {
    tomato: `• Maintain 50-60% field moisture capacity.
• Spray 5ml Neem Oil/L water at early signs of sucking pests or leaf spots.
• Ensure adequate Calcium (apply gypsum or calcium nitrate @ 2g/L) to prevent blossom end rot.
• Remove yellowing lower leaves to improve aeration.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
    rice: `• Maintain 2-5 cm standing water layer during tillering and panicle initiation.
• Spray 5ml Neem Oil/L water at early signs of leaf folders or stem borer moths.
• Apply Potassium (MOP) top-dressing to increase grain weight and prevent blast.
• Drain field for 48 hours if root rot or brown plant hoppers are spotted.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
    wheat: `• Provide timely irrigation at Crown Root Initiation stage (20-25 days after sowing).
• Spray 5ml Neem Oil/L water at early signs of aphids or powdery mildew.
• Avoid excessive urea application to prevent crop lodging and rust susceptibility.
• Keep field weed-free during early vegetative tillering.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
    cotton: `• Maintain 50-60% soil moisture capacity; avoid water stagnation.
• Spray 5ml Neem Oil/L water at early signs of whitefly, jassids, or bollworms.
• Install yellow sticky traps (10 traps per acre) for sucking pest monitoring.
• Foliar spray Magnesium Sulphate (10g/L) to prevent reddening of leaves.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
    sugarcane: `• Maintain light, frequent irrigations at 7-10 day intervals during summer formative phase.
• Spray 5ml Neem Oil/L water or apply Trichogramma cards for early shoot borer control.
• Earth up soil around cane roots at 90 days after planting.
• Apply bio-fertilizers (Azospirillum and Phosphobacteria) with organic compost.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
    groundnut: `• Ensure light moisture at pegging and pod formation stages; avoid waterlogging.
• Spray 5ml Neem Oil/L water at early signs of tikka leaf spot or leaf miner.
• Apply Gypsum @ 200 kg/acre at 40-45 days after sowing for pod development.
• Ensure proper soil aeration to allow easy peg penetration.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
    maize: `• Maintain 50-60% soil moisture; critical stages are silking and tasseling.
• Spray 5ml Neem Oil/L water at early signs of fall armyworm whorl attack.
• Apply Zinc Sulphate @ 10 kg/acre to prevent white bud chlorosis.
• Avoid standing water around root zones during monsoon showers.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
    chilli: `• Maintain 50-60% field moisture capacity; avoid over-irrigation.
• Spray 5ml Neem Oil/L water at early signs of thrips, mites, or leaf curl.
• Install blue sticky traps (8-10 traps per acre) for thrips control.
• Apply micronutrient foliar spray at flowering to prevent fruit drop.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
    banana: `• Maintain steady soil moisture; irrigate every 4-6 days using drip if available.
• Spray 5ml Neem Oil/L water and remove diseased suckers to prevent Sigatoka leaf spot.
• Apply Potash top-dressing at 3rd and 5th month for strong bunch development.
• Provide propping with bamboo poles before monsoon winds.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
    coconut: `• Provide 40-50 litres of water per palm per day through drip or basin irrigation.
• Spray 5ml Neem Oil/L water or apply neem cake around root basin for rhinoceros beetle control.
• Apply 1.5 kg Muriate of Potash and 1 kg Urea per palm annually in two split doses.
• Mulch palm basins with coconut coir pith or dried leaves to conserve moisture.
• Connect to internet for live Gemini diagnosis. (Kisan Helpline: 1800-180-1551)`,
  },
  "ta-IN": {
    tomato: `• வயலில் 50-60% ஈரப்பதத்தை சீராக பராமரிக்கவும்.
• சாறு உறிஞ்சும் பூச்சிகள் அல்லது இலைப்புள்ளி தென்பட்டால் 5 மிலி வேப்ப எண்ணெய்/லிட்டர் நீரில் கலந்து தெளிக்கவும்.
• பழ அழுகல் நோயைத் தடுக்க ஜிப்சம் அல்லது கால்சியம் நைட்ரேட் (2 கிராம்/லிட்டர்) தெளிக்கவும்.
• நல்ல காற்றோட்டத்திற்காக அடிப்பகுதியில் உள்ள பழுத்த இலைகளை அகற்றவும்.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
    rice: `• தூர்கட்டும் மற்றும் கதிர் வரும் பருவத்தில் 2-5 செ.மீ நீர் தேங்குவதை உறுதி செய்யவும்.
• இலைச்சுருட்டுப் புழு அல்லது தண்டுத்துளைப்பான் தென்பட்டால் 5 மிலி வேப்ப எண்ணெய்/லிட்டர் தெளிக்கவும்.
• தானிய எடை அதிகரிக்கவும் குலைநோய் தடுக்கவும் பொட்டாஷ் உரத்தை மேலுரமாக இடவும்.
• வேர் அழுகல் அல்லது புகையான் தென்பட்டால் வயலில் இருந்து நீரை 48 மணி நேரம் வடிக்கவும்.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
    wheat: `• விதைத்த 20-25 நாட்களில் முதல் பாசனம் கிரவுன் வேர் கட்டும் பருவத்தில் வழங்கவும்.
• அசுவினி அல்லது சாம்பல் நோய் தென்பட்டால் 5 மிலி வேப்ப எண்ணெய்/லிட்டர் தெளிக்கவும்.
• பயிர் சாயாமல் இருக்கவும் துருநோய் தடுக்கவும் அதிகப்படியான யூரியாவை தவிர்க்கவும்.
• ஆரம்ப கட்டத்தில் களைகள் இன்றி வயலை தூய்மையாக வைத்திருக்கவும்.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
    cotton: `• நிலத்தில் 50-60% ஈரப்பதம் பராமரிக்கவும்; நீர் தேங்காமல் பார்த்துக் கொள்ளவும்.
• வெள்ளை ஈ, தத்துப்பூச்சி அல்லது காய்ப்புழு தென்பட்டால் 5 மிலி வேப்ப எண்ணெய்/லிட்டர் தெளிக்கவும்.
• சாறு உறிஞ்சும் பூச்சிகளைக் கண்காணிக்க ஏக்கருக்கு 10 மஞ்சள் ஒட்டுப் பொறிகளை அமைக்கவும்.
• இலைகள் சிவப்பாவதை தடுக்க மெக்னீசியம் சல்பேட் (10 கிராம்/லிட்டர்) தெளிக்கவும்.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
    sugarcane: `• கோடைகால வளர்ச்சி பருவத்தில் 7-10 நாட்களுக்கு ஒருமுறை முறையான பாசனம் செய்யவும்.
• இளங்குருத்து துளைப்பான் தாக்கத்தை தடுக்க 5 மிலி வேப்ப எண்ணெய் தெளிக்கவும் அல்லது டிரைக்கோடெர்மா அட்டைகளை பயன்படுத்தவும்.
• நட்ட 90 நாட்களில் கரும்பிற்கு மண் அணைத்து விடவும்.
• இயற்கை உரத்துடன் அசோஸ்பைரில்லம் மற்றும் பாஸ்போபாக்டீரியா பயன்படுத்தவும்.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
    groundnut: `• விழுது இறங்கும் மற்றும் காய் பிடிக்கும் பருவத்தில் மிதமான ஈரப்பதத்தை உறுதி செய்யவும்.
• டிக்கா இலைப்புள்ளி அல்லது சுருள் புழு தென்பட்டால் 5 மிலி வேப்ப எண்ணெய்/லிட்டர் தெளிக்கவும்.
• விதைத்த 40-45 நாட்களில் ஏக்கருக்கு 200 கிலோ ஜிப்சம் இடவும்.
• விழுதுகள் எளிதாக நிலத்தில் இறங்க மண்ணை தளர்வாக வைத்திருக்கவும்.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
    maize: `• 50-60% மண் ஈரப்பதம் பராமரிக்கவும்; ஆண் மற்றும் பெண் பூக்கள் பூக்கும் போது பாசனம் அவசியம்.
• படைப்புழு தாக்குதலை தடுக்க குருத்தில் 5 மிலி வேப்ப எண்ணெய்/லிட்டர் தெளிக்கவும்.
• வெண் குருத்து குறைபாட்டை தவிர்க்க ஏக்கருக்கு 10 கிலோ ஜிங்க் சல்பேட் இடவும்.
• மழைக்காலங்களில் வேர்ப்பகுதியில் தண்ணீர் தேங்க விடக்கூடாது.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
    chilli: `• வயலில் 50-60% ஈரப்பதம் பராமரிக்கவும்; அதிகப்படியான நீர்பாசனத்தை தவிர்க்கவும்.
• இலைப்பேன், அசுவினி அல்லது இலைச்சுருட்டல் தென்பட்டால் 5 மிலி வேப்ப எண்ணெய்/லிட்டர் தெளிக்கவும்.
• இலைப்பேன்களைக் கட்டுப்படுத்த ஏக்கருக்கு 8-10 நீல நிற ஒட்டுப் பொறிகளை வைக்கவும்.
• பூக்கள் உதிர்வதைத் தடுக்க பூக்கும் பருவத்தில் நுண்ணூட்டச் சத்துக்களை தெளிக்கவும்.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
    banana: `• சீரான ஈரப்பதம் பராமரிக்கவும்; 4-6 நாட்களுக்கு ஒருமுறை பாசனம் செய்யவும்.
• சிகடோகா இலைப்புள்ளி நோயைத் தடுக்க 5 மிலி வேப்ப எண்ணெய் தெளித்து காய்ந்த இலைகளை அகற்றவும்.
• தார் திரட்சியாக வர 3 மற்றும் 5வது மாதங்களில் பொட்டாஷ் மேலுரமாக இடவும்.
• பருவமழைக் காற்று வீசும் முன் மரங்களுக்கு மூங்கில் முட்டுக் கொடுக்கவும்.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
    coconut: `• ஒரு மரத்திற்கு நாள் ஒன்றுக்கு 40-50 லிட்டர் தண்ணீர் பாசனம் செய்யவும்.
• காண்டாமிருக வண்டு தாக்குதலை தடுக்க 5 மிலி வேப்ப எண்ணெய் தெளிக்கவும் அல்லது வேப்பம் பிண்ணாக்கு இடவும்.
• மரத்திற்கு ஆண்டுக்கு 1.5 கிலோ பொட்டாஷ் மற்றும் 1 கிலோ யூரியா இரண்டு தவணைகளாக இடவும்.
• ஈரப்பதத்தை பாதுகாக்க தென்னை மரத்தடியில் தேங்காய் மட்டை அல்லது காய்ந்த இலைகளை பரப்பவும்.
• நேரலை ஜெமினி உதவிக்கு இணையத்துடன் இணைக்கவும். (கிசான் உதவி எண்: 1800-180-1551)`,
  },
  "hi-IN": {
    tomato: `• खेत में 50-60% नमी क्षमता बनाए रखें।
• रस चूसने वाले कीटों या धब्बों पर 5 मिली नीम तेल प्रति लीटर पानी का छिड़काव करें।
• फल सड़न (ब्लॉसम एंड रॉट) से बचाव के लिए कैल्शियम नाइट्रेट (2 ग्राम/लीटर) डालें।
• वेंटिलेशन सुधारने के लिए निचली पीली पत्तियों को हटा दें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
    rice: `• कल्ले फूटने और बाली निकलने पर 2-5 सेमी पानी बनाए रखें।
• पत्ता लपेटक या तना छेदक के लिए 5 मिली नीम तेल प्रति लीटर पानी का छिड़काव करें।
• दाने के वजन और झुलसा रोग से बचाव के लिए पोटाश का टॉप-ड्रेसिंग करें।
• जड़ सड़न या भुनगा दिखने पर खेत से 48 घंटे के लिए पानी निकाल दें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
    wheat: `• बुवाई के 20-25 दिन बाद ताज जड़ (CRI) अवस्था में पहला पानी अवश्य दें।
• एफिड या फफूंद दिखने पर 5 मिली नीम तेल प्रति लीटर पानी का छिड़काव करें।
• फसल गिरने और रतुआ रोग से बचने के लिए अधिक यूरिया का प्रयोग न करें।
• कल्ले फूटने के दौरान खेत को खरपतवार मुक्त रखें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
    cotton: `• मिट्टी में 50-60% नमी बनाए रखें; जलभराव न होने दें।
• सफेद मक्खी या सुंडी दिखने पर 5 मिली नीम तेल प्रति लीटर पानी का छिड़काव करें।
• कीट निगरानी के लिए प्रति एकड़ 10 पीले चिपचिपे ट्रैप लगाएं।
• पत्तियों को लाल होने से रोकने के लिए मैग्नीशियम सल्फेट (10 ग्राम/लीटर) का छिड़काव करें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
    sugarcane: `• गर्मी में प्रारंभिक अवस्था में 7-10 दिनों के अंतराल पर हल्की सिंचाई करें।
• तना छेदक नियंत्रण के लिए 5 मिली नीम तेल या ट्राइकोग्रामा कार्ड का प्रयोग करें।
• रोपाई के 90 दिन बाद गन्ने की जड़ों पर मिट्टी चढ़ाएं।
• जैविक खाद के साथ एजोस्पिरिलम और पीएसबी का प्रयोग करें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
    groundnut: `• सुइयां बनने और फली विकास के समय हल्की नमी बनाए रखें।
• टिक्का रोग या पत्ती सुरंगक पर 5 मिली नीम तेल प्रति लीटर पानी छिड़कें।
• बुवाई के 40-45 दिन बाद फली विकास हेतु प्रति एकड़ 200 किग्रा जिप्सम डालें।
• सुइयों के प्रवेश के लिए मिट्टी को भुरभुरा बनाए रखें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
    maize: `• 50-60% मिट्टी की नमी रखें; नर व मादा फूल आने पर सिंचाई जरूरी है।
• फॉल आर्मीवर्म सुंडी से बचाव हेतु गोभ में 5 मिली नीम तेल का छिड़काव करें।
• सफेद कली रोग से बचाव हेतु प्रति एकड़ 10 किग्रा जिंक सल्फेट डालें।
• बारिश में जड़ों के आसपास पानी जमा न होने दें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
    chilli: `• खेत में 50-60% नमी रखें; अधिक सिंचाई से बचें।
• थ्रिप्स या मरोड़िया रोग पर 5 मिली नीम तेल प्रति लीटर पानी का छिड़काव करें।
• थ्रिप्स नियंत्रण हेतु प्रति एकड़ 8-10 नीले चिपचिपे ट्रैप लगाएं।
• फूल झड़ने से रोकने हेतु सूक्ष्म पोषक तत्वों का छिड़काव करें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
    banana: `• समान नमी रखें; ड्रिप द्वारा 4-6 दिनों में सिंचाई करें।
• सिगाटोका पत्ती धब्बा रोग रोकने हेतु 5 मिली नीम तेल छिड़कें व सूखी पत्तियां हटाएं।
• अच्छे घौद विकास हेतु तीसरे व पांचवें महीने में पोटाश दें।
• तेज हवा से बचाव हेतु पौधों को बांस का सहारा दें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
    coconut: `• प्रति पेड़ प्रतिदिन 40-50 लीटर पानी की सिंचाई करें।
• गैंडा भृंग से बचाव हेतु 5 मिली नीम तेल या नीम की खली का प्रयोग करें।
• प्रति पेड़ सालाना 1.5 किग्रा पोटाश और 1 किग्रा यूरिया दो बार में डालें।
• नमी संरक्षण के लिए तने के चारों ओर नारियल के छिलकों की मल्चिंग करें।
• लाइव जेमिनी सलाह के लिए इंटरनेट से जुड़ें। (किसान हेल्पलाइन: 1800-180-1551)`,
  },
  "ml-IN": {
    tomato: `• തക്കാളി തോട്ടത്തിൽ 50-60% ഈർപ്പം നിലനിർത്തുക.
• കീടങ്ങൾ അല്ലെങ്കിൽ ഇലപ്പുള്ളി കാണുമ്പോൾ 5 മില്ലി വേപ്പെണ്ണ/ലിറ്റർ വെള്ളത്തിൽ തളിക്കുക.
• പൂവുകൾ കൊഴിയാതിരിക്കാൻ കാൽസ്യം നൈട്രേറ്റ് (2 ഗ്രാം/ലിറ്റർ) തളിക്കുക.
• രോഗബാധിതമായ അടിയിലകൾ നീക്കം ചെയ്യുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
    rice: `• നെല്ലിന്റെ ചിനപ്പ് പൊട്ടൽ ഘട്ടത്തിൽ 2-5 സെ.മീ വെള്ളം നിലനിർത്തുക.
• ഇലചുരുട്ടി പുഴു അല്ലെങ്കിൽ തണ്ടുതുരപ്പൻ കാണുമ്പോൾ 5 മില്ലി വേപ്പെണ്ണ തളിക്കുക.
• മണി തൂക്കം കൂടാൻ പൊട്ടാഷ് മേൽവളമായി നൽകുക.
• വേരുചീയൽ കണ്ടാൽ 48 മണിക്കൂർ വെള്ളം വാർത്തു കളയുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
    wheat: `• വിതച്ച് 20-25 ദിവസത്തിനകം ആദ്യ നനവ് നൽകുക.
• കീടബാധയ്ക്ക് 5 മില്ലി വേപ്പെണ്ണ വെള്ളത്തിൽ ചേർത്ത് തളിക്കുക.
• അമിത യൂറിയ പ്രയോഗം ഒഴിവാക്കുക.
• കളകൾ യഥാസമയം നീക്കം ചെയ്യുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
    cotton: `• മണ്ണിൽ 50-60% ഈർപ്പം ഉറപ്പാക്കുക; വെള്ളക്കെട്ട് ഒഴിവാക്കുക.
• വെള്ളീച്ച അല്ലെങ്കിൽ പുഴുക്കൾക്ക് 5 മില്ലി വേപ്പെണ്ണ തളിക്കുക.
• കീടനിയന്ത്രണത്തിന് മഞ്ഞക്കെണികൾ സ്ഥാപിക്കുക.
• ഇലകൾ ചുവക്കുന്നത് തടയാൻ മഗ്നീഷ്യം സൾഫേറ്റ് തളിക്കുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
    sugarcane: `• വേനൽക്കാലത്ത് 7-10 ദിവസത്തിൽ നനയ്ക്കുക.
• തണ്ടുതുരപ്പൻ പുഴുക്കൾക്ക് വേപ്പെണ്ണ അല്ലെങ്കിൽ ട്രൈക്കോഗ്രാമ ഉപയോഗിക്കുക.
• നടീലിന് 90 ദിവസത്തിന് ശേഷം ചുവട്ടിൽ മണ്ണ് കൂട്ടുക.
• ജൈവവളങ്ങൾക്കൊപ്പം അസോസ്പൈറില്ലം ഉപയോഗിക്കുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
    groundnut: `• കായ്കൾ പിടിക്കുന്ന സമയത്ത് ആവശ്യത്തിന് ഈർപ്പം ഉറപ്പാക്കുക.
• തിക്കാ ഇലപ്പുള്ളി രോഗത്തിന് 5 മില്ലി വേപ്പെണ്ണ തളിക്കുക.
• വിതച്ച് 45 ദിവസത്തിന് ശേഷം ഏക്കറിന് 200 കിലോ ജിപ്സം നൽകുക.
• മണ്ണ് അയവുള്ളതാക്കി നിലനിർത്തുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
    maize: `• പൂവിടുന്ന സമയത്ത് കൃത്യമായി നനയ്ക്കുക.
• പട്ടാളപ്പുഴുവിനെതിരെ 5 മില്ലി വേപ്പെണ്ണ തളിക്കുക.
• സിങ്ക് സൾഫേറ്റ് വളം നൽകുക.
• മഴക്കാലത്ത് വെള്ളക്കെട്ട് ഒഴിവാക്കുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
    chilli: `• മുളകിന് അമിത ജലസേചനം ഒഴിവാക്കുക.
• ഇലപ്പേൻ, പുഴുക്കൾക്ക് 5 മില്ലി വേപ്പെണ്ണ തളിക്കുക.
• നീലക്കെണികൾ തോട്ടത്തിൽ സ്ഥാപിക്കുക.
• പൂക്കൾ കൊഴിയാതിരിക്കാൻ മൈക്രോന്യൂട്രിയന്റ് തളിക്കുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
    banana: `• വാഴയ്ക്ക് 4-6 ദിവസത്തിൽ നന നൽകുക.
• സിഗാട്ടോക്ക ഇലപ്പുള്ളി രോഗത്തിനെതിരെ വേപ്പെണ്ണ തളിക്കുക.
• കുല തൂക്കം കൂടാൻ പൊട്ടാഷ് നൽകുക.
• കാറ്റിൽ മറിയാതിരിക്കാൻ ഊന്നുകൊടുക്കുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
    coconut: `• തെങ്ങിന് ദിവസേന 40-50 ലിറ്റർ വെള്ളം നൽകുക.
• കൊമ്പൻ ചെല്ലിക്കെതിരെ വേപ്പെണ്ണ അല്ലെങ്കിൽ വേപ്പിൻപിണ്ണാക്ക് ഉപയോഗിക്കുക.
• വർഷത്തിൽ രണ്ടുതവണ പൊട്ടാഷും യൂറിയയും നൽകുക.
• ഈർപ്പം നിലനിർത്താൻ ചകിരി പുതയിടുക.
• ലൈവ് ജെമിനി നിർദ്ദേശങ്ങൾക്ക് ഇന്റർനെറ്റ് കണക്റ്റ് ചെയ്യുക. (കിസാൻ ഹെൽപ്പ്‌ലൈൻ: 1800-180-1551)`,
  },
  "te-IN": {
    tomato: `• పొలంలో 50-60% తేమను స్థిరంగా ఉంచండి.
• రసం పీల్చే పురుగులు లేదా ఆకుమచ్చ కనిపిస్తే 5 మి.లీ వేప నూనె/లీటరు నీటిలో పిచికారీ చేయండి.
• కాయ కుళ్లు తెగులు నివారణకు కాల్షియం నైట్రేట్ (2 గ్రా/లీటరు) పిచికారీ చేయండి.
• గాలి వెలుతురు కోసం కింద పసుపు ఆకులను తొలగించండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
    rice: `• పిలకలు తొడిగే దశలో మరియు వెన్ను దశలో 2-5 సెం.మీ నీటిని ఉంచండి.
• ఆకుచుట్టు లేదా కాండం తొలిచే పురుగు కనిపిస్తే 5 మి.లీ వేప నూనె పిచికారీ చేయండి.
• గింజ బరువు పెరగడానికి మరియు అగ్గి తెగులు రాకుండా పొటాష్‌ను పైపాటుగా వేయండి.
• వేరు కుళ్లు లేదా సుడిదోమ కనిపిస్తే పొలం నుండి నీటిని 48 గంటలు తీసివేయండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
    wheat: `• విత్తిన 20-25 రోజులకు కిరీటం వేర్లు వచ్చే దశలో మొదటి తడి తప్పక ఇవ్వండి.
• తెగుళ్లు లేదా బూడిద తెగులుకు 5 మి.లీ వేప నూనె పిచికారీ చేయండి.
• పంట పడిపోకుండా మరియు తుప్పు తెగులు రాకుండా అధిక యూరియా వాడకండి.
• పంట ప్రారంభ దశలో కలుపు లేకుండా చూసుకోండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
    cotton: `• నేలలో 50-60% తేమ ఉండేలా చూడండి; నీరు నిలవకుండా జాగ్రత్తపడండి.
• తెల్లదోమ, పచ్చదోమ లేదా గులాబీ పురుగుకు 5 మి.లీ వేప నూనె పిచికారీ చేయండి.
• కీటకాల పర్యవేక్షణకు ఎకరానికి 10 పసుపు జిగురు కార్డులు అమర్చండి.
• ఆకులు ఎర్రబడకుండా మెగ్నీషియం సల్ఫేట్ (10 గ్రా/లీటరు) పిచికారీ చేయండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
    sugarcane: `• వేసవిలో 7-10 రోజుల వ్యవధిలో తేలికపాటి నీటి తడులు ఇవ్వండి.
• పీక పురుగు నివారణకు వేప నూనె లేదా ట్రైకోగ్రామా కార్డులు వాడండి.
• నాటిన 90 రోజులకు మొదళ్ల వద్ద మట్టిని ఎగదోయండి.
• సేంద్రియ ఎరువుతో పాటు అజోస్పైరిల్లమ్ మరియు పిఎస్‌బి వేయండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
    groundnut: `• ఊడలు దిగే మరియు కాయ ఊరే దశలో తగినంత తేమను ఉంచండి.
• తిక్కా ఆకుమచ్చ లేదా ఆకు ముడతకు 5 మి.లీ వేప నూనె పిచికారీ చేయండి.
• విత్తిన 40-45 రోజులకు ఎకరానికి 200 కిలోల జిప్సమ్ వేయండి.
• ఊడలు సులభంగా దిగడానికి నేలను గుల్లగా ఉంచండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
    maize: `• 50-60% నేల తేమ ఉండాలి; కంకి దశలో నీరు తప్పనిసరి.
• కత్తెర పురుగు నివారణకు సుడులలో 5 మి.లీ వేప నూనె పిచికారీ చేయండి.
• తెల్ల మొగ్గ నివారణకు ఎకరానికి 10 కిలోల జింక్ సల్ఫేట్ వేయండి.
• వర్షాకాలంలో మొదళ్ల వద్ద నీరు నిలవకుండా చూడండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
    chilli: `• మిరప తోటలో అధిక నీటి తడులు ఇవ్వకండి.
• తామర పురుగులు, నల్లికి 5 మి.లీ వేప నూనె పిచికారీ చేయండి.
• తామర పురుగుల నివారణకు ఎకరానికి 8-10 నీలిరంగు జిగురు అట్టలు పెట్టండి.
• పూత రాలకుండా సూక్ష్మపోషకాలను పిచికారీ చేయండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
    banana: `• అరటికి సమానమైన తేమను ఉంచండి; 4-6 రోజులకు నీరు ఇవ్వండి.
• సిగటోకా ఆకుమచ్చ తెగులుకు వేప నూనె పిచికారీ చేసి ఎండు ఆకులను తొలగించండి.
• గెల బరువు పెరగడానికి పొటాష్‌ను అందించండి.
• గాలి తాకిడికి పడిపోకుండా వెదురు బొంగులతో ఊతం ఇవ్వండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
    coconut: `• చెట్టుకు రోజుకు 40-50 లీటర్ల నీటిని అందించండి.
• కొమ్ము పురుగు నివారణకు వేప నూనె లేదా వేపపిండిని మొదళ్లలో వేయండి.
• సంవత్సరానికి చెట్టుకు 1.5 కిలోల పొటాష్ మరియు 1 కిలో యూరియాను రెండు దఫాలుగా వేయండి.
• తేమ ఆవిరి కాకుండా కొబ్బరి పీచుతో మొదళ్లలో కప్పండి.
• ప్రత్యక్ష జెమినీ సలహా కొరకు ఇంటర్నెట్‌కు కనెక్ట్ అవ్వండి. (కిసాన్ హెల్ప్‌లైన్: 1800-180-1551)`,
  },
};
