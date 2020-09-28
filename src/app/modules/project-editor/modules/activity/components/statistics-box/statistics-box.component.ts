import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EditorService } from 'src/app/modules/project-editor/services/editor/editor.service'
import {
  Box,
  StatisticsVariant,
} from '../../constants/model/statistics-box.model'

@Component({
  selector: 'app-statistics-box',
  templateUrl: './statistics-box.component.html',
  styleUrls: ['./statistics-box.component.scss'],
})
export class StatisticsBoxComponent implements OnInit {
  @Input() variant: StatisticsVariant
  @Input() data: Box
  @Output() action: EventEmitter<any> = new EventEmitter()
  localExperienceType: number
  rotation = '-91'

  constructor(private editor: EditorService) {}

  ngOnInit(): void {
    this.localExperienceType = this.editor.getLocalExperienceType()
  }

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
