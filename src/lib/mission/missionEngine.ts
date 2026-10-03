import {
  MissionGoal,
  MarketEvidence,
  EvaluatedBuyer,
  PlanTradeoff,
  AgriMissionRecord,
  MissionAuditItem,
} from "./types";
import { MissionUnderstandingAgent } from "../agents/MissionUnderstandingAgent";
import { MarketEvidenceAgent } from "../agents/MarketEvidenceAgent";
import { BuyerCompatibilityAgent } from "../agents/BuyerCompatibilityAgent";
import { PlanComparisonAgent } from "../agents/PlanComparisonAgent";

export class MissionEngine {
  /**
   * Executes complete constraint-aware planning pipeline
   */
  static runMission(params: {
    goal: MissionGoal;
    farmerId?: string;
    farmerName?: string;
  }): AgriMissionRecord {
    const { goal, farmerId = "user-rajesh", farmerName = "Rajesh Kumar" } = params;
    const missionId = `MSN-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const auditTrail: MissionAuditItem[] = [];

    // Step 1: Mission received
    auditTrail.push({
      stepNumber: 1,
      actionNameEn: "Mission Objective Ingested",
      actionNameTa: "பணி நோக்கம் பெறப்பட்டது",
      detailsEn: `Agricultural goal submitted: Sell ${goal.quantity} ${goal.unit} of ${goal.crop} from ${goal.location}.`,
      detailsTa: `விவசாய இலக்கு பெறப்பட்டது: ${goal.location} பகுதியிலிருந்து ${goal.quantity} ${goal.unit} ${goal.crop} விற்பனை செய்யப்பட வேண்டும்.`,
      sourceType: "Farmer Input",
      freshness: "USER PROVIDED",
      timestamp: timeStr,
    });

    // Step 2: Goal & Constraints Parsed
    auditTrail.push({
      stepNumber: 2,
      actionNameEn: "Goal & Constraints Structured",
      actionNameTa: "இலக்கு மற்றும் வரம்புகள் கட்டமைக்கப்பட்டன",
      detailsEn: `Target Deadline: ${goal.deadlineDays} days | Min Expected Price: ₹${goal.minExpectedPricePerUnit}/kg | Max Transport Cap: ₹${goal.maxTransportCost.toLocaleString()} | Active constraints: ${goal.constraints.join(", ")}.`,
      detailsTa: `காலக்கெடு: ${goal.deadlineDays} நாட்கள் | குறைந்தபட்ச விலை: ₹${goal.minExpectedPricePerUnit}/கிலோ | அதிகபட்ச போக்குவரத்து: ₹${goal.maxTransportCost.toLocaleString()} | வரம்புகள்: ${goal.constraints.join(", ")}.`,
      sourceType: "Mission Understanding Agent",
      freshness: "USER PROVIDED",
      timestamp: timeStr,
    });

    // Step 3: Market Data Retrieved
    const marketEvidence = MarketEvidenceAgent.gatherEvidence(goal.crop, goal.location.split(",")[0]);
    auditTrail.push({
      stepNumber: 3,
      actionNameEn: "Mandi Price Benchmarks Retrieved",
      actionNameTa: "மண்டி விலை நிலவரம் பெறப்பட்டது",
      detailsEn: `Current APMC spot rate: ₹${marketEvidence.currentPrice}/kg (${marketEvidence.historicalTrend}, ${marketEvidence.recentMovementPercent}% 7-day delta). Benchmark: ₹${marketEvidence.mandiBenchmark}/kg.`,
      detailsTa: `தற்போதைய ஒழுங்குமுறை விற்பனைக்கூட விலை: ₹${marketEvidence.currentPrice}/கிலோ (${marketEvidence.historicalTrend}, ${marketEvidence.recentMovementPercent}% மாற்றம்). அடிப்படை விலை: ₹${marketEvidence.mandiBenchmark}/கிலோ.`,
      sourceType: "Tamil Nadu APMC Mandi Data Engine",
      freshness: "SIMULATED",
      timestamp: marketEvidence.timestamp,
    });

    // Step 4: Buyer Candidates Checked
    const evaluatedBuyers = BuyerCompatibilityAgent.evaluateBuyers(goal, marketEvidence.currentPrice);
    const qualifiedBuyers = evaluatedBuyers.filter((b) => !b.disqualificationReason);
    auditTrail.push({
      stepNumber: 4,
      actionNameEn: "Procurement Network Scanned",
      actionNameTa: "கொள்முதல் வலைப்பின்னல் சோதிக்கப்பட்டது",
      detailsEn: `Scanned ${evaluatedBuyers.length} registered bulk buyers, mills, and grocery retail networks across Tamil Nadu and South corridors.`,
      detailsTa: `தமிழ்நாடு மற்றும் தென்னகத்தின் ${evaluatedBuyers.length} பதிவு செய்யப்பட்ட மொத்த வாங்குபவர்கள் மற்றும் ஆலைகள் பரிசீலிக்கப்பட்டன.`,
      sourceType: "AgriTech Verified Buyer Directory",
      freshness: "RECENT",
      timestamp: timeStr,
    });

    // Step 5: Constraint Filtering
    auditTrail.push({
      stepNumber: 5,
      actionNameEn: "Buyer Criteria & Capacity Filtered",
      actionNameTa: "வாங்குபவர் தகுதி மற்றும் திறன் வடிகட்டப்பட்டது",
      detailsEn: `${qualifiedBuyers.length} of ${evaluatedBuyers.length} procurement entities passed crop variety, volume (${goal.quantity} ${goal.unit}), and quality (${goal.quality}) specifications.`,
      detailsTa: `${evaluatedBuyers.length} இல் ${qualifiedBuyers.length} கொள்முதல் நிறுவனங்கள் பயிர் வகை, அளவு (${goal.quantity} ${goal.unit}) மற்றும் தரம் (${goal.quality}) விதிகளுக்கு தகுதி பெற்றன.`,
      sourceType: "Buyer Compatibility Agent",
      freshness: "RECENT",
      timestamp: timeStr,
    });

    // Step 6: Logistics Estimates
    auditTrail.push({
      stepNumber: 6,
      actionNameEn: "Logistics, Route & Perishability Computed",
      actionNameTa: "போக்குவரத்து, வழித்தடம் மற்றும் அழுகல் கணக்கிடப்பட்டது",
      detailsEn: `Calculated multi-modal road transit tariffs, toll charges, cold-storage buffer, and crop perishability exposure for all viable delivery routes.`,
      detailsTa: `அனைத்து வழித்தடங்களுக்கும் சாலை சரக்குக் கட்டணம், சுங்கக் கட்டணம், சேமிப்பு மற்றும் பயிர் இழப்பு சாத்தியக்கூறுகள் கணக்கிடப்பட்டன.`,
      sourceType: "Logistics & Perishability Agent",
      freshness: "ESTIMATED",
      timestamp: timeStr,
    });

    // Step 7: Candidate Plans Generated
    const plans = PlanComparisonAgent.generatePlanComparison({
      goal,
      evidence: marketEvidence,
      evaluatedBuyers,
    });
    auditTrail.push({
      stepNumber: 7,
      actionNameEn: "Trade-off Strategies Formulated",
      actionNameTa: "மாற்று திட்டங்கள் மற்றும் ஒப்பீடுகள் உருவாக்கப்பட்டன",
      detailsEn: `Synthesized ${plans.length} diverse operational strategies (Plan A: Direct Contract, Plan B: Regional Hub, Plan C: Storage Hold, Plan D: Risk Split).`,
      detailsTa: `${plans.length} மாறுபட்ட செயல் திட்டங்கள் தொகுக்கப்பட்டன (திட்டம் A: நேரடி ஒப்பந்தம், திட்டம் B: மண்டல மையம், திட்டம் C: சேமிப்பு இருப்பு, திட்டம் D: இருமுனை ஒதுக்கீடு).`,
      sourceType: "Plan Comparison Agent",
      freshness: "ESTIMATED",
      timestamp: timeStr,
    });

    // Step 8: Multi-Constraint Risk Check
    const activeWarnings = plans.flatMap((p) => p.constraintWarnings);
    auditTrail.push({
      stepNumber: 8,
      actionNameEn: "Constraint Safety Verification Executed",
      actionNameTa: "வரம்பு பாதுகாப்பு சரிபார்ப்பு செய்யப்பட்டது",
      detailsEn: `Deterministic checks completed against price, payment reliability, transit deadlines, and spoilage caps. ${activeWarnings.length} risk conditions annotated.`,
      detailsTa: `விலை, கட்டண நம்பகத்தன்மை, போக்குவரத்து காலக்கெடு மற்றும் இழப்பு வரம்புகளுக்கு எதிரான கணக்கீடு முடிந்தது. ${activeWarnings.length} எச்சரிக்கைகள் குறிக்கப்பட்டன.`,
      sourceType: "Risk & Constraint Agent",
      freshness: "SIMULATED",
      timestamp: timeStr,
    });

    // Step 9: User Approval Gate
    const selectedPlan = plans[0]; // Default preview
    auditTrail.push({
      stepNumber: 9,
      actionNameEn: "Safe Action Gate — Human Approval Required",
      actionNameTa: "பாதுகாப்பான செயல் வாயில் — மனித ஒப்புதல் தேவை",
      detailsEn: `Action preview generated for '${selectedPlan.actionPayload.actionTitleEn}'. Financial transactions require explicit farmer verification.`,
      detailsTa: `'${selectedPlan.actionPayload.actionTitleTa}' க்கான செயல் முன்னோட்டம் தயார். நிதி பரிவர்த்தனைகளுக்கு விவசாயியின் வெளிப்படையான ஒப்புதல் தேவை.`,
      sourceType: "Human Approval Gate",
      freshness: "LIVE",
      timestamp: timeStr,
    });

    const mission: AgriMissionRecord = {
      id: missionId,
      missionName: `${goal.crop} ${goal.quantity} ${goal.unit} Realization Plan`,
      farmerId,
      farmerName,
      createdAt: new Date().toISOString(),
      status: "active",
      goal,
      marketEvidence,
      evaluatedBuyers,
      plans,
      selectedPlanId: selectedPlan.id,
      auditTrail,
      evidenceQuality: marketEvidence.evidenceQuality,
      qualityReasons: marketEvidence.qualityReasons,
      pendingApprovalAction: selectedPlan.actionPayload,
    };

    return mission;
  }

  /**
   * Adaptive Plan Recovery: Invoked when a buyer cancels or conditions shift unexpectedly
   */
  static recoverMission(
    mission: AgriMissionRecord,
    triggerEn = "Primary Buyer rejected delivery due to warehouse intake cap",
    triggerTa = "கிடங்கு கொள்ளளவு முழுமை அடைந்ததால் முதன்மை வாங்குபவர் ஆர்டரை ரத்து செய்தார்"
  ): AgriMissionRecord {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // 1. Detect failed condition & flag
    const updatedAudit = [...mission.auditTrail];
    updatedAudit.push({
      stepNumber: updatedAudit.length + 1,
      actionNameEn: "Disruption Detected — Adaptive Plan Recovery Triggered",
      actionNameTa: "திடீர் மாற்றம் கண்டறியப்பட்டது — மீட்பு திட்டம் தொடங்கப்பட்டது",
      detailsEn: `Failure Event: ${triggerEn}. Agent immediately rerouting flow to alternative qualified buyers.`,
      detailsTa: `காரணம்: ${triggerTa}. மாற்று தகுதியான வாங்குபவர்களுக்கு உடனடியாக மாற்றியமைக்கப்படுகிறது.`,
      sourceType: "Plan Recovery System",
      freshness: "LIVE",
      timestamp: timeStr,
    });

    // 2. Select Plan B or Plan D as the active recovery plan
    const recoveryPlan =
      mission.plans.find((p) => p.planCode === "PLAN_B") ||
      mission.plans.find((p) => p.planCode === "PLAN_D") ||
      mission.plans[1] ||
      mission.plans[0];

    updatedAudit.push({
      stepNumber: updatedAudit.length + 1,
      actionNameEn: "Autonomous Recalibration Complete",
      actionNameTa: "தானியங்கி மறுசீரமைப்பு நிறைவடைந்தது",
      detailsEn: `Switching primary route to '${recoveryPlan.titleEn}'. Net realization updated to ₹${recoveryPlan.netRealization.toLocaleString()} with ${recoveryPlan.deliveryWindow} window.`,
      detailsTa: `'${recoveryPlan.titleTa}' க்கு மாற்றப்பட்டது. நிகர வருமானம் ₹${recoveryPlan.netRealization.toLocaleString()} என புதுப்பிக்கப்பட்டது.`,
      sourceType: "Plan Recovery System",
      freshness: "ESTIMATED",
      timestamp: timeStr,
    });

    updatedAudit.push({
      stepNumber: updatedAudit.length + 1,
      actionNameEn: "Human Approval Requested for Recovered Plan",
      actionNameTa: "மீட்கப்பட்ட திட்டத்திற்கு விவசாயி ஒப்புதல் கோரப்பட்டது",
      detailsEn: `Requesting approval to dispatch order to ${recoveryPlan.buyerName}.`,
      detailsTa: `${recoveryPlan.buyerName} க்கு ஆர்டரை அனுப்ப ஒப்புதல் கோரப்படுகிறது.`,
      sourceType: "Human Approval Gate",
      freshness: "LIVE",
      timestamp: timeStr,
    });

    return {
      ...mission,
      status: "recovered",
      selectedPlanId: recoveryPlan.id,
      pendingApprovalAction: {
        ...recoveryPlan.actionPayload,
        status: "pending_approval",
      },
      auditTrail: updatedAudit,
      recoveryHistory: [
        ...(mission.recoveryHistory || []),
        {
          timestamp: timeStr,
          triggerEn,
          triggerTa,
          recoveredPlanId: recoveryPlan.id,
        },
      ],
    };
  }

  /**
   * Human Approval Gate: Commits the approved action
   */
  static approveAction(mission: AgriMissionRecord): AgriMissionRecord {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    const updatedAudit = [...mission.auditTrail];
    updatedAudit.push({
      stepNumber: updatedAudit.length + 1,
      actionNameEn: "Action Approved by Farmer",
      actionNameTa: "செயல் விவசாயியால் அங்கீகரிக்கப்பட்டது",
      detailsEn: `Farmer confirmed dispatch request to ${mission.pendingApprovalAction?.targetName} for ${mission.pendingApprovalAction?.quantity} kg at ₹${mission.pendingApprovalAction?.grossOfferPerUnit}/kg. Net payout ₹${mission.pendingApprovalAction?.netRealization.toLocaleString()} locked.`,
      detailsTa: `${mission.pendingApprovalAction?.targetName} நிறுவனத்திற்கு ${mission.pendingApprovalAction?.quantity} கிலோவை ₹${mission.pendingApprovalAction?.grossOfferPerUnit}/கிலோ விலையில் அனுப்ப விவசாயி ஒப்புதல் அளித்தார். நிகர வருவாய் ₹${mission.pendingApprovalAction?.netRealization.toLocaleString()} உறுதி செய்யப்பட்டது.`,
      sourceType: "Human Approval Gate",
      freshness: "LIVE",
      timestamp: timeStr,
    });

    return {
      ...mission,
      status: "completed",
      pendingApprovalAction: mission.pendingApprovalAction
        ? { ...mission.pendingApprovalAction, status: "approved" }
        : undefined,
      auditTrail: updatedAudit,
    };
  }
}
