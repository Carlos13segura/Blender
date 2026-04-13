import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent, RouterLink],
  providers: [provideIcons({ bootstrapCheckCircleFill })],
  template: `
    <section class="pricing-page py-100 pb-5">
      <div class="container mt-5">
        <div class="text-center mb-5" appScrollReveal>
          <h1 class="display-3 mb-3">Planes de <span class="text-gradient">Estudio</span></h1>
          <p class="text-muted lead mx-auto" style="max-width: 600px;">
            Elige el nivel de acompañamiento que mejor se adapte a tus objetivos profesionales.
          </p>
        </div>

        <div class="row g-4 justify-content-center mt-5">
          <div class="col-lg-4" *ngFor="let plan of plans; let i = index">
            <div class="glass-card pricing-card h-100" [class.featured]="plan.featured" appScrollReveal [style.transitionDelay]="i * 150 + 'ms'">
              <div class="p-4 p-md-5">
                <div class="plan-header text-center mb-5">
                  <span class="badge featured-badge mb-3" *ngIf="plan.featured">MÁS POPULAR</span>
                  <h3 class="h4 mb-4">{{plan.name}}</h3>
                  <div class="plan-price">
                    <span class="symbol">$</span>
                    <span class="value">{{plan.price}}</span>
                    <span class="period">/mes</span>
                  </div>
                </div>
                
                <ul class="plan-features list-unstyled mb-5">
                  <li class="d-flex align-items-center gap-3 mb-3" *ngFor="let feat of plan.features">
                    <ng-icon name="bootstrapCheckCircleFill" class="text-primary"></ng-icon>
                    <span>{{feat}}</span>
                  </li>
                </ul>
                
                <a routerLink="/inscripcion" class="btn w-100 py-3" [class.btn-primary-glow]="plan.featured" [class.btn-outline-premium]="!plan.featured">
                  Seleccionar Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .py-100 { padding: 100px 0; }
    
    .pricing-card {
      transition: var(--transition-smooth);
      position: relative;
      
      &.featured {
        border-color: var(--primary);
        box-shadow: 0 0 50px -10px var(--primary-glow);
        transform: scale(1.05);
        z-index: 2;
        
        @media (max-width: 991px) { transform: none; }
      }
    }

    .plan-price {
      .symbol { font-size: 1.5rem; vertical-align: top; color: var(--primary); font-weight: 700; }
      .value { font-size: 3.5rem; font-weight: 800; font-family: var(--font-display); }
      .period { color: var(--text-muted); font-size: 1rem; }
    }

    .featured-badge {
      background: var(--bg-gradient-main);
      color: white;
      padding: 6px 15px;
      border-radius: 50px;
    }

    .btn-outline-premium {
      border: 1px solid var(--glass-border);
      color: var(--text-main);
      &:hover {
        border-color: var(--primary);
        background: var(--glass);
        color: var(--primary);
      }
    }
  `]
})
export class PreciosComponent {
  plans = [
    {
      name: 'Plan Básico',
      price: '1,000',
      featured: false,
      features: ['Acceso a la plataforma 24/7', 'Material descargable', 'Comunidad privada', 'Certificado digital']
    },
    {
      name: 'Plan Intermedio',
      price: '2,000',
      featured: true,
      features: ['Todo el Plan Básico', 'Mentorías grupales semanales', 'Feedback personalizado', 'Bolsa de trabajo exclusiva']
    },
    {
      name: 'Plan Avanzado',
      price: '3,000',
      featured: false,
      features: ['Todo el Plan Intermedio', 'Mentorías 1:1 diarias', 'Garantía de empleo', 'Proyectos con clientes reales']
    }
  ];
}
