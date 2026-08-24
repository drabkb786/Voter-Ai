export type CandidateGroup = 'CR' | 'GR';

export type Candidate = {
  id: string;
  name: string;
  roll: string;
  group: CandidateGroup;
  initials: string;
  manifesto: string;
};

export type Student = {
  id: string;
  name: string;
  cnic: string;
  roll: string;
  eligible: boolean;
  voted: boolean;
};

export const candidates: Candidate[] = [
  { id: 'cr1', name: 'Ayaan Khan', roll: 'BSCS-014', group: 'CR', initials: 'AK', manifesto: 'Better coordination, cleaner communication, stronger student voice.' },
  { id: 'cr2', name: 'Hamza Ali', roll: 'BSCS-021', group: 'CR', initials: 'HA', manifesto: 'Transparent representation with practical academic support.' },
  { id: 'cr3', name: 'Saad Ahmed', roll: 'BSCS-033', group: 'CR', initials: 'SA', manifesto: 'More events, stronger student community, visible leadership.' },
  { id: 'gr1', name: 'Ayesha Noor', roll: 'BSCS-008', group: 'GR', initials: 'AN', manifesto: 'A welcoming campus experience with student-first initiatives.' },
  { id: 'gr2', name: 'Maham Fatima', roll: 'BSCS-019', group: 'GR', initials: 'MF', manifesto: 'Better accessibility, activities and communication between students and faculty.' },
  { id: 'gr3', name: 'Hira Zahid', roll: 'BSCS-027', group: 'GR', initials: 'HZ', manifesto: 'A practical, inclusive approach to representation.' },
];

export const students: Student[] = [
  { id: 's1', name: 'Muhammad Ahmed', cnic: '42101•••••••1', roll: 'BSCS-001', eligible: true, voted: false },
  { id: 's2', name: 'Areeba Khan', cnic: '42101•••••••2', roll: 'BSCS-002', eligible: true, voted: true },
  { id: 's3', name: 'Hassan Raza', cnic: '42101•••••••3', roll: 'BSCS-003', eligible: true, voted: false },
  { id: 's4', name: 'Sara Ali', cnic: '42101•••••••4', roll: 'BSCS-004', eligible: false, voted: false },
  { id: 's5', name: 'Daniyal Shah', cnic: '42101•••••••5', roll: 'BSCS-005', eligible: true, voted: true },
];

export const activity = [38, 52, 64, 78, 92, 111, 126, 148, 170, 188, 214, 246];

export const auditEvents = [
  { time: '09:42', title: 'Election opened', detail: 'Voting room is now live for eligible students.', tone: 'green' },
  { time: '09:36', title: 'Roster validated', detail: '500 student rows checked; 470 marked eligible.', tone: 'blue' },
  { time: '09:18', title: 'Candidate pool locked', detail: 'CR and GR candidate lists are now read-only.', tone: 'violet' },
  { time: '09:10', title: 'Admin session started', detail: 'Election Admin signed in from a trusted session.', tone: 'slate' },
];
