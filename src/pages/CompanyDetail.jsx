import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getCompanies, getReports } from "../lib/api";
import { Badge, Disclaimer } from "../components/UI";

export default function CompanyDetail() {
  const { id } = useParams();

  const [companies, setCompanies] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [companiesResult, reportsResult] = await Promise.all([
        getCompanies(),
        getReports(),
      ]);

      setCompanies(companiesResult.data || []);
      setReports(reportsResult.data || []);
      setLoading(false);
    }

    loadData();
  }, []);

  const company = companies.find((item) => item.id === id);

  const companyReports = useMemo(() => {
    return reports.filter((report) => report.company_id === id);
  }, [reports, id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-5 py-20 text-center">
        <p className="text-slate-400">Loading company details...</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">Company not found</h1>

        <Link
          to="/companies"
          className="mt-5 inline-block text-blue-400 hover:text-blue-300"
        >
          Back to companies
        </Link>
      </div>
    );
  }

  const difficultyData = ["Easy", "Medium", "Hard"].map((level) => {
    const count = companyReports.filter(
      (report) => report.coding_difficulty === level
    ).length;

    return {
      level,
      count,
    };
  });

  const interviewRounds = [
    ...new Set(
      companyReports
        .map((report) => report.interview_rounds)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">

      <Link
        to="/companies"
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Companies
      </Link>

      <div className="mt-8 flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <Badge tone="blue">{company.category}</Badge>

          <h1 className="mt-3 text-4xl font-black">
            {company.name}
          </h1>

          <p className="mt-3 text-slate-400">
            {company.description}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[.04] p-5 md:min-w-56">
          <div className="text-xs text-slate-500">
            Reported eligibility
          </div>

          <div className="mt-2 text-2xl font-bold">
            {company.reported_min_cgpa}+
          </div>

          <div className="mt-1 text-xs text-slate-500">
            {companyReports.length} student reports
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Disclaimer />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
          <h2 className="font-bold">Coding difficulty</h2>

          <div className="mt-5 space-y-4">
            {difficultyData.map((item) => {
              const percentage = companyReports.length
                ? Math.max(
                    8,
                    (item.count / companyReports.length) * 100
                  )
                : 0;

              return (
                <div key={item.level}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{item.level}</span>

                    <span className="text-slate-500">
                      {item.count}
                    </span>
                  </div>

                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[.03] p-6">
          <h2 className="font-bold">Interview rounds</h2>

          <div className="mt-4 space-y-3">
            {interviewRounds.map((round) => (
              <div
                key={round}
                className="rounded-xl bg-slate-900 p-3 text-sm text-slate-300"
              >
                {round}
              </div>
            ))}

            {interviewRounds.length === 0 && (
              <p className="text-sm text-slate-500">
                No interview information available yet.
              </p>
            )}
          </div>
        </div>

      </div>

      <h2 className="mt-10 text-2xl font-bold">
        Student experiences
      </h2>

      <div className="mt-4 space-y-3">
        {companyReports.map((report) => (
          <Link
            key={report.id}
            to={`/reports/${report.id}`}
            className="block rounded-2xl border border-white/10 bg-white/[.03] p-5 hover:border-blue-400/30"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">

              <div>
                <Badge>
                  Anonymous Student Report
                </Badge>

                <span className="ml-2 text-sm text-slate-400">
                  {report.role}
                </span>
              </div>

              <span className="text-xs text-slate-500">
                {new Date(report.created_at).toLocaleDateString("en-IN")}
              </span>
            </div>

            <div className="mt-3 text-sm text-slate-300">
              CGPA {report.reported_cgpa} •{" "}
              {report.coding_difficulty} coding •{" "}
              {report.outcome || "Not disclosed"}
            </div>
          </Link>
        ))}

        {companyReports.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-slate-500">
            No reports yet.
          </div>
        )}
      </div>

    </div>
  );
}