export class Help {
  ContextualHelp: {
    id: number
    title: string
    icon: string
    body: string
  }
}
export class ContextualHelp {
  stepid: number
  name: string
  help: Help
}
