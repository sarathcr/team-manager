import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, AfterViewInit, ViewContainerRef, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map, tap, filter, first } from 'rxjs/operators'
import { HelpEntityService } from '../../services/help/help-entity.service'
import { Step } from '../../constants/step.model';
import { Help, ContextualHelp } from 'src/app/shared/constants/contextual-help.model';
import { EditorService } from '../../services/editor/editor.service'
@Component({
  selector: 'app-contextual-help',
  templateUrl: './contextual-help.component.html',
  styleUrls: ['./contextual-help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContextualHelpComponent implements OnInit, AfterViewInit {
  @Output() status = new EventEmitter<boolean>();
  help: Help[]
  contextualHelp$: Observable<ContextualHelp>
  closeContext: boolean = false;
  activeTab: any;
  loaded = false

  constructor(
    public editorService: EditorService,
    public helpService: HelpEntityService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getTranslation();
  }

  ngAfterViewInit(){
  }

  //Close tab
  closeTab() {
    this.closeContext = false;
    this.status.emit(false);
    setTimeout(() => {
      this.activeTab.active = false;
    }, 500);
  }

  //Open tab
  openTab($event) {
    this.activeTab = $event;
    this.status.emit(true)
    if (!this.closeContext) {
      this.closeContext = true;
    }
    if(this.closeContext){
      this.getHelpContent();
    }
  }

  getHelpContent() {
    this.editorService.currentStep$.subscribe( stepId => {
      if(stepId && this.closeContext){
        this.getHelp(stepId)
      }
    });
  }

  // Get help content
  getHelp(stepid) {
    this.contextualHelp$ = this.helpService.entities$
      .pipe(
        map( help => help.find( step => {
            return step.stepid === Number(stepid)
          })
        )
      )
    this.contextualHelp$.subscribe( contextualHelp => {
      if(contextualHelp) {
          this.help = contextualHelp.helps
      } else {
        this.helpService.getByKey(stepid)
      }
    })
    this.helpService.loading$.subscribe(loading=> {
      this.loaded = !loading
    })
  }

  getTranslation(){
    this.translateService.stream([
      'PROJECTGUIDE.projectguide_pedagogical_guide',
    ]).subscribe(translations => {})
  }
}
