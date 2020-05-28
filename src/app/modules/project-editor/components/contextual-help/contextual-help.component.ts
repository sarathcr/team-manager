import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contextual-help',
  templateUrl: './contextual-help.component.html',
  styleUrls: ['./contextual-help.component.scss']
})
export class ContextualHelpComponent implements OnInit {

  expanded:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  handleCollapse() {
    this.expanded = true;
  }
}
