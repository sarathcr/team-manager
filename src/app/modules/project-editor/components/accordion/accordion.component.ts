import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccordionComponent implements OnInit {
  oneAtATime: boolean = true;
  isFirstOpen: boolean = true;
  customClass: string = 'accordion';

  constructor() { }

  ngOnInit(): void {
  }

}
