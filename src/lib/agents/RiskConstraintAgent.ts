import {
  MissionGoal,
  ConstraintStatus,
  ConstraintWarning,
  EvaluatedBuyer,
  LogisticsPerishabilityEstimate,
} from "../mission/types";

export class RiskConstraintAgent {
  /**
   * Deterministically validates constraints against buyer parameters and logistics estimates
   */
  static evaluateConstraints(params: {
    goal: MissionGoal;
    buyer: EvaluatedBuyer;
    logistics: LogisticsPerishabilityEstimate;
    netRealizationPerKg: number;
  }): {
    status: ConstraintStatus;
    warnings: ConstraintWarning[];
  } {
    const { goal, buyer, logistics, netRealizationPerKg } = params;
    const warnings: ConstraintWarning[] = [];
    let hasBlocked = false;

    // 1. Hard Disqualification Check
    if (buyer.disqualificationReason) {
      warnings.push({
        rule: "BUYER_COMPATIBILITY",
        severity: "blocked",
        textEn: `Buyer disqualified: ${buyer.disqualificationReason}`,
        textTa: `வாங்குபவர் தகுதியற்றவர்: ${buyer.disqualificationReason}`,
      });
      return { status: "BLOCKED", warnings };
    }

    // 2. Buyer Reliability Threshold Check
    // If user asked for verified buyer or high reliability, minimum score is 80; baseline threshold is 60.
    const reliabilityMin = goal.buyerPreference === "high_reliability" ? 80 : 65;
    if (buyer.buyerReliabilityScore < 60) {
      warnings.push({
        rule: "BUYER_RELIABILITY_UNSAFE",
        severity: "blocked",
        textEn: `Buyer reliability (${buyer.buyerReliabilityScore}/100) is dangerously low. High risk of order default or dispute.`,
        textTa: `வாங்குபவரின் நம்பகத்தன்மை (${buyer.buyerReliabilityScore}/100) மிகவும் குறைவாக உள்ளது. ஆர்டர் ரத்தாகும் அபாயம் அதிகம்.`,
      });
      hasBlocked = true;
    } else if (buyer.buyerReliabilityScore < reliabilityMin) {
      warnings.push({
        rule: "BUYER_RELIABILITY_WARNING",
        severity: "warning",
        textEn: `Buyer reliability (${buyer.buyerReliabilityScore}/100) falls below preferred target (${reliabilityMin}/100).`,
        textTa: `வாங்குபவரின் நம்பகத்தன்மை (${buyer.buyerReliabilityScore}/100) உங்கள் விருப்ப வரம்பை விட (${reliabilityMin}/100) குறைவாக உள்ளது.`,
      });
    }

    // 3. Payment Reliability Check
    if (buyer.paymentReliabilityScore < 60 || buyer.historicalSettlementDays > 10) {
      warnings.push({
        rule: "PAYMENT_DEFAULT_RISK",
        severity: "blocked",
        textEn: `Severe payment delay track record (${buyer.historicalSettlementDays} days average; ${buyer.paymentReliabilityScore}% on-time). Violates safe payment guarantee.`,
        textTa: `கட்டணம் செலுத்துவதில் கடுமையான தாமதம் (${buyer.historicalSettlementDays} நாட்கள் சராசரி; ${buyer.paymentReliabilityScore}% சரியான நேரத்தில்). பாதுகாப்பான கட்டண விதியை மீறுகிறது.`,
      });
      hasBlocked = true;
    } else if (buyer.paymentReliabilityScore < 80) {
      warnings.push({
        rule: "PAYMENT_SETTLEMENT_DELAY",
        severity: "warning",
        textEn: `Payment settlement may take ${buyer.historicalSettlementDays} business days.`,
        textTa: `கட்டணம் கணக்கில் வரவு வைக்கப்பட ${buyer.historicalSettlementDays} வணிக நாட்கள் ஆகலாம்.`,
      });
    }

    // 4. Delivery Deadline Fit Check
    if (!logistics.fitsDeadline) {
      warnings.push({
        rule: "DEADLINE_BREACH",
        severity: "blocked",
        textEn: `Logistics transit time (${logistics.deliveryDays} days) exceeds hard deadline of ${goal.deadlineDays} days.`,
        textTa: `போக்குவரத்து காலம் (${logistics.deliveryDays} நாட்கள்) உங்கள் காலக்கெடுவை விட (${goal.deadlineDays} நாட்கள்) அதிகமாக உள்ளது.`,
      });
      hasBlocked = true;
    } else if (logistics.deliveryDays === goal.deadlineDays) {
      warnings.push({
        rule: "DEADLINE_BORDERLINE",
        severity: "warning",
        textEn: `Transit duration exactly reaches the deadline boundary (${goal.deadlineDays} days). Zero margin for highway delay.`,
        textTa: `போக்குவரத்து காலம் உங்கள் இறுதி காலக்கெடுவை தொடுகிறது (${goal.deadlineDays} நாட்கள்). தாமதத்திற்கான வாய்ப்பு இல்லை.`,
      });
    }

    // 5. Maximum Transport Cost Cap Check
    if (logistics.transportCost > goal.maxTransportCost) {
      warnings.push({
        rule: "TRANSPORT_COST_EXCEEDED",
        severity: "warning",
        textEn: `Estimated transport cost (₹${logistics.transportCost.toLocaleString()}) exceeds stated cap of ₹${goal.maxTransportCost.toLocaleString()} by ₹${(
          logistics.transportCost - goal.maxTransportCost
        ).toLocaleString()}.`,
        textTa: `போக்குவரத்து செலவு (₹${logistics.transportCost.toLocaleString()}) உங்கள் வரம்பான ₹${goal.maxTransportCost.toLocaleString()} ஐ விட ₹${(
          logistics.transportCost - goal.maxTransportCost
        ).toLocaleString()} அதிகம்.`,
      });
    }

    // 6. Minimum Expected Net Realization Price Check
    if (goal.minExpectedPricePerUnit > 0 && netRealizationPerKg < goal.minExpectedPricePerUnit) {
      const shortfall = Math.round((goal.minExpectedPricePerUnit - netRealizationPerKg) * 100) / 100;
      if (shortfall > 3.0) {
        warnings.push({
          rule: "PRICE_SUBSTANTIALLY_BELOW_MINIMUM",
          severity: "blocked",
          textEn: `Net farmer realization (₹${netRealizationPerKg}/kg) is significantly below minimum expected rate (₹${goal.minExpectedPricePerUnit}/kg) by ₹${shortfall}/kg after logistics deductions.`,
          textTa: `போக்குவரத்து கழிவுகளுக்குப் பிறகு கிடைக்கும் நிகர விலை (₹${netRealizationPerKg}/கிலோ) உங்கள் குறைந்தபட்ச எதிர்பார்ப்பை (₹${goal.minExpectedPricePerUnit}/கிலோ) விட ₹${shortfall}/கிலோ குறைவாக உள்ளது.`,
        });
        hasBlocked = true;
      } else {
        warnings.push({
          rule: "PRICE_SLIGHT_SHORTFALL",
          severity: "warning",
          textEn: `Net realization (₹${netRealizationPerKg}/kg) falls slightly short of minimum expected price (₹${goal.minExpectedPricePerUnit}/kg).`,
          textTa: `நிகர விலை (₹${netRealizationPerKg}/கிலோ) உங்கள் குறைந்தபட்ச விலையை விட சற்று குறைவாக உள்ளது.`,
        });
      }
    }

    // 7. Spoilage Loss Exposure Warning
    if (logistics.estimatedLossExposurePercent > 5.0) {
      warnings.push({
        rule: "PERISHABILITY_LOSS_HIGH",
        severity: "warning",
        textEn: `Estimated crop perishability degradation is elevated at ${logistics.estimatedLossExposurePercent}% (₹${logistics.lossExposureAmount.toLocaleString()}) due to transit distance.`,
        textTa: `நீண்ட தூர போக்குவரத்தால் பயிர் அழுகல் அல்லது எடை இழப்பு ${logistics.estimatedLossExposurePercent}% (₹${logistics.lossExposureAmount.toLocaleString()}) வரை ஏற்படலாம்.`,
      });
    }

    const status: ConstraintStatus = hasBlocked ? "BLOCKED" : warnings.length > 0 ? "WARNING" : "PASS";

    return { status, warnings };
  }
}
