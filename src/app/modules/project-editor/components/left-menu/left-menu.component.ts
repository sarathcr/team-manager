import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {
  @Input() item;
  @Input() status;


  constructor() { }

  ngOnInit(): void {
  }
  // childEvent(event){
  //   console.log(event);
  // }
  
}
