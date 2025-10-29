// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router';
import { Container } from '@mui/material';
import './App.css'
import { ProfilePage } from './pages/ProfilePage.tsx';
import { Nav } from './Nav.tsx';
import { useWordListProvider } from './Lists/activeLlistProvider.ts';
import { LearnPage } from './pages/LearnPage.tsx';
import { ActiveListPage } from './pages/ActiveListPage.tsx';
import { AllVocabularyPage } from './pages/AllVocabularyPage.tsx';

function App() {
  useWordListProvider();

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Container maxWidth="lg">
        <Routes>
          <Route index element={<AllVocabularyPage />} />
          <Route path="active" element={<ActiveListPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="profile" element={<ProfilePage/>} />
        </Routes>
        </Container>
      </BrowserRouter>
    </>
  )
}

export default App
