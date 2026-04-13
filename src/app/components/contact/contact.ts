import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  template: `
    <section id="contact" class="py-100 position-relative">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="display-4 mb-3" appScrollReveal>¿Listo para <span class="text-gradient">Empezar?</span></h2>
            <p class="text-muted mb-5" appScrollReveal style="transition-delay: 100ms;">Déjanos tus datos y un asesor te contactará para resolver tus dudas.</p>
            
            <div class="glass-card p-4 p-md-5 text-start" appScrollReveal style="transition-delay: 200ms;">
              <form (submit)="onSubmit()">
                <div class="row g-4">
                  <div class="col-md-6">
                    <label class="form-label">Nombre Completo</label>
                    <input type="text" [(ngModel)]="contact.name" name="name" class="form-control premium-input" placeholder="Ej. Juan Pérez" required>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Email</label>
                    <input type="email" [(ngModel)]="contact.email" name="email" class="form-control premium-input" placeholder="juan@ejemplo.com" required>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Mensaje</label>
                    <textarea [(ngModel)]="contact.message" name="message" class="form-control premium-input" rows="4" placeholder="Cuéntanos tus objetivos..."></textarea>
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary-glow w-100 py-3" [disabled]="isSubmitting">
                      {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
                    </button>
                    <div *ngIf="successMessage" class="alert alert-success mt-3 bg-dark border-success text-success">
                      {{ successMessage }}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .py-100 { padding: 100px 0; }
    .premium-input {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      color: white;
      border-radius: 12px;
      padding: 12px 18px;
      
      &:focus {
        background: var(--bg-dark);
        border-color: var(--primary);
        box-shadow: 0 0 0 4px var(--primary-glow);
        color: white;
      }
      &::placeholder { color: hsla(0, 0%, 100%, 0.3); }
    }
    .form-label { font-weight: 600; color: var(--text-main); margin-bottom: 8px; }
  `]
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
