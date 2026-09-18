import { AiAnalysisResult, IssueType, MediaType } from '../types';

export async function analyzeRoadMedia(
  mediaSource: string,
  mediaType: MediaType = 'image',
  suggestedType?: IssueType
): Promise<AiAnalysisResult> {
  // Simulate AI computation timeline / progressive neural network scan
  await new Promise((resolve) => setTimeout(resolve, mediaType === 'video' ? 1600 : 1200));

  let detectedDefect: IssueType = suggestedType || 'Pothole';
  let riskScore = 82;
  let severity: 'Critical' | 'High' | 'Medium' | 'Low' = 'High';
  let confidence = 94;
  let detectedAreaPercent = 18.4;
  let surfaceDamage: 'Critical' | 'High' | 'Medium' | 'Low' = 'High';
  let trafficExposure: 'Critical' | 'High' | 'Medium' | 'Low' = 'High';
  let waterAccumulation: 'Critical' | 'High' | 'Medium' | 'Low' = 'Medium';
  let visibility: 'Critical' | 'High' | 'Medium' | 'Low' = 'Low';
  let explanation =
    'The pothole is deep and located in a high-traffic area. Surface damage is severe, and water accumulation may worsen the condition. These factors contribute to a high risk score.';
  let recommendedAction =
    'Deploy Cold Mix Asphalt patching unit within 24 hours. Set up temporary caution cones.';
  let videoFramesAnalyzed = mediaType === 'video' ? 142 : undefined;
  let motionImpactSeverity = mediaType === 'video' ? 'Severe Vehicle Jolt Detected (0.78g)' : undefined;

  if (suggestedType === 'Crack') {
    detectedDefect = 'Crack';
    riskScore = 71;
    severity = 'High';
    confidence = 92;
    detectedAreaPercent = 24.1;
    surfaceDamage = 'High';
    trafficExposure = 'High';
    waterAccumulation = 'Low';
    visibility = 'Medium';
    explanation =
      'Extensive longitudinal crack network detected across road surface with average fissure width > 18mm. Moisture ingress poses threat of sub-base cavitation.';
    recommendedAction =
      'Apply elastomeric hot-pour bitumen sealant to prevent freeze-thaw and rain expansion.';
  } else if (suggestedType === 'Water Accumulation' || suggestedType === 'Drainage Issue') {
    detectedDefect = 'Water Accumulation';
    riskScore = 89;
    severity = 'Critical';
    confidence = 96;
    detectedAreaPercent = 35.0;
    surfaceDamage = 'Medium';
    trafficExposure = 'Critical';
    waterAccumulation = 'Critical';
    visibility = 'High';
    explanation =
      'Severe standing water pool covering two active traffic lanes. Sub-surface erosion and hydroplaning hazard detected.';
    recommendedAction =
      'Immediate hydro-suction and storm drain line unclogging required. Issue severe traffic detour notice.';
  } else if (suggestedType === 'Road Edge Damage') {
    detectedDefect = 'Road Edge Damage';
    riskScore = 78;
    severity = 'High';
    confidence = 93;
    detectedAreaPercent = 22.0;
    surfaceDamage = 'High';
    trafficExposure = 'Medium';
    waterAccumulation = 'High';
    visibility = 'Critical';
    explanation =
      'Unstabilized shoulder drop-off exceeding 80mm. Threat of lateral vehicle rollover along unlit corridor.';
    recommendedAction =
      'Construct reinforced concrete curb barrier and stone ballast pitching.';
  } else if (suggestedType === 'Damaged Surface') {
    detectedDefect = 'Damaged Surface';
    riskScore = 65;
    severity = 'Medium';
    confidence = 89;
    detectedAreaPercent = 16.5;
    surfaceDamage = 'High';
    trafficExposure = 'Medium';
    waterAccumulation = 'Low';
    visibility = 'Low';
    explanation =
      'Surface asphalt stripping and loose aggregate detected. Risk of chip-seal damage to vehicles.';
    recommendedAction =
      'Schedule cold milling and 40mm dense bituminous macadam overlay.';
  } else {
    // Default Pothole
    detectedDefect = 'Pothole';
    riskScore = mediaType === 'video' ? 86 : 82;
    severity = 'High';
    confidence = 95;
  }

  return {
    riskScore,
    severity,
    confidence,
    detectedDefect,
    detectedAreaPercent,
    modelVersion: 'RG-Vision v4.2',
    factors: {
      surfaceDamage,
      trafficExposure,
      waterAccumulation,
      visibility,
    },
    explanation:
      mediaType === 'video'
        ? `Temporal video analysis across ${videoFramesAnalyzed} frames detected an active ${detectedDefect.toLowerCase()}. Optical tracking reveals dangerous wheel impact displacement.`
        : explanation,
    recommendedAction,
    boundingBox: {
      x: 28,
      y: 35,
      width: 44,
      height: 38,
    },
    videoFramesAnalyzed,
    motionImpactSeverity,
  };
}

export async function analyzeRoadImage(
  imageSource: string,
  suggestedType?: IssueType
): Promise<AiAnalysisResult> {
  return analyzeRoadMedia(imageSource, 'image', suggestedType);
}
