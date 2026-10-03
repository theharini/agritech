export type FreshnessLabel =
  | "LIVE"
  | "RECENT"
  | "SIMULATED"
  | "DEMO DATA"
  | "USER PROVIDED"
  | "ESTIMATED";

export type EvidenceQualityLevel = "HIGH" | "MEDIUM" | "LOW";

export type RiskLevel = "Low" | "Medium" | "High";

export type ConstraintStatus = "PASS" | "WARNING" | "BLOCKED";

export interface MissionGoal {
  crop: string;
  quantity: number;
  unit: "kg" | "Quintals" | "Crates";
  location: string;
  quality: "Grade-A / Premium" | "Standard / Grade-B" | "Organic Certified" | "Fair / Grade-C";
  deadlineDays: number;
  minExpectedPricePerUnit: number;
  maxTransportCost: number;
  buyerPreference: "all" | "high_reliability" | "local_only" | "direct_retail";
  riskPreference: "low" | "balanced" | "aggressive";
  rawGoalText?: string;
  constraints: string[];
}

export interface MissionClarification {
  needsClarification: boolean;
  questionEn: string;
  questionTa: string;
  field: string;
  suggestions: string[];
}

export interface MarketEvidence {
  crop: string;
  currentPrice: number;
  unit: string;
  historicalTrend: "increasing" | "decreasing" | "stable";
  recentMovementPercent: number;
  mandiBenchmark: number;
  relevantLocations: string[];
  timestamp: string;
  freshness: FreshnessLabel;
  confidenceScore: number; // 0-100 deterministic
  evidenceQuality: EvidenceQualityLevel;
  qualityReasons: { en: string; ta: string; positive: boolean }[];
}

export interface EvaluatedBuyer {
  id: string;
  name: string;
  cropCompatibility: boolean;
  quantityCompatibility: boolean;
  maxCapacity: number;
  offeredPrice: number;
  distanceKm: number;
  estimatedTransportCost: number;
  buyerReliabilityScore: number; // 0-100
  paymentReliabilityScore: number; // 0-100
  historicalSettlementDays: number;
  location: string;
  freshness: FreshnessLabel;
  disqualificationReason?: string;
}

export interface LogisticsPerishabilityEstimate {
  distanceKm: number;
  transportCost: number;
  estimatedTransitHours: number;
  deliveryDays: number;
  fitsDeadline: boolean;
  cropPerishabilityTier: "HIGH" | "MEDIUM" | "LOW";
  storageCostPerDay: number;
  estimatedLossExposurePercent: number;
  lossExposureAmount: number;
  platformFees: number;
}

export interface ConstraintWarning {
  rule: string;
  severity: "warning" | "blocked";
  textEn: string;
  textTa: string;
}

export interface ActionPayload {
  actionType: "send_buyer_request" | "schedule_delivery" | "reserve_storage" | "split_order";
  actionTitleEn: string;
  actionTitleTa: string;
  targetName: string;
  quantity: number;
  unit: string;
  grossOfferPerUnit: number;
  grossTotal: number;
  transportCost: number;
  netRealization: number;
  deliveryWindow: string;
  buyerReliability: number;
  paymentReliability: number;
  status: "pending_approval" | "approved" | "rejected" | "executed";
  riskWarnings: string[];
}

export interface PlanTradeoff {
  id: string;
  planCode: "PLAN_A" | "PLAN_B" | "PLAN_C" | "PLAN_D";
  titleEn: string;
  titleTa: string;
  strategyType: "sell_now" | "alternative_buyer" | "hold_and_sell" | "split_quantity";
  buyerName: string;
  secondaryBuyerName?: string;
  buyerReliability: number; // 0-100
  paymentReliability: number; // 0-100
  grossRevenue: number;
  transportCost: number;
  storageCost: number;
  platformFees: number;
  estimatedLoss: number;
  netRealization: number;
  netRealizationPerUnit: number;
  netRealizationPerKg?: number;
  riskLevel: RiskLevel;
  deadlineFit: boolean;
  deliveryWindow: string;
  constraintStatus: ConstraintStatus;
  constraintWarnings: ConstraintWarning[];
  explanationEn: string;
  explanationTa: string;
  actionRequired: boolean;
  actionPayload: ActionPayload;
}

export interface MissionAuditItem {
  stepNumber: number;
  actionNameEn: string;
  actionNameTa: string;
  detailsEn: string;
  detailsTa: string;
  sourceType: string;
  freshness: FreshnessLabel;
  timestamp: string;
}

export interface WhatIfInput {
  buyerPriceDeltaPercent: number; // -30 to +30
  transportCostDeltaPercent: number; // -50 to +100
  deliveryDelayDays: number; // 0 to 5
  availableQuantity: number;
  farmerWaitDays: number; // 0 to 7
  buyerReliabilityDeltaPercent: number; // -50 to +20
}

export interface WhatIfResult {
  baseNetRealization: number;
  simulatedNetRealization: number;
  difference: number;
  baseRisk: RiskLevel;
  simulatedRisk: RiskLevel;
  baseDeadlineFit: boolean;
  simulatedDeadlineFit: boolean;
  recommendedPlanCode: "PLAN_A" | "PLAN_B" | "PLAN_C" | "PLAN_D";
  actionShiftEn: string;
  actionShiftTa: string;
  mathematicalReasonEn: string;
  mathematicalReasonTa: string;
}

export interface AgriMissionRecord {
  id: string;
  missionName: string;
  farmerId: string;
  farmerName: string;
  createdAt: string;
  status: "active" | "completed" | "recovered" | "failed" | "cancelled";
  goal: MissionGoal;
  marketEvidence: MarketEvidence;
  evaluatedBuyers: EvaluatedBuyer[];
  plans: PlanTradeoff[];
  selectedPlanId?: string;
  auditTrail: MissionAuditItem[];
  evidenceQuality: EvidenceQualityLevel;
  qualityReasons: { en: string; ta: string; positive: boolean }[];
  pendingApprovalAction?: ActionPayload;
  failureReason?: string;
  recoveryHistory?: {
    timestamp: string;
    triggerEn: string;
    triggerTa: string;
    recoveredPlanId: string;
  }[];
}

export interface SyntheticMissionScenario {
  id: string;
  titleEn: string;
  titleTa: string;
  category: "standard" | "edge_case" | "stress_test";
  farmerName: string;
  farmerLocation: string;
  crop: string;
  quantity: number;
  unit: "kg" | "Quintals";
  quality: "Grade-A / Premium" | "Standard / Grade-B" | "Organic Certified" | "Fair / Grade-C";
  deadlineDays: number;
  minAcceptablePrice: number;
  maxTransportCost: number;
  statedGoal: string;
  availableBuyers: {
    name: string;
    offeredPrice: number;
    capacity: number;
    distanceKm: number;
    buyerReliability: number; // 0-100
    paymentReliability: number; // 0-100
    acceptedQuality: string[];
  }[];
  isEdgeCase?: boolean;
  edgeCaseType?: string;
  edgeCaseDescriptionEn?: string;
  edgeCaseDescriptionTa?: string;
}

export interface EvaluationMetricsSummary {
  totalMissions: number;
  agentConstraintSatisfactionRate: number; // e.g. 96.2%
  baselineConstraintSatisfactionRate: number; // e.g. 48.9%
  agentSuccessfulPlanRate: number; // e.g. 95.5%
  baselineSuccessfulPlanRate: number; // e.g. 62.2%
  averageNetRealizationDiffPerUnit: number; // e.g. +₹3.80/kg
  totalValueProtectedRupees: number;
  unnecessaryActionRate: number; // e.g. 2.1%
  edgeCaseRecoveryRate: number; // e.g. 91.7%
  baselineEdgeCaseSurvivalRate: number; // e.g. 12.5%
}
