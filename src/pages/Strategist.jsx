import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Target,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Code2,
  Database,
  Briefcase,
} from 'lucide-react';

const demoCompanies = [
  {
    id: 1,
    name: 'TechNova',
    category: 'Dream',
    minCgpa: 7.5,
  },
  {
    id: 2,
    name: 'DataSphere',
    category: 'Super Dream',
    minCgpa: 8.0,
  },
  {
    id: 3,
    name: 'CloudCore',
    category: 'Dream',
    minCgpa: 7.2,
  },
  {
    id: 4,
    name: 'FinEdge',
    category: 'Core',
    minCgpa: 6.8,
  },
  {
    id: 5,
    name: 'CodeCraft',
    category: 'Super Dream',
    minCgpa: 8.2,
  },
];

const skillOptions = [
  'C++',
  'Java',
  'Python',
  'JavaScript',
  'SQL',
  'DSA',
  'DBMS',
  'OOP',
  'Aptitude',
];

export default function Strategist() {
  const [cgpa, setCgpa] = useState('');
  const [graduationYear, setGraduationYear] = useState('2028');
  const [branch, setBranch] = useState('');
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState('No internship');
  const [status, setStatus] = useState('No offer');
  const [submitted, setSubmitted] = useState(false);

  const toggleSkill = (skill) => {
    setSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill]
    );
  };

  const generateStrategy = () => {
    const value = Number(cgpa);

    if (!cgpa || value < 0 || value > 10) {
      alert('Please enter a valid CGPA between 0 and 10.');
      return;
    }

    setSubmitted(true);
  };

  const strategy = useMemo(() => {
    const value = Number(cgpa);

    if (!submitted || !cgpa) {
      return null;
    }

    const strong = demoCompanies.filter(
      (company) => value >= company.minCgpa
    );

    const stretch = demoCompanies.filter(
      (company) =>
        value < company.minCgpa &&
        company.minCgpa - value <= 0.5
    );

    const below = demoCompanies.filter(
      (company) =>
        company.minCgpa - value > 0.5
    );

    const priorities = [];

    if (!skills.includes('DSA')) {
      priorities.push({
        title: 'Prioritize DSA',
        description:
          'Practice data structures, algorithms and problem-solving regularly.',
        icon: Code2,
      });
    }

    if (!skills.includes('SQL') || !skills.includes('DBMS')) {
      priorities.push({
        title: 'Strengthen SQL & DBMS',
        description:
          'Revise SQL queries, normalization, transactions and database fundamentals.',
        icon: Database,
      });
    }

    if (!skills.includes('OOP')) {
      priorities.push({
        title: 'Revise Core CS fundamentals',
        description:
          'Focus on OOP concepts and other fundamentals commonly discussed in interviews.',
        icon: BookOpen,
      });
    }

    if (experience === 'No internship') {
      priorities.push({
        title: 'Build experience',
        description:
          'Consider building 1–2 strong projects or pursuing an internship.',
        icon: Briefcase,
      });
    }

    if (priorities.length === 0) {
      priorities.push({
        title: 'Focus on interview preparation',
        description:
          'Continue DSA practice, mock interviews and company-specific preparation.',
        icon: Target,
      });
    }

    return {
      strong,
      stretch,
      below,
      priorities,
    };
  }, [cgpa, skills, experience, submitted]);

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300">
            <Target className="h-3.5 w-3.5" />
            Placement Strategist
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Build your placement strategy.
          </h1>

          <p className="mt-4 text-slate-400">
            Enter your current profile and compare it against available
            community-reported placement ranges.
          </p>
        </div>

        {/* Form */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white">
              Your profile
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="CGPA">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="e.g. 8.2"
                  className="input"
                />
              </Field>

              <Field label="Graduation Year">
                <select
                  value={graduationYear}
                  onChange={(e) =>
                    setGraduationYear(e.target.value)
                  }
                  className="input"
                >
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>
                </select>
              </Field>

              <Field label="Degree / Branch">
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="e.g. CSE"
                  className="input"
                />
              </Field>

              <Field label="Experience">
                <select
                  value={experience}
                  onChange={(e) =>
                    setExperience(e.target.value)
                  }
                  className="input"
                >
                  <option>No internship</option>
                  <option>1 internship</option>
                  <option>2+ internships</option>
                </select>
              </Field>

              <Field label="Current placement status">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="input"
                >
                  <option>No offer</option>
                  <option>Offer received</option>
                </select>
              </Field>
            </div>

            <div className="mt-7">
              <label className="text-sm font-medium text-slate-300">
                Skills
              </label>

              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {skillOptions.map((skill) => {
                  const selected = skills.includes(skill);

                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                        selected
                          ? 'border-blue-500/50 bg-blue-500/10 text-blue-300'
                          : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        {skill}

                        {selected && (
                          <CheckCircle2 className="h-4 w-4" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={generateStrategy}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
            >
              Generate My Strategy
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Profile preview */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 to-white/[0.02] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Your profile
            </p>

            <div className="mt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    CGPA
                  </p>

                  <p className="mt-1 text-4xl font-bold text-white">
                    {cgpa || '—'}
                  </p>
                </div>

                <TrendingUp className="h-8 w-8 text-blue-400" />
              </div>

              <div className="mt-8 space-y-4">
                <ProfileRow
                  label="Graduation"
                  value={graduationYear}
                />

                <ProfileRow
                  label="Branch"
                  value={branch || 'Not specified'}
                />

                <ProfileRow
                  label="Experience"
                  value={experience}
                />

                <ProfileRow
                  label="Status"
                  value={status}
                />

                <ProfileRow
                  label="Skills"
                  value={
                    skills.length
                      ? skills.join(', ')
                      : 'No skills selected'
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {strategy && (
          <div className="mt-10 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Based on available community reports
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Target breakdown
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <TargetCard
                title="Strong Match"
                count={strategy.strong.length}
                description="Your CGPA meets the reported range."
                type="strong"
                companies={strategy.strong}
              />

              <TargetCard
                title="Stretch"
                count={strategy.stretch.length}
                description="Your CGPA is close to the reported range."
                type="stretch"
                companies={strategy.stretch}
              />

              <TargetCard
                title="Currently Below"
                count={strategy.below.length}
                description="Your CGPA is below the reported range."
                type="below"
                companies={strategy.below}
              />
            </div>

            {/* Priorities */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                  <Target className="h-5 w-5 text-blue-400" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    Your preparation priorities
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Focus areas generated from your selected profile.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {strategy.priorities.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                        <Icon className="h-4 w-4 text-blue-400" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-400">
                            {index + 1}
                          </span>

                          <h3 className="text-sm font-semibold text-white">
                            {item.title}
                          </h3>
                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="flex gap-3 rounded-2xl border border-amber-500/10 bg-amber-500/5 p-5">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />

              <p className="text-sm leading-6 text-slate-400">
                These recommendations are based on available community
                reports and simple rule-based comparisons. They are for
                guidance only and do not guarantee eligibility, interviews
                or placement.
              </p>
            </div>
          </div>
        )}
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          padding: 0.75rem 0.875rem;
          color: white;
          outline: none;
        }

        .input::placeholder {
          color: rgb(100 116 139);
        }

        .input:focus {
          border-color: rgba(59,130,246,0.6);
          box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
        }

        .input option {
          background: rgb(15 23 42);
          color: white;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-sm font-medium text-slate-200">
        {value}
      </span>
    </div>
  );
}

function TargetCard({
  title,
  count,
  description,
  type,
  companies,
}) {
  const icons = {
    strong: CheckCircle2,
    stretch: TrendingUp,
    below: AlertTriangle,
  };

  const Icon = icons[type];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
          <Icon className="h-5 w-5 text-slate-300" />
        </div>

        <span className="text-3xl font-bold text-white">
          {count}
        </span>
      </div>

      <h3 className="mt-5 font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-5 text-slate-500">
        {description}
      </p>

      <div className="mt-5 space-y-2">
        {companies.length === 0 ? (
          <p className="text-xs text-slate-600">
            No companies in this group.
          </p>
        ) : (
          companies.map((company) => (
            <div
              key={company.id}
              className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2"
            >
              <span className="text-sm text-slate-300">
                {company.name}
              </span>

              <span className="text-xs text-slate-500">
                {company.minCgpa}+
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}