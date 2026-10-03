import { DEMO_USERS, INITIAL_BUYER_REQUESTS } from "../db";
import { EvaluatedBuyer, MissionGoal } from "../mission/types";

export interface BuyerProfileSeed {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  acceptedCrops: string[];
  maxCapacityKg: number;
  baseOfferMultiplier: number; // multiplier over mandi price
  buyerReliabilityScore: number; // 0-100
  paymentReliabilityScore: number; // 0-100
  historicalSettlementDays: number;
  acceptedQuality: string[];
}

export const REGISTERED_BUYER_REGISTRY: BuyerProfileSeed[] = [
  {
    id: "user-greenfoods",
    name: "Green Foods Pvt Ltd",
    location: "Ambattur Central Warehouse, Chennai",
    distanceKm: 320,
    acceptedCrops: ["Rice", "Paddy", "Wheat", "Maize"],
    maxCapacityKg: 10000,
    baseOfferMultiplier: 1.14, // Offers ~14% above mandi, but high transport distance
    buyerReliabilityScore: 94,
    paymentReliabilityScore: 92,
    historicalSettlementDays: 2,
    acceptedQuality: ["Grade-A / Premium", "Standard / Grade-B", "Organic Certified"],
  },
  {
    id: "user-freshmart",
    name: "FreshMart Retail Chain",
    location: "Saravanampatti Hub, Coimbatore",
    distanceKm: 240,
    acceptedCrops: ["Tomato", "Rice", "Wheat", "Vegetables"],
    maxCapacityKg: 2500,
    baseOfferMultiplier: 1.18,
    buyerReliabilityScore: 88,
    paymentReliabilityScore: 86,
    historicalSettlementDays: 3,
    acceptedQuality: ["Grade-A / Premium", "Organic Certified"],
  },
  {
    id: "user-organicbuyers",
    name: "Organic Buyers Co",
    location: "Electronic City Logistics Depot, Bengaluru",
    distanceKm: 380,
    acceptedCrops: ["Wheat", "Cotton", "Rice"],
    maxCapacityKg: 5000,
    baseOfferMultiplier: 1.25, // High gross offer for organic, but strict criteria & distance
    buyerReliabilityScore: 96,
    paymentReliabilityScore: 95,
    historicalSettlementDays: 2,
    acceptedQuality: ["Organic Certified"],
  },
  {
    id: "buyer-cauvery-delta",
    name: "Cauvery Delta Agri Producers Consortium",
    location: "Thanjavur Mandi Yard, Tamil Nadu",
    distanceKm: 18,
    acceptedCrops: ["Rice", "Paddy", "Maize", "Pulses"],
    maxCapacityKg: 8000,
    baseOfferMultiplier: 1.05, // Slightly lower gross price, but very low transport cost and same-day payment
    buyerReliabilityScore: 91,
    paymentReliabilityScore: 98,
    historicalSettlementDays: 1,
    acceptedQuality: ["Grade-A / Premium", "Standard / Grade-B", "Fair / Grade-C"],
  },
  {
    id: "buyer-kongu-foods",
    name: "Kongu Agro Wholesale Traders",
    location: "Erode Central Market",
    distanceKm: 165,
    acceptedCrops: ["Rice", "Maize", "Turmeric", "Cotton"],
    maxCapacityKg: 6000,
    baseOfferMultiplier: 1.09,
    buyerReliabilityScore: 84,
    paymentReliabilityScore: 88,
    historicalSettlementDays: 4,
    acceptedQuality: ["Grade-A / Premium", "Standard / Grade-B"],
  },
  {
    id: "buyer-trichy-millers",
    name: "Tiruchirappalli Modern Rice Millers",
    location: "Trichy Industrial Estate",
    distanceKm: 56,
    acceptedCrops: ["Rice", "Paddy", "Maize"],
    maxCapacityKg: 12000,
    baseOfferMultiplier: 1.08,
    buyerReliabilityScore: 90,
    paymentReliabilityScore: 94,
    historicalSettlementDays: 2,
    acceptedQuality: ["Grade-A / Premium", "Standard / Grade-B", "Fair / Grade-C"],
  },
  {
    id: "buyer-quick-spot-broker",
    name: "QuickCash Private Spot Aggregators",
    location: "Madurai Bye-pass Terminal",
    distanceKm: 140,
    acceptedCrops: ["Rice", "Wheat", "Maize", "Cotton", "Tomato"],
    maxCapacityKg: 1500,
    baseOfferMultiplier: 1.28, // Trap buyer: Very high gross price offered, but poor payment reliability!
    buyerReliabilityScore: 52,
    paymentReliabilityScore: 48,
    historicalSettlementDays: 14,
    acceptedQuality: ["Grade-A / Premium", "Standard / Grade-B", "Fair / Grade-C"],
  },
  {
    id: "buyer-madurai-spices",
    name: "Pandian Agro Exporters",
    location: "Madurai Mattuthavani Wholesale",
    distanceKm: 145,
    acceptedCrops: ["Cotton", "Maize", "Rice"],
    maxCapacityKg: 4000,
    baseOfferMultiplier: 1.12,
    buyerReliabilityScore: 87,
    paymentReliabilityScore: 89,
    historicalSettlementDays: 3,
    acceptedQuality: ["Grade-A / Premium", "Standard / Grade-B"],
  },
];

export class BuyerCompatibilityAgent {
  /**
   * Evaluates all registered buyers against the farmer's structured goal and crop characteristics
   */
  static evaluateBuyers(goal: MissionGoal, mandiBenchmarkPrice: number): EvaluatedBuyer[] {
    const cropNormalized = goal.crop.toLowerCase();
    const quantityKg = goal.unit === "Quintals" ? goal.quantity * 100 : goal.quantity;

    return REGISTERED_BUYER_REGISTRY.map((buyer) => {
      // 1. Crop compatibility
      const cropCompatibility = buyer.acceptedCrops.some((c) =>
        c.toLowerCase().includes(cropNormalized) || cropNormalized.includes(c.toLowerCase())
      );

      // 2. Quantity compatibility
      const quantityCompatibility = buyer.maxCapacityKg >= quantityKg;

      // 3. Quality compatibility
      const qualityCompatibility = buyer.acceptedQuality.includes(goal.quality);

      // 4. Price offer calculation
      const offeredPrice = Math.round(mandiBenchmarkPrice * buyer.baseOfferMultiplier * 10) / 10;

      // 5. Logistics cost estimate
      // Transport rule: Base loading fee ₹350 + (₹4.2 per km per ton equivalent)
      const weightFactor = Math.max(0.4, quantityKg / 1000);
      const estimatedTransportCost = Math.round(350 + buyer.distanceKm * 4.5 * weightFactor);

      // Disqualification reasons
      let disqualificationReason: string | undefined = undefined;
      if (!cropCompatibility) {
        disqualificationReason = `Does not procure ${goal.crop} (Procures: ${buyer.acceptedCrops.join(", ")})`;
      } else if (!quantityCompatibility) {
        disqualificationReason = `Maximum procurement capacity (${buyer.maxCapacityKg} kg) exceeded by batch quantity (${quantityKg} kg)`;
      } else if (!qualityCompatibility) {
        disqualificationReason = `Requires ${buyer.acceptedQuality.join(" or ")} (Offered batch: ${goal.quality})`;
      }

      return {
        id: buyer.id,
        name: buyer.name,
        cropCompatibility,
        quantityCompatibility,
        maxCapacity: buyer.maxCapacityKg,
        offeredPrice,
        distanceKm: buyer.distanceKm,
        estimatedTransportCost,
        buyerReliabilityScore: buyer.buyerReliabilityScore,
        paymentReliabilityScore: buyer.paymentReliabilityScore,
        historicalSettlementDays: buyer.historicalSettlementDays,
        location: buyer.location,
        freshness: "SIMULATED",
        disqualificationReason,
      };
    });
  }
}
