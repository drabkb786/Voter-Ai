import { type ReactNode } from 'react';
import { Check, ChevronRight, CircleHelp, Clock3, FileUp, LockKeyhole, MoreHorizontal, Search, ShieldCheck, Sparkles, Users, Vote, X } from 'lucide-react';
import type { Candidate, CandidateGroup, Student } from './data';

export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className="brand" aria-label="VoterAI home"><span className="brand-icon"><Vote size={18} strokeWidth={2.4} /></span><span className="brand-copy"><strong>Voter<span>AI</span></strong>{!compact && <small>Student elections, simplified</small>}</span></div>;
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'green' | 'blue' | 'violet' | 'neutral' }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}

export function CandidateCard({ candidate, selected, onSelect }: { candidate: Candidate; selected: boolean; onSelect: () => void }) {
  return <button className={`candidate-card ${selected ? 'selected' : ''}`} onClick={onSelect} aria-pressed={selected}>
    <span className={`candidate-avatar ${candidate.group === 'CR' ? 'cr-avatar' : 'gr-avatar'}`}>{candidate.initials}</span>
    <span className="candidate-copy"><strong>{candidate.name}</strong><small>{candidate.roll}</small><em>{candidate.manifesto}</em></span>
    <span className="candidate-check">{selected ? <Check size={16} /> : <span className="empty-radio" />}</span>
  </button>;
}

export function CategoryHeader({ group, title }: { group: CandidateGroup; title: string }) {
  return <div className="category-header"><div className={`category-icon ${group === 'CR' ? 'cr-icon' : 'gr-icon'}`}>{group}</div><div><strong>{title}</strong><small>Select exactly one candidate</small></div><span className="choose-label">1 choice</span></div>;
}

export function AdminStat({ icon, label, value, meta }: { icon: ReactNode; label: string; value: string; meta: ReactNode }) {
  return <article className="admin-stat"><span className="stat-icon">{icon}</span><div><small>{label}</small><strong>{value}</strong><span>{meta}</span></div></article>;
}

export function Modal({ title, description, children, onClose }: { title: string; description?: string; children: ReactNode; onClose: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="modal" role="dialog" aria-modal="true" aria-label={title} onMouseDown={e => e.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={onClose}><X size={18}/></button><div className="modal-heading"><span className="modal-symbol"><ShieldCheck size={20}/></span><div><h2>{title}</h2>{description && <p>{description}</p>}</div></div>{children}</section></div>;
}

export function SearchBox({ value, onChange, placeholder = 'Search students…' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <label className="search-box"><Search size={16}/><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} aria-label={placeholder} /></label>;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="empty-state"><span><Sparkles size={20}/></span><h2>{title}</h2><p>{description}</p></div>;
}

export function RosterRow({ student, onToggle }: { student: Student; onToggle: () => void }) {
  return <div className="roster-row"><div className="student-avatar">{student.name.split(' ').map(x => x[0]).slice(0, 2).join('')}</div><div className="roster-name"><strong>{student.name}</strong><small>{student.roll} · {student.cnic}</small></div><Pill tone={student.voted ? 'blue' : 'neutral'}>{student.voted ? 'Voted' : 'Not voted'}</Pill><button className={`eligibility ${student.eligible ? 'enabled' : ''}`} onClick={onToggle} aria-label={`${student.eligible ? 'Disable' : 'Enable'} ${student.name}`}><span /></button><button className="more-btn" aria-label={`More options for ${student.name}`}><MoreHorizontal size={16}/></button></div>;
}

export function FileDrop({ onFile }: { onFile: (file: File) => void }) {
  return <label className="file-drop"><input type="file" accept=".csv,text/csv" onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} /><span className="upload-icon"><FileUp size={21}/></span><strong>Upload student CSV</strong><small>Drag & drop or browse · CSV only</small><span className="upload-link">Choose file <ChevronRight size={14}/></span></label>;
}

export function FooterNote({ children }: { children: ReactNode }) {
  return <div className="footer-note"><LockKeyhole size={14}/>{children}<CircleHelp size={14}/></div>;
}

export function Countdown() {
  return <span className="countdown"><Clock3 size={14}/> 03h 42m remaining</span>;
}

export function ProgressRing({ value }: { value: number }) {
  const radius = 38; const circumference = 2 * Math.PI * radius; const offset = circumference - (value / 100) * circumference;
  return <div className="progress-ring"><svg width="100" height="100" viewBox="0 0 100 100" aria-label={`${value}% participation`}><circle className="ring-bg" cx="50" cy="50" r={radius}/><circle className="ring-value" cx="50" cy="50" r={radius} strokeDasharray={circumference} strokeDashoffset={offset}/></svg><span><strong>{value}%</strong><small>turnout</small></span></div>;
}

export function TopNav({ onAdmin, onHelp }: { onAdmin: () => void; onHelp: () => void }) {
  return <header className="public-nav"><Brand/><nav aria-label="Primary"><a href="#how">How it works</a><a href="#security">Security</a></nav><div className="nav-actions"><button className="nav-help" onClick={onHelp}><CircleHelp size={16}/> Help</button><button className="nav-admin" onClick={onAdmin}>Admin <ChevronRight size={15}/></button></div></header>;
}
