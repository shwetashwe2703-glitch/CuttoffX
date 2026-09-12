import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Building2,
  ArrowRight,
  CalendarDays,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';

const companies = [
  {
    id: 1,
    name: 'TechNova',
    category: 'Dream',
    minCgpa: 7.5,
    reports: 12,
    latest: '2026-09-05',
    description:
      'Technology company with software engineering and product development opportunities.',
  },
  {
    id: 2,
    name: 'DataSphere',
    category: 'Super Dream',
    minCgpa: 8.0,
    reports: 8,
    latest: '2026-09-02',
    description:
      'Data and analytics focused company with technical roles.',
  },
  {
    id: 3,
    name: 'CloudCore',
    category: 'Dream',
    minCgpa: 7.2,
    reports: 7,
    latest: '2026-08-28',
    description:
      'Cloud and software engineering focused organization.',
  },
  {
    id: 4,
    name: 'FinEdge',
    category: 'Core',
    minCgpa: 6.8,
    reports: 5,
    latest: '2026-08-20',
    description:
      'Finance technology company with software and technology roles.',
  },
  {
    id: 5,
    name: 'CodeCraft',
    category: 'Super Dream',
    minCgpa: 8.2,
    reports: 10,
    latest: '2026-09-07',
    description:
      'Software engineering company with competitive technical interviews.',
  },
];

const categories = ['All', 'Core', 'Dream', 'Super Dream'];

export default function Companies() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('name');

  const filteredCompanies = useMemo(() => {
    let result = companies.filter((company) => {
      const matchesSearch = company.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === 'All' ||
        company.category === category;

      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      if (sort === 'cgpa') {
        return a.minCgpa - b.minCgpa;
      }

      if (sort === 'reports') {
        return b.reports - a.reports;
      }

      return a.name.localeCompare(b.name);
    });

    return result;
  }, [search, category, sort]);

  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300">
            <Building2 className="h-3.5 w-3.5" />
            Company Explorer
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Explore placement opportunities.
          </h1>

          <p className="mt-4 text-slate-400">
            Compare companies using community-reported eligibility
            patterns and student placement experiences.
          </p>
        </div>

        {/* Demo data notice */}
        <div className="mt-8 rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4">
          <p className="text-sm font-medium text-amber-300">
            Demo data
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            The companies and placement ranges currently shown are
            fictional demo data for this independent student project.
            They are not official SRM placement records.
          </p>
        </div>

        {/* Search + filters */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search companies..."
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-500/50"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none"
              >
                <option value="name">Sort: Company Name</option>
                <option value="cgpa">Sort: Reported CGPA</option>
                <option value="reports">Sort: Reports</option>
              </select>
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  category === item
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Showing{' '}
              <span className="font-semibold text-white">
                {filteredCompanies.length}
              </span>{' '}
              companies
            </p>
          </div>
        </div>

        {/* Empty state */}
        {filteredCompanies.length === 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <Building2 className="mx-auto h-10 w-10 text-slate-600" />

            <h2 className="mt-4 text-lg font-semibold text-white">
              No companies found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or category filter.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch('');
                setCategory('All');
              }}
              className="mt-5 rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/15"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Company cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-sm font-medium text-slate-300">
            Community data disclaimer
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Reported CGPA ranges and experiences are community data and
            may be incomplete or inaccurate. They are provided for
            guidance only and should not be treated as official
            university or company eligibility criteria.
          </p>
        </div>
      </section>
    </div>
  );
}

function CompanyCard({ company }) {
  return (
    <Link
      to={`/companies/${company.id}`}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
          <Building2 className="h-5 w-5 text-blue-400" />
        </div>

        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300">
          {company.category}
        </span>
      </div>

      <h2 className="mt-5 text-xl font-semibold text-white">
        {company.name}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
        {company.description}
      </p>

      {/* CGPA */}
      <div className="mt-6 rounded-xl border border-white/5 bg-slate-950/50 p-4">
        <p className="text-xs uppercase tracking-wide text-slate-600">
          Reported CGPA range
        </p>

        <p className="mt-1 text-2xl font-bold text-white">
          {company.minCgpa}+
        </p>

        <p className="mt-1 text-xs text-slate-600">
          Community-reported
        </p>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-600" />

          <div>
            <p className="text-sm font-semibold text-slate-300">
              {company.reports}
            </p>

            <p className="text-xs text-slate-600">
              student reports
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-slate-600" />

          <div>
            <p className="text-xs font-semibold text-slate-400">
              {formatDate(company.latest)}
            </p>

            <p className="text-xs text-slate-600">
              latest report
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-sm font-medium text-blue-400">
          View company
        </span>

        <ArrowRight className="h-4 w-4 text-blue-400 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}