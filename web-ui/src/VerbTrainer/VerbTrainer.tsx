import { Box } from '@mui/material';
import VerbTrainerCard from './VerbTrainerCard';
import { useVerbProvider } from './useVerbProvider';

export default function VerbTrainer() {
  const [current, next] = useVerbProvider();

  if (!current) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <VerbTrainerCard
        current={current}
        onNext={next}
      />
    </Box>
  );
}
