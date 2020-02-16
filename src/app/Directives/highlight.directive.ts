import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {

  @Input() defaultColor = 'transparent';
  @Input('appHighlight') highlightColor = 'red';
  @HostBinding('style.backgroundColor') backgroundColor;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseenter() {
    this.backgroundColor = 'rgb(230,230,230)';
  }

  @HostListener('mouseleave') mouseleave() {
  this.backgroundColor = this.defaultColor;
  }
}
