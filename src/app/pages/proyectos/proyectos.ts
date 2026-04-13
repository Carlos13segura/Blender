import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapEyeFill, bootstrapBrush, bootstrapCameraReels } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent],
  providers: [provideIcons({ bootstrapEyeFill, bootstrapBrush, bootstrapCameraReels })],
  template: `
    <section class="projects-page py-100">
      <div class="container mt-5">
        <div class="text-center mb-5" appScrollReveal>
          <h1 class="display-3 fw-bold mb-3">Galería de <span class="text-gradient">Proyectos</span></h1>
          <p class="text-muted lead mx-auto" style="max-width: 700px;">
            Explora los trabajos realizados por nuestros estudiantes y lo que tú también podrás crear al finalizar el máster.
          </p>
        </div>

        <div class="row g-4 mt-5">
          <div class="col-md-6 col-lg-4" *ngFor="let project of projects; let i = index">
            <div class="glass-card project-card h-100" appScrollReveal [style.transitionDelay]="(i % 3) * 150 + 'ms'">
              <div class="project-img-container">
                <img [src]="project.image" [alt]="project.title" class="project-img">
                <div class="project-overlay d-flex align-items-center justify-content-center">
                  <button class="btn btn-primary-glow btn-sm">
                    <ng-icon name="bootstrapEyeFill" class="me-2"></ng-icon> Ver Detalles
                  </button>
                </div>
              </div>
              <div class="p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="badge category-badge">{{project.category}}</span>
                  <div class="d-flex gap-2">
                    <ng-icon name="bootstrapBrush" class="text-muted"></ng-icon>
                    <ng-icon name="bootstrapCameraReels" class="text-muted"></ng-icon>
                  </div>
                </div>
                <h3 class="h4 mb-2">{{project.title}}</h3>
                <p class="text-muted small mb-0">{{project.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .py-100 { padding: 100px 0; }
    
    .project-card {
      overflow: hidden;
      padding: 0;
      
      &:hover .project-img { transform: scale(1.1); }
      &:hover .project-overlay { opacity: 1; }
    }

    .project-img-container {
      position: relative;
      height: 250px;
      overflow: hidden;
      border-radius: 24px 24px 0 0;
    }

    .project-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition-smooth);
    }

    .project-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.5);
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: var(--transition-smooth);
    }

    .category-badge {
      background: hsla(260, 100%, 65%, 0.1);
      color: var(--primary);
      border: 1px solid var(--primary-glow);
    }

    h3 { font-weight: 700; color: var(--text-main); }
  `]
})
export class ProyectosComponent {
  projects = [
    {
      title: 'Arquitectura Minimalista',
      category: 'Exterior',
      description: 'Modelado y renderizado fotorrealista de una vivienda unifamiliar moderna.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&h=400&fit=crop'
    },
    {
      title: 'Personaje Stylized',
      category: 'Character Design',
      description: 'Creación de un personaje estilo cartoon para animación 3D.',
      image: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=600&h=400&fit=crop'
    },
    {
      title: 'Escena Sci-Fi',
      category: 'Environment',
      description: 'Composición futurista con iluminación volumétrica avanzada.',
      image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=600&h=400&fit=crop'
    },
    {
      title: 'Mech Warrior',
      category: 'Hard Surface',
      description: 'Modelado de robot de combate con texturas PBR realistas.',
      image: 'https://images.unsplash.com/photo-1546776230-bb862b48a395?q=80&w=600&h=400&fit=crop'
    },
    {
      title: 'Render de Producto',
      category: 'Comercial',
      description: 'Visualización premium para campañas de marketing digital.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&h=400&fit=crop'
    },
    {
      title: 'Mundo Bio-Luminiscente',
      category: 'VFX',
      description: 'Uso de sistemas de partículas y nodos para efectos luminosos.',
      image: 'https://images.unsplash.com/photo-1633113088453-8173abc0034a?q=80&w=600&h=400&fit=crop'
    }
  ];
}
