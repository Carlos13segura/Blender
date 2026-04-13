import { Directive, ElementRef, AfterViewInit, inject } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('visible');
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.el.nativeElement.classList.add('reveal');
    observer.observe(this.el.nativeElement);
  }
}
