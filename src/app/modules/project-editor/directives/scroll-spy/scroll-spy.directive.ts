import { Directive, Injectable, Input, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
  @Output() public scrollSpyChange = new EventEmitter<string>();
  private currentSection: string;

  constructor(private _el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    let currentSection: string
    const children = this._el.nativeElement.children
    const childrenArray = [...children].filter(child => child.hasAttribute('data-scrollSpy'))
    const scrollTop = window.pageYOffset;
    const headerHeight = 75
    for (let i = 0; i < childrenArray.length; i++) {
      const element = childrenArray[i];
      if ((element.offsetTop - headerHeight) <= scrollTop) {
        currentSection = element.id
      }
    }
    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection
      this.scrollSpyChange.emit(this.currentSection)
    }
  }

}
