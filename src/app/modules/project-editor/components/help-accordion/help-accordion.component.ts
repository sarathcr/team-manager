import { Component, OnInit, OnChanges, ViewEncapsulation, Input, SimpleChanges, AfterViewInit,} from '@angular/core';
import { HelpImgThumbComponent } from '../help-img-thumb/help-img-thumb.component';
import { Help } from 'src/app/shared/constants/contextual-help.model';

@Component({
  selector: 'app-help-accordion',
  templateUrl: './help-accordion.component.html',
  styleUrls: ['./help-accordion.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HelpAccordionComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() content: Help[]
  oneAtATime: boolean = true;
  isFirstOpen: boolean = true;
  customClass: string = 'accordion'
  accordionContent: string = ''

  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.content)
    this.content.forEach( help => {
      this.accordionContent += ''
    })
  }
  ngAfterViewInit(): void {
    // this.accordion.nativeElement.insertAdjacentHTML('beforeend',this.accordionContent)
    this.content.forEach( help => {
    })
  }
}
