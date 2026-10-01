import { useState } from 'react';
import { useOS } from '../os/store';
import { I } from '../os/icons';
import { EMAIL, GITHUB, LINKEDIN } from '../os/types';

const SUBJ_ICON = [I.chat, I.briefcase, I.calendar, I.bug];

export default function ContactApp() {
  const { t, lang, toast, copyEmail } = useOS();
  const subjects = t('contact.subjects') as { id: string; t: string; d: string }[];
  const [subj, setSubj] = useState(subjects[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honey, setHoney] = useState('');
  const [errs, setErrs] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return; // bot
    const E = t('contact.errors') as Record<string, string>;
    const ne: Record<string, string> = {};
    if (!name.trim()) ne.name = E.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) ne.email = E.email;
    if (!message.trim()) ne.message = E.message;
    setErrs(ne);
    if (Object.keys(ne).length > 0) return;

    const subjLabel = subjects.find((s) => s.id === subj)?.t || subj;
    const subject = encodeURIComponent(`[Jon OS] ${subjLabel} — ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} <${email.trim()}>`);
    toast(t('contact.opening') as string);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 4 }}>
        <img className="jos-avatar" src="./avatar.jpg" alt="Jon Peciña" style={{ width: 56, height: 56 }} />
        <div>
          <h2 className="jos-h" style={{ margin: 0 }}>{t('contact.title')}</h2>
          <p className="jos-sub" style={{ margin: '4px 0 0', fontSize: '0.88em' }}>{t('contact.sub')}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '14px 0' }}>
        <a className="jos-btn small" href={`mailto:${EMAIL}`}><I.mail size={15} /> Email</a>
        <a className="jos-btn small" href={LINKEDIN} target="_blank" rel="noreferrer"><I.linkedin size={15} /> LinkedIn</a>
        <a className="jos-btn small" href={GITHUB} target="_blank" rel="noreferrer"><I.github size={15} /> GitHub</a>
        <button className="jos-btn small" onClick={copyEmail}><I.copy size={15} /> {t('contact.copyEmail')}</button>
      </div>

      <form onSubmit={submit} noValidate>
        <label style={{ fontWeight: 700, fontSize: '0.9em' }}>
          {t('contact.subject')} <span className="req" style={{ color: '#e5484d' }}>*</span>
        </label>
        <div className="jos-subj-grid">
          {subjects.map((s, i) => {
            const Icon = SUBJ_ICON[i] || I.chat;
            return (
              <button
                key={s.id}
                type="button"
                className={`jos-subj${subj === s.id ? ' on' : ''}`}
                onClick={() => setSubj(s.id)}
              >
                <Icon /><b>{s.t}</b><small>{s.d}</small>
              </button>
            );
          })}
        </div>

        <div className="jos-form-row">
          <div className="jos-field">
            <label>{t('contact.name')} <span className="req">*</span></label>
            <input className="jos-input" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('contact.namePh')} />
            {errs.name && <div style={{ color: '#f87171', fontSize: '0.8em', marginTop: 4 }}>{errs.name}</div>}
          </div>
          <div className="jos-field">
            <label>{t('contact.email')} <span className="req">*</span></label>
            <input className="jos-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('contact.emailPh')} inputMode="email" />
            {errs.email && <div style={{ color: '#f87171', fontSize: '0.8em', marginTop: 4 }}>{errs.email}</div>}
          </div>
        </div>

        <div className="jos-field">
          <label>{t('contact.message')} <span className="req">*</span></label>
          <textarea
            className="jos-textarea" value={message} maxLength={1000}
            onChange={(e) => setMessage(e.target.value)} placeholder={t('contact.messagePh')}
          />
          <div className="jos-char">{message.length}/1000</div>
          {errs.message && <div style={{ color: '#f87171', fontSize: '0.8em', marginTop: 4 }}>{errs.message}</div>}
        </div>

        {/* honeypot */}
        <input
          className="jos-honeypot" tabIndex={-1} autoComplete="off"
          value={honey} onChange={(e) => setHoney(e.target.value)}
          aria-hidden="true" name="website_url"
        />

        <button type="submit" className="jos-btn primary" style={{ width: '100%', justifyContent: 'center' }}>
          <I.mail size={16} /> {t('contact.send')}
        </button>
        <p style={{ color: 'var(--text-faint)', fontSize: '0.8em', marginTop: 10, lineHeight: 1.5 }}>
          {t('contact.note')}
        </p>
      </form>
      <span style={{ display: 'none' }}>{lang}</span>
    </div>
  );
}
