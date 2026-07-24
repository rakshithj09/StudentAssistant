

function TestPrep() {
  return (
    <div className="container mt-8 mb-8 animate-fade-in">
      <h1 className="heading-xl mb-4 text-center">ACT & SAT <span className="gradient-text">Strategy</span></h1>
      <p className="hero-subtitle mb-8 text-center">Maximize your college admissions potential with our optimized testing timeline.</p>

      <div className="card mb-8" style={{ borderLeft: '4px solid var(--primary-color)' }}>
        <h2 className="heading-md mb-2">The Golden Rule: When to Test</h2>
        <p className="text-secondary mb-4">
          The single most important factor for success on the ACT and SAT is <strong>Math proficiency</strong>. Both tests heavily feature Algebra and Geometry. 
        </p>
        <p className="text-secondary mb-4">
          Therefore, our strong recommendation is to <strong>start taking these exams the year AFTER you finish Geometry and Algebra 2.</strong>
        </p>
        <p className="text-secondary">
          If you follow the optimized route (taking Algebra 1 in 7th, Geometry in 8th, and Algebra 2 in 9th grade), you will be fully prepared to start taking the ACT/SAT in <strong>10th grade</strong>. This gives you ample time to test multiple times, achieve your target score early, and focus on AP classes and college applications during your Junior and Senior years.
        </p>
      </div>

      <div className="features-grid">
        <div className="card">
          <div className="feature-icon">📝</div>
          <h3 className="heading-md mb-2">The ACT</h3>
          <ul className="text-secondary" style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Structure:</strong> English, Math, Reading, Science, Optional Writing.</li>
            <li><strong>Pacing:</strong> Fast-paced. You have less time per question compared to the SAT.</li>
            <li><strong>Math:</strong> Covers a wider range of math concepts, including more Geometry and Trigonometry. Allows a calculator for all math sections.</li>
            <li><strong>Science:</strong> Includes a dedicated Science section that tests data interpretation and chart reading (not actual scientific knowledge).</li>
            <li><strong>Best For:</strong> Fast readers who are good at processing information quickly and prefer straightforward questions.</li>
          </ul>
        </div>

        <div className="card">
          <div className="feature-icon">🎯</div>
          <h3 className="heading-md mb-2">The SAT</h3>
          <ul className="text-secondary" style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li><strong>Structure:</strong> Reading/Writing and Math. (Now entirely digital).</li>
            <li><strong>Pacing:</strong> More time per question than the ACT, but questions can require deeper analysis.</li>
            <li><strong>Math:</strong> Focuses heavily on Algebra and data analysis. Less Geometry than the ACT. Desmos calculator is built into the testing app.</li>
            <li><strong>Reading:</strong> Shorter passages with one question per passage in the new digital format.</li>
            <li><strong>Best For:</strong> Strong analytical thinkers who prefer more time to work through complex problems.</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-muted">Not sure which one to take? We recommend taking a practice test for both and comparing your percentile scores!</p>
      </div>
    </div>
  );
}

export default TestPrep;
