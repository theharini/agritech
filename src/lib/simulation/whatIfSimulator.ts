import {
  MissionGoal,
  PlanTradeoff,
  WhatIfInput,
  WhatIfResult,
  RiskLevel,
} from "../mission/types";
import { LogisticsPerishabilityAgent } from "../agents/LogisticsPerishabilityAgent";

export class WhatIfSimulator {
  /**
   * Deterministically evaluates counterfactual parameter perturbations against an active plan
   */
  static simulateCounterfactual(
    basePlan: PlanTradeoff,
    goal: MissionGoal,
    inputs: WhatIfInput
  ): WhatIfResult {
    const baseQuantityKg = goal.unit === "Quintals" ? goal.quantity * 100 : goal.quantity;
    const simQuantityKg = Math.max(50, inputs.availableQuantity || baseQuantityKg);

    // 1. Price Adjustment
    const basePrice = basePlan.grossRevenue / baseQuantityKg;
    const simPrice = Math.max(1, basePrice * (1 + inputs.buyerPriceDeltaPercent / 100));

    // 2. Transport Cost Multiplier
    const transportMultiplier = 1 + inputs.transportCostDeltaPercent / 100;

    // 3. Delays and Wait Days
    const totalAdditionalDays = inputs.deliveryDelayDays + inputs.farmerWaitDays;

    // Recalculate deterministic realization
    // We estimate effective distance from basePlan transport cost
    const distanceKm = Math.max(20, Math.round((basePlan.transportCost - 350) / 4.5));

    const { logistics, grossRevenue, netRealization } =
      LogisticsPerishabilityAgent.calculateLogisticsAndRealization({
        goal: { ...goal, quantity: simQuantityKg, unit: "kg" },
        distanceKm,
        offeredPricePerKg: simPrice,
        delayDays: totalAdditionalDays,
        transportCostMultiplier: transportMultiplier,
      });

    const diff = netRealization - basePlan.netRealization;

    // Deadline check
    const simulatedDeadlineFit = logistics.deliveryDays <= goal.deadlineDays;

    // Risk shift
    let simulatedRisk: RiskLevel = basePlan.riskLevel;
    const effectiveReliability =
      basePlan.buyerReliability * (1 + inputs.buyerReliabilityDeltaPercent / 100);

    if (effectiveReliability < 65 || !simulatedDeadlineFit || logistics.estimatedLossExposurePercent > 8) {
      simulatedRisk = "High";
    } else if (effectiveReliability < 80 || logistics.estimatedLossExposurePercent > 4) {
      simulatedRisk = "Medium";
    } else {
      simulatedRisk = "Low";
    }

    // Recommendation shifts
    let recommendedPlanCode: "PLAN_A" | "PLAN_B" | "PLAN_C" | "PLAN_D" = basePlan.planCode;
    let actionShiftEn = "Maintain Plan: Optimal under current modified parameters.";
    let actionShiftTa = "திட்டத்தை தொடரவும்: தற்போதைய மாற்றப்பட்ட அளவுகோல்களில் சிறந்தது.";
    let mathematicalReasonEn = "";
    let mathematicalReasonTa = "";

    // Specific counterfactual triggers:
    if (inputs.transportCostDeltaPercent >= 25 && basePlan.planCode === "PLAN_A") {
      recommendedPlanCode = "PLAN_B";
      actionShiftEn = "Pivoting to Plan B (Local Regional Hub) recommended.";
      actionShiftTa = "திட்டம் B (உள்ளூர் மண்டல மையம்) மாற பரிந்துரைக்கப்படுகிறது.";
      mathematicalReasonEn = `A +${inputs.transportCostDeltaPercent}% freight surge increases transport expenditure by ₹${(
        logistics.transportCost - basePlan.transportCost
      ).toLocaleString()}, wiping out the distant buyer premium. Local sale yields higher net margin.`;
      mathematicalReasonTa = `+${inputs.transportCostDeltaPercent}% போக்குவரத்து செலவு உயர்வு சரக்குக் கட்டணத்தை ₹${(
        logistics.transportCost - basePlan.transportCost
      ).toLocaleString()} அதிகரிக்கிறது, இதனால் உள்ளூர் விற்பனை அதிக நிகர லாபத்தை தருகிறது.`;
    } else if (inputs.buyerReliabilityDeltaPercent <= -20) {
      recommendedPlanCode = "PLAN_D";
      actionShiftEn = "Splitting quantity across verified buyers (Plan D) strongly advised.";
      actionShiftTa = "அளவை பல வாங்குபவர்களுக்கு பிரித்து வழங்குவது (திட்டம் D) பரிந்துரைக்கப்படுகிறது.";
      mathematicalReasonEn = `Buyer reliability dropped to ${Math.round(
        effectiveReliability
      )}%, exceeding safe single-counterparty exposure limits. Splitting mitigates catastrophic default.`;
      mathematicalReasonTa = `வாங்குபவரின் நம்பகத்தன்மை ${Math.round(
        effectiveReliability
      )}% ஆக சரிந்தது. பல வாங்குபவர்களுக்கு பிரித்து வழங்குவது பண இழப்பை தவிர்க்கிறது.`;
    } else if (totalAdditionalDays > 2 && goal.crop.toLowerCase().includes("tomato")) {
      recommendedPlanCode = "PLAN_B";
      actionShiftEn = "Urgent local liquidation required due to tomato spoilage acceleration.";
      actionShiftTa = "தக்காளி அழுகல் அபாயம் காரணமாக உடனடி உள்ளூர் விற்பனை தேவைப்படுகிறது.";
      mathematicalReasonEn = `A delay of ${totalAdditionalDays} days on perishable ${goal.crop} elevates post-harvest spoilage to ${logistics.estimatedLossExposurePercent}% (₹${logistics.lossExposureAmount.toLocaleString()}), rendering hold strategies financially unviable.`;
      mathematicalReasonTa = `${totalAdditionalDays} நாள் தாமதம் தக்காளி அழுகல் இழப்பை ${logistics.estimatedLossExposurePercent}% ஆக (₹${logistics.lossExposureAmount.toLocaleString()}) உயர்த்துவதால் காத்திருப்பு திட்டம் நஷ்டத்தை ஏற்படுத்தும்.`;
    } else if (diff < 0) {
      mathematicalReasonEn = `Net realization declines by ₹${Math.abs(
        diff
      ).toLocaleString()} due to combined effect of price/volume change and logistics inflation.`;
      mathematicalReasonTa = `விலை மற்றும் சரக்குக் கட்டண மாற்றங்களால் நிகர லாபம் ₹${Math.abs(
        diff
      ).toLocaleString()} குறைகிறது.`;
    } else {
      mathematicalReasonEn = `Net realization improves by +₹${diff.toLocaleString()} through positive counterfactual adjustments.`;
      mathematicalReasonTa = `மாற்றப்பட்ட காரணிகளால் நிகர லாபம் +₹${diff.toLocaleString()} அதிகரிக்கிறது.`;
    }

    return {
      baseNetRealization: basePlan.netRealization,
      simulatedNetRealization: netRealization,
      difference: diff,
      baseRisk: basePlan.riskLevel,
      simulatedRisk,
      baseDeadlineFit: basePlan.deadlineFit,
      simulatedDeadlineFit,
      recommendedPlanCode,
      actionShiftEn,
      actionShiftTa,
      mathematicalReasonEn,
      mathematicalReasonTa,
    };
  }
}
