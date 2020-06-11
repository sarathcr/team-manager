import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { map } from 'rxjs/operators'
import { HelpEntityService } from '../../services/help/help-entity.service'
import { Step } from '../../constants/step.model';
@Component({
  selector: 'app-contextual-help',
  templateUrl: './contextual-help.component.html',
  styleUrls: ['./contextual-help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContextualHelpComponent implements OnInit {
  // @Input() step: Step
  @Output() status = new EventEmitter<boolean>();
  closeContext: boolean = false;
  activeTab: any;

  constructor(private helpService: HelpEntityService) { }

  ngOnInit(): void {
    this.getHelpContent();
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
  }
  getHelpContent() {
    this.helpService.entities$
      .subscribe(data => {
        if (!data.length) this.helpService.getAll()
      })
  }
}
