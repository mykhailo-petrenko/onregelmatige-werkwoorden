import { ButtonGroup, Button } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import type { VerbList } from '../Lists/types.ts';
import { memo } from 'react';

export interface VerListsSelectorProps {
  lists: VerbList[];
  active?: string;
  select?: (id: string) => void;
}

export const VerbListsSelector = memo(function VerbListsSelector(props: VerListsSelectorProps) {
  const buttons = props.lists.map((list: VerbList) => {
    const key = `list-button-${list.id}`;
    const variant = (list.id === props.active) ? 'contained' : 'outlined';
    const select = () => {
      if (!props.select) {
        return;
      }

      props.select(list.id);
    };

    return <Button
      key={key}
      variant={variant}
      onClick={select}
    >
        {list.label}
    </Button>;
  });

  return (<>
    <ButtonGroup variant="outlined" aria-label="Words lists">
      {buttons}
    </ButtonGroup>
  </>);
      // <Button loadingPosition="start" startIcon={<AddIcon />}>
      //   Create
      // </Button>
});

export default VerbListsSelector;
