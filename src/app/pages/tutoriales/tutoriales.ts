import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Tutorial } from '../../services/course';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPlayCircle, bootstrapClock } from '@ng-icons/bootstrap-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tutoriales',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapPlayCircle, bootstrapClock })],
  templateUrl: './tutoriales.html',
  styleUrls: ['./tutoriales.scss']
})
export class TutorialesComponent implements OnInit, OnDestroy {
  private courseService = inject(CourseService);
  private sub?: Subscription;

  tutorials: Tutorial[] = [];

  ngOnInit() {
    // Initial fetch
    this.courseService.getTutorials().subscribe(tuts => {
      this.tutorials = tuts;
    });

    // Real-time updates when new tutorial is added
    this.sub = this.courseService.tutorialAdded$.subscribe(tutorial => {
      // Add the new tutorial to the beginning of the list to be reactive
      this.tutorials = [tutorial, ...this.tutorials];
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
