import { supabase } from "./supabase";
import { demoCompanies, demoReports } from "../data/demo";

// Get all companies
export async function getCompanies() {
  // If Supabase is not configured, use demo data
  if (!supabase) {
    return {
      data: demoCompanies,
      error: null,
      demo: true,
    };
  }

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("name");

  // If the database is empty, show demo data
  if (!data || data.length === 0) {
    return {
      data: demoCompanies,
      error,
      demo: true,
    };
  }

  return {
    data,
    error,
    demo: false,
  };
}

// Get all placement reports
export async function getReports() {
  // If Supabase is not configured, use demo data
  if (!supabase) {
    return {
      data: demoReports,
      error: null,
      demo: true,
    };
  }

  const { data, error } = await supabase
    .from("placement_reports")
    .select("*")
    .order("created_at", { ascending: false });

  // If the database is empty, show demo data
  if (!data || data.length === 0) {
    return {
      data: demoReports,
      error,
      demo: true,
    };
  }

  return {
    data,
    error,
    demo: false,
  };
}

// Save a new placement report
export async function createReport(payload) {
  if (!supabase) {
    return {
      data: null,
      error: new Error(
        "Supabase is not configured. Demo mode cannot save submissions."
      ),
    };
  }

  // Find the company using the submitted company name
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("id")
    .ilike("name", payload.company_name)
    .maybeSingle();

  if (companyError) {
    return {
      data: null,
      error: companyError,
    };
  }

  if (!company) {
    return {
      data: null,
      error: new Error(
        "Company not found in the database. Add the company in Supabase first."
      ),
    };
  }

  // Remove company_name because the database uses company_id
  const { company_name, ...report } = payload;

  const { data, error } = await supabase
    .from("placement_reports")
    .insert({
      ...report,
      company_id: company.id,
    })
    .select()
    .single();

  return {
    data,
    error,
  };
}