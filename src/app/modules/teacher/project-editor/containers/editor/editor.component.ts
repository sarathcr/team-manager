import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { Step } from '../../constants/model/project.model'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  stepOne$: Observable<Step>

  constructor(private route: ActivatedRoute, public editor: EditorService) {}

  ngOnInit(): void {
    this.stepOne$ = this.editor.getStepStatus(1)
  }
}
