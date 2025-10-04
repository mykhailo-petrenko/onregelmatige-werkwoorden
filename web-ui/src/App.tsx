// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { ListEditor } from './ListsEditor/ListsEditor.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { Nav } from './Nav.tsx';
import { useWordListProvider } from './Lists/activeLlistProvider.ts';
import { LearnPage } from './pages/LearnPage.tsx';
import { Vocabulary } from './Vocabulary/Vocabulary.tsx';

function App() {
  useWordListProvider();

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index element={<Vocabulary/>} />
          <Route path="lists" element={<ListEditor/>} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="profile" element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
