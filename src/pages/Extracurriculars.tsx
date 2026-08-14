import { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { getClubs, getSports, getServices } from '../data/activitiesData';

function Extracurriculars() {
  const { student, toggleActivity, toggleSport, toggleService } = useStudent();
  const [tab, setTab] = useState<'clubs' | 'sports' | 'service'>('clubs');

  const clubs = getClubs();
  const sports = getSports();
  const services = getServices();

  const totalSelected = student.selectedActivities.length + student.selectedSports.length + student.selectedServices.length;

  return (
    <div>
      <h1 className="font-serif" style={{fontSize: '2.25rem', marginBottom: '0.35rem', color: 'var(--bg-navy)'}}>
        Activities & Sports
      </h1>
      <p className="text-secondary text-sm mb-4">
        Select clubs, sports, and community service — these feed into your schedule
      </p>

      {/* Summary */}
      <div className="summary-bar mb-4">
        <span><strong>{student.selectedActivities.length}</strong> clubs</span>
        <span><strong>{student.selectedSports.length}</strong> sports</span>
        <span><strong>{student.selectedServices.length}</strong> service</span>
        <span><strong>{totalSelected}</strong> total selected</span>
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        <button className={`tab-btn ${tab === 'clubs' ? 'active' : ''}`} onClick={() => setTab('clubs')}>
          Clubs & Orgs ({clubs.length})
        </button>
        <button className={`tab-btn ${tab === 'sports' ? 'active' : ''}`} onClick={() => setTab('sports')}>
          Sports ({sports.length})
        </button>
        <button className={`tab-btn ${tab === 'service' ? 'active' : ''}`} onClick={() => setTab('service')}>
          Community Service ({services.length})
        </button>
      </div>

      {/* Clubs Tab */}
      {tab === 'clubs' && (
        <div className="sel-grid">
          {clubs.map(item => {
            const isSelected = student.selectedActivities.includes(item.id);
            return (
              <div key={item.id} className={`sel-card ${isSelected ? 'selected' : ''}`} onClick={() => toggleActivity(item.id)}>
                <div className="checkbox">{isSelected ? '✓' : ''}</div>
                <div className="sel-card-info">
                  <div className="sel-card-name">{item.name}</div>
                  <div className="sel-card-desc">{item.description}</div>
                  <div className="sel-card-tags">
                    <span className="sel-card-tag">{item.tag}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sports Tab */}
      {tab === 'sports' && (
        <div className="sel-grid">
          {sports.map(item => {
            const isSelected = student.selectedSports.includes(item.id);
            return (
              <div key={item.id} className={`sel-card ${isSelected ? 'selected' : ''}`} onClick={() => toggleSport(item.id)}>
                <div className="checkbox">{isSelected ? '✓' : ''}</div>
                <div className="sel-card-info">
                  <div className="sel-card-name">{item.name}</div>
                  <div className="sel-card-desc">{item.description}</div>
                  <div className="sel-card-tags">
                    <span className="sel-card-tag">{item.tag}</span>
                    {item.season && <span className="sel-card-tag" style={{background: '#dbeafe', color: '#1d4ed8'}}>{item.season}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Service Tab */}
      {tab === 'service' && (
        <div className="sel-grid">
          {services.map(item => {
            const isSelected = student.selectedServices.includes(item.id);
            return (
              <div key={item.id} className={`sel-card ${isSelected ? 'selected' : ''}`} onClick={() => toggleService(item.id)}>
                <div className="checkbox">{isSelected ? '✓' : ''}</div>
                <div className="sel-card-info">
                  <div className="sel-card-name">{item.name}</div>
                  <div className="sel-card-desc">{item.description}</div>
                  <div className="sel-card-tags">
                    <span className="sel-card-tag">{item.tag}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Extracurriculars;
