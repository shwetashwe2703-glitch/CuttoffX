import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Target,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Independent student placement intelligence
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Turn placement uncertainty{' '}
              <span className="text-blue-400">
                into a strategy.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Explore community-reported placement experiences, compare
              eligibility patterns, and understand where to focus your
              preparation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/strategist"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Build My Strategy
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/companies"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Building2 className="h-4 w-4" />
                Explore Companies
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            <StatCard
              icon={Building2}
              label="Companies"
              value="5+"
            />

            <StatCard
              icon={MessageSquare}
              label="Student Reports"
              value="15+"
            />

            <StatCard
              icon={TrendingUp}
              label="Interview Experiences"
              value="10+"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold text-blue-400">
              WHAT YOU CAN DO
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Make better placement decisions.
            </h2>

            <p className="mt-3 text-slate-400">
              Use community information to understand the landscape and
              build a preparation plan around your current profile.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon={Building2}
              title="Placement Intelligence"
              description="Explore reported eligibility ranges and company-specific experiences."
            />

            <FeatureCard
              icon={MessageSquare}
              title="Interview Insights"
              description="Learn what students reported about coding rounds, interviews, and topics asked."
            />

            <FeatureCard
              icon={Target}
              title="Personal Strategy"
              description="Compare your profile against available community data and identify preparation priorities."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/15 to-white/[0.03] p-8 sm:p-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-blue-400">
                READY TO START?
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                Know where you stand.
              </h2>

              <p className="mt-3 text-slate-400">
                Enter your CGPA, skills and experience to get a simple,
                explainable placement preparation strategy.
              </p>

              <Link
                to="/strategist"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Build My Strategy
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-5">
            <p className="text-sm font-semibold text-amber-300">
              Important disclaimer
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              SRM Placement Strategist is an independent student project.
              Community-reported information may be incomplete or inaccurate
              and should not be treated as official placement policy.
              Reported ranges are for guidance only and do not guarantee
              eligibility or placement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 hover:bg-white/[0.05]">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>

        <span className="text-2xl font-bold text-white">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-400">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-slate-900/50 p-6 transition hover:-translate-y-1 hover:border-blue-500/30">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
        <Icon className="h-5 w-5 text-blue-400" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}