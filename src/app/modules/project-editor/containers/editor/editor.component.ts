import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { Step } from '../../constants/model/project.model'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  projectUrl: string | number
  stepOne: Observable<Step>

  constructor(private route: ActivatedRoute, public editor: EditorService) {}

  ngOnInit(): void {
    this.stepOne = this.editor.getStepStatus(1)
    this.projectUrl = this.route.snapshot.paramMap.get('id')
    this.editor.createSteps()
    this.editor.getProject(this.projectUrl)
  }

  ngOnDestroy(): void {
    this.editor.clearData()
  }
}
