export interface StudentActivityRP {
  done: StudentActivities
  experienceTitle: string
  experienceType: string
  pending: StudentActivities
  studentId?: number
  projectId?: number
  creativeImage?: string
}
export interface StudentActivities {
  activities: StudentActivity[]
  total: number
}
export interface StudentActivity {
  begin: string
  end: string
  modality: string
  name: string
  state: string
}
