import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReport } from '../lib/api';

const inputClass =
  'mt-2 w-full rounded-xl border border-white/10 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500';

export default function Submit() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    company_name: '',
    role: '',
    graduation_year: '2027',
    reported_cgpa: '',
    coding_difficulty: 'Medium',
    interview_rounds: '',
    questions: '',
    reported_min_cgpa: '',
    outcome: 'Not disclosed',
    notes: '',
    consent: false,
  });

  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  function setField(key, value) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setMsg('');

    if (!form.company_name.trim()) {
      setMsg('Please enter the company name.');
      return;
    }

    if (!form.role.trim()) {
      setMsg('Please enter the role.');
      return;
    }

    if (!form.graduation_year) {
      setMsg('Please enter your graduation year.');
      return;
    }

    const cgpa = Number(form.reported_cgpa);

    if (
      !form.reported_cgpa ||
      Number.isNaN(cgpa) ||
      cgpa < 0 ||
      cgpa > 10
    ) {
      setMsg('Please enter a valid CGPA between 0 and 10.');
      return;
    }

    if (!form.interview_rounds.trim()) {
      setMsg('Please describe the interview rounds.');
      return;
    }

    if (!form.questions.trim()) {
      setMsg('Please enter the questions or topics asked.');
      return;
    }

    if (!form.consent) {
      setMsg(
        'Please confirm the anonymous community-report consent.'
      );
      return;
    }

    setSaving(true);

    const { error } = await createReport({
      company_name: form.company_name.trim(),
      role: form.role.trim(),
      graduation_year: Number(form.graduation_year),
      reported_cgpa: cgpa,
      coding_difficulty: form.coding_difficulty,
      interview_rounds: form.interview_rounds.trim(),
      questions: form.questions.trim(),
      reported_min_cgpa: form.reported_min_cgpa
        ? Number(form.reported_min_cgpa)
        : null,
      outcome: form.outcome,
      notes: form.notes.trim(),
    });

    setSaving(false);

    if (error) {
      setMsg(
        error.message?.includes('not configured')
          ? 'Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then submit again.'
          : error.message
      );
      return;
    }

    setMsg('Report submitted successfully.');

    setForm({
      company_name: '',
      role: '',
      graduation_year: '2027',
      reported_cgpa: '',
      coding_difficulty: 'Medium',
      interview_rounds: '',
      questions: '',
      reported_min_cgpa: '',
      outcome: 'Not disclosed',
      notes: '',
      consent: false,
    });

    setTimeout(() => nav('/companies'), 1200);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-wide text-blue-400">
          SHARE EXPERIENCE
        </p>

        <h1 className="mt-2 text-4xl font-black tracking-tight text-white">
          Share Your Placement Experience
        </h1>

        <p className="mt-4 leading-7 text-slate-400">
          Help future students learn from what you experienced.
          Your submission is displayed anonymously.
        </p>

        <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <p className="text-sm font-semibold text-blue-300">
            🔒 Anonymous by design
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            We do not ask for your name, email, phone number, roll
            number, or other personally identifying information.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-8 space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-300">
              Company name
              <input
                required
                type="text"
                value={form.company_name}
                onChange={(e) =>
                  setField('company_name', e.target.value)
                }
                placeholder="Example Corp"
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium text-slate-300">
              Role
              <input
                required
                type="text"
                value={form.role}
                onChange={(e) =>
                  setField('role', e.target.value)
                }
                placeholder="Software Engineer"
                className={inputClass}
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-300">
              Graduation year
              <input
                required
                type="number"
                min="2020"
                max="2040"
                value={form.graduation_year}
                onChange={(e) =>
                  setField('graduation_year', e.target.value)
                }
                className={inputClass}
              />
            </label>

            <label className="text-sm font-medium text-slate-300">
              Your CGPA
              <input
                required
                type="number"
                min="0"
                max="10"
                step="0.01"
                value={form.reported_cgpa}
                onChange={(e) =>
                  setField('reported_cgpa', e.target.value)
                }
                placeholder="8.20"
                className={inputClass}
              />
            </label>
          </div>

          <label className="block text-sm font-medium text-slate-300">
            Coding round difficulty
            <select
              value={form.coding_difficulty}
              onChange={(e) =>
                setField('coding_difficulty', e.target.value)
              }
              className={inputClass}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-300">
            Interview rounds
            <textarea
              required
              value={form.interview_rounds}
              onChange={(e) =>
                setField('interview_rounds', e.target.value)
              }
              placeholder="Example: Online assessment → Technical interview → HR"
              className={`${inputClass} min-h-28 resize-y`}
            />
          </label>

          <label className="block text-sm font-medium text-slate-300">
            Questions / topics asked
            <textarea
              required
              value={form.questions}
              onChange={(e) =>
                setField('questions', e.target.value)
              }
              placeholder="Example: Arrays, strings, OOP, SQL, DBMS..."
              className={`${inputClass} min-h-28 resize-y`}
            />
          </label>

          <label className="block text-sm font-medium text-slate-300">
            Reported eligibility / cutoff
            <input
              type="number"
              min="0"
              max="10"
              step="0.01"
              value={form.reported_min_cgpa}
              onChange={(e) =>
                setField('reported_min_cgpa', e.target.value)
              }
              placeholder="Example: 8.0"
              className={inputClass}
            />
            <span className="mt-2 block text-xs text-slate-600">
              Optional. Enter a student-reported range, not an
              assumed official cutoff.
            </span>
          </label>

          <label className="block text-sm font-medium text-slate-300">
            Outcome
            <select
              value={form.outcome}
              onChange={(e) =>
                setField('outcome', e.target.value)
              }
              className={inputClass}
            >
              <option>Selected</option>
              <option>Rejected</option>
              <option>Waitlisted</option>
              <option>Not disclosed</option>
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-300">
            Optional notes
            <textarea
              value={form.notes}
              onChange={(e) =>
                setField('notes', e.target.value)
              }
              placeholder="Anything else that could help future students..."
              className={`${inputClass} min-h-28 resize-y`}
            />
          </label>

          <label className="flex cursor-pointer gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) =>
                setField('consent', e.target.checked)
              }
              className="mt-1 h-4 w-4 accent-blue-500"
            />
            <span>
              I understand this is a community report and may be
              displayed anonymously.
            </span>
          </label>

          {msg && (
            <div
              className={`rounded-xl p-4 text-sm ${
                msg.includes('successfully')
                  ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                  : 'border border-rose-500/20 bg-rose-500/10 text-rose-300'
              }`}
            >
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? 'Submitting…'
              : 'Submit Anonymous Report'}
          </button>

          <p className="text-center text-xs leading-5 text-slate-600">
            Community-reported information is provided for guidance
            only and is not official university or company data.
          </p>
        </form>
      </div>
    </div>
  );
}
