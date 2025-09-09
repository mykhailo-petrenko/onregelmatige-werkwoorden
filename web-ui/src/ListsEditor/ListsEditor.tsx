import { useParams } from 'react-router';
import { Button, Divider } from '@mui/material';
import { useListById } from '../Lists/manageLists.ts';
import VerbListTable from './VerbListTable.tsx';
import { useLearnList } from '../Lists/activeLlistProvider.ts';

export function ListsEditor() {
  const params = useParams();
  const list = useListById(params.id);
  const onLearn = useLearnList(params.id);

  if (!list) {
    return null;
  }

  return (<>
    <section>
      <p>
        <Button
          onClick={onLearn}
          variant="contained"
        >Learn {list.items.length} words from {list.label}</Button>
      </p>
      <Divider />
      <VerbListTable
        list={list}
      />
    </section>
  </>);
}
