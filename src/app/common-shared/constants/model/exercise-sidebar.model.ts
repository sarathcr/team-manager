export class Exercise {
  id: number
  name: string
  state: Status
}

export type Status = 'DEFAULT' | 'NOTIFICATION'
