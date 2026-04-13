import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapLightningChargeFill, bootstrapShieldLockFill, bootstrapPuzzleFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent],
  providers: [provideIcons({ bootstrapLightningChargeFill, bootstrapShieldLockFill, bootstrapPuzzleFill })],
  template: `
    <section class="blog-page py-100">
      <div class="container mt-5">
        <div class="header-content text-center mb-5" appScrollReveal>
          <h1 class="display-3 fw-bold mb-4">La libertad de <span class="text-gradient">Crear</span></h1>
          <p class="lead text-muted mx-auto" style="max-width: 800px;">
            Herramientas poderosas, gratuitas y abiertas para llevar tu creatividad al siguiente nivel. 
            Sin limitaciones, sin compromisos. Descubre por qué Blender es el futuro de la industria.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="row g-4 mt-5">
          <div class="col-md-4" *ngFor="let feature of features; let i = index">
            <div class="glass-card feature-box p-5 h-100" appScrollReveal [style.transitionDelay]="i * 150 + 'ms'">
              <div class="icon-circle mb-4">
                <ng-icon [name]="feature.icon" class="feature-icon"></ng-icon>
              </div>
              <h3 class="h4 mb-3">{{feature.title}}</h3>
              <p class="text-muted mb-0">{{feature.description}}</p>
            </div>
          </div>
        </div>

        <!-- Mission & Vision -->
        <div class="row g-5 mt-100 align-items-center">
          <div class="col-lg-6" appScrollReveal>
            <div class="vision-card glass-card p-5">
              <h2 class="h2 text-gradient mb-4">Misión</h2>
              <p class="fs-5">
                Empoderar a creadores de todo el mundo proporcionando herramientas profesionales, 
                accesibles y completamente gratuitas que rompan barreras y democraticen la creación digital.
              </p>
            </div>
          </div>
          <div class="col-lg-6" appScrollReveal style="transition-delay: 200ms;">
             <div class="vision-card glass-card p-5 border-cyan">
              <h2 class="h2 text-gradient mb-4">Visión</h2>
              <p class="fs-5">
                Ser la plataforma global de referencia para industriales y artistas que desean transformar 
                sus ideas en realidad sin restricciones económicas, impulsando la innovación colectiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .py-100 { padding: 100px 0; }
    .mt-100 { margin-top: 100px; }
    
    .feature-box {
      text-align: center;
      .icon-circle {
        width: 80px;
        height: 80px;
        background: hsla(260, 100%, 65%, 0.1);
        border: 1px solid var(--primary-glow);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        color: var(--primary);
        font-size: 2.2rem;
      }
    }

    .border-cyan { border-color: hsla(190, 100%, 50%, 0.3) !important; }
    
    h3 { font-weight: 700; }
  `]
})
export class BlogComponent {
  features = [
    {
      title: 'Súper Rápido',
      icon: 'bootstrapLightningChargeFill',
      description: 'Rendimiento optimizado para que trabajes sin interrupciones y sin lag en tus proyectos más complejos.'
    },
    {
      title: '100% Seguro',
      icon: 'bootstrapShieldLockFill',
      description: 'Tus proyectos están protegidos con encriptación de nivel y backups automáticos en nuestra nube.'
    },
    {
      title: 'Personalizable',
      icon: 'bootstrapPuzzleFill',
      description: 'Adapta cada aspecto de la interfaz a tu flujo de trabajo y estilo creativo único con Python API.'
    }
  ];
}
