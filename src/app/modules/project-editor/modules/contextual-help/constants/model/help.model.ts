export class Help {
  id: number
  body: string
  icon: string
  secondIcon: string
  title: string
}

export class ContextualHelp {
  helps: Help[]
  stepid: number
}
