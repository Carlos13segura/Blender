import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, CourseData } from '../../services/course';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapClock, bootstrapBox, bootstrapLayers, bootstrapStars } from '@ng-icons/bootstrap-icons';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ScrollRevealDirective],
  providers: [provideIcons({ bootstrapClock, bootstrapBox, bootstrapLayers, bootstrapStars })],
  templateUrl: './course-details.html',
  styleUrls: ['./course-details.scss']
})
export class CourseDetailsComponent {
  private courseService = inject(CourseService);
  data?: CourseData;

  ngOnInit() {
    this.courseService.getCourseData().subscribe(res => this.data = res);
  }

  getIcon(index: number): string {
    const icons = ['bootstrapBox', 'bootstrapLayers', 'bootstrapBox', 'bootstrapStars'];
    return icons[index % icons.length];
  }
}
