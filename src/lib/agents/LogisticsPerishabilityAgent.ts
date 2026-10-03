import { MissionGoal, LogisticsPerishabilityEstimate } from "../mission/types";

export class LogisticsPerishabilityAgent {
  /**
   * Deterministically calculates logistics, transit duration, crop perishability degradation,
   * storage expense, and net farmer realization.
   */
  static calculateLogisticsAndRealization(params: {
    goal: MissionGoal;
    distanceKm: number;
    offeredPricePerKg: number;
    delayDays?: number;
    transportCostMultiplier?: number;
  }): {
    logistics: LogisticsPerishabilityEstimate;
    grossRevenue: number;
    netRealization: number;
    netRealizationPerKg: number;
  } {
    const { goal, distanceKm, offeredPricePerKg, delayDays = 0, transportCostMultiplier = 1.0 } = params;
    const quantityKg = goal.unit === "Quintals" ? goal.quantity * 100 : goal.quantity;

    // 1. Transit Time Calculation
    // Average freight truck speed 40 km/h in regional corridors + 4 hours loading/checkpoint buffer
    const estimatedTransitHours = Math.round((distanceKm / 40) + 4);
    const transitDays = Math.max(1, Math.ceil(estimatedTransitHours / 24)) + delayDays;
    const fitsDeadline = transitDays <= goal.deadlineDays;

    // 2. Transport Cost Calculation
    // Base loading ₹350 + distance rate ₹4.5 per km per ton
    const weightTons = Math.max(0.4, quantityKg / 1000);
    const baseTransport = 350 + distanceKm * 4.5 * weightTons;
    const transportCost = Math.round(baseTransport * transportCostMultiplier);

    // 3. Crop Perishability Tier & Loss Exposure
    const crop = goal.crop.toLowerCase();
    let cropPerishabilityTier: LogisticsPerishabilityEstimate["cropPerishabilityTier"] = "LOW";
    let dailyLossRatePercent = 0.2; // e.g. Grains (Paddy, Wheat, Maize) lose 0.2% weight/handling daily
    let storageCostPerDayPerKg = 0.08; // ₹0.08/kg/day standard dry warehouse storage

    if (crop.includes("tomato") || crop.includes("vegetable") || crop.includes("fruit")) {
      cropPerishabilityTier = "HIGH";
      dailyLossRatePercent = 2.8; // High spoilage rate without refrigerated transit
      storageCostPerDayPerKg = 0.45; // Cold-storage costs significantly higher
    } else if (crop.includes("cotton")) {
      cropPerishabilityTier = "LOW";
      dailyLossRatePercent = 0.05;
      storageCostPerDayPerKg = 0.06;
    }

    // 4. Financial Deductions
    const grossRevenue = Math.round(quantityKg * offeredPricePerKg);

    // Storage cost (if batch is held or waiting)
    const storageDays = Math.max(0, delayDays);
    const storageCost = Math.round(quantityKg * storageCostPerDayPerKg * storageDays);

    // Handling & platform verification fee (1.2% flat)
    const platformFees = Math.round(grossRevenue * 0.012);

    // Loss exposure (cumulative transit and hold loss)
    const totalExposureDays = transitDays;
    const estimatedLossExposurePercent = Math.min(
      25,
      Math.round(dailyLossRatePercent * totalExposureDays * 10) / 10
    );
    const lossExposureAmount = Math.round(grossRevenue * (estimatedLossExposurePercent / 100));

    // NET REALIZATION FORMULA:
    // Net realization = Buyer offer - transportation - storage - platform/transaction costs - estimated loss exposure
    const netRealization = Math.max(
      0,
      grossRevenue - transportCost - storageCost - platformFees - lossExposureAmount
    );

    const netRealizationPerKg = Math.round((netRealization / quantityKg) * 100) / 100;

    const logistics: LogisticsPerishabilityEstimate = {
      distanceKm,
      transportCost,
      estimatedTransitHours,
      deliveryDays: transitDays,
      fitsDeadline,
      cropPerishabilityTier,
      storageCostPerDay: Math.round(quantityKg * storageCostPerDayPerKg),
      estimatedLossExposurePercent,
      lossExposureAmount,
      platformFees,
    };

    return {
      logistics,
      grossRevenue,
      netRealization,
      netRealizationPerKg,
    };
  }
}
