

function Extracurriculars() {
  return (
    <div className="container mt-8 mb-8 animate-fade-in">
      <h1 className="heading-xl mb-4 text-center">Mastering <span className="gradient-text">Extracurriculars</span></h1>
      <p className="hero-subtitle mb-8 text-center">Building a compelling resume for college admissions.</p>

      <div className="card mb-8">
        <h2 className="heading-md mb-4">When to Start?</h2>
        <p className="text-secondary mb-4">
          The best time to start exploring extracurricular activities is in <strong>Junior High (7th-8th grade)</strong>. Use this time to try out various clubs, sports, and volunteer opportunities without the pressure of it "counting" for college. 
        </p>
        <p className="text-secondary">
          By <strong>9th grade</strong>, you should aim to narrow down your interests to 2-3 core activities that you are passionate about and can commit to long-term. <strong>Depth and leadership</strong> in a few areas are far more impressive to colleges than surface-level participation in many.
        </p>
      </div>

      <h2 className="heading-lg mb-6 mt-8">Recommended Categories</h2>

      <div className="features-grid">
        <div className="card">
          <div className="feature-icon">🚀</div>
          <h3 className="heading-md mb-2">Leadership & Service</h3>
          <p className="text-secondary mb-4">Colleges look for students who make an impact in their community.</p>
          <ul className="text-secondary" style={{ paddingLeft: '1.5rem' }}>
            <li>Student Council / Government</li>
            <li>National Honor Society (NHS) / Beta Club</li>
            <li>Consistent Volunteering (e.g., local shelters, library)</li>
            <li>Starting your own community service project</li>
          </ul>
        </div>

        <div className="card">
          <div className="feature-icon">🔬</div>
          <h3 className="heading-md mb-2">Academic & Career Focused</h3>
          <p className="text-secondary mb-4">Showcase your passion for your future major.</p>
          <ul className="text-secondary" style={{ paddingLeft: '1.5rem' }}>
            <li>Debate Team / Forensics</li>
            <li>Robotics Club (VEX, FIRST)</li>
            <li>Science Olympiad / Mathletes</li>
            <li>Bentonville's Ignite Professional Studies (11th/12th grade)</li>
            <li>FBLA / DECA (Business)</li>
          </ul>
        </div>

        <div className="card">
          <div className="feature-icon">🎨</div>
          <h3 className="heading-md mb-2">Arts & Athletics</h3>
          <p className="text-secondary mb-4">Demonstrate dedication, teamwork, and creativity.</p>
          <ul className="text-secondary" style={{ paddingLeft: '1.5rem' }}>
            <li>Band, Choir, or Orchestra</li>
            <li>Theater Productions</li>
            <li>Varsity or Junior Varsity Sports</li>
            <li>Club or Travel Sports Teams</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Extracurriculars;
