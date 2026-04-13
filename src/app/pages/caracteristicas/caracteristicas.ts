import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  bootstrapBox, 
  bootstrapBrush, 
  bootstrapCpu, 
  bootstrapCollectionPlay, 
  bootstrapMagic,
  bootstrapCameraVideo
} from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-caracteristicas',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent],
  providers: [provideIcons({ 
    bootstrapBox, 
    bootstrapBrush, 
    bootstrapCpu, 
    bootstrapCollectionPlay, 
    bootstrapMagic,
    bootstrapCameraVideo
  })],
  template: `
    <section class="features-page py-100">
      <div class="hero-sub text-center mb-100" appScrollReveal>
        <div class="container mt-5">
           <h1 class="display-1 fw-bold mb-4">Potencia sin <span class="text-gradient">Límites</span></h1>
           <p class="lead text-muted mx-auto" style="max-width: 800px;">
             Blender es la suite de creación 3D gratuita y de código abierto que soporta la totalidad del pipeline 3D.
           </p>
        </div>
      </div>

      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4" *ngFor="let feat of featureList; let i = index">
            <div class="glass-card feature-card p-0" appScrollReveal [style.transitionDelay]="i * 100 + 'ms'">
              <div class="feature-img-box">
                <img [src]="feat.image" [alt]="feat.title">
                <div class="icon-overlay">
                  <ng-icon [name]="feat.icon"></ng-icon>
                </div>
              </div>
              <div class="p-4">
                <h3 class="h4 mb-3">{{feat.title}}</h3>
                <p class="text-muted mb-0">{{feat.description}}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-100 glass-card p-5 info-box text-center" appScrollReveal>
          <h2 class="mb-4">Multiplataforma y Personalizable</h2>
          <p class="lead text-muted">
            Blender funciona en Linux, Windows y Macintosh. Su interfaz usa OpenGL para proporcionar una experiencia consistente y puede ser completamente personalizada usando Python.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .py-100 { padding: 100px 0; }
    .mb-100 { margin-bottom: 100px; }
    
    .feature-card {
      overflow: hidden;
      .feature-img-box {
        position: relative;
        height: 200px;
        img { width: 100%; height: 100%; object-fit: cover; }
        .icon-overlay {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          background: var(--bg-gradient-main);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }
      }
    }

    .info-box {
      background: radial-gradient(circle at top right, hsla(260, 100%, 65%, 0.05), transparent);
    }
  `]
})
export class CaracteristicasComponent {
  featureList = [
    {
      title: 'Renderizado',
      icon: 'bootstrapMagic',
      description: 'Crea renders impresionantes con Cycles, el trazador de rutas de producción de alta gama.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Modelado',
      icon: 'bootstrapBox',
      description: 'Esculpido, retopología y curvas. El conjunto de herramientas de modelado es extenso.',
      image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Animación',
      icon: 'bootstrapCollectionPlay',
      description: 'Diseñado para animación de personajes avanzada con rigging de alto nivel.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'VFX & Composición',
      icon: 'bootstrapCameraVideo',
      description: 'Seguimiento de cámara, enmascarado y composición directamente en 3D.',
      image: 'https://images.unsplash.com/photo-1492110810112-084a7ae0e764?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Simulación',
      icon: 'bootstrapCpu',
      description: 'Fluidos, humo, pelo, telas y físicas de cuerpos rígidos con Bullet y MantaFlow.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Scripting Python',
      icon: 'bootstrapBrush',
      description: 'Cada herramienta está disponible vía API para automatización y nuevas herramientas.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600'
    }
  ];
}
