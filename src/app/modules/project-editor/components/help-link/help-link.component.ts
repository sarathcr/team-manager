import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-help-link',
  templateUrl: './help-link.component.html',
  styleUrls: ['./help-link.component.scss']
})
export class HelpLinkComponent implements OnInit {
  @Input() title: string;
  @Input() img: string;
  @Input() url: string;

  constructor() { }

  ngOnInit(): void {
  }

}
