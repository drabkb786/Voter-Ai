import { useMemo, useState } from 'react';
import { Check, ChevronRight, Clock3, FileSpreadsheet, LockKeyhole, ShieldCheck, Users, Vote, X } from 'lucide-react';

type Candidate = { id: string; name: string; roll: string; group: 'CR' | 'GR'; initials: string };
type Student = { name: string; cnic: string; roll: string; eligible: boolean; voted: boolean };

const candidates: Candidate[] = [
  { id: 'cr1', name: 'Ayaan Khan', roll: 'CR-014', group: 'CR', initials: 'AK' },
  { id: 'cr2', name: 'Hamza Ali', roll: 'CR-021', group: 'CR', initials: 'HA' },
  { id: 'cr3', name: 'Saad Ahmed', roll: 'CR-033', group: 'CR', initials: 'SA' },
  { id: 'gr1', name: 'Ayesha Noor', roll: 'GR-008', group: 'GR', initials: 'AN' },
  { id: 'gr2', name: 'Maham Fatima', roll: 'GR-019', group: 'GR', initials: 'MF' },
  { id: 'gr3', name: 'Hira Zahid', roll: 'GR-027', group: 'GR', initials: 'HZ' },
];

const demoStudents: Student[] = [
  { name: 'Muhammad Ahmed', cnic: '42101•••••••1', roll: 'BSCS-001', eligible: true, voted: false },
  { name: 'Areeba Khan', cnic: '42101•••••••2', roll: 'BSCS-002', eligible: true, voted: true },
  { name: 'Hassan Raza', cnic: '42101•••••••3', roll: 'BSCS-003', eligible: true, voted: false },
  { name: 'Sara Ali', cnic: '42101•••••••4', roll: 'BSCS-004', eligible: false, voted: false },
];

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return <div className="stat"><span>{label}</span><strong>{value}</strong><small>{hint}</small></div>;
}

function App() {
  const [mode, setMode] = useState<'voter' | 'admin'>('voter');
  const [step, setStep] = useState<'login' | 'vote' | 'success'>('login');
  const [roll, setRoll] = useState('');
  const [cnic, setCnic] = useState('');
  const [cr, setCr] = useState('');
  const [gr, setGr] = useState('');
  const [students, setStudents] = useState(demoStudents);
  const [toast, setToast] = useState('');
  const [activeNav, setActiveNav] = useState('Overview');

  const crCandidates = useMemo(() => candidates.filter(c => c.group === 'CR'), []);
  const grCandidates = useMemo(() => candidates.filter(c => c.group === 'GR'), []);

  const login = () => {
    if (!roll.trim() || !cnic.trim()) return setToast('Enter both Roll Number and CNIC.');
    if (roll.trim().toUpperCase() !== 'BSCS-001') return setToast('Roll Number and CNIC do not match an eligible student.');
    setStep('vote'); setToast('Identity verified. You may cast one CR and one GR vote.');
  };

  const submitVote = () => {
    if (!cr || !gr) return setToast('Please select one CR and one GR candidate.');
    setStep('success');
    setStudents(s => s.map(x => x.roll === 'BSCS-001' ? { ...x, voted: true } : x));
  };

  const uploadCsv = (file?: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.csv')) return setToast('Please upload a CSV file.');
    setToast(`${file.name} received. Production version should validate rows server-side before importing.`);
  };

  return <div className="app-shell">
    <div className="ambient one" /><div className="ambient two" />
    <header className="topbar">
      <div className="brand"><div className="brand-mark"><Vote size={19}/></div><div><b>Voter<span>AI</span></b><small>Student Election Platform</small></div></div>
      <div className="top-actions"><span className="live-dot"/> Election is live <button className="icon-btn" aria-label="Security"><LockKeyhole size={17}/></button></div>
    </header>

    {mode === 'voter' ? <main className="voter-main">
      <div className="voter-hero">
        <div className="eyebrow"><span className="pulse"/> STUDENT ELECTION 2026</div>
        <h1>Make your voice<br/><em>count.</em></h1>
        <p className="hero-copy">A secure, simple voting experience for your student leadership election.</p>
      </div>

      <section className="voter-card">
        {step === 'login' && <>
          <div className="card-heading"><div><span className="step">01</span><h2>Verify your identity</h2><p>Use the exact Roll Number and CNIC registered with the election.</p></div><ShieldCheck size={26}/></div>
          <div className="field-grid">
            <label>Roll Number<input value={roll} onChange={e => setRoll(e.target.value)} placeholder="e.g. BSCS-001" autoComplete="off"/></label>
            <label>CNIC Number<input value={cnic} onChange={e => setCnic(e.target.value)} placeholder="Enter your CNIC" autoComplete="off"/></label>
          </div>
          <div className="security-note"><LockKeyhole size={16}/><span>Your identity is checked for eligibility. Your ballot choices are designed to remain separate from your voter identity.</span></div>
          <button className="primary" onClick={login}>Continue to ballot <ChevronRight size={18}/></button>
          <p className="micro">Your Roll Number and CNIC must belong to the same registered student.</p>
        </>}

        {step === 'vote' && <>
          <div className="card-heading"><div><span className="step">02</span><h2>Cast your votes</h2><p>Select one candidate from each category.</p></div><span className="selection-count">{Number(!!cr) + Number(!!gr)} / 2 selected</span></div>
          <div className="category"><div className="category-title"><div><span className="badge cr">CR</span><h3>Class Representative</h3></div><span>Choose 1</span></div><div className="candidate-list">{crCandidates.map(c => <button className={`candidate ${cr === c.id ? 'selected' : ''}`} onClick={() => setCr(c.id)} key={c.id}><span className="avatar">{c.initials}</span><span><b>{c.name}</b><small>{c.roll}</small></span>{cr === c.id && <Check className="check" size={18}/>}</button>)}</div></div>
          <div className="category"><div className="category-title"><div><span className="badge gr">GR</span><h3>General Representative</h3></div><span>Choose 1</span></div><div className="candidate-list">{grCandidates.map(c => <button className={`candidate ${gr === c.id ? 'selected' : ''}`} onClick={() => setGr(c.id)} key={c.id}><span className="avatar">{c.initials}</span><span><b>{c.name}</b><small>{c.roll}</small></span>{gr === c.id && <Check className="check" size={18}/>}</button>)}</div></div>
          <button className="primary" onClick={submitVote}>Review & submit vote <ChevronRight size={18}/></button>
          <p className="micro"><LockKeyhole size={13}/> Once submitted, your vote cannot be changed.</p>
        </>}

        {step === 'success' && <div className="success-view"><div className="success-icon"><Check size={32}/></div><span className="eyebrow">VOTE RECORDED</span><h2>Thank you for voting.</h2><p>Your ballot has been securely submitted. You have completed your vote for this election.</p><div className="receipt"><span><Check size={15}/> CR selection recorded</span><span><Check size={15}/> GR selection recorded</span><span><LockKeyhole size={15}/> Ballot identity protected</span></div><button className="secondary" onClick={() => {setStep('login');setRoll('');setCnic('');setCr('');setGr('')}}>Return to home</button></div>}
      </section>

      <div className="election-strip"><span><Clock3 size={16}/> Voting closes in <b>03h 42m</b></span><span>One CR + one GR vote per eligible student</span><button onClick={() => setMode('admin')}>Admin panel →</button></div>
    </main> : <main className="admin-main">
      <aside className="sidebar"><div className="side-brand"><div className="brand-mark"><Vote size={18}/></div><b>Voter<span>AI</span></b></div><div className="side-section"><small>CONTROL CENTER</small>{['Overview','Students','Create Room','Candidates','Results','Audit Log'].map(n => <button key={n} className={activeNav === n ? 'active' : ''} onClick={() => setActiveNav(n)}>{n}</button>)}</div><div className="side-footer"><div className="admin-avatar">A</div><div><b>Election Admin</b><small>Administrator</small></div></div></aside>
      <section className="dashboard"><div className="dash-head"><div><span className="eyebrow">ADMIN CONSOLE</span><h1>{activeNav}</h1><p>Manage the student election with clear controls and privacy-first defaults.</p></div><button className="secondary" onClick={() => setMode('voter')}>View voter screen</button></div>
        <div className="stats"><Stat label="Registered students" value="500" hint="from current roster"/><Stat label="Eligible voters" value="470" hint="94% eligible"/><Stat label="Votes cast" value="421" hint="89.6% participation"/><Stat label="Time remaining" value="03:42" hint="election is live"/></div>
        {activeNav === 'Overview' && <div className="dashboard-grid"><div className="panel large"><div className="panel-head"><div><h3>Election activity</h3><p>Participation during the current election</p></div><span className="status">LIVE</span></div><div className="bars">{['09','10','11','12','13','14','15','16','17'].map((h,i)=><div className="bar-wrap" key={h}><div className="bar" style={{height: `${30 + i*7}%`}}/><small>{h}</small></div>)}</div></div><div className="panel"><div className="panel-head"><div><h3>Import roster</h3><p>CSV with Name, CNIC, Roll Number</p></div><FileSpreadsheet size={20}/></div><label className="dropzone"><input type="file" accept=".csv" onChange={e => uploadCsv(e.target.files?.[0])}/><FileSpreadsheet size={28}/><b>Drop CSV here</b><span>or click to browse</span></label></div><div className="panel"><div className="panel-head"><div><h3>Voter eligibility</h3><p>Toggle who may vote</p></div><Users size={20}/></div><div className="student-table">{students.map(s=><div className="student-row" key={s.roll}><div><b>{s.name}</b><small>{s.roll}</small></div><button className={`toggle ${s.eligible ? 'on' : ''}`} onClick={() => setStudents(xs => xs.map(x => x.roll === s.roll ? {...x,eligible:!x.eligible}:x))}><span/></button></div>)}</div></div><div className="panel"><div className="panel-head"><div><h3>Current candidates</h3><p>CR and GR candidate pools</p></div></div>{candidates.map(c=><div className="mini-candidate" key={c.id}><span className={`badge ${c.group.toLowerCase()}`}>{c.group}</span><span><b>{c.name}</b><small>{c.roll}</small></span><span className="candidate-live">Active</span></div>)}</div></div>}
        {activeNav !== 'Overview' && <div className="empty-panel"><div className="success-icon"><Check size={26}/></div><h2>{activeNav}</h2><p>This section is scaffolded for the full Supabase-backed implementation. The Lovable build brief in <b>docs/lovable-prompt.md</b> defines its production behavior, data model, privacy boundaries, and UI requirements.</p></div>}
      </section>
    </main>}
    {toast && <button className="toast" onClick={() => setToast('')}>{toast}<X size={15}/></button>}
  </div>;
}

export default App;
