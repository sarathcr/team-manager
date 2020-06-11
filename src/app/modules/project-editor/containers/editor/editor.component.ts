import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/shared/constants/project.model';
import { ProjectTitle } from '../../constants/title-data.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { StepId, Status, StepState, Steps } from '../../constants/step.model';
import { EditorService } from '../../services/editor/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  project: Project;
  project$: Observable<Project>;
  spyActive$ = new BehaviorSubject<StepId>('stepOne')
  stepStatus$: Observable<StepState>
  notFound: boolean;
  titleData: ProjectTitle;
  projectUrl: any;
  steps: Steps
  status: Status
  tempStatus: any // saving the status for non created projects
  contextualStatus: boolean = false

  constructor(
    private route: ActivatedRoute,
    public editor: EditorService
  ) { }

  ngOnInit(): void {
    this.steps = this.editor.createSteps()
    this.projectUrl = this.route.snapshot.paramMap.get('id')
    this.editor.getProject(this.projectUrl)
  }

  getContextualStatus($event) {
    this.contextualStatus = $event
  }

}
