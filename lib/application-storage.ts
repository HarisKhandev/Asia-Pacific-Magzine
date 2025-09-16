export interface Application {
  id: string
  fullName: string
  dateOfBirth: string
  workType: string
  areaOfExpertise: string
  email: string
  cvName: string
  additionalInfo: string
  status: "pending" | "accepted" | "rejected"
  submittedAt: string
}

export class ApplicationStorage {
  private static readonly STORAGE_KEY = "applications"

  static getApplications(): Application[] {
    if (typeof window === "undefined") return []
    const stored = localStorage.getItem(this.STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  static saveApplication(application: Omit<Application, "id" | "submittedAt" | "status">): Application {
    const newApplication: Application = {
      ...application,
      id: Date.now().toString(),
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    const applications = this.getApplications()
    applications.push(newApplication)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(applications))

    return newApplication
  }

  static updateApplicationStatus(id: string, status: "accepted" | "rejected"): boolean {
    const applications = this.getApplications()
    const index = applications.findIndex((app) => app.id === id)

    if (index === -1) return false

    applications[index].status = status
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(applications))

    return true
  }

  static getApplicationById(id: string): Application | null {
    const applications = this.getApplications()
    return applications.find((app) => app.id === id) || null
  }

  static deleteApplication(id: string): boolean {
    const applications = this.getApplications()
    const filtered = applications.filter((app) => app.id !== id)

    if (filtered.length === applications.length) return false

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
    return true
  }
}
