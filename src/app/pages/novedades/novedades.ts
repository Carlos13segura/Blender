import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapStars, bootstrapDownload, bootstrapSunFill, bootstrapPalette, bootstrapLightningFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent],
  providers: [provideIcons({ bootstrapStars, bootstrapDownload, bootstrapSunFill, bootstrapPalette, bootstrapLightningFill })],
  template: `
    <section class="news-page py-100">
      <div class="news-hero py-5" appScrollReveal>
        <div class="container text-center mt-5">
          <div class="badge premium-badge mb-3">
            <ng-icon name="bootstrapStars" class="me-2"></ng-icon>
            NUEVA VERSIÓN 5.0
          </div>
          <h1 class="display-2 fw-bold mb-4">Blender 5.0 <span class="text-gradient">"Hi Five"</span></h1>
          <p class="lead text-muted mx-auto mb-5" style="max-width: 800px;">
            La actualización más revolucionaria hasta la fecha: HDR nativo, Cycles optimizado, 
            EEVEE más rápido y Grease Pencil 3 completamente renovado.
          </p>
          <div class="d-flex gap-3 justify-content-center">
            <a href="https://www.blender.org/download/" target="_blank" class="btn btn-primary-glow">Descargar Ahora</a>
            <a href="#details" class="btn btn-outline-premium">Ver Resumen</a>
          </div>
        </div>
      </div>

      <div class="container mt-100" id="details">
        <div class="row g-4">
          <div class="col-lg-6" *ngFor="let news of majorUpdates; let i = index">
            <div class="glass-card p-5 h-100" appScrollReveal [style.transitionDelay]="i * 150 + 'ms'">
              <div class="d-flex gap-4 align-items-start">
                <div class="news-icon-box bg-gradient-main">
                  <ng-icon [name]="news.icon"></ng-icon>
                </div>
                <div>
                  <h3 class="h4 mb-3">{{news.title}}</h3>
                  <p class="text-muted mb-0">{{news.description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-100 glass-card p-5 text-center" appScrollReveal>
          <h2 class="mb-4">Cycles & EEVEE: Rendimiento Extremo</h2>
          <div class="row mt-5 g-4 text-start">
            <div class="col-md-4">
              <h4 class="h5 text-primary">Unbiased Volume</h4>
              <p class="text-muted small">Nuevo algoritmo de null-scattering para volúmenes sin artefactos.</p>
            </div>
            <div class="col-md-4">
              <h4 class="h5 text-primary">Subsurface Scattering</h4>
              <p class="text-muted small">Random Walk más preciso para renderizado de piel fotorrealista.</p>
            </div>
            <div class="col-md-4">
              <h4 class="h5 text-primary">4x Velocidad EEVEE</h4>
              <p class="text-muted small">Compilación de Shaders ultra rápida con soporte Vulkan y Raytracing.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .py-100 { padding: 100px 0; }
    .mt-100 { margin-top: 100px; }
    
    .news-icon-box {
      width: 60px;
      height: 60px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      color: white;
      flex-shrink: 0;
    }
  `]
})
export class NovedadesComponent {
  majorUpdates = [
    {
      title: 'Gestión de Color HDR',
      icon: 'bootstrapSunFill',
      description: 'Pipeline de color renovado con soporte nativo para monitores HDR y flujos ACES 2.0.'
    },
    {
      title: 'Grease Pencil 3',
      icon: 'bootstrapPalette',
      description: 'Arquitectura totalmente nueva para dibujo 2D, mucho más rápida y flexible para animación.'
    },
    {
      title: 'Geometry Nodes: Assets',
      icon: 'bootstrapLightningFill',
      description: 'Nuevos nodos esenciales integrados para scatter, tuberías y modelado procedural avanzado.'
    },
    {
      title: 'Compositor Realtime',
      icon: 'bootstrapStars',
      description: 'Nuevas herramientas de post-producción directamente en el viewport con soporte para Asset Shelf.'
    }
  ];
}
