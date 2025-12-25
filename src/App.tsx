import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chatbot from './pages/Chatbot';
import JobAlignment from './pages/JobAlignment';
import Community from './pages/Community';
import News from './pages/News';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/job-alignment" element={<JobAlignment />} />
        <Route path="/community" element={<Community />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
