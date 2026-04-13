import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapJournalBookmarkFill, bootstrapPlayBtnFill, bootstrapPeopleFill, bootstrapGridFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent],
  providers: [provideIcons({ bootstrapJournalBookmarkFill, bootstrapPlayBtnFill, bootstrapPeopleFill, bootstrapGridFill })],
  template: `
    <section class="resources-page py-100">
      <div class="container mt-5">
        <div class="text-center mb-5" appScrollReveal>
          <h1 class="display-3 mb-3">Recursos para <span class="text-gradient">Artistas</span></h1>
          <p class="lead text-muted mx-auto" style="max-width: 700px;">
            Descarga assets, consulta la documentación oficial y únete a comunidades globales de Blender.
          </p>
        </div>

        <div class="row g-4 mt-5">
          <div class="col-md-6 col-lg-3" *ngFor="let resource of resourceGroups; let i = index">
            <div class="glass-card resource-card p-4 text-center h-100" appScrollReveal [style.transitionDelay]="i * 100 + 'ms'">
              <div class="icon-sq bg-gradient-main mb-4 mx-auto">
                <ng-icon [name]="resource.icon"></ng-icon>
              </div>
              <h3 class="h5 mb-3">{{resource.title}}</h3>
              <p class="text-muted small mb-4">{{resource.text}}</p>
              <a [href]="resource.link" target="_blank" class="btn btn-outline-premium btn-sm w-100">Explorar</a>
            </div>
          </div>
        </div>

        <!-- Featured Assets -->
        <div class="mt-100" appScrollReveal>
          <h2 class="h3 mb-5">Assets Destacados</h2>
          <div class="row g-4">
            <div class="col-md-4" *ngFor="let asset of featuredAssets">
              <div class="glass-card p-0 overflow-hidden asset-item">
                <img [src]="asset.img" class="w-100" style="height: 180px; object-fit: cover;">
                <div class="p-4">
                  <h4 class="h6 mb-2">{{asset.name}}</h4>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="badge bg-success">Gratis</span>
                    <button class="btn btn-link text-primary p-0 text-decoration-none">Descargar</button>
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
    .mt-100 { margin-top: 100px; }
    
    .icon-sq {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
    }

    .asset-item {
      transition: var(--transition-smooth);
      &:hover { transform: translateY(-5px); }
    }
  `]
})
export class RecursosComponent {
  resourceGroups = [
    { title: 'Documentación', icon: 'bootstrapJournalBookmarkFill', text: 'El manual oficial de Blender en español.', link: 'https://docs.blender.org/' },
    { title: 'Cursos Video', icon: 'bootstrapPlayBtnFill', text: 'Tutoriales esenciales en YouTube y Vimeo.', link: '#' },
    { title: 'Comunidad', icon: 'bootstrapPeopleFill', text: 'Foros y grupos de Discord para artistas.', link: '#' },
    { title: 'Addons', icon: 'bootstrapGridFill', text: 'Herramientas que potencian tu flujo de trabajo.', link: '#' }
  ];

  featuredAssets = [
    { name: 'Pack de Texturas PBR', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&h=200&fit=crop' },
    { name: 'Modelos de Vegetación', img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=400&h=200&fit=crop' },
    { name: 'HDRI Studio Pack', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=200&fit=crop' }
  ];
}
