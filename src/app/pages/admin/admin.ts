import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService, Tutorial } from '../../services/course';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPlus, bootstrapPlayCircle, bootstrapClock } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent],
  providers: [provideIcons({ bootstrapPlus, bootstrapPlayCircle, bootstrapClock })],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class AdminComponent implements OnInit {
  private courseService = inject(CourseService);
  
  tutorials: Tutorial[] = [];
  
  newTutorial = {
    title: '',
    description: '',
    url: '',
    duration: ''
  };

  isSubmitting = false;
  successMessage = '';

  ngOnInit() {
    this.loadTutorials();
  }

  loadTutorials() {
    this.courseService.getTutorials().subscribe(tuts => {
      this.tutorials = tuts;
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting = true;
    this.courseService.addTutorial(this.newTutorial).subscribe({
      next: () => {
        this.successMessage = 'Tutorial subido correctamente';
        this.newTutorial = { title: '', description: '', url: '', duration: '' };
        this.isSubmitting = false;
        this.loadTutorials();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.isSubmitting = false;
        alert('Error al subir tutorial');
      }
    });
  }
}
