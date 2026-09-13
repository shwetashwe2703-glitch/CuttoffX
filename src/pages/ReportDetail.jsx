import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { getCompanies, getReports } from "../lib/api";
import { Badge, Disclaimer } from "../components/UI";

export default function ReportDetail() {
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

  const report = reports.find((item) => item.id === id);

  const company = companies.find(
    (item) => item.id === report?.company_id
  );

  // Loading state
  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <p className="text-slate-400">
          Loading report...
        </p>
      </div>
    );
  }

  // Report not found
  if (!report) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-2xl font-bold">
          Report not found
        </h1>

        <Link
          to="/companies"
          className="mt-5 inline-block text-blue-400 hover:text-blue-300"
        >
          Back to companies
        </Link>
      </div>
    );
  }

  const details = [
    ["Interview rounds", report.interview_rounds],
    ["Questions / topics", report.questions],
    [
      "Reported eligibility",
      report.reported_min_cgpa
        ? `${report.reported_min_cgpa}+ CGPA`
        : "Not disclosed",
    ],
    [
      "Selection outcome",
      report.outcome || "Not disclosed",
    ],
    ["Notes", report.notes],
  ];

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">

      {/* Back button */}
      <Link
        to={company ? `/companies/${company.id}` : "/companies"}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      {/* Report heading */}
      <div className="mt-8">
        <Badge>
          Anonymous Student Report
        </Badge>

        <h1 className="mt-4 text-4xl font-black">
          {company?.name || "Company"} — {report.role}
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Submitted{" "}
          {new Date(report.created_at).toLocaleDateString("en-IN")}
        </p>
      </div>

      {/* Disclaimer */}
      <div className="mt-7">
        <Disclaimer />
      </div>

      {/* Basic information */}
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[.03] p-4">
          <div className="text-xs text-slate-500">
            Graduation
          </div>

          <div className="mt-2 font-bold">
            {report.graduation_year || "—"}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[.03] p-4">
          <div className="text-xs text-slate-500">
            Reported CGPA
          </div>

          <div className="mt-2 font-bold">
            {report.reported_cgpa || "—"}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[.03] p-4">
          <div className="text-xs text-slate-500">
            Coding
          </div>

          <div className="mt-2 font-bold">
            {report.coding_difficulty || "—"}
          </div>
        </div>
      </div>

      {/* Report details */}
      <div className="mt-6 space-y-4">
        {details.map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[.03] p-5"
          >
            <div className="text-sm font-semibold">
              {label}
            </div>

            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-400">
              {value || "Not provided"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}