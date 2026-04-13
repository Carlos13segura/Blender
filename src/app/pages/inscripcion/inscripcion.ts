import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-inscripcion',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  template: `
    <section class="enrollment-page py-100 pb-5">
      <div class="container mt-5">
        <div class="row align-items-center g-5">
          <div class="col-lg-6" appScrollReveal>
            <h1 class="display-3 mb-4">Empieza tu <br><span class="text-gradient">Transformación</span></h1>
            <p class="lead text-muted mb-5">
              Al inscribirte obtendrás acceso inmediato a la plataforma, tutorías en vivo y nuestra comunidad privada de artistas.
            </p>
            
            <div class="advantage-list">
              <div class="adv-item d-flex gap-3 mb-4" *ngFor="let adv of advantages">
                <div class="adv-icon bg-gradient-main"></div>
                <div>
                  <h4 class="h5 mb-1">{{adv.title}}</h4>
                  <p class="text-muted small mb-0">{{adv.text}}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-6" appScrollReveal style="transition-delay: 200ms;">
            <div class="glass-card p-5">
              <h2 class="h3 mb-4 text-center">Formulario de Inscripción</h2>
              <form (submit)="onSubmit()" #enrollForm="ngForm">
                <div class="mb-4">
                  <label class="form-label">Nombre Completo</label>
                  <input type="text" class="form-control premium-input" name="name" [(ngModel)]="data.name" required>
                </div>
                <div class="mb-4">
                  <label class="form-label">Correo Electrónico</label>
                  <input type="email" class="form-control premium-input" name="email" [(ngModel)]="data.email" required>
                </div>
                <div class="mb-4">
                  <label class="form-label">País</label>
                  <select class="form-select premium-input" name="country" [(ngModel)]="data.country">
                    <option value="Mexico">México</option>
                    <option value="Spain">España</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Other">Otro</option>
                  </select>
                </div>
                <div class="mb-4">
                  <label class="form-label">Plan de Interés</label>
                  <div class="d-flex gap-3">
                    <div class="plan-option flex-grow-1" [class.active]="data.plan === 'Basic'" (click)="data.plan = 'Basic'">Básico</div>
                    <div class="plan-option flex-grow-1" [class.active]="data.plan === 'Pro'" (click)="data.plan = 'Pro'">Pro</div>
                    <div class="plan-option flex-grow-1" [class.active]="data.plan === 'Elite'" (click)="data.plan = 'Elite'">Elite</div>
                  </div>
                </div>
                
                <button type="submit" class="btn btn-primary-glow w-100 py-3 mt-3" [disabled]="!enrollForm.valid || isSubmitting">
                  {{isSubmitting ? 'Procesando...' : 'Confirmar Pre-Inscripción'}}
                </button>
                
                <div *ngIf="success" class="alert alert-success mt-4 bg-dark border-success text-success text-center">
                  ¡Inscripción recibida! Revisa tu correo para los siguientes pasos.
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
    
    .adv-icon {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-top: 6px;
      flex-shrink: 0;
    }
    
    .premium-input {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--glass-border);
      color: white;
      border-radius: 12px;
      padding: 12px 18px;
      &:focus {
        background: rgba(255,255,255,0.08);
        border-color: var(--primary);
        box-shadow: 0 0 0 4px var(--primary-glow);
        color: white;
      }
    }

    .plan-option {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--glass-border);
      padding: 10px;
      border-radius: 10px;
      text-align: center;
      cursor: pointer;
      font-weight: 600;
      transition: var(--transition-smooth);
      
      &.active {
        background: var(--primary);
        border-color: var(--primary);
        box-shadow: 0 5px 15px -5px var(--primary-glow);
      }
    }

    select.premium-input option {
      background: var(--bg-dark);
      color: white;
    }
  `]
})
export class InscripcionComponent {
  private service = inject(CourseService);
  
  data = { name: '', email: '', country: 'Mexico', plan: 'Pro' };
  isSubmitting = false;
  success = false;

  advantages = [
    { title: 'Certificación Oficial', text: 'Obtén un diploma avalado por nuestra red de partners.' },
    { title: 'Acceso de por vida', text: 'Actualizaciones gratuitas de todos los contenidos.' },
    { title: 'Bolsa de Trabajo', text: 'Conexión directa con estudios de animación y gaming.' }
  ];

  onSubmit() {
    this.isSubmitting = true;
    this.service.sendContact({
      name: this.data.name,
      email: this.data.email,
      message: `Plan: ${this.data.plan}, País: ${this.data.country}`
    }).subscribe(() => {
      this.success = true;
      this.isSubmitting = false;
      setTimeout(() => this.success = false, 5000);
    });
  }
}
