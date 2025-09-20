"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  MapPin,
  DollarSign,
  Users,
  Search,
  Filter,
  Briefcase,
  Star,
} from "lucide-react";
import Link from "next/link";

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

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterColumnist, setFilterColumnist] = useState("all");

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.columnist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" ||
      job.type.toLowerCase() === filterType.toLowerCase();
    const matchesColumnist =
      filterColumnist === "all" || job.columnist === filterColumnist;

    return matchesSearch && matchesType && matchesColumnist;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-balance animate-fade-in-up">
              Career Opportunities
              <span className="text-emerald-600"> in Physiograph</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed text-pretty animate-fade-in-up animation-delay-200">
              Discover exciting remote positions working alongside global
              experts and thought leaders.
            </p>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Part-Time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filterColumnist}
                  onValueChange={setFilterColumnist}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Columnist" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Columnists</SelectItem>
                    <SelectItem value="Dr. Sarah Chen">
                      Dr. Sarah Chen
                    </SelectItem>
                    <SelectItem value="Michael Tanaka">
                      Michael Tanaka
                    </SelectItem>
                    <SelectItem value="Dr. Priya Sharma">
                      Dr. Priya Sharma
                    </SelectItem>
                    <SelectItem value="James Liu">James Liu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Available Positions
              </h2>
              <p className="text-slate-600">
                {filteredJobs.length} opportunities found
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Filter className="w-4 h-4" />
              <span>Sorted by: Most Recent</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job, index) => (
              <Card
                key={job.id}
                className={`hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up group ${
                  job.urgent ? "ring-2 ring-orange-200" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={"/placeholder.svg"}
                        alt={job.columnist}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors duration-300">
                          {job.title}
                        </CardTitle>
                        <p className="text-slate-600 font-medium">
                          {job.columnist}
                        </p>
                      </div>
                    </div>
                    {job.urgent && (
                      <Badge
                        variant="destructive"
                        className="bg-orange-100 text-orange-800 hover:bg-orange-200"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800"
                    >
                      <Briefcase className="w-3 h-3 mr-1" />
                      {job.type}
                    </Badge>
                    {/* <Badge variant="outline">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.location}
                    </Badge> */}
                    {/* <Badge variant="outline">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {job.salary}
                    </Badge> */}
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 mb-2">
                        Key Requirements:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {job.requirements.slice(0, 2).map((req, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.requirements.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.posted}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.applicants} applicants
                      </div>
                    </div>

                    <Link href={`/apply?jobId=${job.id}`}>
                      <Button className="bg-emerald-600 hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                No jobs found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
