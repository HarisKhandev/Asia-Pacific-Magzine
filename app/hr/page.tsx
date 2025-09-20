"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HRPortal from "@/components/hr-portal";

export default function HRPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (userRole === "hr" && isLoggedIn === "true") {
      setIsAuthorized(true);
      // Initialize dummy data if not exists (same as admin)
      initializeDummyData();
    } else {
      router.push("/");
    }
  }, [router]);

  const initializeDummyData = () => {
    const existingApplications = localStorage.getItem("applications");
    if (!existingApplications) {
      const dummyApplications = [
        {
          id: "1",
          fullName: "John Smith",
          dateOfBirth: "1990-05-15",
          workType: "full-time",
          areaOfExpertise: "technology",
          email: "john.smith@email.com",
          cvName: "john_smith_cv.pdf",
          additionalInfo:
            "5 years experience in tech journalism, specialized in AI and machine learning coverage.",
          jobId: "tech-writer-001",
          jobTitle: "Senior Technology Writer",
          columnist: "Tech Innovations",
          status: "pending",
          adminStatus: "pending",
          hrStatus: "pending",
          submittedAt: "2024-01-15T10:30:00Z",
          adminNotes: "",
          hrNotes: "",
        },
        {
          id: "2",
          fullName: "Sarah Johnson",
          dateOfBirth: "1988-03-22",
          workType: "freelance",
          areaOfExpertise: "business",
          email: "sarah.johnson@email.com",
          cvName: "sarah_johnson_resume.pdf",
          additionalInfo:
            "MBA graduate with 7 years in business reporting, covered major IPOs and market analysis.",
          jobId: "business-writer-002",
          jobTitle: "Business Correspondent",
          columnist: "Market Watch",
          status: "admin_approved",
          adminStatus: "approved",
          hrStatus: "pending",
          submittedAt: "2024-01-14T14:20:00Z",
          adminReviewedAt: "2024-01-16T09:15:00Z",
          adminNotes:
            "Excellent background in business journalism. Strong portfolio.",
          hrNotes: "",
        },
        {
          id: "3",
          fullName: "Michael Chen",
          dateOfBirth: "1992-11-08",
          workType: "part-time",
          areaOfExpertise: "sports",
          email: "michael.chen@email.com",
          cvName: "michael_chen_cv.pdf",
          additionalInfo:
            "Former sports broadcaster, covered Olympics and World Cup events.",
          jobId: "sports-writer-003",
          jobTitle: "Sports Writer",
          columnist: "Sports Central",
          status: "rejected",
          adminStatus: "rejected",
          hrStatus: "pending",
          submittedAt: "2024-01-13T16:45:00Z",
          adminReviewedAt: "2024-01-15T11:30:00Z",
          adminNotes:
            "Overqualified for the position. Looking for senior roles.",
          hrNotes: "",
        },
        {
          id: "4",
          fullName: "Emily Rodriguez",
          dateOfBirth: "1995-07-12",
          workType: "full-time",
          areaOfExpertise: "lifestyle",
          email: "emily.rodriguez@email.com",
          cvName: "emily_rodriguez_portfolio.pdf",
          additionalInfo:
            "Social media influencer turned journalist, expertise in lifestyle and wellness content.",
          jobId: "lifestyle-writer-004",
          jobTitle: "Lifestyle Editor",
          columnist: "Living Well",
          status: "hr_approved",
          adminStatus: "approved",
          hrStatus: "approved",
          submittedAt: "2024-01-12T09:00:00Z",
          adminReviewedAt: "2024-01-14T15:20:00Z",
          hrReviewedAt: "2024-01-17T10:45:00Z",
          adminNotes:
            "Great fit for lifestyle content. Strong social media presence.",
          hrNotes: "Approved for interview. Scheduling for next week.",
        },
        {
          id: "5",
          fullName: "David Kim",
          dateOfBirth: "1987-09-30",
          workType: "freelance",
          areaOfExpertise: "politics",
          email: "david.kim@email.com",
          cvName: "david_kim_cv.pdf",
          additionalInfo:
            "Political science PhD, 8 years covering government and policy for major publications.",
          jobId: "politics-writer-005",
          jobTitle: "Political Correspondent",
          columnist: "Policy Watch",
          status: "contacted",
          adminStatus: "approved",
          hrStatus: "contacted",
          submittedAt: "2024-01-11T13:15:00Z",
          adminReviewedAt: "2024-01-13T08:30:00Z",
          hrReviewedAt: "2024-01-16T14:20:00Z",
          adminNotes: "Exceptional credentials in political journalism.",
          hrNotes: "Contacted for interview. Very promising candidate.",
        },
      ];
      localStorage.setItem("applications", JSON.stringify(dummyApplications));
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <HRPortal />;
}
