import { List } from 'src/app/common-shared/constants/model/form-elements.model'

export class TeachingStrategy extends List {
  description?: string
  type?: string
}

export class StudentGroup extends List {
  description?: string
  type?: string
}
export class CustomTeachingStrategy extends List {
  type?: string
}

export class CustomStudentGroup extends List {
  type?: string
}

export class Contents extends List {}

export class Standards extends List {}

export class Item extends List {
  type?: string
}

export class Objectives extends List {
  index?: number
  standards?: Standards[]
  customStandards?: Standards[]
}
