"use client";

import type React from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  CheckCircle,
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

interface ApplicationData {
  fullName: string;
  dateOfBirth: string;
  workType: string;
  areaOfExpertise: string;
  email: string;
  cv: File | null;
  additionalInfo: string;
  jobId?: string;
  jobTitle?: string;
  columnist?: string;
}

const jobListings = [
  {
    id: 1,
    title: "Political Research Assistant",
    columnist: "Dr. Fraser McGurk",
    columnistImage: "/placeholder-1.png",
    type: "Part-Time",
    experience: "2-4 years",
    description:
      "Assist in gathering political data, monitoring policy developments, and preparing reports on governance and legislative trends in the Asia Pacific region.",
    requirements: [
      "Bachelor's in Political Science or International Relations",
      "Strong analytical and writing skills",
      "Knowledge of government structures",
    ],
    posted: "2 days ago",
    applicants: 21,
    urgent: false,
  },
  {
    id: 2,
    title: "Foreign Trade Research Assistant",
    columnist: "Dr. Haresh Mehta",
    columnistImage: "/placeholder-2.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "3-5 years",
    description:
      "Support international trade policy analysis, track bilateral trade agreements, and assess impacts on Asia Pacific economies.",
    requirements: [
      "Economics or International Trade degree",
      "Quantitative research skills",
      "Knowledge of WTO and trade agreements",
      "Report drafting experience",
    ],
    posted: "1 day ago",
    applicants: 28,
    urgent: true,
  },
  {
    id: 3,
    title: "Defense Policy Research Assistant",
    columnist: "Col. (R) David Wong",
    columnistImage: "/placeholder-3.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "3-6 years",
    description:
      "Assist in defense research projects, analyzing military strategies, budgets, and security policies across the Asia.",
    requirements: [
      "Background in Defense Studies or Political Science",
      "Understanding of military structures",
      "Strong policy analysis skills",
      "Confidentiality and attention to detail",
    ],
    posted: "3 days ago",
    applicants: 15,
    urgent: false,
  },
  {
    id: 4,
    title: "Cultural Policy Research Assistant",
    columnist: "Prof. Li Mei",
    columnistImage: "/placeholder-4.png",
    type: "Full-time",
    location: "Part-Time",

    experience: "1-3 years",
    description:
      "Conduct research on cultural policy, heritage conservation, and domestic cultural initiatives shaping identity and diplomacy.",
    requirements: [
      "Cultural Studies or Sociology degree",
      "Strong writing and research skills",
      "Interest in arts and policy",
    ],
    posted: "4 days ago",
    applicants: 17,
    urgent: true,
  },
  {
    id: 5,
    title: "Environmental Policy Research Assistant",
    columnist: "Dr. Priya Sharma",
    columnistImage: "/placeholder-5.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "2-4 years",
    description:
      "Support policy analysis and research on climate change, renewable energy, and sustainable development initiatives.",
    requirements: [
      "Environmental Science or Public Policy degree",
      "Knowledge of international environmental treaties",
      "Analytical and data interpretation skills",
      "Passion for sustainability",
    ],
    posted: "5 days ago",
    applicants: 22,
    urgent: false,
  },
  {
    id: 6,
    title: "Diplomacy & International Relations Research Assistant",
    columnist: "Ambassador Maria Santos",
    columnistImage: "/placeholder-6.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "3-5 years",
    description:
      "Assist with research on diplomatic relations, track bilateral and multilateral meetings, and prepare briefs for policy analysts.",
    requirements: [
      "International Relations or Political Science degree",
      "Excellent research and communication skills",
      "Knowledge of global organizations",
      "Ability to work under deadlines",
    ],
    posted: "1 week ago",
    applicants: 33,
    urgent: false,
  },
  {
    id: 7,
    title: "Economic Policy Research Assistant",
    columnist: "Dr. Sarah Chen",
    columnistImage: "/placeholder-7.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "1-2 years",
    description:
      "Provide support in economic research, focusing on fiscal policies, government budgets, and taxation trends in Asia Pacific countries.",
    requirements: [
      "Economics or Finance degree",
      "Quantitative research expertise",
      "Statistical analysis skills",
      "Policy drafting experience",
    ],
    posted: "2 days ago",
    applicants: 24,
    urgent: false,
  },
  {
    id: 8,
    title: "Legislative Research Assistant",
    columnist: "James Liu",
    columnistImage: "/placeholder-8.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "2-3 years",
    description:
      "Assist with monitoring parliamentary debates, analyzing legislation, and drafting research briefs for policymakers.",
    requirements: [
      "Law, Public Policy, or Political Science degree",
      "Strong legal research skills",
      "Attention to detail",
      "Excellent communication skills",
    ],
    posted: "6 days ago",
    applicants: 20,
    urgent: true,
  },
  {
    id: 9,
    title: "Foreign Policy Research Assistant",
    columnist: "Dr. Allan GrantWel",
    columnistImage: "/placeholder-9.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "3-5 years",
    description:
      "Conduct analysis on foreign policy strategies, geopolitical risks, and regional security alignments.",
    requirements: [
      "International Relations or Political Economy degree",
      "Knowledge of global security trends",
      "Strong analytical skills",
    ],
    posted: "1 week ago",
    applicants: 31,
    urgent: false,
  },
  {
    id: 10,
    title: "Media & Public Opinion Research Assistant",
    columnist: "Michael Tanaka",
    columnistImage: "/placeholder-10.png",
    type: "Part-time",
    location: "Part-Time",

    experience: "1-3 years",
    description:
      "Assist in analyzing public opinion surveys, media trends, and political narratives influencing voter behavior.",
    requirements: [
      "Background in Communications, Journalism, or Political Science",
      "Data analysis and survey design skills",
      "Understanding of political campaigns",
      "Strong writing ability",
    ],
    posted: "2 days ago",
    applicants: 27,
    urgent: true,
  },
  {
    id: 11,
    title: "Global Security Research Assistant",
    columnist: "Dr. Elena Petrova",
    columnistImage: "/placeholder-11.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "3-6 years",
    description:
      "Support research on cybersecurity, global conflicts, and cross-border security challenges.",
    requirements: [
      "Security Studies or Computer Science degree",
      "Knowledge of global security issues",
      "Analytical and reporting skills",
    ],
    posted: "3 days ago",
    applicants: 19,
    urgent: false,
  },
  {
    id: 12,
    title: "Migration Policy Research Assistant",
    columnist: "Prof. Julia Ahmed",
    columnistImage: "/placeholder-12.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "2-4 years",
    description:
      "Research migration flows, refugee policies, and labor mobility issues within Asia Pacific and globally.",
    requirements: [
      "Sociology, Political Science, or Public Policy degree",
      "Qualitative and quantitative research skills",
      "Knowledge of migration frameworks",
      "Strong communication skills",
    ],
    posted: "5 days ago",
    applicants: 14,
    urgent: false,
  },
  {
    id: 13,
    title: "Elections & Democracy Research Assistant",
    columnist: "Dr. Carlos Mendes",
    columnistImage: "/placeholder-13.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "2-5 years",
    description:
      "Assist in election monitoring, democratic reforms research, and political participation studies.",
    requirements: [
      "Political Science or Governance degree",
      "Understanding of electoral systems",
      "Survey and data analysis skills",
      "Report writing ability",
    ],
    posted: "4 days ago",
    applicants: 23,
    urgent: false,
  },
  {
    id: 14,
    title: "Regional Integration Research Assistant",
    columnist: "Dr. Nguyen Hoang",
    columnistImage: "/placeholder-14.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "2-5 years",
    description:
      "Support studies on ASEAN, SAARC, and regional trade and security organizations, analyzing integration challenges.",
    requirements: [
      "International Relations or Economics degree",
      "Knowledge of regional institutions",
      "Policy analysis skills",
      "Experience in research or think tanks",
    ],
    posted: "1 week ago",
    applicants: 26,
    urgent: false,
  },
  {
    id: 15,
    title: "Human Rights Policy Research Assistant",
    columnist: "Dr. Fatima Noor",
    columnistImage: "/placeholder-15.png",
    type: "Part-Time",
    location: "Part-Time",

    experience: "2-4 years",
    description:
      "Assist in research on human rights law, domestic cultural obligations, and international justice systems.",
    requirements: [
      "Law, Human Rights, or Political Science degree",
      "Strong policy research and drafting skills",
      "Knowledge of UN human rights framework",
      "Excellent communication skills",
    ],
    posted: "6 days ago",
    applicants: 18,
    urgent: true,
  },
];

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const selectedJob = jobId
    ? jobListings.find((job) => job.id === Number.parseInt(jobId))
    : null;

  const [formData, setFormData] = useState<ApplicationData>({
    fullName: "",
    dateOfBirth: "",
    workType: selectedJob?.type.toLowerCase().replace("-", "-") || "",
    areaOfExpertise: "",
    email: "",
    cv: null,
    additionalInfo: "",
    jobId: jobId || "",
    jobTitle: selectedJob?.title || "",
    columnist: selectedJob?.columnist || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedJob) {
      setFormData((prev) => ({
        ...prev,
        jobId: jobId || "",
        jobTitle: selectedJob.title,
        columnist: selectedJob.columnist,
        workType: selectedJob.type.toLowerCase().replace("-", "-"),
      }));
    }
  }, [selectedJob, jobId]);

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const applications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );
    const newApplication = {
      id: Date.now().toString(),
      ...formData,
      cvName: formData.cv?.name || "",
      status: "pending", // pending -> admin_approved -> hr_approved -> contacted
      adminStatus: "pending", // pending, approved, rejected
      hrStatus: "pending", // pending, approved, rejected, contacted
      submittedAt: new Date().toISOString(),
      adminReviewedAt: null,
      hrReviewedAt: null,
      adminNotes: "",
      hrNotes: "",
    };
    applications.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6 animate-bounce" />
              <h1 className="text-4xl font-bold text-slate-900 mb-4 animate-fade-in-up">
                Application Submitted!
              </h1>
              <p className="text-xl text-slate-600 mb-8 animate-fade-in-up animation-delay-200">
                Thank you for your interest in the {selectedJob?.title} position
                with {selectedJob?.columnist}. We'll review your application and
                get back to you within 5-7 business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
                <Link href="/jobs">
                  <Button
                    variant="outline"
                    className="transform hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    Browse More Jobs
                  </Button>
                </Link>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-emerald-600 hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300"
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 animate-fade-in-up">
              <Link
                href="/jobs"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Job Listings
              </Link>
            </div>

            {selectedJob ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-fade-in-up animation-delay-200">
                <div className="flex items-start gap-6">
                  <img
                    src={"/placeholder.svg"}
                    alt={selectedJob.columnist}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                      {selectedJob.title}
                    </h1>
                    <p className="text-xl text-emerald-600 font-semibold mb-4">
                      {selectedJob.columnist}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-800"
                      >
                        <Briefcase className="w-3 h-3 mr-1" />
                        {selectedJob.type}
                      </Badge>
                      {/* <Badge variant="outline">
                        <MapPin className="w-3 h-3 mr-1" />
                        {selectedJob.location}
                      </Badge> */}
                      {/* <Badge variant="outline">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {selectedJob.salary}
                      </Badge> */}
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center animate-fade-in-up">
                <h1 className="text-5xl font-bold text-slate-900 mb-6 text-balance">
                  Apply for Remote Assistant Position
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed text-pretty">
                  Join our network of talented professionals and work directly
                  with industry-leading columnists. Fill out the form below to
                  start your application process.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 shadow-xl animate-fade-in-up animation-delay-400">
              <CardContent className="pt-0">
                <h2 className="text-3xl font-bold mb-8 text-slate-900">
                  Application Form
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label
                      htmlFor="fullName"
                      className="text-base font-medium text-slate-700"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="Enter your full name"
                      required
                      className="mt-2"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <Label
                      htmlFor="dateOfBirth"
                      className="text-base font-medium text-slate-700"
                    >
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      required
                      className="mt-2"
                    />
                  </div>

                  {/* Work Type */}
                  <div>
                    <Label
                      htmlFor="workType"
                      className="text-base font-medium text-slate-700"
                    >
                      Preferred Work Type *
                    </Label>
                    <Select
                      value={formData.workType}
                      onValueChange={(value) =>
                        handleInputChange("workType", value)
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select work type preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Area of Expertise */}
                  <div>
                    <Label
                      htmlFor="areaOfExpertise"
                      className="text-base font-medium text-slate-700"
                    >
                      Area of Expertise *
                    </Label>
                    <Select
                      value={formData.areaOfExpertise}
                      onValueChange={(value) =>
                        handleInputChange("areaOfExpertise", value)
                      }
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your area of expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economic-analysis">
                          Economic Analysis
                        </SelectItem>
                        <SelectItem value="sustainable-development">
                          Sustainable Development
                        </SelectItem>
                        <SelectItem value="business-strategy">
                          Business Strategy
                        </SelectItem>
                        <SelectItem value="marketing-communications">
                          Marketing & Communications
                        </SelectItem>
                        <SelectItem value="research-analysis">
                          Research & Analysis
                        </SelectItem>
                        <SelectItem value="content-writing">
                          Content Writing
                        </SelectItem>
                        <SelectItem value="data-analysis">
                          Data Analysis
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Email */}
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-base font-medium text-slate-700"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@example.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <Label
                      htmlFor="cv"
                      className="text-base font-medium text-slate-700"
                    >
                      Upload CV/Resume *
                    </Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="cv"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {formData.cv ? (
                              <>
                                <FileText className="w-8 h-8 mb-2 text-emerald-600" />
                                <p className="text-sm text-slate-600 font-medium">
                                  {formData.cv.name}
                                </p>
                                <p className="text-xs text-slate-500">
                                  Click to change file
                                </p>
                              </>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 mb-2 text-slate-400" />
                                <p className="mb-2 text-sm text-slate-500">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-slate-500">
                                  PDF, DOC (MAX. 10MB)
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            id="cv"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            required
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <Label
                      htmlFor="additionalInfo"
                      className="text-base font-medium text-slate-700"
                    >
                      Additional Information (Optional)
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) =>
                        handleInputChange("additionalInfo", e.target.value)
                      }
                      placeholder="Tell us more about your experience, interests, or why you'd like to work with our columnists..."
                      rows={4}
                      className="mt-2"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-3 transform hover:scale-105 transition-all duration-300"
                    >
                      {isSubmitting
                        ? "Submitting Application..."
                        : "Submit Application"}
                    </Button>
                  </div>

                  <p className="text-sm text-slate-500 text-center">
                    By submitting this form, you agree to our{" "}
                    <a
                      href="/terms"
                      className="text-emerald-600 hover:underline"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and Privacy Policy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
