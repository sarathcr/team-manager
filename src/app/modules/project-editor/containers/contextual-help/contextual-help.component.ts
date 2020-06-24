import { Component, ViewEncapsulation, Output, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Help, ContextualHelp } from 'src/app/shared/constants/contextual-help.model'
import { EditorService } from '../../services/editor/editor.service'
import { HelpEntityService } from '../../store/entity/help/help-entity.service'
@Component({
  selector: 'app-contextual-help',
  templateUrl: './contextual-help.component.html',
  styleUrls: ['./contextual-help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContextualHelpComponent {
  @Output() status = new EventEmitter<boolean>()
  help: Help[]
  contextualHelp$: Observable<ContextualHelp>
  closeContext = false
  activeTab: any
  loaded = false

  constructor(
    public editorService: EditorService,
    public helpService: HelpEntityService
  ) { }

  // Close tab
  closeTab(): void {
    this.closeContext = false
    this.status.emit(false)
    setTimeout(() => {
      this.activeTab.active = false
    }, 500)
  }

  // Open tab
  openTab($event: any): void {
    this.activeTab = $event
    this.status.emit(true)
    if (!this.closeContext) {
      this.closeContext = true
    }
    if (this.closeContext) {
      this.getHelpContent()
    }
  }

  getHelpContent(): void {
    this.editorService.currentStep$.subscribe(stepId => {
      if (stepId && this.closeContext) {
        this.getHelp(stepId)
      }
    })
  }

  // Get help content
  getHelp(stepid: number): void {
    this.contextualHelp$ = this.helpService.entities$
      .pipe(
        map(help => help.find(step => {
          return step.stepid === Number(stepid)
        })
        )
      )
    this.contextualHelp$.subscribe(contextualHelp => {
      if (contextualHelp) {
        this.help = contextualHelp.helps
      } else {
        this.helpService.getByKey(stepid)
      }
    })
    this.helpService.loading$.subscribe(loading => {
      this.loaded = !loading
    })
  }
}
