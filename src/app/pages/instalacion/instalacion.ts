import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMonitor, lucideApple, lucideTerminal, lucideCheckCircle2, lucideExternalLink } from '@ng-icons/lucide';

@Component({
  selector: 'app-instalacion',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent],
  providers: [provideIcons({ lucideMonitor, lucideApple, lucideTerminal, lucideCheckCircle2, lucideExternalLink })],
  template: `
    <section class="install-page py-100 pb-5">
      <div class="container mt-5">
        <div class="text-center mb-5" appScrollReveal>
          <h1 class="display-3 mb-3">Guía de <span class="text-gradient">Instalación</span></h1>
          <p class="lead text-muted mx-auto" style="max-width: 700px;">
            Sigue estos sencillos pasos para tener Blender listo en tu equipo, sin importar qué sistema operativo uses.
          </p>
        </div>

        <!-- OS Tabs -->
        <div class="row justify-content-center mt-5" appScrollReveal>
          <div class="col-lg-10">
            <div class="glass-card p-0 overflow-hidden">
              <div class="d-flex border-bottom border-secondary">
                <button *ngFor="let os of osOptions" 
                        (click)="activeOS = os.id"
                        [class.active]="activeOS === os.id"
                        class="os-tab flex-grow-1 p-4 d-flex align-items-center justify-content-center gap-2">
                  <ng-icon [name]="os.icon"></ng-icon>
                  <span>{{os.label}}</span>
                </button>
              </div>

              <div class="p-5">
                <div *ngFor="let os of osOptions" [hidden]="activeOS !== os.id">
                  <h2 class="h3 mb-4 d-flex align-items-center gap-3">
                    <ng-icon [name]="os.icon" class="text-primary"></ng-icon>
                    Blender en {{os.label}}
                  </h2>
                  
                  <div class="install-steps">
                    <div class="step-item d-flex gap-4 mb-4" *ngFor="let step of os.steps; let i = index">
                      <div class="step-num">{{i + 1}}</div>
                      <div>
                        <h4 class="h5 mb-2">{{step.title}}</h4>
                        <p class="text-muted mb-0">{{step.text}}</p>
                      </div>
                    </div>
                  </div>

                  <div class="requirements mt-5 p-4 rounded-4 bg-dark border border-secondary">
                    <h4 class="h6 mb-3 d-flex align-items-center gap-2">
                      <ng-icon name="lucideCheckCircle2" class="text-success"></ng-icon>
                      Requisitos Recomendados
                    </h4>
                    <ul class="list-unstyled text-muted small row g-2">
                      <li class="col-md-6">• 16 GB RAM</li>
                      <li class="col-md-6">• NVIDIA RTX serie 3000 o compatible</li>
                      <li class="col-md-6">• 2 GB espacio libre SSD</li>
                      <li class="col-md-6">• Monitor Full HD</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .py-100 { padding: 100px 0; }
    
    .os-tab {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-weight: 600;
      transition: var(--transition-smooth);
      border-bottom: 2px solid transparent;
      
      &.active {
        color: var(--primary);
        background: rgba(255,255,255,0.03);
        border-bottom-color: var(--primary);
      }
      
      &:hover:not(.active) {
        background: rgba(255,255,255,0.01);
      }
    }

    .step-num {
      width: 35px;
      height: 35px;
      background: var(--bg-gradient-main);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      flex-shrink: 0;
    }
  `]
})
export class InstalacionComponent {
  activeOS = 'windows';

  osOptions = [
    {
      id: 'windows',
      label: 'Windows',
      icon: 'lucideMonitor',
      steps: [
        { title: 'Descargar Instalador', text: 'Ve a blender.org y baja el archivo .msi para Windows.' },
        { title: 'Ejecutar Setup', text: 'Abre el instalador y sigue las instrucciones del asistente.' },
        { title: 'Finalizar', text: 'Una vez instalado, abre Blender desde el menú de inicio.' }
      ]
    },
    {
      id: 'macos',
      label: 'macOS',
      icon: 'lucideApple',
      steps: [
        { title: 'Descargar DMG', text: 'Elige la versión Intel o Apple Silicon según tu procesador.' },
        { title: 'Arrastrar a Aplicaciones', text: 'Abre el DMG y mueve el icono de Blender a tu carpeta de Apps.' },
        { title: 'Autorizar ejecución', text: 'Si el sistema te bloquea, ve a Ajustes > Seguridad para autorizar.' }
      ]
    },
    {
      id: 'linux',
      label: 'Linux',
      icon: 'lucideTerminal',
      steps: [
        { title: 'Usar Snap', text: 'Ejecuta: sudo snap install blender --classic' },
        { title: 'Alternativa Tarball', text: 'Descarga el tar.xz, extráelo y ejecuta el binario directamente.' },
        { title: 'Dependencias', text: 'Asegúrate de tener instalados los drivers de video propietarios.' }
      ]
    }
  ];
}
