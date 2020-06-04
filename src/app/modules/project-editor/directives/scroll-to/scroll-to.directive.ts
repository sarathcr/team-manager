import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { StepId } from '../../constants/step.model';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';


@Directive({
  selector: '[scrollTo]'
})
export class ScrollToDirective {
  @Input() public scrollToId: StepId

  constructor(private el: ElementRef,private scrollToService: ScrollToService) { }

  @HostListener('click')
  click() {
    let element = document.getElementById(`${this.scrollToId}`)
    if (!element) return
    let timeout = 0
    if (this.el.nativeElement.querySelector('.btn.btn-primary')) timeout = 1000

    setTimeout(() => {
      const config: ScrollToConfigOptions = {
        target: element,
        duration: 400,
        easing: 'easeInOutQuad',
        offset: -75
      };
      this.scrollToService.scrollTo(config);
    }, timeout)
  }
}
