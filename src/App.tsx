
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router';
import Home from './pages/Home';
import Planner from './pages/Planner';
import TestPrep from './pages/TestPrep';
import Extracurriculars from './pages/Extracurriculars';

function App() {
  return (
    <Router>
      <header className="header">
        <div className="container nav-container">
          <div className="logo">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Bentonville Student Assistant
            </Link>
          </div>
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/planner" className="nav-link">Course Planner</Link>
            <Link to="/test-prep" className="nav-link">ACT/SAT Strategy</Link>
            <Link to="/extracurriculars" className="nav-link">Extracurriculars</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/test-prep" element={<TestPrep />} />
        <Route path="/extracurriculars" element={<Extracurriculars />} />
      </Routes>
    </Router>
  );
}

export default App;
