/* Move the contents to shared module after implementing the cards change in teacher home page */
import { Option } from 'src/app/common-shared/constants/model/form-elements.model'
export class CardSort extends Option {
  type: CardSortType
}

export type CardSortType = 'openedAt' | 'updatedAt' | 'title' | 'createdAt'
