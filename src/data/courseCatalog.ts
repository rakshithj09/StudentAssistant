// Bentonville High School Course Catalog 2026-2027
// Complete At-A-Glance Course Roster

export interface Course {
  id: string;
  name: string;
  department: string;
  credits: number;
  gradeLevel: number[];
  prerequisites: string[];
  isAP: boolean;
  isHonors: boolean;
  isDualEnrollment: boolean;
  description: string;
}

export const DEPARTMENTS = [
  'English', 'Math', 'Science', 'Social Studies', 
  'World Language', 'Fine Arts', 'CTE', 'PE/Health'
] as const;

export const courseCatalog: Course[] = [
  {
    "id": "410100",
    "name": "Pre-AP English I",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      9
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Foundational high school English literature and composition."
  },
  {
    "id": "PAPENG",
    "name": "Pre-AP English I w/ Personal Comm",
    "department": "English",
    "credits": 1.5,
    "gradeLevel": [
      9
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Accelerated Pre-AP English I bundled with mandatory Oral Personal Communication credit."
  },
  {
    "id": "510040",
    "name": "ESL English I",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      9
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "English language acquisition for non-native speakers (Grade 9)."
  },
  {
    "id": "411101",
    "name": "Pre-AP English II",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      10
    ],
    "prerequisites": [
      "410100"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "World literature and rhetorical analysis preparation."
  },
  {
    "id": "511030",
    "name": "ESL English II",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      10
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "English language acquisition for non-native speakers (Grade 10)."
  },
  {
    "id": "412001",
    "name": "English III",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      11
    ],
    "prerequisites": [
      "411101"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "American literature and analytical writing."
  },
  {
    "id": "512030",
    "name": "ESL English III",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      11
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "English language acquisition for non-native speakers (Grade 11)."
  },
  {
    "id": "517031",
    "name": "AP English Language & Composition",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "411101"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level rhetoric, non-fiction analysis, and argument composition."
  },
  {
    "id": "517050",
    "name": "IB English A: Literature HL 1",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      11
    ],
    "prerequisites": [
      "411101"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "International Baccalaureate Higher Level English Literature Year 1."
  },
  {
    "id": "413010",
    "name": "Transitional English IV",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      12
    ],
    "prerequisites": [
      "412001"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College and career literacy skills for senior year."
  },
  {
    "id": "513030",
    "name": "ESL English IV",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "English language acquisition for non-native speakers (Grade 12)."
  },
  {
    "id": "517041",
    "name": "AP English Literature & Composition",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "517031"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level literary analysis, poetry, and narrative fiction."
  },
  {
    "id": "517080",
    "name": "IB English A: Literature HL 2",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      12
    ],
    "prerequisites": [
      "517050"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "International Baccalaureate Higher Level English Literature Year 2."
  },
  {
    "id": "517060",
    "name": "AP Seminar",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "AP Capstone foundational cross-curricular research and team presentation."
  },
  {
    "id": "APSEM",
    "name": "AP Seminar w/ Professional Comm",
    "department": "English",
    "credits": 1.5,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "AP Seminar combined with mandatory Professional Oral Communication credit."
  },
  {
    "id": "517070",
    "name": "AP Research",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "517060"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "AP Capstone year 2 independent research thesis and oral defense."
  },
  {
    "id": "519930",
    "name": "NWACC ENGL 1013 Composition I",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "Dual Enrollment college composition through NWACC."
  },
  {
    "id": "519940",
    "name": "NWACC ENGL 1023 Composition II",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "519930"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "Dual Enrollment college research writing through NWACC."
  },
  {
    "id": "51400D",
    "name": "NWACC COMM 1303 Public Speaking",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "Dual Enrollment public speaking through NWACC."
  },
  {
    "id": "417010",
    "name": "Creative Writing",
    "department": "English",
    "credits": 0.5,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Creative fiction, poetry, and prose workshop."
  },
  {
    "id": "414050",
    "name": "Debate I",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Competitive speech, argumentation, and Lincoln-Douglas debate."
  },
  {
    "id": "414060",
    "name": "Debate II",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "414050"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Advanced competitive speech and Policy debate."
  },
  {
    "id": "414070",
    "name": "Debate III",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "414060"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Varsity debate competition and team leadership."
  },
  {
    "id": "414080",
    "name": "Debate IV",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      12
    ],
    "prerequisites": [
      "414070"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Senior championship debate seminar."
  },
  {
    "id": "414020",
    "name": "Forensics I",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Competitive acting, interpretation, and public speaking."
  },
  {
    "id": "415001",
    "name": "Journalism I",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "News reporting, media ethics, and journalistic writing."
  },
  {
    "id": "415010",
    "name": "Journalism II (Yearbook)",
    "department": "English",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "415001"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Yearbook staff design, editing, and photography."
  },
  {
    "id": "430300",
    "name": "Pre-AP Algebra I",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      9
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Linear functions, equations, and foundational algebraic modeling."
  },
  {
    "id": "431300",
    "name": "Pre-AP Geometry with Statistics",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10
    ],
    "prerequisites": [
      "430300"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Euclidean geometry, proofs, spatial reasoning, and probability."
  },
  {
    "id": "431301",
    "name": "Adv. Pre-AP Geometry with Statistics",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10
    ],
    "prerequisites": [
      "430300"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Accelerated geometry with advanced proof structures."
  },
  {
    "id": "432001",
    "name": "Algebra II",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "431300"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Polynomial, logarithmic, radical, and rational functions."
  },
  {
    "id": "43200A",
    "name": "Advanced Algebra II",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [
      "431300"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Accelerated Algebra II for students on the AP Calculus track."
  },
  {
    "id": "439120",
    "name": "College Prep Quantitative Reasoning",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "432001"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Real-world mathematical modeling, statistics, and financial math."
  },
  {
    "id": "439090",
    "name": "Statistics",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "432001"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Descriptive and inferential statistics, probability, and data science."
  },
  {
    "id": "439130",
    "name": "Technical Math",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "430300"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Applied mathematics for technical and trade careers."
  },
  {
    "id": "439071",
    "name": "Algebra III",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "432001"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Advanced algebra topics building toward college algebra readiness."
  },
  {
    "id": "533030",
    "name": "AP Precalculus",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "43200A"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level polynomial, rational, exponential, and trigonometric functions."
  },
  {
    "id": "539031",
    "name": "AP Statistics",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "432001"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level statistical study of data, sampling, and hypothesis testing."
  },
  {
    "id": "534041",
    "name": "AP Calculus AB",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "533030"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level differential and integral calculus (Calculus I)."
  },
  {
    "id": "534051",
    "name": "AP Calculus BC",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "534041"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level Calculus I & II including Taylor series and polar curves."
  },
  {
    "id": "539160",
    "name": "IB Math App & Interpretations I SL",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11
    ],
    "prerequisites": [
      "43200A"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "IB SL Mathematics Year 1 focusing on practical application."
  },
  {
    "id": "539170",
    "name": "IB Math App & Interpretations II SL",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      12
    ],
    "prerequisites": [
      "539160"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "IB SL Mathematics Year 2."
  },
  {
    "id": "ALG3ColAlg",
    "name": "Algebra III w/ Concurrent College Alg",
    "department": "Math",
    "credits": 1.5,
    "gradeLevel": [
      12
    ],
    "prerequisites": [
      "432001"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "Combined high school Algebra III with NWACC College Algebra credit."
  },
  {
    "id": "53990N",
    "name": "NWACC MATH 1203 College Algebra",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "432001"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "Dual Enrollment College Algebra through NWACC."
  },
  {
    "id": "539980",
    "name": "NWACC MATH 2053 College Finite",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "53990N"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "Dual Enrollment Finite Mathematics through NWACC."
  },
  {
    "id": "539190",
    "name": "NWACC MATH 1213 College Trigonometry",
    "department": "Math",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "53990N"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "Dual Enrollment Trigonometry through NWACC."
  },
  {
    "id": "423001",
    "name": "Physical Science-Integrated",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Foundational physical science covering physics and chemistry fundamentals."
  },
  {
    "id": "420101",
    "name": "Pre-AP Biology",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Cellular biology, genetics, ecology, and evolutionary science."
  },
  {
    "id": "520031",
    "name": "AP Biology",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "420101"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level general biology with lab research focus."
  },
  {
    "id": "529030",
    "name": "IB Biology SL",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "420101"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "International Baccalaureate Standard Level Biology."
  },
  {
    "id": "421001",
    "name": "Chemistry-Integrated",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "420101"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "General chemistry concepts, bonding, and chemical reactions."
  },
  {
    "id": "421301",
    "name": "Pre-AP Chemistry",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [
      "420101"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Accelerated chemistry preparation for AP Chemistry."
  },
  {
    "id": "521031",
    "name": "AP Chemistry",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "421301"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level general chemistry and quantitative lab synthesis."
  },
  {
    "id": "529931",
    "name": "NWACC CHEM 1104 Chemistry I",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "421301"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "Dual Enrollment General Chemistry I through NWACC."
  },
  {
    "id": "529932",
    "name": "NWACC CHEM 1124 Chemistry II",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "529931"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "Dual Enrollment General Chemistry II through NWACC."
  },
  {
    "id": "422010",
    "name": "Physics",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "430300"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Conceptual and mathematical study of motion, forces, and energy."
  },
  {
    "id": "522080",
    "name": "AP Physics I",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "43200A"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Algebra-based college-level physics (kinematics, dynamics, energy)."
  },
  {
    "id": "522090",
    "name": "AP Physics II",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "522080"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Algebra-based college-level physics (thermodynamics, fluids, optics)."
  },
  {
    "id": "522051",
    "name": "AP Physics C: Mechanics",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "534041"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Calculus-based college-level physics for engineering."
  },
  {
    "id": "522065",
    "name": "IB Physics I SL/HL",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "422010"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "International Baccalaureate Physics Year 1."
  },
  {
    "id": "522066",
    "name": "IB Physics II SL/HL",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "522065"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "International Baccalaureate Physics Year 2."
  },
  {
    "id": "424020",
    "name": "Environmental Science",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "420101"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Study of ecosystems, natural resource usage, and conservation."
  },
  {
    "id": "523031",
    "name": "AP Environmental Science",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "420101"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level environmental studies and sustainability science."
  },
  {
    "id": "529010",
    "name": "Zoology",
    "department": "Science",
    "credits": 0.5,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "420101"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Study of animal kingdom classification, anatomy, and behavior."
  },
  {
    "id": "424031",
    "name": "Anatomy & Physiology",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "420101"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Human body organ systems and medical pre-requisite science."
  },
  {
    "id": "425050",
    "name": "Astronomy",
    "department": "Science",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Planetary science, stellar evolution, and cosmology."
  },
  {
    "id": "579081",
    "name": "AP Human Geography",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level spatial patterns, human geography, and demographics."
  },
  {
    "id": "471101",
    "name": "Pre-AP World History & Geography",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      10
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "World history from 1450 to the present with primary source analysis."
  },
  {
    "id": "571021",
    "name": "AP World History: Modern",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      10
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level world history from 1200 CE to the present."
  },
  {
    "id": "470003",
    "name": "US History Since 1929",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      11
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Modern American history from the Great Depression through modern era."
  },
  {
    "id": "570021",
    "name": "AP United States History",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      11
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level US History from 1491 to present."
  },
  {
    "id": "570051",
    "name": "IB History of the Americas HL I",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      11
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "IB Higher Level History Year 1."
  },
  {
    "id": "570053",
    "name": "IB History of the Americas HL II",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      12
    ],
    "prerequisites": [
      "570051"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "IB Higher Level History Year 2."
  },
  {
    "id": "572040",
    "name": "AP US Government & Politics",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level US government, constitutional law, and political science."
  },
  {
    "id": "472000",
    "name": "Civics",
    "department": "Social Studies",
    "credits": 0.5,
    "gradeLevel": [
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Citizenship, rights, responsibilities, and government structure."
  },
  {
    "id": "474301",
    "name": "Economics w/ Personal Finance",
    "department": "Social Studies",
    "credits": 0.5,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Microeconomics, macroeconomics, and mandatory personal financial literacy."
  },
  {
    "id": "ECONAP",
    "name": "AP Micro & AP Macro Economics",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level microeconomics and macroeconomics combined."
  },
  {
    "id": "474500",
    "name": "Sociology",
    "department": "Social Studies",
    "credits": 0.5,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Study of human social relationships, institutions, and society."
  },
  {
    "id": "579121",
    "name": "AP Psychology",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level study of human behavior, cognition, and mental processes."
  },
  {
    "id": "579171",
    "name": "AP European History",
    "department": "Social Studies",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level European history from 1450 to present."
  },
  {
    "id": "440001",
    "name": "Spanish I",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Beginner Spanish language and Hispanic culture."
  },
  {
    "id": "440021",
    "name": "Spanish II",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [
      "440001"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Intermediate Spanish language grammar and conversational fluency."
  },
  {
    "id": "440033",
    "name": "Spanish III Advanced",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "440021"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Advanced Spanish literature, reading, and conversation."
  },
  {
    "id": "440043",
    "name": "Spanish IV Advanced",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "440033"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Advanced pre-AP Spanish communication."
  },
  {
    "id": "540071",
    "name": "AP Spanish Language & Culture",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "440033"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level Spanish language fluency and cultural analysis."
  },
  {
    "id": "540080",
    "name": "AP Spanish Literature & Culture",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "540071"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level Spanish literature and textual analysis."
  },
  {
    "id": "441001",
    "name": "French I",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Beginner French language and Francophone culture."
  },
  {
    "id": "441011",
    "name": "French II",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [
      "441001"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Intermediate French grammar and conversation."
  },
  {
    "id": "441033",
    "name": "French III Advanced",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "441011"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": false,
    "description": "Advanced French literature and composition."
  },
  {
    "id": "541061",
    "name": "AP French Language & Culture",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "441033"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level French language and Francophone culture."
  },
  {
    "id": "447001",
    "name": "Chinese I",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Beginner Mandarin Chinese language and culture."
  },
  {
    "id": "447011",
    "name": "Chinese II",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "447001"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Intermediate Mandarin Chinese conversation."
  },
  {
    "id": "547070",
    "name": "IB Chinese SL",
    "department": "World Language",
    "credits": 1.0,
    "gradeLevel": [
      11,
      12
    ],
    "prerequisites": [
      "447011"
    ],
    "isAP": false,
    "isHonors": true,
    "isDualEnrollment": true,
    "description": "International Baccalaureate Chinese SL."
  },
  {
    "id": "450001",
    "name": "Visual Art Foundations I",
    "department": "Fine Arts",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Foundations of 2D & 3D art, drawing, painting, and design."
  },
  {
    "id": "450031",
    "name": "Visual Art Foundations II",
    "department": "Fine Arts",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "450001"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Intermediate studio art techniques and portfolio building."
  },
  {
    "id": "559011",
    "name": "AP Music Theory",
    "department": "Fine Arts",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level music harmony, ear training, and composition."
  },
  {
    "id": "451001",
    "name": "Wind Ensemble I",
    "department": "Fine Arts",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Premier instrumental band performance ensemble."
  },
  {
    "id": "451101",
    "name": "Chamber Orchestra I",
    "department": "Fine Arts",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Advanced string orchestra ensemble."
  },
  {
    "id": "465070",
    "name": "Introduction to Computer Science",
    "department": "CTE",
    "credits": 1.0,
    "gradeLevel": [
      8,
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Foundational computer programming and computational logic."
  },
  {
    "id": "565030",
    "name": "AP Computer Science Principles",
    "department": "CTE",
    "credits": 1.0,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level broad introduction to computing and internet technologies."
  },
  {
    "id": "565130",
    "name": "AP Computer Science A",
    "department": "CTE",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "465070"
    ],
    "isAP": true,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "College-level Java programming, object-oriented design, and algorithms."
  },
  {
    "id": "465290",
    "name": "Cybersecurity",
    "department": "CTE",
    "credits": 1.0,
    "gradeLevel": [
      10,
      11,
      12
    ],
    "prerequisites": [
      "465070"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Network security, ethical hacking, and digital forensics."
  },
  {
    "id": "480000",
    "name": "Health & Wellness",
    "department": "PE/Health",
    "credits": 0.5,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Personal wellness, nutrition, mental health, and safety."
  },
  {
    "id": "485010",
    "name": "Physical Education",
    "department": "PE/Health",
    "credits": 0.5,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Fitness, team sports, and lifetime physical activity."
  },
  {
    "id": "485020",
    "name": "Lifetime Fitness & Conditioning",
    "department": "PE/Health",
    "credits": 0.5,
    "gradeLevel": [
      9,
      10,
      11,
      12
    ],
    "prerequisites": [
      "485010"
    ],
    "isAP": false,
    "isHonors": false,
    "isDualEnrollment": false,
    "description": "Personalized weight training, aerobics, and physical conditioning."
  }
];

export function getCoursesByDepartment(dept: string): Course[] {
  return courseCatalog.filter(c => c.department === dept);
}

export function getCoursesForGrade(grade: number): Course[] {
  return courseCatalog.filter(c => c.gradeLevel.includes(grade));
}

export function prerequisitesMet(course: Course, completedCourseIds: string[]): boolean {
  return course.prerequisites.every(prereq => completedCourseIds.includes(prereq));
}
