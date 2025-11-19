import VerbListTable from '../ListsEditor/VerbListTable';
import { useCurrentLearnList, useDeleteWordFromCurrentList } from '../Lists/activeLlistProvider';

export function ActiveListPage() {
  const currentList = useCurrentLearnList();
  const selecteWordFromList = useDeleteWordFromCurrentList();

  return (<>
    <h2>What I learn</h2>
    <VerbListTable
      list={currentList}
      onDelete={selecteWordFromList}
    />
  </>);
}

