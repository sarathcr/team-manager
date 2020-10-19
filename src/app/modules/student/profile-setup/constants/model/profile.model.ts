import {
  EduCenter,
  UserData,
  Workplace,
} from 'src/app/modules/auth/constants/model/login.model'

export class ProfileStep {
  stepIndex: number
  value: AvailableSteps
}

export class CuriousStepData {
  name: string
  status: StepStatus
  assetUrl?: string
  currentStep?: boolean
  value: AvailableSteps
  valid: boolean
}

export interface EduCenterData {
  eduCenters: EduCenter[]
  eduCenter: EduCenter
  zipCode: string
}

export interface UserDetailsData {
  userFormData: UserData
  checkStepOneValidity: () => void
}

export interface ProfileFormData extends UserDetailsData, EduCenterData {
  workPlace: Workplace
  currentStep: ProfileStep
  profileStepData: CuriousStepData[]
  profileCompleted: boolean
}

export type StepStatus = 'PENDING' | 'INPROGRESS' | 'DONE'

export type AvailableSteps = 'USER_DETAILS' | 'EDUCATIONAL_CENTER' | 'WORKPLACE'
