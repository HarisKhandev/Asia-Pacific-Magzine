"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, DollarSign, Users, Search, Filter, Briefcase, Star } from "lucide-react"
import Link from "next/link"

const jobListings = [
  {
    id: 1,
    title: "Economic Research Assistant",
    columnist: "Dr. Sarah Chen",
    columnistImage: "/placeholder-4dlqp.png",
    type: "Full-time",
    location: "Remote",
    salary: "$45,000 - $60,000",
    experience: "2-4 years",
    description:
      "Support economic analysis and research for Asia Pacific markets. Assist with data collection, report writing, and market trend analysis.",
    requirements: [
      "Bachelor's in Economics or Finance",
      "Strong analytical skills",
      "Experience with data analysis tools",
      "Excellent written communication",
    ],
    posted: "2 days ago",
    applicants: 23,
    urgent: false,
  },
  {
    id: 2,
    title: "Technology Content Assistant",
    columnist: "Michael Tanaka",
    columnistImage: "/placeholder-b9jjg.png",
    type: "Part-time",
    location: "Remote",
    salary: "$25,000 - $35,000",
    experience: "1-3 years",
    description:
      "Help create engaging technology content, research emerging trends, and assist with startup coverage across the Asia Pacific region.",
    requirements: [
      "Background in Technology or Journalism",
      "Social media savvy",
      "Research skills",
      "Understanding of startup ecosystem",
    ],
    posted: "1 day ago",
    applicants: 31,
    urgent: true,
  },
  {
    id: 3,
    title: "Sustainability Research Coordinator",
    columnist: "Dr. Priya Sharma",
    columnistImage: "/placeholder-63lut.png",
    type: "Full-time",
    location: "Remote",
    salary: "$40,000 - $55,000",
    experience: "2-5 years",
    description:
      "Coordinate sustainability research projects, analyze environmental policies, and support green business initiative coverage.",
    requirements: [
      "Environmental Science or related degree",
      "Policy analysis experience",
      "Project management skills",
      "Passion for sustainability",
    ],
    posted: "3 days ago",
    applicants: 18,
    urgent: false,
  },
  {
    id: 4,
    title: "Business Strategy Assistant",
    columnist: "James Liu",
    columnistImage: "/placeholder-be0ae.png",
    type: "Full-time",
    location: "Remote",
    salary: "$50,000 - $65,000",
    experience: "3-5 years",
    description:
      "Support strategic business analysis, market research, and consulting project coordination for enterprise clients.",
    requirements: [
      "MBA or Business degree preferred",
      "Consulting experience",
      "Strategic thinking",
      "Client communication skills",
    ],
    posted: "1 week ago",
    applicants: 42,
    urgent: false,
  },
  {
    id: 5,
    title: "Digital Marketing Assistant",
    columnist: "Dr. Sarah Chen",
    columnistImage: "/placeholder-4dlqp.png",
    type: "Part-time",
    location: "Remote",
    salary: "$20,000 - $30,000",
    experience: "1-2 years",
    description:
      "Manage social media presence, create marketing content, and support digital outreach for economic insights publication.",
    requirements: [
      "Marketing or Communications background",
      "Social media expertise",
      "Content creation skills",
      "Analytics knowledge",
    ],
    posted: "4 days ago",
    applicants: 27,
    urgent: true,
  },
  {
    id: 6,
    title: "Research Data Analyst",
    columnist: "Michael Tanaka",
    columnistImage: "/placeholder-b9jjg.png",
    type: "Full-time",
    location: "Remote",
    salary: "$55,000 - $70,000",
    experience: "3-6 years",
    description:
      "Analyze technology trends data, create visualizations, and support data-driven journalism for tech coverage.",
    requirements: [
      "Statistics or Data Science degree",
      "Python/R proficiency",
      "Data visualization skills",
      "Tech industry knowledge",
    ],
    posted: "5 days ago",
    applicants: 35,
    urgent: false,
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterColumnist, setFilterColumnist] = useState("all")

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.columnist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || job.type.toLowerCase() === filterType.toLowerCase()
    const matchesColumnist = filterColumnist === "all" || job.columnist === filterColumnist

    return matchesSearch && matchesType && matchesColumnist
  })

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
              Remote Career Opportunities
              <span className="text-emerald-600"> in Asia Pacific</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed text-pretty animate-fade-in-up animation-delay-200">
              Discover exciting remote positions working alongside industry experts and thought leaders.
            </p>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search jobs, columnists, or keywords..."
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
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterColumnist} onValueChange={setFilterColumnist}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Columnist" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Columnists</SelectItem>
                    <SelectItem value="Dr. Sarah Chen">Dr. Sarah Chen</SelectItem>
                    <SelectItem value="Michael Tanaka">Michael Tanaka</SelectItem>
                    <SelectItem value="Dr. Priya Sharma">Dr. Priya Sharma</SelectItem>
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
              <h2 className="text-2xl font-bold text-slate-900">Available Positions</h2>
              <p className="text-slate-600">{filteredJobs.length} opportunities found</p>
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
                className={`hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up group ${job.urgent ? "ring-2 ring-orange-200" : ""}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.columnistImage || "/placeholder.svg"}
                        alt={job.columnist}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors duration-300">
                          {job.title}
                        </CardTitle>
                        <p className="text-slate-600 font-medium">{job.columnist}</p>
                      </div>
                    </div>
                    {job.urgent && (
                      <Badge variant="destructive" className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                        <Star className="w-3 h-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                      <Briefcase className="w-3 h-3 mr-1" />
                      {job.type}
                    </Badge>
                    <Badge variant="outline">
                      <MapPin className="w-3 h-3 mr-1" />
                      {job.location}
                    </Badge>
                    <Badge variant="outline">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {job.salary}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-slate-600 mb-4 line-clamp-3">{job.description}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 mb-2">Key Requirements:</h4>
                      <div className="flex flex-wrap gap-1">
                        {job.requirements.slice(0, 2).map((req, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
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
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
              <p className="text-slate-600">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
