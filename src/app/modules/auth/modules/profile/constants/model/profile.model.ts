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

export type StepStatus = 'PENDING' | 'INPROGRESS' | 'DONE'

export type AvailableSteps = 'USER_DETAILS' | 'EDUCATIONAL_CENTER' | 'WORKPLACE'
