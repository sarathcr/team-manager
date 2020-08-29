import { Component, EventEmitter, Input, Output } from '@angular/core'
import {
  Box,
  StatisticsVariant,
} from '../../constants/model/statistics-box.model'

@Component({
  selector: 'app-statistics-box',
  templateUrl: './statistics-box.component.html',
  styleUrls: ['./statistics-box.component.scss'],
})
export class StatisticsBoxComponent {
  @Input() variant: StatisticsVariant
  @Input() data: Box
  @Output() action: EventEmitter<any> = new EventEmitter()
  rotation = '-91'

  constructor() {}

  transformPercentage(percentage: number): string {
    return -95 + percentage * 0.95 + ''
  }

  getIconClass(icon: string): string {
    return icon ? 'icon-ic_' + icon : ''
  }

  updateInfo(data: Box): void {
    this.action.emit(data)
  }
}
