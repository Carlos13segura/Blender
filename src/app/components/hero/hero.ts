import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService, CourseData } from '../../services/course';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss']
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroContent') content!: ElementRef;
  @ViewChild('heroVisual') visual!: ElementRef;

  private courseService = inject(CourseService);
  data?: CourseData;

  ngOnInit() {
    this.courseService.getCourseData().subscribe(res => this.data = res);
  }

  ngAfterViewInit() {
    if (this.content?.nativeElement?.children) {
      gsap.from(this.content.nativeElement.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5
      });
    }

    if (this.visual?.nativeElement) {
      gsap.from(this.visual.nativeElement, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8
      });
    }
  }
}
