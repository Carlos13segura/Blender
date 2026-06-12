import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, Tutorial } from '../../services/course';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapBellFill } from '@ng-icons/bootstrap-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapBellFill })],
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  private courseService = inject(CourseService);
  private sub?: Subscription;

  notifications: Tutorial[] = [];

  ngOnInit() {
    this.sub = this.courseService.tutorialAdded$.subscribe((tutorial: Tutorial) => {
      this.notifications.push(tutorial);
      
      // Auto dismiss after 6 seconds
      setTimeout(() => {
        this.removeNotification(tutorial);
      }, 6000);
    });
  }

  removeNotification(tutorial: Tutorial) {
    this.notifications = this.notifications.filter(n => n.id !== tutorial.id);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
