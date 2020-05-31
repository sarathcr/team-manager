import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { StepId } from '../../constants/step.model';

@Directive({
  selector: '[scrollTo]'
})
export class ScrollToDirective {
  @Input() public scrollToId: StepId

  constructor(private el: ElementRef) { }

  @HostListener('click')
  click() {
    let element = document.getElementById(`${this.scrollToId}`)
    if (!element) return
    let timeout = 0
    let headerOffset = 75
    let elementPosition = element.offsetTop;
    let offsetPosition = elementPosition - headerOffset;
    if (this.el.nativeElement.querySelector('.btn.btn-primary')) timeout = 1000

    setTimeout(() => {
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth" 
      });
    }, timeout)
  }
}
