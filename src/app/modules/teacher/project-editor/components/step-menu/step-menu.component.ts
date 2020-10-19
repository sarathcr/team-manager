import { Component, Input, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

import { Step } from '../../constants/model/project.model'
import { EditorService } from '../../services/editor/editor.service'

@Component({
  selector: 'app-step-menu',
  templateUrl: './step-menu.component.html',
  styleUrls: ['./step-menu.component.scss'],
})
export class StepMenuComponent implements OnInit {
  @Input() step: Step
  activeRoute = false

  constructor(private editorService: EditorService, private router: Router) {}

  ngOnInit(): void {
    this.checkActive()
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkActive()
      })
  }

  checkActive(): void {
    this.activeRoute = this.router.url.includes(this.getRoute())
  }

  getRoute = (): string =>
    `/editor/${this.editorService.getExperienceUrl()}/${
      this.editorService.experienceId
    }/${this.step.stepid}`

  navigateToStep(): void {
    this.editorService.navigateClick(this.getRoute())
  }
}
