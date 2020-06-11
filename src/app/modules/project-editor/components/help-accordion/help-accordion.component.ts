import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-help-accordion',
  templateUrl: './help-accordion.component.html',
  styleUrls: ['./help-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HelpAccordionComponent implements OnInit {
  oneAtATime: boolean = true;
  isFirstOpen: boolean = true;
  customClass: string = 'accordion';

  constructor() { }

  ngOnInit(): void {
  }
}
