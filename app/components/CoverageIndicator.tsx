/**
 * CoverageIndicator Component
 *
 * A donut-shaped circular coverage indicator that shows:
 * - Full green ring for 100% (all good)
 * - Full red ring for 0% (all bad)
 * - Partial green/red ring for values in between
 *
 * The partial state shows a donut chart representation with a hole in the middle.
 *
 * @param percentage - The percentage value (0-100)
 * @param size - The size of the indicator in pixels
 * @param inverted - If true, reverses the color logic (100% = red, 0% = green). Used for "Duplicated Lines" where lower is better.
 */

interface CoverageIndicatorProps {
  percentage: number;
  size?: number;
  inverted?: boolean;
}

export default function CoverageIndicator({
  percentage,
  size = 16,
  inverted = false
}: CoverageIndicatorProps) {
  const strokeWidth = 1.5;
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;

  // For normal mode: green increases with percentage
  // For inverted mode: red increases with percentage (green decreases)
  const displayPercentage = inverted ? 100 - percentage : percentage;
  const strokeDashoffset = circumference - (displayPercentage / 100) * circumference;

  // Determine state based on percentage
  const isAllGood = percentage === 100 && !inverted || percentage === 0 && inverted;
  const isAllBad = percentage === 0 && !inverted || percentage === 100 && inverted;
  const isPartial = !isAllGood && !isAllBad;

  // Full green ring (all good)
  if (isAllGood) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4CAF50"
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  // Full red ring (all bad)
  if (isAllBad) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f44336"
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  // Partial state - donut chart with red background and green overlay
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background red ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f44336"
        strokeWidth={strokeWidth}
      />
      {/* Green ring showing coverage percentage */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#4CAF50"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 0.3s ease'
        }}
      />
    </svg>
  );
}
