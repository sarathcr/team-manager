export class Help {
  ContextualHelp: {
    id: number
    title: string
    icon: string
    body: string
  }
}
export class ContextualHelp {
  id: number
  name: string
  help: Help
}
