import { MissionGoal, MissionClarification } from "../mission/types";

export class MissionUnderstandingAgent {
  /**
   * Parse natural language text or raw farmer statements into a structured MissionGoal
   */
  static parseNaturalLanguage(prompt: string, defaultLocation = "Thanjavur, Tamil Nadu"): {
    goal: MissionGoal;
    clarification?: MissionClarification;
  } {
    const text = prompt.toLowerCase();

    // 1. Detect Crop
    let detectedCrop = "Rice";
    if (text.includes("paddy") || text.includes("rice") || text.includes("நெல்") || text.includes("அரிசி")) {
      detectedCrop = "Rice";
    } else if (text.includes("wheat") || text.includes("கோதுமை")) {
      detectedCrop = "Wheat";
    } else if (text.includes("maize") || text.includes("corn") || text.includes("மக்காச்சோளம்")) {
      detectedCrop = "Maize";
    } else if (text.includes("cotton") || text.includes("பருத்தி")) {
      detectedCrop = "Cotton";
    } else if (text.includes("tomato") || text.includes("தக்காளி")) {
      detectedCrop = "Tomato";
    }

    // 2. Detect Quantity and Unit
    let quantity = 500;
    let unit: "kg" | "Quintals" | "Crates" = "kg";

    const qtyMatch = text.match(/(\d+(?:\.\d+)?)\s*(kg|kgs|kilo|kilogram|quintal|quintals|qtl|crates|bags|டன்|கிலோ|குவிண்டால்)?/i);
    if (qtyMatch) {
      const parsedNum = parseFloat(qtyMatch[1]);
      if (!isNaN(parsedNum) && parsedNum > 0) {
        quantity = parsedNum;
        const matchedUnit = (qtyMatch[2] || "").toLowerCase();
        if (matchedUnit.includes("quintal") || matchedUnit.includes("qtl") || matchedUnit.includes("குவிண்டால்")) {
          unit = "Quintals";
        } else if (matchedUnit.includes("crate") || matchedUnit.includes("crates")) {
          unit = "Crates";
        } else {
          unit = "kg";
        }
      }
    }

    // 3. Detect Deadline
    let deadlineDays = 3;
    const deadlineMatch = text.match(/within\s*(\d+)\s*(day|days|நாட்கள்|நாள்)|(\d+)\s*(day|days|நாட்கள்|நாள்)/i);
    if (deadlineMatch) {
      const days = parseInt(deadlineMatch[1] || deadlineMatch[3], 10);
      if (!isNaN(days) && days > 0) {
        deadlineDays = days;
      }
    } else if (text.includes("urgent") || text.includes("today") || text.includes("உடனடியாக")) {
      deadlineDays = 1;
    } else if (text.includes("week") || text.includes("வாரம்")) {
      deadlineDays = 7;
    }

    // 4. Detect Price Constraints
    let minExpectedPricePerUnit = 0;
    // Default benchmark baseline per kg based on crop
    const baselinePrices: Record<string, number> = {
      Rice: 24,
      Wheat: 25,
      Maize: 22,
      Cotton: 72,
      Tomato: 25,
    };
    minExpectedPricePerUnit = baselinePrices[detectedCrop] || 25;

    const priceMatch = text.match(/(?:at least|minimum|min|விலை|₹|rs\.?)\s*(\d+(?:\.\d+)?)/i);
    if (priceMatch) {
      const pr = parseFloat(priceMatch[1]);
      if (!isNaN(pr) && pr > 5) {
        minExpectedPricePerUnit = pr;
      }
    }

    // 5. Detect Transport Cost Cap
    let maxTransportCost = 2500;
    const transportMatch = text.match(/(?:transport|freight|போக்குவரத்து)\s*(?:under|below|less than|max|அதிகபட்சம்)?\s*(?:₹|rs\.?)?\s*(\d+)/i);
    if (transportMatch) {
      const tc = parseInt(transportMatch[1], 10);
      if (!isNaN(tc) && tc > 100) {
        maxTransportCost = tc;
      }
    }

    // 6. Detect Location
    let location = defaultLocation;
    const locations = ["Thanjavur", "Madurai", "Salem", "Coimbatore", "Chennai", "Trichy", "Tiruchirappalli"];
    for (const loc of locations) {
      if (text.toLowerCase().includes(loc.toLowerCase())) {
        location = `${loc}, Tamil Nadu`;
        break;
      }
    }

    // 7. Detect Constraints Array
    const constraints: string[] = [];
    if (text.includes("transport") || text.includes("freight") || text.includes("போக்குவரத்து")) {
      constraints.push("low transport cost");
    }
    if (text.includes("reliable") || text.includes("verified") || text.includes("நம்பகமான")) {
      constraints.push("verified buyer");
    }
    if (text.includes("payment") || text.includes("settlement") || text.includes("பணம்")) {
      constraints.push("reliable payment");
    }
    if (text.includes("spoilage") || text.includes("perish") || text.includes("அழுகல்")) {
      constraints.push("low spoilage risk");
    }
    if (text.includes("urgent") || text.includes("fast") || text.includes("விரைவாக")) {
      constraints.push("urgent delivery fit");
    }
    if (constraints.length === 0) {
      constraints.push("verified buyer", "reliable payment", "low transport cost");
    }

    // 8. Quality Preference
    let quality: MissionGoal["quality"] = "Grade-A / Premium";
    if (text.includes("organic") || text.includes("இயற்கை")) {
      quality = "Organic Certified";
    } else if (text.includes("grade b") || text.includes("standard") || text.includes("வழக்கமான")) {
      quality = "Standard / Grade-B";
    }

    // Risk Preference
    let riskPreference: MissionGoal["riskPreference"] = "balanced";
    if (text.includes("safe") || text.includes("low risk") || text.includes("பாதுகாப்பான")) {
      riskPreference = "low";
    } else if (text.includes("maximize") || text.includes("highest") || text.includes("அதிக லாபம்")) {
      riskPreference = "aggressive";
    }

    const goal: MissionGoal = {
      crop: detectedCrop,
      quantity,
      unit,
      location,
      quality,
      deadlineDays,
      minExpectedPricePerUnit,
      maxTransportCost,
      buyerPreference: text.includes("verified") ? "high_reliability" : "all",
      riskPreference,
      rawGoalText: prompt,
      constraints,
    };

    // Check if critical clarification is needed (e.g., prompt was too vague like "sell my crops")
    let clarification: MissionClarification | undefined = undefined;
    if (prompt.trim().split(/\s+/).length < 3 && !text.includes("kg") && !text.includes("quintal")) {
      clarification = {
        needsClarification: true,
        field: "quantity",
        questionEn: "Could you specify the exact crop quantity and target deadline (e.g., 500 kg within 3 days)?",
        questionTa: "உங்கள் விளைபொருளின் துல்லியமான அளவு மற்றும் காலக்கெடுவை குறிப்பிடுங்கள் (எ.கா. 3 நாட்களில் 500 கிலோ)?",
        suggestions: [
          "500 kg within 3 days",
          "1000 kg within 5 days",
          "20 Quintals urgently",
        ],
      };
    }

    return { goal, clarification };
  }

  /**
   * Validate and complete a structured form input into a MissionGoal
   */
  static fromStructuredForm(form: Partial<MissionGoal>): MissionGoal {
    return {
      crop: form.crop || "Rice",
      quantity: form.quantity && form.quantity > 0 ? form.quantity : 500,
      unit: form.unit || "kg",
      location: form.location || "Thanjavur, Tamil Nadu",
      quality: form.quality || "Grade-A / Premium",
      deadlineDays: form.deadlineDays && form.deadlineDays > 0 ? form.deadlineDays : 3,
      minExpectedPricePerUnit: form.minExpectedPricePerUnit || 24,
      maxTransportCost: form.maxTransportCost || 2500,
      buyerPreference: form.buyerPreference || "high_reliability",
      riskPreference: form.riskPreference || "balanced",
      rawGoalText: `Structured Mission: ${form.quantity || 500} ${form.unit || "kg"} ${form.crop || "Rice"} to sell within ${form.deadlineDays || 3} days.`,
      constraints: form.constraints && form.constraints.length > 0
        ? form.constraints
        : ["low transport cost", "verified buyer", "reliable payment"],
    };
  }
}
