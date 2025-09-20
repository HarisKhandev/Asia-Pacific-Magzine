"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  FileText,
  Mail,
  Calendar,
  Briefcase,
  ArrowRight,
  Eye,
  UserCheck,
  Building,
  Lock,
  Plus,
  MapPin,
  DollarSign,
  X,
} from "lucide-react";
import Link from "next/link";

interface Application {
  id: string;
  fullName: string;
  dateOfBirth: string;
  workType: string;
  areaOfExpertise: string;
  email: string;
  cvName: string;
  additionalInfo: string;
  jobId?: string;
  jobTitle?: string;
  columnist?: string;
  status:
    | "pending"
    | "admin_approved"
    | "hr_approved"
    | "rejected"
    | "contacted";
  adminStatus: "pending" | "approved" | "rejected";
  hrStatus: "pending" | "approved" | "rejected" | "contacted";
  submittedAt: string;
  adminReviewedAt?: string | null;
  hrReviewedAt?: string | null;
  adminNotes: string;
  hrNotes: string;
}

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  postedAt: string;
  status: "active" | "closed";
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );

  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [showJobPostModal, setShowJobPostModal] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "",
    location: "",
    type: "full-time",
    salary: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
  });

  useEffect(() => {
    // Load applications from localStorage
    const storedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );
    // Migrate old applications to new format
    const migratedApplications = storedApplications.map((app: any) => ({
      ...app,
      adminStatus:
        app.adminStatus ||
        (app.status === "accepted"
          ? "approved"
          : app.status === "rejected"
          ? "rejected"
          : "pending"),
      hrStatus: app.hrStatus || "pending",
      adminNotes: app.adminNotes || "",
      hrNotes: app.hrNotes || "",
      adminReviewedAt: app.adminReviewedAt || null,
      hrReviewedAt: app.hrReviewedAt || null,
    }));
    setApplications(migratedApplications);
    setFilteredApplications(migratedApplications);

    const storedJobPostings = JSON.parse(
      localStorage.getItem("jobPostings") || "[]"
    );
    setJobPostings(storedJobPostings);
  }, []);

  useEffect(() => {
    // Filter applications based on search and status
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.areaOfExpertise
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (app.jobTitle &&
            app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (app.columnist &&
            app.columnist.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.adminStatus === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter]);

  const handleJobFormChange = (field: string, value: string) => {
    setJobForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleJobPost = () => {
    if (
      !jobForm.title ||
      !jobForm.department ||
      !jobForm.description ||
      !jobForm.requirements
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const newJobPosting: JobPosting = {
      id: Date.now().toString(),
      ...jobForm,
      postedAt: new Date().toISOString(),
      status: "active",
    };

    const updatedJobPostings = [...jobPostings, newJobPosting];
    setJobPostings(updatedJobPostings);
    localStorage.setItem("jobPostings", JSON.stringify(updatedJobPostings));

    // Reset form and close modal
    setJobForm({
      title: "",
      department: "",
      location: "",
      type: "full-time",
      salary: "",
      description: "",
      requirements: "",
      responsibilities: "",
      benefits: "",
    });
    setShowJobPostModal(false);
  };

  const deleteJobPosting = (id: string) => {
    const updatedJobPostings = jobPostings.filter((job) => job.id !== id);
    setJobPostings(updatedJobPostings);
    localStorage.setItem("jobPostings", JSON.stringify(updatedJobPostings));
  };

  const updateApplicationStatus = (
    id: string,
    adminStatus: "approved" | "rejected",
    notes = ""
  ) => {
    const updatedApplications = applications.map((app) => {
      if (app.id === id) {
        const newStatus: Application["status"] =
          adminStatus === "approved" ? "admin_approved" : "rejected";
        return {
          ...app,
          adminStatus,
          status: newStatus,
          adminNotes: notes,
          adminReviewedAt: new Date().toISOString(),
        };
      }
      return app;
    });

    setApplications(updatedApplications);
    localStorage.setItem("applications", JSON.stringify(updatedApplications));

    if (selectedApplication?.id === id) {
      const updatedApp = updatedApplications.find((app) => app.id === id);
      if (updatedApp) {
        setSelectedApplication({
          ...updatedApp,
          status: updatedApp.status as Application["status"],
        });
      } else {
        setSelectedApplication(null);
      }
    }

    setShowNotesModal(false);
    setAdminNotes("");
    setActionType(null);
  };

  const handleActionClick = (type: "approve" | "reject") => {
    setActionType(type);
    setShowNotesModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getOverallStatusBadge = (app: Application) => {
    if (app.adminStatus === "rejected") {
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          Rejected by Admin
        </Badge>
      );
    }
    if (app.adminStatus === "pending") {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Pending Admin Review
        </Badge>
      );
    }
    if (app.adminStatus === "approved" && app.hrStatus === "pending") {
      return (
        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          Pending HR Review
        </Badge>
      );
    }
    if (app.hrStatus === "approved") {
      return (
        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
          Ready for Contact
        </Badge>
      );
    }
    if (app.hrStatus === "contacted") {
      return (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Contacted
        </Badge>
      );
    }
    if (app.hrStatus === "rejected") {
      return (
        <Badge className="bg-red-100 text-red-800 border-red-200">
          Rejected by HR
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-800 border-gray-200">
        Unknown Status
      </Badge>
    );
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.adminStatus === "pending").length,
    approved: applications.filter((app) => app.adminStatus === "approved")
      .length,
    rejected: applications.filter((app) => app.adminStatus === "rejected")
      .length,
    hrPending: applications.filter(
      (app) => app.adminStatus === "approved" && app.hrStatus === "pending"
    ).length,
    activeJobs: jobPostings.filter((job) => job.status === "active").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-lg border-b border-slate-200 animate-fade-in-up">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Review and manage job applications
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setShowJobPostModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Job Post
              </Button>
              <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Building className="w-4 h-4" />
                HR Portal
              </Link>
              <Button
                onClick={() => {
                  localStorage.removeItem("userRole");
                  localStorage.removeItem("isLoggedIn");
                  window.location.href = "/login";
                }}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Logout
              </Button>
              <div className="text-sm text-slate-600">
                Asia Pacific Magazine
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Applications
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Pending Review
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-400">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Admin Approved
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {stats.approved}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-600">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Awaiting HR
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {stats.hrPending}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">
                    {stats.rejected}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up animation-delay-1000">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Active Jobs
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {stats.activeJobs}
                  </p>
                </div>
                <Briefcase className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {jobPostings.length > 0 && (
          <Card className="mb-8 shadow-xl animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Active Job Postings ({jobPostings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobPostings.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-slate-900">
                        {job.title}
                      </h3>
                      <Button
                        onClick={() => deleteJobPosting(job.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        {job.department}
                      </p>
                      {job.location && (
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </p>
                      )}
                      {job.salary && (
                        <p className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Posted: {new Date(job.postedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                      {job.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-xl animate-fade-in-up animation-delay-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Applications
                </CardTitle>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search by name, email, job, or columnist..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {filteredApplications.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      {applications.length === 0
                        ? "No applications yet"
                        : "No applications match your filters"}
                    </div>
                  ) : (
                    filteredApplications.map((application, index) => (
                      <div
                        key={application.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 animate-fade-in-up ${
                          selectedApplication?.id === application.id
                            ? "border-emerald-500 bg-emerald-50 shadow-lg"
                            : "border-slate-200 hover:border-emerald-300"
                        }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => setSelectedApplication(application)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-slate-900">
                            {application.fullName}
                          </h3>
                          {getOverallStatusBadge(application)}
                        </div>

                        {application.jobTitle && (
                          <div className="mb-2">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {application.jobTitle}
                            </Badge>
                            {application.columnist && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-purple-50 text-purple-700 border-purple-200"
                              >
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
                            {application.areaOfExpertise} •{" "}
                            {application.workType}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Applied:{" "}
                            {new Date(
                              application.submittedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        {/* Workflow Progress */}
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <div className="flex items-center gap-2 text-xs">
                            <div
                              className={`flex items-center gap-1 px-2 py-1 rounded ${getStatusColor(
                                application.adminStatus
                              )}`}
                            >
                              {getStatusIcon(application.adminStatus)}
                              Admin
                            </div>
                            <ArrowRight className="w-3 h-3 text-slate-400" />
                            <div
                              className={`flex items-center gap-1 px-2 py-1 rounded ${
                                application.adminStatus === "approved"
                                  ? getStatusColor(application.hrStatus)
                                  : "bg-gray-100 text-gray-400 border-gray-200"
                              }`}
                            >
                              {application.adminStatus === "approved" ? (
                                getStatusIcon(application.hrStatus)
                              ) : (
                                <Clock className="w-3 h-3" />
                              )}
                              HR
                            </div>
                          </div>
                        </div>
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
                  <Eye className="w-5 h-5" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedApplication ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 mb-2">
                        {selectedApplication.fullName}
                      </h3>
                      {getOverallStatusBadge(selectedApplication)}
                    </div>

                    {selectedApplication.jobTitle && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-1">
                          Applied Position
                        </h4>
                        <p className="text-blue-700 font-medium">
                          {selectedApplication.jobTitle}
                        </p>
                        {selectedApplication.columnist && (
                          <p className="text-blue-600 text-sm">
                            with {selectedApplication.columnist}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-slate-700">
                          Email:
                        </span>
                        <p className="text-slate-600">
                          {selectedApplication.email}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">
                          Date of Birth:
                        </span>
                        <p className="text-slate-600">
                          {new Date(
                            selectedApplication.dateOfBirth
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">
                          Work Type:
                        </span>
                        <p className="text-slate-600 capitalize">
                          {selectedApplication.workType.replace("-", " ")}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">
                          Area of Expertise:
                        </span>
                        <p className="text-slate-600 capitalize">
                          {selectedApplication.areaOfExpertise.replace(
                            "-",
                            " "
                          )}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-slate-700">
                          CV/Resume:
                        </span>
                        <p className="text-slate-600 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {selectedApplication.cvName}
                        </p>
                      </div>
                      {selectedApplication.additionalInfo && (
                        <div>
                          <span className="font-medium text-slate-700">
                            Additional Information:
                          </span>
                          <p className="text-slate-600 mt-1 p-2 bg-slate-50 rounded">
                            {selectedApplication.additionalInfo}
                          </p>
                        </div>
                      )}
                      <div>
                        <span className="font-medium text-slate-700">
                          Submitted:
                        </span>
                        <p className="text-slate-600">
                          {new Date(
                            selectedApplication.submittedAt
                          ).toLocaleString()}
                        </p>
                      </div>

                      {selectedApplication.adminReviewedAt && (
                        <div>
                          <span className="font-medium text-slate-700">
                            Admin Reviewed:
                          </span>
                          <p className="text-slate-600">
                            {new Date(
                              selectedApplication.adminReviewedAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      )}

                      {selectedApplication.adminNotes && (
                        <div>
                          <span className="font-medium text-slate-700">
                            Admin Notes:
                          </span>
                          <p className="text-slate-600 mt-1 p-2 bg-slate-50 rounded">
                            {selectedApplication.adminNotes}
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedApplication.adminStatus === "pending" && (
                      <div className="flex gap-2 pt-4 border-t">
                        <Button
                          onClick={() => handleActionClick("approve")}
                          className="flex-1 bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleActionClick("reject")}
                          variant="destructive"
                          className="flex-1 transform hover:scale-105 transition-all duration-300"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}

                    {selectedApplication.adminStatus === "approved" && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-green-800 text-sm font-medium">
                          ✓ Approved by Admin
                        </p>
                        <p className="text-green-600 text-xs mt-1">
                          Application forwarded to HR for final review
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>Select an application to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showJobPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 my-8 animate-fade-in-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Post New Job</h3>
              <Button
                onClick={() => setShowJobPostModal(false)}
                variant="ghost"
                size="sm"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={jobForm.title}
                    onChange={(e) =>
                      handleJobFormChange("title", e.target.value)
                    }
                    placeholder="e.g. Senior Software Engineer"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    value={jobForm.department}
                    onChange={(e) =>
                      handleJobFormChange("department", e.target.value)
                    }
                    placeholder="e.g. Engineering"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={jobForm.location}
                    onChange={(e) =>
                      handleJobFormChange("location", e.target.value)
                    }
                    placeholder="e.g. Remote, New York"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Job Type</Label>
                  <Select
                    value={jobForm.type}
                    onValueChange={(value) =>
                      handleJobFormChange("type", value)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salary">Salary Range</Label>
                  <Input
                    id="salary"
                    value={jobForm.salary}
                    onChange={(e) =>
                      handleJobFormChange("salary", e.target.value)
                    }
                    placeholder="e.g. $80,000 - $120,000"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={jobForm.description}
                  onChange={(e) =>
                    handleJobFormChange("description", e.target.value)
                  }
                  placeholder="Describe the role, company culture, and what makes this position exciting..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements *</Label>
                <Textarea
                  id="requirements"
                  value={jobForm.requirements}
                  onChange={(e) =>
                    handleJobFormChange("requirements", e.target.value)
                  }
                  placeholder="List required skills, experience, education, certifications..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  value={jobForm.responsibilities}
                  onChange={(e) =>
                    handleJobFormChange("responsibilities", e.target.value)
                  }
                  placeholder="Outline main duties and responsibilities..."
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="benefits">Benefits & Perks</Label>
                <Textarea
                  id="benefits"
                  value={jobForm.benefits}
                  onChange={(e) =>
                    handleJobFormChange("benefits", e.target.value)
                  }
                  placeholder="Health insurance, retirement plans, flexible work, professional development..."
                  rows={3}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t">
              <Button
                onClick={handleJobPost}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Post Job
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowJobPostModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {showNotesModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-4">
              {actionType === "approve"
                ? "Approve Application"
                : "Reject Application"}
            </h3>
            <p className="text-slate-600 mb-4">
              {actionType === "approve"
                ? "Add any notes for HR review (optional):"
                : "Please provide a reason for rejection:"}
            </p>
            <div className="mb-4">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder={
                  actionType === "approve"
                    ? "Strong candidate, good experience..."
                    : "Reason for rejection..."
                }
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() =>
                  updateApplicationStatus(
                    selectedApplication.id,
                    actionType === "approve" ? "approved" : "rejected",
                    adminNotes
                  )
                }
                className={
                  actionType === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              >
                {actionType === "approve" ? "Approve" : "Reject"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowNotesModal(false);
                  setAdminNotes("");
                  setActionType(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
