import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      <section className="hero container">
        <h1 className="heading-xl mb-4 animate-fade-in">
          Plan your path with <br /><span className="gradient-text">Confidence</span>
        </h1>
        <p className="hero-subtitle mb-8 animate-fade-in delay-100">
          The ultimate tool for Bentonville and Haas Hall Academy students to navigate their Student Success Plan, test prep, and extracurriculars.
        </p>
        <div className="flex justify-center gap-4 animate-fade-in delay-200">
          <Link to="/planner" className="btn btn-primary">Start Planning</Link>
          <Link to="/test-prep" className="btn btn-secondary">Learn More</Link>
        </div>
      </section>

      <section id="features" className="container mt-8">
        <h2 className="heading-lg text-center mb-8">Empowering Your Future</h2>
        <div className="features-grid">
          <div className="card">
            <div className="feature-icon">📚</div>
            <h3 className="heading-md mb-2">Course Planner</h3>
            <p className="text-secondary">
              Build your personalized Student Success Plan (SSP) tailored to graduation requirements and your career goals.
            </p>
          </div>
          
          <div className="card">
            <div className="feature-icon">🎓</div>
            <h3 className="heading-md mb-2">ACT/SAT Strategy</h3>
            <p className="text-secondary">
              Get expert advice on when to take standardized tests and which one is right for you, maximizing your college opportunities.
            </p>
          </div>

          <div className="card">
            <div className="feature-icon">🏆</div>
            <h3 className="heading-md mb-2">Extracurriculars</h3>
            <p className="text-secondary">
              Discover the best extracurricular activities to build your resume and find out when you should start them.
            </p>
          </div>

          <div className="card">
            <div className="feature-icon">🗺️</div>
            <h3 className="heading-md mb-2">Optimized Routing</h3>
            <p className="text-secondary">
              Explore the recommended pathway of foundational math at Haas Hall Academy followed by public school test prep.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
