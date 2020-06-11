import { Component, OnInit, OnChanges, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import { ContextualHelp } from 'src/app/shared/constants/contextual-help.model';

@Component({
  selector: 'app-help-accordion',
  templateUrl: './help-accordion.component.html',
  styleUrls: ['./help-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpAccordionComponent implements OnInit, OnChanges {
  @Input() content: ContextualHelp
  oneAtATime: boolean = true;
  isFirstOpen: boolean = true;
  customClass: string = 'accordion';

  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.content)
  }
}
