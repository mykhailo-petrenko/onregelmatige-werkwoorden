import { Box } from '@mui/material';
import VerbTrainerCard from './VerbTrainerCard';
import { useVerbProvider, useWordLists } from './useVerbProvider';
import VerbListsSelector from './VerbListsSelector.tsx';
import { useCallback, useEffect, useState } from 'react';
import VerbListTable from './VerbListTable.tsx';
import type { VerbList } from './VerbTypes.ts';

const STYLE = {
  scrollSnapAlign: 'start'
};

export default function VerbTrainer() {
  const [wordLists,] = useWordLists();
  const [active, selectList] = useState('2');
  const [currentList, setCurrentList] = useState<VerbList | null>(null);

  const [current, next] = useVerbProvider(currentList);

  useEffect(() => {
    console.log('setCurrentList', active);
    setCurrentList(
      wordLists.find(list => list.id === active) || null
    );
  }, [wordLists, active]);

  const onSelectList = useCallback((id: string): void => {
    if (id === active) {
      return;
    }
    console.log('onSelectList', id);
    selectList(id);
  }, [selectList, active]);

  if (!current) {
    return null;
  }

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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
        padding="1em"
        style={STYLE}
      >
        <VerbListsSelector
          lists={wordLists}
          active={active}
          select={onSelectList}
        />

        <VerbListTable
          list={currentList}
        />
      </Box>
    </>
  );
}
