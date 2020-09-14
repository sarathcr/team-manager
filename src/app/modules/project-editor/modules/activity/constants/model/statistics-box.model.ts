export type StatisticsVariant = 'resume' | 'chart'

export interface Box {
  supertitle?: string
  icon?: string
  title: string
  phases?: Phase[]
  infoText?: string
  actionValue?: string
  actionValueUnit?: string
  chartText?: string
  charDoubleValue?: ChartDouble
  progress?: number
  hasValue?: boolean
}

interface Phase {
  total: number
  text: string
}

interface ChartDouble {
  current: string
  total: string
}
