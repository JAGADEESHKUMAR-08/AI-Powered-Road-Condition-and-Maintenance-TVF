import { AiAnalysisResult, IssueType, MediaType } from '../types';

export async function analyzeRoadMedia(
  mediaSource: string,
  mediaType: MediaType = 'image',
  _suggestedType?: IssueType
): Promise<AiAnalysisResult> {
  if (mediaType === 'video') {
    throw new Error('Video analysis is not supported by the image detector yet. Please upload a photo.');
  }

  const source = await fetch(mediaSource);
  if (!source.ok) throw new Error('Unable to read the selected image.');
  const image = await source.blob();
  const formData = new FormData();
  formData.append('file', image, 'road-image');
  const response = await fetch('/api/analyze', { method: 'POST', body: formData });
  if (!response.ok) throw new Error((await response.json()).detail || 'Road analysis failed.');
  const analysis = await response.json();
  const firstDefect = analysis.defects?.[0];
  const detectedDefect = (firstDefect?.type || 'Other') as IssueType;
  const riskScore = analysis.risk_score || 0;
  const severity = firstDefect?.severity || 'Low';
  const confidence = Math.round((firstDefect?.confidence || 0) * 100);
  const detectedAreaPercent = firstDefect?.area_percent || 0;
  const surfaceDamage = severity;
  const trafficExposure = severity === 'Critical' ? 'High' : severity;
  const waterAccumulation = detectedDefect === 'Water Accumulation' ? severity : 'Low';
  const visibility = 'Low';
  const explanation = firstDefect
    ? `${detectedDefect} detected by the road defect model.`
    : 'No supported road defect was detected in this image.';
  const recommendedAction = firstDefect
    ? `Schedule inspection for the detected ${detectedDefect.toLowerCase()}.`
    : 'No immediate repair recommendation is available.';

  return {
    riskScore,
    severity,
    confidence,
    detectedDefect,
    detectedAreaPercent,
    modelVersion: 'Road Defect YOLO',
    factors: {
      surfaceDamage,
      trafficExposure,
      waterAccumulation,
      visibility,
    },
    explanation,
    recommendedAction,
    boundingBox: firstDefect?.bbox
      ? {
          x: firstDefect.bbox.x_min,
          y: firstDefect.bbox.y_min,
          width: firstDefect.bbox.x_max - firstDefect.bbox.x_min,
          height: firstDefect.bbox.y_max - firstDefect.bbox.y_min,
        }
      : undefined,
  };
}

export async function analyzeRoadImage(
  imageSource: string,
  suggestedType?: IssueType
): Promise<AiAnalysisResult> {
  return analyzeRoadMedia(imageSource, 'image', suggestedType);
}
