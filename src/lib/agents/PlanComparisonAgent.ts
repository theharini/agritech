import {
  MissionGoal,
  MarketEvidence,
  EvaluatedBuyer,
  PlanTradeoff,
  RiskLevel,
} from "../mission/types";
import { LogisticsPerishabilityAgent } from "./LogisticsPerishabilityAgent";
import { RiskConstraintAgent } from "./RiskConstraintAgent";

export class PlanComparisonAgent {
  /**
   * Generates 2 to 4 diverse strategies with complete deterministic trade-off metrics
   */
  static generatePlanComparison(params: {
    goal: MissionGoal;
    evidence: MarketEvidence;
    evaluatedBuyers: EvaluatedBuyer[];
  }): PlanTradeoff[] {
    const { goal, evidence, evaluatedBuyers } = params;
    const quantityKg = goal.unit === "Quintals" ? goal.quantity * 100 : goal.quantity;

    // Filter compatible buyers (or near-compatible for contrast)
    const validBuyers = evaluatedBuyers.filter((b) => !b.disqualificationReason);
    // Sort by net score heuristic (offer vs distance)
    const sortedBuyers = [...validBuyers].sort((a, b) => {
      const netA = a.offeredPrice - (a.distanceKm * 4.5) / 1000;
      const netB = b.offeredPrice - (b.distanceKm * 4.5) / 1000;
      return netB - netA;
    });

    const primaryBuyer = sortedBuyers[0] || evaluatedBuyers[0];
    const localBuyer =
      [...validBuyers].sort((a, b) => a.distanceKm - b.distanceKm)[0] || primaryBuyer;
    const alternativeBuyer =
      sortedBuyers.find((b) => b.id !== primaryBuyer.id && b.id !== localBuyer.id) ||
      sortedBuyers[1] ||
      primaryBuyer;

    const plans: PlanTradeoff[] = [];

    // ==========================================
    // PLAN A: Direct Sale to Verified Primary Buyer
    // ==========================================
    {
      const { logistics, grossRevenue, netRealization, netRealizationPerKg } =
        LogisticsPerishabilityAgent.calculateLogisticsAndRealization({
          goal,
          distanceKm: primaryBuyer.distanceKm,
          offeredPricePerKg: primaryBuyer.offeredPrice,
        });

      const { status, warnings } = RiskConstraintAgent.evaluateConstraints({
        goal,
        buyer: primaryBuyer,
        logistics,
        netRealizationPerKg,
      });

      const riskLevel: RiskLevel =
        primaryBuyer.buyerReliabilityScore >= 90 && logistics.fitsDeadline
          ? "Low"
          : primaryBuyer.buyerReliabilityScore >= 75
          ? "Medium"
          : "High";

      plans.push({
        id: "plan-a",
        planCode: "PLAN_A",
        titleEn: "Plan A — Direct Contract with Primary Verified Buyer",
        titleTa: "திட்டம் A — முதன்மை சரிபார்க்கப்பட்ட வாங்குபவருடன் நேரடி ஒப்பந்தம்",
        strategyType: "sell_now",
        buyerName: primaryBuyer.name,
        buyerReliability: primaryBuyer.buyerReliabilityScore,
        paymentReliability: primaryBuyer.paymentReliabilityScore,
        grossRevenue,
        transportCost: logistics.transportCost,
        storageCost: logistics.storageCostPerDay * 0,
        platformFees: logistics.platformFees,
        estimatedLoss: logistics.lossExposureAmount,
        netRealization,
        netRealizationPerUnit: netRealizationPerKg,
        netRealizationPerKg,
        riskLevel,
        deadlineFit: logistics.fitsDeadline,
        deliveryWindow: `${logistics.deliveryDays} business days (${logistics.estimatedTransitHours} hrs)`,
        constraintStatus: status,
        constraintWarnings: warnings,
        explanationEn: `Direct contract with ${primaryBuyer.name} at ₹${primaryBuyer.offeredPrice}/kg. Offers high buyer reliability (${primaryBuyer.buyerReliabilityScore}%) and predictable settlement within ${primaryBuyer.historicalSettlementDays} days, despite ₹${logistics.transportCost.toLocaleString()} freight across ${primaryBuyer.distanceKm} km.`,
        explanationTa: `${primaryBuyer.name} நிறுவனத்துடன் ₹${primaryBuyer.offeredPrice}/கிலோ விலையில் நேரடி ஒப்பந்தம். ${primaryBuyer.distanceKm} கி.மீ தொலைவுக்கு ₹${logistics.transportCost.toLocaleString()} சரக்குக் கட்டணம் இருப்பினும், உயர் நம்பகத்தன்மை (${primaryBuyer.buyerReliabilityScore}%) மற்றும் ${primaryBuyer.historicalSettlementDays} நாட்களில் பணம் கிடைப்பதை உறுதி செய்கிறது.`,
        actionRequired: true,
        actionPayload: {
          actionType: "send_buyer_request",
          actionTitleEn: `Send Official Purchase Request to ${primaryBuyer.name}`,
          actionTitleTa: `${primaryBuyer.name} நிறுவனத்திற்கு அதிகாரப்பூர்வ கொள்முதல் கோரிக்கையை அனுப்பவும்`,
          targetName: primaryBuyer.name,
          quantity: quantityKg,
          unit: "kg",
          grossOfferPerUnit: primaryBuyer.offeredPrice,
          grossTotal: grossRevenue,
          transportCost: logistics.transportCost,
          netRealization,
          deliveryWindow: `${logistics.deliveryDays} Days`,
          buyerReliability: primaryBuyer.buyerReliabilityScore,
          paymentReliability: primaryBuyer.paymentReliabilityScore,
          status: "pending_approval",
          riskWarnings: warnings.map((w) => w.textEn),
        },
      });
    }

    // ==========================================
    // PLAN B: Sell to Nearby Local Aggregator
    // ==========================================
    {
      const { logistics, grossRevenue, netRealization, netRealizationPerKg } =
        LogisticsPerishabilityAgent.calculateLogisticsAndRealization({
          goal,
          distanceKm: localBuyer.distanceKm,
          offeredPricePerKg: localBuyer.offeredPrice,
        });

      const { status, warnings } = RiskConstraintAgent.evaluateConstraints({
        goal,
        buyer: localBuyer,
        logistics,
        netRealizationPerKg,
      });

      const riskLevel: RiskLevel = localBuyer.buyerReliabilityScore >= 85 ? "Low" : "Medium";

      plans.push({
        id: "plan-b",
        planCode: "PLAN_B",
        titleEn: "Plan B — Local Regional Hub Procurement (Lowest Transport)",
        titleTa: "திட்டம் B — உள்ளூர் மண்டல மையம் (குறைந்த போக்குவரத்து செலவு)",
        strategyType: "alternative_buyer",
        buyerName: localBuyer.name,
        buyerReliability: localBuyer.buyerReliabilityScore,
        paymentReliability: localBuyer.paymentReliabilityScore,
        grossRevenue,
        transportCost: logistics.transportCost,
        storageCost: 0,
        platformFees: logistics.platformFees,
        estimatedLoss: logistics.lossExposureAmount,
        netRealization,
        netRealizationPerUnit: netRealizationPerKg,
        netRealizationPerKg,
        riskLevel,
        deadlineFit: logistics.fitsDeadline,
        deliveryWindow: `${logistics.deliveryDays} day (${logistics.estimatedTransitHours} hrs - Rapid)`,
        constraintStatus: status,
        constraintWarnings: warnings,
        explanationEn: `Selling locally to ${localBuyer.name} drastically curbs transport expenditure to only ₹${logistics.transportCost.toLocaleString()} (${localBuyer.distanceKm} km). While offered rate is ₹${localBuyer.offeredPrice}/kg, net realization remains competitive with virtually zero transit delay or spoilage.`,
        explanationTa: `${localBuyer.name} உள்ளூர் கொள்முதல் மையத்திற்கு விற்பதன் மூலம் போக்குவரத்து செலவு ₹${logistics.transportCost.toLocaleString()} ஆக (${localBuyer.distanceKm} கி.மீ) குறைகிறது. கொள்முதல் விலை ₹${localBuyer.offeredPrice}/கிலோவாக இருந்தாலும், அழுகல் அபாயம் இன்றி விரைவாக பணம் கிடைக்க உகந்தது.`,
        actionRequired: true,
        actionPayload: {
          actionType: "schedule_delivery",
          actionTitleEn: `Schedule Local Mandi Delivery with ${localBuyer.name}`,
          actionTitleTa: `${localBuyer.name} நிறுவனத்துடன் உள்ளூர் விநியோகத்தை திட்டமிடவும்`,
          targetName: localBuyer.name,
          quantity: quantityKg,
          unit: "kg",
          grossOfferPerUnit: localBuyer.offeredPrice,
          grossTotal: grossRevenue,
          transportCost: logistics.transportCost,
          netRealization,
          deliveryWindow: `1-2 Days Local Transit`,
          buyerReliability: localBuyer.buyerReliabilityScore,
          paymentReliability: localBuyer.paymentReliabilityScore,
          status: "pending_approval",
          riskWarnings: warnings.map((w) => w.textEn),
        },
      });
    }

    // ==========================================
    // PLAN C: Hold in Warehouse + Sell Later (Speculative)
    // ==========================================
    {
      const holdDays = 4;
      // Speculated price bump +4.5% if trend is increasing, or -2% if decreasing
      const priceTrendMultiplier = evidence.historicalTrend === "increasing" ? 1.045 : 0.98;
      const futurePricePerKg = Math.round(primaryBuyer.offeredPrice * priceTrendMultiplier * 10) / 10;

      const { logistics, grossRevenue, netRealization, netRealizationPerKg } =
        LogisticsPerishabilityAgent.calculateLogisticsAndRealization({
          goal,
          distanceKm: primaryBuyer.distanceKm,
          offeredPricePerKg: futurePricePerKg,
          delayDays: holdDays,
        });

      const { status, warnings } = RiskConstraintAgent.evaluateConstraints({
        goal,
        buyer: primaryBuyer,
        logistics,
        netRealizationPerKg,
      });

      // Plan C incurs higher market and perishability risk
      const riskLevel: RiskLevel =
        goal.crop.toLowerCase().includes("tomato") || !logistics.fitsDeadline ? "High" : "Medium";

      plans.push({
        id: "plan-c",
        planCode: "PLAN_C",
        titleEn: "Plan C — Warehouse Hold & Forward Contract (4-Day Delay)",
        titleTa: "திட்டம் C — கிடங்கு இருப்பு மற்றும் எதிர்கால விற்பனை (4 நாள் தாமதம்)",
        strategyType: "hold_and_sell",
        buyerName: `${primaryBuyer.name} (Forward Settlement)`,
        buyerReliability: primaryBuyer.buyerReliabilityScore - 5,
        paymentReliability: primaryBuyer.paymentReliabilityScore - 5,
        grossRevenue,
        transportCost: logistics.transportCost,
        storageCost: logistics.storageCostPerDay * holdDays,
        platformFees: logistics.platformFees,
        estimatedLoss: logistics.lossExposureAmount,
        netRealization,
        netRealizationPerUnit: netRealizationPerKg,
        netRealizationPerKg,
        riskLevel,
        deadlineFit: logistics.fitsDeadline,
        deliveryWindow: `${logistics.deliveryDays} days (Includes ${holdDays}-day warehouse buffer)`,
        constraintStatus: status === "PASS" && !logistics.fitsDeadline ? "WARNING" : status,
        constraintWarnings: [
          ...warnings,
          ...(holdDays > goal.deadlineDays
            ? [
                {
                  rule: "HOLD_EXCEEDS_DEADLINE",
                  severity: "warning" as const,
                  textEn: `Holding for ${holdDays} days violates the farmer's target deadline of ${goal.deadlineDays} days.`,
                  textTa: `${holdDays} நாட்கள் காத்திருப்பது விவசாயியின் ${goal.deadlineDays} நாள் காலக்கெடுவை தாண்டுகிறது.`,
                },
              ]
            : []),
        ],
        explanationEn: `Holds produce in certified warehouse for 4 days to capture projected mandi price rebound to ₹${futurePricePerKg}/kg. Incurs ₹${(
          logistics.storageCostPerDay * holdDays
        ).toLocaleString()} storage and ₹${logistics.lossExposureAmount.toLocaleString()} perishability loss risk.`,
        explanationTa: `எதிர்பார்க்கப்படும் விலை உயர்வை (₹${futurePricePerKg}/கிலோ) பெற 4 நாட்கள் கிடங்கில் வைக்கப்படுகிறது. இதற்காக ₹${(
          logistics.storageCostPerDay * holdDays
        ).toLocaleString()} சேமிப்புக் கட்டணம் மற்றும் ₹${logistics.lossExposureAmount.toLocaleString()} இழப்பு அபாயம் ஏற்படுகிறது.`,
        actionRequired: true,
        actionPayload: {
          actionType: "reserve_storage",
          actionTitleEn: `Reserve Dry/Cold Warehouse Storage & Lock Forward Rate`,
          actionTitleTa: `கிடங்கு இடத்தை முன்பதிவு செய்து எதிர்கால விலையை பூட்டவும்`,
          targetName: `TNAU Certified Agritech Warehouse / ${primaryBuyer.name}`,
          quantity: quantityKg,
          unit: "kg",
          grossOfferPerUnit: futurePricePerKg,
          grossTotal: grossRevenue,
          transportCost: logistics.transportCost,
          netRealization,
          deliveryWindow: `Forward contract in ${holdDays + 2} days`,
          buyerReliability: primaryBuyer.buyerReliabilityScore - 5,
          paymentReliability: primaryBuyer.paymentReliabilityScore - 5,
          status: "pending_approval",
          riskWarnings: ["Market price volatility risk", "Cumulative storage fee deduction"],
        },
      });
    }

    // ==========================================
    // PLAN D: Split Quantity Across Buyers (Diversification)
    // ==========================================
    {
      const splitA = Math.round(quantityKg * 0.6); // 60% to primary
      const splitB = quantityKg - splitA; // 40% to local

      const resA = LogisticsPerishabilityAgent.calculateLogisticsAndRealization({
        goal: { ...goal, quantity: splitA, unit: "kg" },
        distanceKm: primaryBuyer.distanceKm,
        offeredPricePerKg: primaryBuyer.offeredPrice,
      });

      const resB = LogisticsPerishabilityAgent.calculateLogisticsAndRealization({
        goal: { ...goal, quantity: splitB, unit: "kg" },
        distanceKm: localBuyer.distanceKm,
        offeredPricePerKg: localBuyer.offeredPrice,
      });

      const combinedGross = resA.grossRevenue + resB.grossRevenue;
      const combinedTransport = resA.logistics.transportCost + resB.logistics.transportCost;
      const combinedNet = resA.netRealization + resB.netRealization;
      const combinedNetPerKg = Math.round((combinedNet / quantityKg) * 100) / 100;
      const avgBuyerReliability = Math.round(
        (primaryBuyer.buyerReliabilityScore * 0.6 + localBuyer.buyerReliabilityScore * 0.4)
      );

      plans.push({
        id: "plan-d",
        planCode: "PLAN_D",
        titleEn: "Plan D — Split Allocation (60% Direct Wholesale + 40% Local Mandi)",
        titleTa: "திட்டம் D — இருமுனை ஒதுக்கீடு (60% மொத்த கொள்முதல் + 40% உள்ளூர் மண்டி)",
        strategyType: "split_quantity",
        buyerName: `${primaryBuyer.name} (${splitA} kg)`,
        secondaryBuyerName: `${localBuyer.name} (${splitB} kg)`,
        buyerReliability: avgBuyerReliability,
        paymentReliability: Math.round(
          (primaryBuyer.paymentReliabilityScore * 0.6 + localBuyer.paymentReliabilityScore * 0.4)
        ),
        grossRevenue: combinedGross,
        transportCost: combinedTransport,
        storageCost: 0,
        platformFees: resA.logistics.platformFees + resB.logistics.platformFees,
        estimatedLoss: resA.logistics.lossExposureAmount + resB.logistics.lossExposureAmount,
        netRealization: combinedNet,
        netRealizationPerUnit: combinedNetPerKg,
        netRealizationPerKg: combinedNetPerKg,
        riskLevel: "Low",
        deadlineFit: true,
        deliveryWindow: "Staggered 1-3 Business Days",
        constraintStatus: "PASS",
        constraintWarnings: [],
        explanationEn: `Splits risk: dispatches ${splitA} kg to ${primaryBuyer.name} at premium ₹${primaryBuyer.offeredPrice}/kg and liquidates ${splitB} kg locally to ${localBuyer.name} for immediate same-day liquidity. Mitigates counterparty payment default risk.`,
        explanationTa: `அபாயத்தை குறைக்கிறது: ${splitA} கிலோவை ${primaryBuyer.name} நிறுவனத்திற்கு ₹${primaryBuyer.offeredPrice}/கிலோ விலையிலும், ${splitB} கிலோவை உள்ளூர் ${localBuyer.name} மையத்திற்கும் பிரித்து வழங்கி உடனடி ரொக்க புழக்கத்தை உறுதி செய்கிறது.`,
        actionRequired: true,
        actionPayload: {
          actionType: "split_order",
          actionTitleEn: `Issue Split Purchase Orders across 2 Verified Buyers`,
          actionTitleTa: `2 சரிபார்க்கப்பட்ட வாங்குபவர்களுக்கு பிரித்து கொள்முதல் ஆணை வழங்கவும்`,
          targetName: `${primaryBuyer.name} & ${localBuyer.name}`,
          quantity: quantityKg,
          unit: "kg",
          grossOfferPerUnit: Math.round((combinedGross / quantityKg) * 10) / 10,
          grossTotal: combinedGross,
          transportCost: combinedTransport,
          netRealization: combinedNet,
          deliveryWindow: `Staggered (1-3 Days)`,
          buyerReliability: avgBuyerReliability,
          paymentReliability: 95,
          status: "pending_approval",
          riskWarnings: ["Requires managing two parallel dispatch waybills"],
        },
      });
    }

    return plans;
  }
}
