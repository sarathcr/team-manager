export interface Help {
  id: number
  title: string
  icon: string
  body: string
}
export interface ContextualHelp {
  id: number
  help: Help[]
}
