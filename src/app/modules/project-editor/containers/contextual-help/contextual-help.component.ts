import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contextual-help',
  templateUrl: './contextual-help.component.html',
  styleUrls: ['./contextual-help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContextualHelpComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
