import { Box } from '@mui/material';
import { useAtom } from 'jotai';

import VerbTrainerCard from './VerbTrainerCard';
import { currentWerkWord, useNextWordCallback } from '../Lists/activeLlistProvider.ts';

const STYLE = {
  scrollSnapAlign: 'start'
};

export default function VerbTrainer() {

  const [current, ] = useAtom(currentWerkWord);
  const next = useNextWordCallback();

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        style={STYLE}
      >
        <VerbTrainerCard
          current={current}
          onNext={next}
        />
      </Box>
    </>
  );
}

