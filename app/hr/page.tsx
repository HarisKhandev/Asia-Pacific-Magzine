"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  FileText,
  Mail,
  Calendar,
  Briefcase,
  Phone,
  MessageSquare,
  UserCheck,
  Building,
  ArrowLeft,
  Send,
} from "lucide-react"
import Link from "next/link"

interface Application {
  id: string
  fullName: string
  dateOfBirth: string
  workType: string
  areaOfExpertise: string
  email: string
  cvName: string
  additionalInfo: string
  jobId?: string
  jobTitle?: string
  columnist?: string
  status: "pending" | "admin_approved" | "hr_approved" | "rejected" | "contacted"
  adminStatus: "pending" | "approved" | "rejected"
  hrStatus: "pending" | "approved" | "rejected" | "contacted"
  submittedAt: string
  adminReviewedAt?: string | null
  hrReviewedAt?: string | null
  adminNotes: string
  hrNotes: string
}

export default function HRPortal() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("pending")
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [hrNotes, setHrNotes] = useState("")
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [actionType, setActionType] = useState<"approve" | "reject" | "contact" | null>(null)
  const [contactMessage, setContactMessage] = useState("")

  useEffect(() => {
    // Load applications from localStorage - only show admin approved ones
    const storedApplications = JSON.parse(localStorage.getItem("applications") || "[]")
    const adminApprovedApplications = storedApplications.filter((app: Application) => app.adminStatus === "approved")
    setApplications(adminApprovedApplications)
    setFilteredApplications(adminApprovedApplications.filter((app: Application) => app.hrStatus === "pending"))
  }, [])

  useEffect(() => {
    // Filter applications based on search and status
    let filtered = applications

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.areaOfExpertise.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (app.jobTitle && app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (app.columnist && app.columnist.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.hrStatus === statusFilter)
    }

    setFilteredApplications(filtered)
  }, [applications, searchTerm, statusFilter])

  const updateApplicationStatus = (id: string, hrStatus: "approved" | "rejected" | "contacted", notes = "") => {
    const allApplications = JSON.parse(localStorage.getItem("applications") || "[]")
    const updatedApplications = allApplications.map((app: Application) => {
      if (app.id === id) {
        let newStatus = app.status
        if (hrStatus === "approved") newStatus = "hr_approved"
        if (hrStatus === "rejected") newStatus = "rejected"
        if (hrStatus === "contacted") newStatus = "contacted"

        return {
          ...app,
          hrStatus,
          status: newStatus,
          hrNotes: notes,
          hrReviewedAt: new Date().toISOString(),
        }
      }
      return app
    })

    localStorage.setItem("applications", JSON.stringify(updatedApplications))

    // Update local state
    const adminApprovedApplications = updatedApplications.filter((app: Application) => app.adminStatus === "approved")
    setApplications(adminApprovedApplications)

    if (selectedApplication?.id === id) {
      const updatedApp = adminApprovedApplications.find((app: Application) => app.id === id)
      setSelectedApplication(updatedApp || null)
    }

    setShowNotesModal(false)
    setHrNotes("")
    setContactMessage("")
    setActionType(null)
  }

  const handleActionClick = (type: "approve" | "reject" | "contact") => {
    setActionType(type)
    setShowNotesModal(true)
    if (type === "contact" && selectedApplication) {
      setContactMessage(
        `Dear ${selectedApplication.fullName},\n\nCongratulations! We are pleased to inform you that your application for the ${selectedApplication.jobTitle} position with ${selectedApplication.columnist} has been approved.\n\nWe would like to schedule an interview to discuss the next steps. Please reply to this email with your availability for the coming week.\n\nBest regards,\nHR Team\nAsia Pacific Magazine`,
      )
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      case "contacted":
        return <MessageSquare className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.hrStatus === "pending").length,
    approved: applications.filter((app) => app.hrStatus === "approved").length,
    contacted: applications.filter((app) => app.hrStatus === "contacted").length,
    rejected: applications.filter((app) => app.hrStatus === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg border-b border-slate-200 animate-fade-in-up">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admin
              </Link>
              <div className="h-6 w-px bg-slate-300"></div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">HR Portal</h1>
                <p className="text-slate-600 mt-1">Review approved applications and contact candidates</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">Asia Pacific Magazine</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Approved</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending HR Review</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-400">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Ready to Contact</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-600">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Contacted</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.contacted}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl animate-fade-in-up animation-delay-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Admin Approved Applications
                </CardTitle>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending HR Review</SelectItem>
                      <SelectItem value="approved">Ready to Contact</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="rejected">Rejected by HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {filteredApplications.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      {applications.length === 0
                        ? "No admin-approved applications yet"
                        : "No applications match your filters"}
                    </div>
                  ) : (
                    filteredApplications.map((application, index) => (
                      <div
                        key={application.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 animate-fade-in-up ${
                          selectedApplication?.id === application.id
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setSelectedApplication(application)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-slate-900">{application.fullName}</h3>
                          <Badge className={`${getStatusColor(application.hrStatus)} flex items-center gap-1`}>
                            {getStatusIcon(application.hrStatus)}
                            {application.hrStatus === "pending"
                              ? "Pending Review"
                              : application.hrStatus.charAt(0).toUpperCase() + application.hrStatus.slice(1)}
                          </Badge>
                        </div>

                        {application.jobTitle && (
                          <div className="mb-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {application.jobTitle}
                            </Badge>
                            {application.columnist && (
                              <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-200">
                                {application.columnist}
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="text-sm text-slate-600 space-y-1">
                          <p className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {application.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            {application.areaOfExpertise} • {application.workType}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Admin approved:{" "}
                            {application.adminReviewedAt
                              ? new Date(application.adminReviewedAt).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>

                        {application.adminNotes && (
                          <div className="mt-2 p-2 bg-green-50 rounded border border-green-200">
                            <p className="text-xs text-green-800 font-medium">Admin Notes:</p>
                            <p className="text-xs text-green-700">{application.adminNotes}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4 shadow-xl animate-fade-in-up animation-delay-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Application Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedApplication ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">{selectedApplication.fullName}</h3>
                      <Badge
                        className={`${getStatusColor(selectedApplication.hrStatus)} flex items-center gap-1 w-fit`}
                      >
                        {getStatusIcon(selectedApplication.hrStatus)}
                        {selectedApplication.hrStatus === "pending"
                          ? "Pending Review"
                          : selectedApplication.hrStatus.charAt(0).toUpperCase() +
                            selectedApplication.hrStatus.slice(1)}
                      </Badge>
                    </div>

                    {selectedApplication.jobTitle && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-1">Position Applied</h4>
                        <p className="text-blue-700 font-medium">{selectedApplication.jobTitle}</p>
                        {selectedApplication.columnist && (
                          <p className="text-blue-600 text-sm">with {selectedApplication.columnist}</p>
                        )}
                      </div>
                    )}

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">Email:</span>
                        <p className="text-slate-600 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {selectedApplication.email}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Phone:</span>
                        <p className="text-slate-600 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Contact via email
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Work Type:</span>
                        <p className="text-slate-600 capitalize">{selectedApplication.workType.replace("-", " ")}</p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">Expertise:</span>
                        <p className="text-slate-600 capitalize">
                          {selectedApplication.areaOfExpertise.replace("-", " ")}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">CV/Resume:</span>
                        <p className="text-slate-600 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {selectedApplication.cvName}
                        </p>
                      </div>
                    </div>

                    {selectedApplication.adminNotes && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-medium text-green-900 mb-1">Admin Notes</h4>
                        <p className="text-green-700 text-sm">{selectedApplication.adminNotes}</p>
                      </div>
                    )}

                    {selectedApplication.hrNotes && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-1">HR Notes</h4>
                        <p className="text-blue-700 text-sm">{selectedApplication.hrNotes}</p>
                      </div>
                    )}

                    {selectedApplication.hrStatus === "pending" && (
                      <div className="space-y-2 pt-4 border-t">
                        <Button
                          onClick={() => handleActionClick("approve")}
                          className="w-full bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve for Contact
                        </Button>
                        <Button
                          onClick={() => handleActionClick("reject")}
                          variant="destructive"
                          className="w-full transform hover:scale-105 transition-all duration-300"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject Application
                        </Button>
                      </div>
                    )}

                    {selectedApplication.hrStatus === "approved" && (
                      <div className="pt-4 border-t">
                        <Button
                          onClick={() => handleActionClick("contact")}
                          className="w-full bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Contact Candidate
                        </Button>
                      </div>
                    )}

                    {selectedApplication.hrStatus === "contacted" && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-800 text-sm font-medium">✓ Candidate Contacted</p>
                        <p className="text-blue-600 text-xs mt-1">
                          Contacted on{" "}
                          {selectedApplication.hrReviewedAt
                            ? new Date(selectedApplication.hrReviewedAt).toLocaleDateString()
                            : "N/A"}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Building className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>Select an application to review</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showNotesModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-4">
              {actionType === "approve"
                ? "Approve for Contact"
                : actionType === "reject"
                  ? "Reject Application"
                  : "Contact Candidate"}
            </h3>

            {actionType === "contact" ? (
              <div className="space-y-4">
                <p className="text-slate-600">
                  Send an email to {selectedApplication.fullName} at {selectedApplication.email}:
                </p>
                <div>
                  <Label htmlFor="contactMessage">Email Message</Label>
                  <Textarea
                    id="contactMessage"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={8}
                    className="mt-1"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-slate-600">
                  {actionType === "approve"
                    ? "Add any notes for this approval (optional):"
                    : "Please provide a reason for rejection:"}
                </p>
                <div>
                  <Label htmlFor="hrNotes">Notes</Label>
                  <Textarea
                    id="hrNotes"
                    value={hrNotes}
                    onChange={(e) => setHrNotes(e.target.value)}
                    placeholder={
                      actionType === "approve"
                        ? "Excellent candidate, proceed with interview..."
                        : "Reason for HR rejection..."
                    }
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <Button
                onClick={() =>
                  updateApplicationStatus(
                    selectedApplication.id,
                    actionType === "contact" ? "contacted" : actionType!,
                    actionType === "contact" ? contactMessage : hrNotes,
                  )
                }
                className={
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : actionType === "contact"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-red-600 hover:bg-red-700"
                }
              >
                {actionType === "approve" ? "Approve" : actionType === "contact" ? "Send Email" : "Reject"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNotesModal(false)
                  setHrNotes("")
                  setContactMessage("")
                  setActionType(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
