import VerbListTable from '../ListsEditor/VerbListTable';
import { useCurrentLearnList, usedeleteWordFromCurrentList } from '../Lists/activeLlistProvider';

export function ActiveListPage() {
  const currentList = useCurrentLearnList();
  const selecteWordFromList = usedeleteWordFromCurrentList();

  return (<>
    <h2>What I learn</h2>
    <VerbListTable
      list={currentList}
      onDelete={selecteWordFromList}
    />
  </>);
}

