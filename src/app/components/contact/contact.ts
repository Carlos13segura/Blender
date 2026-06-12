import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  private courseService = inject(CourseService);
  
  contact = { name: '', email: '', message: '' };
  isSubmitting = false;
  successMessage = '';

  onSubmit() {
    this.isSubmitting = true;
    this.courseService.sendContact(this.contact).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.contact = { name: '', email: '', message: '' };
        this.isSubmitting = false;
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: () => {
        this.isSubmitting = false;
        alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
      }
    });
  }
}
