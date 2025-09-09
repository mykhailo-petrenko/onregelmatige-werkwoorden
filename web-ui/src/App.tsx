// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage.tsx';
import { ListsPage } from './pages/ListsPage.tsx';
import { ProfilePage } from './pages/ProfilePage.tsx';
import { Nav } from './Nav.tsx';
import { ListsEditor } from './ListsEditor/ListsEditor.tsx';
import { useWordListProvider } from './Lists/activeLlistProvider.ts';

function App() {
  useWordListProvider();

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route index element={<HomePage/>}></Route>
          <Route path="lists" element={<ListsPage/>}>
            <Route index element={<ListsEditor />} />
            <Route path=":id" element={<ListsEditor />} />
          </Route>
          <Route path="profile" element={<ProfilePage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
