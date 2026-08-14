
function Pathway() {
  return (
    <div>
      <h1 className="font-serif" style={{fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--bg-navy)'}}>
        Optimized School Pathway
      </h1>
      <p className="text-secondary mb-8">
        A two-phase strategy that maximizes rigor and college positioning
      </p>

      <div className="req-grid mb-8" style={{gridTemplateColumns: '1fr 1fr'}}>
        {/* Phase 1 */}
        <div className="navy-card" style={{padding: '2rem'}}>
          <div className="text-xs text-secondary mb-2">PHASE 1 · 9TH - 10TH</div>
          <div className="text-sm text-secondary mb-1">Haas Hall Academy</div>
          <h3 className="font-serif" style={{fontSize: '1.75rem', marginBottom: '2rem'}}>Rigorous Math Foundation</h3>
          
          <ul className="text-sm text-light mb-8" style={{listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <li style={{display: 'flex', gap: '0.75rem'}}><span className="text-orange">—</span> Complete Algebra 2 → Pre-Calculus → AP Calculus sequence</li>
            <li style={{display: 'flex', gap: '0.75rem'}}><span className="text-orange">—</span> Access HHA's small-class advanced STEM curriculum</li>
            <li style={{display: 'flex', gap: '0.75rem'}}><span className="text-orange">—</span> Build GPA in a high-rigor environment (weighted heavily by colleges)</li>
            <li style={{display: 'flex', gap: '0.75rem'}}><span className="text-orange">—</span> Establish teacher relationships for future letters of rec</li>
          </ul>

          <div className="text-xs text-secondary mb-1" style={{color: 'rgba(255,255,255,0.4)'}}>WHY THIS MATTERS</div>
          <p className="text-sm" style={{color: 'rgba(255,255,255,0.6)'}}>
            HHA's math instruction is among the most rigorous in Northwest Arkansas. Colleges see course context — a 3.9 at HHA reads differently than a 3.9 elsewhere.
          </p>
        </div>

        {/* Phase 2 */}
        <div style={{backgroundColor: '#ca8a4b', borderRadius: 'var(--radius-lg)', padding: '2rem', color: 'white'}}>
          <div className="text-xs mb-2" style={{color: 'rgba(255,255,255,0.7)'}}>PHASE 2 · 11TH - 12TH</div>
          <div className="text-sm mb-1" style={{color: 'rgba(255,255,255,0.7)'}}>Bentonville High or Bentonville West</div>
          <h3 className="font-serif" style={{fontSize: '1.75rem', marginBottom: '2rem'}}>Test Prep & College Execution</h3>
          
          <ul className="text-sm mb-8" style={{listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <li style={{display: 'flex', gap: '0.75rem'}}><span style={{color: '#fde68a'}}>—</span> Access BHS/West's ACT prep infrastructure and school-day testing</li>
            <li style={{display: 'flex', gap: '0.75rem'}}><span style={{color: '#fde68a'}}>—</span> Load AP courses across departments (language, social studies, arts)</li>
            <li style={{display: 'flex', gap: '0.75rem'}}><span style={{color: '#fde68a'}}>—</span> Participate in larger extracurricular ecosystem (FBLA, NHS, sports)</li>
            <li style={{display: 'flex', gap: '0.75rem'}}><span style={{color: '#fde68a'}}>—</span> Take dual enrollment courses through NWA Community College</li>
          </ul>

          <div className="text-xs mb-1" style={{color: 'rgba(255,255,255,0.5)'}}>WHY THIS MATTERS</div>
          <p className="text-sm" style={{color: 'rgba(255,255,255,0.8)'}}>
            Public schools provide more ACT prep resources, a broader AP catalog in non-STEM areas, and a richer extracurricular landscape — all critical for college applications.
          </p>
        </div>
      </div>

      <div className="white-card" style={{backgroundColor: '#eef2eb', borderColor: '#d1e0cb', padding: '2rem'}}>
        <div className="text-xs text-secondary mb-4" style={{color: '#4b5563'}}>TRANSFER CHECKLIST</div>
        <div className="req-grid" style={{gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
          <div className="text-sm" style={{color: '#166534'}}>✓ Request official transcript from HHA by March of 10th grade</div>
          <div className="text-sm" style={{color: '#166534'}}>✓ Confirm AP course availability at destination school</div>
          <div className="text-sm" style={{color: '#166534'}}>✓ Arrange teacher recommendation letters from HHA faculty</div>
          <div className="text-sm" style={{color: '#166534'}}>✓ Verify extracurricular eligibility / transfer waiting periods</div>
          <div className="text-sm" style={{color: '#166534'}}>✓ Meet with BHS/West counselor before end of 10th grade</div>
          <div className="text-sm" style={{color: '#166534'}}>✓ Maintain GPA ≥ 4.0 through transfer semester</div>
        </div>
      </div>
    </div>
  );
}

export default Pathway;
