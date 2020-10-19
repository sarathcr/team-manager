import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { SubSink } from 'src/app/common-shared/utility/subsink.utility'
import { EditorService } from 'src/app/modules/teacher/project-editor/services/editor/editor.service'
import { ContextualHelp, Help } from '../../constants/model/help.model'
import { HelpEntityService } from '../../store/entity/help/help-entity.service'

@Component({
  selector: 'app-contextual-help',
  templateUrl: './contextual-help.component.html',
  styleUrls: ['./contextual-help.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContextualHelpComponent implements OnInit, OnDestroy {
  @Input() position = 'position-fixed'
  @Output() status = new EventEmitter<boolean>()
  help: Help[]
  contextualHelp$: Observable<ContextualHelp>
  subscription = new SubSink()
  closeContext = true
  activeTab: any
  loaded = false
  activetab = true

  constructor(
    public editorService: EditorService,
    public helpService: HelpEntityService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.getHelpContent()
  }

  // Close tab
  closeTab(): void {
    this.closeContext = false
    this.status.emit(false)
    setTimeout(() => {
      // this.activeTab.active = false
      this.activetab = false
    }, 500)
  }

  // Open tab
  openTab($event: any): void {
    this.activetab = true
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
        const type = this.editorService
          .getExperienceUrl()
          .toUpperCase()
          .replace('-', '_')
        const query = `/steps/${stepId}/type/${type}/helps`
        this.getHelp(query)
      }
    })
  }

  // Get help content
  getHelp(query: string): void {
    this.contextualHelp$ = this.helpService.entities$.pipe(
      map((help) =>
        help.find((step) => {
          return step.id === query
        })
      )
    )
    this.subscription.sink = this.contextualHelp$.subscribe(
      (contextualHelp) => {
        if (contextualHelp) {
          this.help = contextualHelp.helps
        } else {
          this.helpService.getWithQuery(query)
        }
      }
    )
    this.subscription.sink = this.helpService.loading$.subscribe((loading) => {
      this.loaded = !loading
    })
  }
}
