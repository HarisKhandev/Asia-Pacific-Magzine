"use client"

import type React from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, CheckCircle, ArrowLeft, Briefcase, MapPin, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface ApplicationData {
  fullName: string
  dateOfBirth: string
  workType: string
  areaOfExpertise: string
  email: string
  cv: File | null
  additionalInfo: string
  jobId?: string
  jobTitle?: string
  columnist?: string
}

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
  },
]

export default function ApplyPage() {
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId")

  const selectedJob = jobId ? jobListings.find((job) => job.id === Number.parseInt(jobId)) : null

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
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (selectedJob) {
      setFormData((prev) => ({
        ...prev,
        jobId: jobId || "",
        jobTitle: selectedJob.title,
        columnist: selectedJob.columnist,
        workType: selectedJob.type.toLowerCase().replace("-", "-"),
      }))
    }
  }, [selectedJob, jobId])

  const handleInputChange = (field: keyof ApplicationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, cv: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const applications = JSON.parse(localStorage.getItem("applications") || "[]")
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
    }
    applications.push(newApplication)
    localStorage.setItem("applications", JSON.stringify(applications))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6 animate-bounce" />
              <h1 className="text-4xl font-bold text-slate-900 mb-4 animate-fade-in-up">Application Submitted!</h1>
              <p className="text-xl text-slate-600 mb-8 animate-fade-in-up animation-delay-200">
                Thank you for your interest in the {selectedJob?.title} position with {selectedJob?.columnist}. We'll
                review your application and get back to you within 5-7 business days.
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
    )
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
                    src={selectedJob.columnistImage || "/placeholder.svg"}
                    alt={selectedJob.columnist}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedJob.title}</h1>
                    <p className="text-xl text-emerald-600 font-semibold mb-4">{selectedJob.columnist}</p>

                    <div className="flex flex-wrap gap-3 mb-4">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {selectedJob.type}
                      </Badge>
                      <Badge variant="outline">
                        <MapPin className="w-3 h-3 mr-1" />
                        {selectedJob.location}
                      </Badge>
                      <Badge variant="outline">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {selectedJob.salary}
                      </Badge>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{selectedJob.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center animate-fade-in-up">
                <h1 className="text-5xl font-bold text-slate-900 mb-6 text-balance">
                  Apply for Remote Assistant Position
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed text-pretty">
                  Join our network of talented professionals and work directly with industry-leading columnists. Fill
                  out the form below to start your application process.
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
                <h2 className="text-3xl font-bold mb-8 text-slate-900">Application Form</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-base font-medium text-slate-700">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="mt-2"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <Label htmlFor="dateOfBirth" className="text-base font-medium text-slate-700">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>

                  {/* Work Type */}
                  <div>
                    <Label htmlFor="workType" className="text-base font-medium text-slate-700">
                      Preferred Work Type *
                    </Label>
                    <Select value={formData.workType} onValueChange={(value) => handleInputChange("workType", value)}>
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
                    <Label htmlFor="areaOfExpertise" className="text-base font-medium text-slate-700">
                      Area of Expertise *
                    </Label>
                    <Select
                      value={formData.areaOfExpertise}
                      onValueChange={(value) => handleInputChange("areaOfExpertise", value)}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your area of expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economic-analysis">Economic Analysis</SelectItem>
                        <SelectItem value="technology-innovation">Technology Innovation</SelectItem>
                        <SelectItem value="sustainable-development">Sustainable Development</SelectItem>
                        <SelectItem value="business-strategy">Business Strategy</SelectItem>
                        <SelectItem value="marketing-communications">Marketing & Communications</SelectItem>
                        <SelectItem value="research-analysis">Research & Analysis</SelectItem>
                        <SelectItem value="project-management">Project Management</SelectItem>
                        <SelectItem value="content-writing">Content Writing</SelectItem>
                        <SelectItem value="data-analysis">Data Analysis</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-base font-medium text-slate-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="mt-2"
                    />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <Label htmlFor="cv" className="text-base font-medium text-slate-700">
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
                                <p className="text-sm text-slate-600 font-medium">{formData.cv.name}</p>
                                <p className="text-xs text-slate-500">Click to change file</p>
                              </>
                            ) : (
                              <>
                                <Upload className="w-8 h-8 mb-2 text-slate-400" />
                                <p className="mb-2 text-sm text-slate-500">
                                  <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-slate-500">PDF, DOC, DOCX (MAX. 10MB)</p>
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
                    <Label htmlFor="additionalInfo" className="text-base font-medium text-slate-700">
                      Additional Information (Optional)
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
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
                      {isSubmitting ? "Submitting Application..." : "Submit Application"}
                    </Button>
                  </div>

                  <p className="text-sm text-slate-500 text-center">
                    By submitting this form, you agree to our{" "}
                    <a href="/terms" className="text-emerald-600 hover:underline">
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
  )
}
