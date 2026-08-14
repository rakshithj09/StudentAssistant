import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Planner from './pages/Planner';
import TestPrep from './pages/TestPrep';
import Pathway from './pages/Pathway';
import Extracurriculars from './pages/Extracurriculars';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import { StudentProvider } from './context/StudentContext';

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="layout-container">
      <nav className="top-nav">
        <div className="nav-brand">
          <div className="brand-icon">B</div>
          <span>Bentonville Student <span style={{color: 'var(--text-muted)'}}>Assistant</span></span>
        </div>
        
        <div className="nav-links">
          <Link to="/" className={`nav-link ${path === '/' ? 'active' : ''}`}>Dashboard</Link>
          <Link to="/planner" className={`nav-link ${path === '/planner' ? 'active' : ''}`}>Courses</Link>
          <Link to="/test-prep" className={`nav-link ${path === '/test-prep' ? 'active' : ''}`}>ACT/SAT</Link>
          <Link to="/pathway" className={`nav-link ${path === '/pathway' ? 'active' : ''}`}>Pathway</Link>
          <Link to="/extracurriculars" className={`nav-link ${path === '/extracurriculars' ? 'active' : ''}`}>Activities</Link>
          <Link to="/schedule" className={`nav-link ${path === '/schedule' ? 'active' : ''}`} style={{background: path === '/schedule' ? 'var(--accent-orange)' : 'transparent', borderColor: path === '/schedule' ? 'var(--accent-orange)' : undefined}}>📋 Schedule</Link>
          <Link to="/profile" className={`nav-link ${path === '/profile' ? 'active' : ''}`} style={{marginLeft: 'auto', border: '1px solid var(--border-color)', padding: '0.25rem 0.75rem', borderRadius: '4px'}}>⚙️</Link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/test-prep" element={<TestPrep />} />
          <Route path="/pathway" element={<Pathway />} />
          <Route path="/extracurriculars" element={<Extracurriculars />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div>Bentonville Student Assistant</div>
        <div>Serving Bentonville SD · Haas Hall Academy</div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
      <Router>
        <AppContent />
      </Router>
    </StudentProvider>
  );
}

export default App;

