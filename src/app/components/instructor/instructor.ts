import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, CourseData } from '../../services/course';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ScrollRevealDirective],
  providers: [provideIcons({ bootstrapCheckCircleFill })],
  templateUrl: './instructor.html',
  styleUrls: ['./instructor.scss']
})
export class InstructorComponent {
  private courseService = inject(CourseService);
  data?: CourseData;

  ngOnInit() {
    this.courseService.getCourseData().subscribe(res => this.data = res);
  }
}
