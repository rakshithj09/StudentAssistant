// Activities, Clubs, Sports, and Community Service data for Bentonville HS

export interface Activity {
  id: string;
  name: string;
  category: 'club' | 'sport' | 'service';
  tag: string;
  season?: string; // For sports: Fall, Winter, Spring, Year-Round
  description: string;
}

export const activitiesData: Activity[] = [
  // ═══════════════════ CLUBS & ORGANIZATIONS ═══════════════════
  { id: 'FBLA', name: 'FBLA (Future Business Leaders)', category: 'club', tag: 'BUSINESS', description: 'Business leadership, competitions, and career development.' },
  { id: 'HOSA', name: 'HOSA (Future Health Professionals)', category: 'club', tag: 'HEALTH/PRE-MED', description: 'Health science competitions and medical career exploration.' },
  { id: 'DECA', name: 'DECA (Marketing & Entrepreneurship)', category: 'club', tag: 'BUSINESS', description: 'Marketing, finance, and management competitions.' },
  { id: 'SCIOLY', name: 'Science Olympiad', category: 'club', tag: 'STEM', description: 'STEM competitions in 23 events from astronomy to forensics.' },
  { id: 'MATHCLUB', name: 'Math Club / AMC', category: 'club', tag: 'STEM', description: 'AMC 10/12 competitions, MATHCOUNTS, and problem solving.' },
  { id: 'DEBATE', name: 'Speech & Debate', category: 'club', tag: 'LEADERSHIP', description: 'Lincoln-Douglas, Public Forum, and Congressional debate.' },
  { id: 'MUN', name: 'Model United Nations', category: 'club', tag: 'LEADERSHIP', description: 'Simulate UN committees and international diplomacy.' },
  { id: 'KEYCLUB', name: 'Key Club', category: 'club', tag: 'SERVICE', description: 'Community service organization sponsored by Kiwanis.' },
  { id: 'NHS', name: 'National Honor Society', category: 'club', tag: 'LEADERSHIP', description: 'Academic honor society — requires 3.5+ GPA and service hours.' },
  { id: 'SPACLUB', name: 'Spanish Club', category: 'club', tag: 'LANGUAGE', description: 'Cultural events, language practice, and celebrations.' },
  { id: 'FRECLUB', name: 'French Club', category: 'club', tag: 'LANGUAGE', description: 'French cultural immersion and language practice.' },
  { id: 'ROBO', name: 'Robotics Club', category: 'club', tag: 'STEM', description: 'Design, build, and program competition robots (FRC/FTC).' },
  { id: 'CODCLUB', name: 'Coding Club', category: 'club', tag: 'STEM', description: 'Hackathons, coding competitions, and project development.' },
  { id: 'ENVCLUB', name: 'Environmental Club', category: 'club', tag: 'SERVICE', description: 'Campus sustainability, recycling, and environmental advocacy.' },
  { id: 'ARTCLUB', name: 'Art Club', category: 'club', tag: 'ARTS', description: 'Creative art projects, gallery shows, and workshops.' },
  { id: 'DRAMA', name: 'Drama Club / Thespians', category: 'club', tag: 'ARTS', description: 'Theatre productions, one-acts, and performance arts.' },
  { id: 'YEARBOOK', name: 'Yearbook', category: 'club', tag: 'MEDIA', description: 'Design, photography, and production of the school yearbook.' },
  { id: 'STUCO', name: 'Student Council', category: 'club', tag: 'LEADERSHIP', description: 'School governance, events planning, and student advocacy.' },
  { id: 'CHESS', name: 'Chess Club', category: 'club', tag: 'STEM', description: 'Competitive chess, tournaments, and strategic thinking.' },
  { id: 'QUIZBOWL', name: 'Quiz Bowl', category: 'club', tag: 'ACADEMIC', description: 'Academic trivia competitions at regional and state level.' },
  { id: 'BETACLUB', name: 'Beta Club', category: 'club', tag: 'ACADEMIC', description: 'Academic achievement, leadership, and community service.' },
  { id: 'FCCLA', name: 'FCCLA (Family, Career, Community)', category: 'club', tag: 'SERVICE', description: 'Personal growth, career prep, and community involvement.' },
  { id: 'TSA', name: 'TSA (Technology Student Association)', category: 'club', tag: 'STEM', description: 'STEM competitions in coding, engineering, and design.' },
  { id: 'FFA', name: 'FFA (Agriculture)', category: 'club', tag: 'AGRICULTURE', description: 'Agricultural science, leadership, and career development.' },

  // ═══════════════════ SPORTS ═══════════════════
  { id: 'FOOTBALL', name: 'Football', category: 'sport', tag: 'TEAM', season: 'Fall', description: 'Varsity, JV, and Freshman football programs.' },
  { id: 'VBALL', name: 'Volleyball', category: 'sport', tag: 'TEAM', season: 'Fall', description: 'Girls volleyball — Varsity, JV, and Freshman teams.' },
  { id: 'MSOCCER', name: 'Boys Soccer', category: 'sport', tag: 'TEAM', season: 'Spring', description: 'Boys soccer — Varsity and JV.' },
  { id: 'WSOCCER', name: 'Girls Soccer', category: 'sport', tag: 'TEAM', season: 'Spring', description: 'Girls soccer — Varsity and JV.' },
  { id: 'MBASKET', name: 'Boys Basketball', category: 'sport', tag: 'TEAM', season: 'Winter', description: 'Boys basketball — Varsity, JV, and Freshman.' },
  { id: 'WBASKET', name: 'Girls Basketball', category: 'sport', tag: 'TEAM', season: 'Winter', description: 'Girls basketball — Varsity, JV, and Freshman.' },
  { id: 'BASEBALL', name: 'Baseball', category: 'sport', tag: 'TEAM', season: 'Spring', description: 'Boys baseball — Varsity and JV.' },
  { id: 'SOFTBALL', name: 'Softball', category: 'sport', tag: 'TEAM', season: 'Fall', description: 'Girls softball — Varsity and JV.' },
  { id: 'MTENNIS', name: 'Boys Tennis', category: 'sport', tag: 'INDIVIDUAL', season: 'Fall', description: 'Boys tennis — Varsity and JV.' },
  { id: 'WTENNIS', name: 'Girls Tennis', category: 'sport', tag: 'INDIVIDUAL', season: 'Spring', description: 'Girls tennis — Varsity and JV.' },
  { id: 'SWIM', name: 'Swimming & Diving', category: 'sport', tag: 'INDIVIDUAL', season: 'Winter', description: 'Co-ed swimming and diving team.' },
  { id: 'XC', name: 'Cross Country', category: 'sport', tag: 'INDIVIDUAL', season: 'Fall', description: 'Long-distance running — Varsity and JV.' },
  { id: 'TRACK', name: 'Track & Field', category: 'sport', tag: 'INDIVIDUAL', season: 'Spring', description: 'Sprints, distance, jumps, throws, and relays.' },
  { id: 'WREST', name: 'Wrestling', category: 'sport', tag: 'INDIVIDUAL', season: 'Winter', description: 'Individual and team wrestling competition.' },
  { id: 'GOLF', name: 'Golf', category: 'sport', tag: 'INDIVIDUAL', season: 'Spring', description: 'Boys and girls golf teams.' },
  { id: 'CHEER', name: 'Cheerleading', category: 'sport', tag: 'SPIRIT', season: 'Year-Round', description: 'Competition cheer and game-day sideline support.' },
  { id: 'DANCE', name: 'Dance Team (Benton Belles)', category: 'sport', tag: 'SPIRIT', season: 'Year-Round', description: 'Competition and performance dance team.' },
  { id: 'LAX', name: 'Lacrosse', category: 'sport', tag: 'TEAM', season: 'Spring', description: 'Boys and girls lacrosse.' },
  { id: 'BOWL', name: 'Bowling', category: 'sport', tag: 'INDIVIDUAL', season: 'Winter', description: 'Boys and girls bowling teams.' },

  // ═══════════════════ COMMUNITY SERVICE ═══════════════════
  { id: 'HOSPVOL', name: 'Hospital Volunteer (Mercy/Ascension)', category: 'service', tag: 'HEALTH', description: 'Clinical exposure at local hospitals — essential for pre-med.' },
  { id: 'HABITAT', name: 'Habitat for Humanity', category: 'service', tag: 'BUILD', description: 'Help build homes for families in need in NWA.' },
  { id: 'FOODBNK', name: 'NWA Food Bank Volunteer', category: 'service', tag: 'HUNGER', description: 'Sort and distribute food at the regional food bank.' },
  { id: 'TUTOR', name: 'Peer Tutoring', category: 'service', tag: 'ACADEMIC', description: 'Tutor younger students in math, science, or reading.' },
  { id: 'ANIMAL', name: 'Animal Shelter Volunteer', category: 'service', tag: 'ANIMALS', description: 'Volunteer at the Bentonville Animal Shelter.' },
  { id: 'LIBRARY', name: 'Library Volunteer', category: 'service', tag: 'COMMUNITY', description: 'Assist at the Bentonville Public Library.' },
  { id: 'MENTOR', name: 'Youth Mentoring', category: 'service', tag: 'MENTORSHIP', description: 'Mentor elementary students through Big Brothers Big Sisters.' },
  { id: 'SHADOW', name: 'Physician Shadowing', category: 'service', tag: 'HEALTH', description: 'Shadow physicians at local clinics — 40+ hours recommended.' },
];

export function getClubs(): Activity[] {
  return activitiesData.filter(a => a.category === 'club');
}

export function getSports(): Activity[] {
  return activitiesData.filter(a => a.category === 'sport');
}

export function getServices(): Activity[] {
  return activitiesData.filter(a => a.category === 'service');
}
