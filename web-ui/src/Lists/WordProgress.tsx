import { Box } from '@mui/material';
import { useWordBuckets, MAX_BUCKET } from './statsStorage';

export const DEFAULT_COLOR = '#e0e0e0';

export const LEARNING_GRADIENT = [
  '#FF4E11',
  '#FF8E15',
  '#FAB733',
  '#ACB334',
  '#69B34C',
];

export interface WordProgressProps {
  /** Either provide a bucket number (1..MAX_BUCKET) or a wordId to resolve the bucket via hook */
  bucket?: number | null;
  wordId?: string;
  maxBucket?: number;
  size?: { width?: number; height?: number };
}

export function WordProgress({ bucket, wordId, maxBucket = MAX_BUCKET, size = { width: 18, height: 10 } }: WordProgressProps) {
  const { getWordBucket } = useWordBuckets();

  let resolvedBucket: number = typeof bucket === 'number' ? bucket : 0;
  if ((!bucket || bucket === null) && wordId) {
    resolvedBucket = getWordBucket(wordId, 0) || 0;
  }

  const segments = new Array(maxBucket).fill(0).map((_, i) => {
    const filled = i < resolvedBucket;
    const color = resolvedBucket > 0 ? LEARNING_GRADIENT[Math.max(0, resolvedBucket - 1)] : DEFAULT_COLOR;
    const bg = filled ? color : DEFAULT_COLOR;
    return (
      <Box
        key={i}
        sx={{
          width: size.width as number,
          height: size.height as number,
          borderRadius: 1,
          backgroundColor: String(bg),
        }}
      />
    );
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      {segments}
    </Box>
  );
}

export default WordProgress;
