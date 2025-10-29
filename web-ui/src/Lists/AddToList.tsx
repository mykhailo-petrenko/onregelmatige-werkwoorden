import type { JSX } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

import { useAddWordToCurrentList, useIsInActiveList } from './activeLlistProvider';

export function AddToList({ wordId }: { wordId: string }): JSX.Element {
  const addToCurrentList = useAddWordToCurrentList();
  const isInActiveList = useIsInActiveList();
  
  const already = isInActiveList(wordId);
  const icon = already ? <CheckIcon fontSize="small" color="disabled" /> : <AddIcon fontSize="small" />;
  return (
    <Tooltip title={already ? 'Already in list' : 'Add to active list'}>
      <span>
        <IconButton
          size="small"
          onClick={() => !already && addToCurrentList(wordId)}
          disabled={already}
          aria-label={already ? 'Already in list' : 'Add to active list'}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  );
}
