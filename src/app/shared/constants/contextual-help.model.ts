export interface Help {
  id: number
  title: string
  icon: string
  secondIcon: string
  body: string
}
export interface ContextualHelp {
  stepid: number
  helps: Help[]
}
