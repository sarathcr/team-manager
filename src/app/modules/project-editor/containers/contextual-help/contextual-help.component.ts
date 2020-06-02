import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-contextual-help',
  templateUrl: './contextual-help.component.html',
  styleUrls: ['./contextual-help.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContextualHelpComponent implements OnInit {
  closeContext:boolean =  false;

  constructor() { }

  ngOnInit(): void {
  }

  closeTab(){
    this.closeContext = false;
  }

  openTab(){
    console.log(this.closeContext);
    if(!this.closeContext){
      this.closeContext = true;
    }
  }
}
