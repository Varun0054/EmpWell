import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chatbot from './pages/Chatbot';
import JobAlignment from './pages/JobAlignment';
import Community from './pages/Community';
import News from './pages/News';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import AuthModal from './components/AuthModal';
import ProtectedRoute from './components/ProtectedRoute'; // Still imported but usage changed

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="font-sans text-gray-900">
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Chatbot />} />

            {/* Partially Protected Routes (UI visible, logic protected) */}
            <Route path="/job-alignment" element={<JobAlignment />} />
            <Route path="/community" element={<Community />} />
            <Route path="/news" element={<News />} />

            {/* Fully Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
          <AuthModal />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
