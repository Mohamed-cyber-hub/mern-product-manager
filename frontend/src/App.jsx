import { Box } from '@mui/material';
import {
  Route,
  Routes,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      {/* Fullscreen Background Layer */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#63e_100%)]" />

      {/* Main App Content */}
      <Box
        sx={{
          position:
            'relative',
          minHeight: '100vh',
          width: '100%',
        }}>
        <Box
          component="section"
          sx={{
            minHeight:
              '100vh',
          }}>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <HomePage />
              }
            />
            <Route
              path="/create"
              element={
                <CreatePage />
              }
            />
          </Routes>
        </Box>
      </Box>
    </>
  );
}

export default App;
