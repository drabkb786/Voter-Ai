import type { ReactNode } from 'react';
import { Check, ChevronRight, CircleHelp, Clock3, FileSpreadsheet, LockKeyhole, Search, ShieldCheck, Vote, X } from 'lucide-react';
import type { Candidate, Student } from './data';

export function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-2xl bg-brand text-white shadow-card"><Vote size={18}/></span><span className="leading-tight"><strong className="block text-[15px] font-black tracking-tight text-ink">Voter<span className="text-brand">AI</span></strong>{!compact && <small className="block text-[10px] font-semibold uppercase tracking-[.14em] text-muted">Student elections</small>}</span></div>;
}

export function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: 'green' | 'blue' | 'violet' | 'slate' }) {
  const tones = { green: 'bg-emerald-50 text-emerald-700 ring-emerald-100', blue: 'bg-blue-50 text-blue-700 ring-blue-100', violet: 'bg-violet-50 text-violet-700 ring-violet-100', slate: 'bg-slate-100 text-slate-600 ring-slate-200' };
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ring-1 ${tones[tone]}`}>{children}</span>;
}

export function Button({ children, variant = 'primary', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  const styles = { primary: 'bg-brand text-white shadow-lg shadow-blue-600/15 hover:bg-brandDark', secondary: 'bg-white text-ink ring-1 ring-line hover:bg-slate-50', ghost: 'text-muted hover:bg-slate-100' };
  return <button className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`} {...props}>{children}</button>;
}

export function Field({ label, hint, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return <label className="grid gap-2 text-sm font-semibold text-ink"><span>{label}</span><input className="h-12 rounded-xl bg-white px-4 text-sm font-medium text-ink ring-1 ring-line outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-brand" {...props}/>{hint && <span className="text-xs font-normal text-muted">{hint}</span>}</label>;
}

export function Modal({ title, description, onClose, children }: { title: string; description: string; onClose: () => void; children: ReactNode }) {
  return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title}><div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-3xl bg-white p-5 shadow-soft sm:p-7"><div className="mb-6 flex items-start justify-between gap-4"><div><span className="mb-3 grid size-10 place-items-center rounded-xl bg-blue-50 text-brand"><ShieldCheck size={19}/></span><h2 className="text-xl font-black tracking-tight text-ink">{title}</h2><p className="mt-1 text-sm leading-6 text-muted">{description}</p></div><button onClick={onClose} aria-label="Close dialog" className="rounded-xl p-2 text-muted hover:bg-slate-100"><X size={18}/></button></div>{children}</div></div>;
}

export function Notice({ children }: { children: ReactNode }) { return <div className="flex gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-muted ring-1 ring-slate-100"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-brand"/><span>{children}</span></div>; }

export function CandidateCard({ candidate, selected, onSelect }: { candidate: Candidate; selected: boolean; onSelect: () => void }) {
  return <button type="button" aria-pressed={selected} onClick={onSelect} className={`group w-full rounded-2xl border p-4 text-left transition ${selected ? 'border-brand bg-blue-50/60 shadow-card' : 'border-line bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card'}`}><div className="flex items-start gap-3"><span className={`grid size-11 shrink-0 place-items-center rounded-xl text-sm font-black ${candidate.group === 'CR' ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'}`}>{candidate.initials}</span><span className="min-w-0 flex-1"><strong className="block text-sm font-extrabold text-ink">{candidate.name}</strong><small className="mt-0.5 block text-xs font-semibold text-muted">{candidate.roll}</small><span className="mt-2 block text-xs leading-5 text-muted">{candidate.manifesto}</span></span><span className={`grid size-6 shrink-0 place-items-center rounded-full border-2 ${selected ? 'border-brand bg-brand text-white' : 'border-slate-300 text-transparent'}`}><Check size={13}/></span></div></button>;
}

export function CategoryHeader({ group, title, selected }: { group: 'CR' | 'GR'; title: string; selected: boolean }) {
  return <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-3"><span className={`grid size-10 place-items-center rounded-xl text-xs font-black ${group === 'CR' ? 'bg-blue-50 text-blue-700' : 'bg-violet-50 text-violet-700'}`}>{group}</span><div><h2 className="text-sm font-black text-ink">{title}</h2><p className="text-xs text-muted">Select one candidate</p></div></div><Badge tone={selected ? 'green' : 'slate'}>{selected ? 'Selected' : '1 choice'}</Badge></div>;
}

export function Progress({ value }: { value: number }) { return <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-brand transition-all" style={{ width: `${value}%` }}/></div>; }

export function RosterRow({ student, onToggle }: { student: Student; onToggle: () => void }) {
  return <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-line py-3 last:border-0"><span className="grid size-9 place-items-center rounded-xl bg-slate-100 text-xs font-black text-slate-600">{student.name.split(' ').map(x => x[0]).slice(0,2).join('')}</span><div className="min-w-0"><strong className="block truncate text-sm font-bold text-ink">{student.name}</strong><small className="block truncate text-xs text-muted">{student.roll} · {student.cnic}</small></div><button type="button" onClick={onToggle} className={`relative h-6 w-11 rounded-full transition ${student.eligible ? 'bg-brand' : 'bg-slate-300'}`} aria-label={`Toggle eligibility for ${student.name}`}><span className={`absolute top-1 size-4 rounded-full bg-white shadow transition ${student.eligible ? 'left-6' : 'left-1'}`}/></button></div>;
}

export function TopNav({ onAdmin, onHelp }: { onAdmin: () => void; onHelp: () => void }) {
  return <header className="sticky top-0 z-30 border-b border-line/80 bg-white/90 backdrop-blur"><div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"><Logo/><nav className="hidden items-center gap-7 text-sm font-semibold text-muted md:flex"><a href="#how" className="hover:text-ink">How it works</a><a href="#security" className="hover:text-ink">Security</a></nav><div className="flex items-center gap-2"><button onClick={onHelp} className="hidden h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold text-muted hover:bg-slate-50 sm:inline-flex"><CircleHelp size={16}/> Help</button><Button onClick={onAdmin} variant="secondary" className="h-10 min-h-10 px-3 sm:px-4">Admin <ChevronRight size={15}/></Button></div></div></header>;
}

export function EmptyState({ icon = <Search size={18}/>, title, description }: { icon?: ReactNode; title: string; description: string }) { return <div className="grid place-items-center rounded-2xl border border-dashed border-line bg-slate-50 p-10 text-center"><span className="grid size-11 place-items-center rounded-xl bg-white text-muted shadow-sm">{icon}</span><h3 className="mt-3 text-sm font-black text-ink">{title}</h3><p className="mt-1 max-w-sm text-xs leading-5 text-muted">{description}</p></div>; }

export function StatCard({ icon, label, value, detail }: { icon: ReactNode; label: string; value: string; detail: ReactNode }) { return <div className="rounded-2xl border border-line bg-white p-4 shadow-card"><span className="grid size-9 place-items-center rounded-xl bg-slate-50 text-brand">{icon}</span><p className="mt-4 text-xs font-semibold text-muted">{label}</p><strong className="mt-1 block text-2xl font-black tracking-tight text-ink">{value}</strong><span className="mt-1 block text-xs text-muted">{detail}</span></div>; }

export function PageShell({ children, title, eyebrow }: { children: ReactNode; title: string; eyebrow: string }) { return <main className="min-h-[calc(100vh-72px)] bg-canvas"><div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"><div className="mb-8"><span className="text-[11px] font-black uppercase tracking-[.18em] text-brand">{eyebrow}</span><h1 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">{title}</h1></div>{children}</div></main>; }

export function Footer() { return <footer className="border-t border-line bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><Logo compact/><span className="flex items-center gap-1"><LockKeyhole size={13}/> Privacy-first student voting</span></div></footer>; }

export function LivePill() { return <Badge tone="green"><span className="size-1.5 rounded-full bg-emerald-500"/> Election live</Badge>; }
export function Countdown() { return <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-2 text-xs font-bold text-muted"><Clock3 size={13}/> 03h 42m left</span>; }
export function FileDrop({ onChange }: { onChange: (file: File) => void }) { return <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center hover:border-brand hover:bg-blue-50/40"><input type="file" accept=".csv,text/csv" className="sr-only" onChange={e => e.target.files?.[0] && onChange(e.target.files[0])}/><span className="grid size-11 place-items-center rounded-xl bg-white text-brand shadow-sm"><FileSpreadsheet size={20}/></span><strong className="mt-3 text-sm font-bold text-ink">Import student roster</strong><span className="mt-1 text-xs text-muted">CSV only · validated server-side</span></label>; }
