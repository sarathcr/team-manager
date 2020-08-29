import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { EditorService } from 'src/app/modules/project-editor/services/editor/editor.service'
import { SubSink } from 'src/app/shared/utility/subsink.utility'
import { ContextualHelp, Help } from '../../constants/model/help.model'
import { HelpEntityService } from '../../store/entity/help/help-entity.service'

@Component({
  selector: 'app-contextual-help',
  templateUrl: './contextual-help.component.html',
  styleUrls: ['./contextual-help.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContextualHelpComponent implements OnDestroy {
  @Output() status = new EventEmitter<boolean>()
  help: Help[]
  contextualHelp$: Observable<ContextualHelp>
  subscription = new SubSink()
  closeContext = false
  activeTab: any
  loaded = false

  constructor(
    public editorService: EditorService,
    public helpService: HelpEntityService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

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
    this.editorService.currentStep$.subscribe((stepId) => {
      if (stepId && this.closeContext) {
        this.getHelp(stepId)
      }
    })
  }

  // Get help content
  getHelp(stepid: number): void {
    this.contextualHelp$ = this.helpService.entities$.pipe(
      map((help) =>
        help.find((step) => {
          return step.stepid === Number(stepid)
        })
      )
    )
    this.subscription.sink = this.contextualHelp$.subscribe(
      (contextualHelp) => {
        if (contextualHelp) {
          this.help = contextualHelp.helps
        } else {
          this.helpService.getByKey(stepid)
        }
      }
    )
    this.subscription.sink = this.helpService.loading$.subscribe((loading) => {
      this.loaded = !loading
    })
  }
}
