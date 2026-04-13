import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, CourseData } from '../../services/course';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapClock, bootstrapBox, bootstrapLayers, bootstrapStars } from '@ng-icons/bootstrap-icons';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ScrollRevealDirective],
  providers: [provideIcons({ bootstrapClock, bootstrapBox, bootstrapLayers, bootstrapStars })],
  template: `
    <section id="modules" class="py-100 position-relative">
      <div class="container">
        <div class="text-center mb-5 mt-5" appScrollReveal>
          <h2 class="display-3 mb-3">Plan de <span class="text-gradient">Estudios</span></h2>
          <p class="text-muted lead mx-auto" style="max-width: 600px;">
            Un recorrido diseñado paso a paso para que domines todas las áreas del 3D moderno.
          </p>
        </div>
        
        <div class="row g-4 mt-4">
          <div class="col-md-6 col-lg-3" *ngFor="let module of data?.modules; let i = index">
            <div class="glass-card module-card h-100" appScrollReveal [style.transitionDelay]="i * 100 + 'ms'">
              <div class="module-number">0{{i + 1}}</div>
              <div class="module-icon-container mb-4">
                <ng-icon [name]="getIcon(i)" class="module-icon"></ng-icon>
              </div>
              <h3 class="h4 mb-3">{{module.title}}</h3>
              <p class="text-muted small mb-4">{{module.description}}</p>
              <div class="d-flex align-items-center gap-2 duration-tag">
                <ng-icon name="bootstrapClock"></ng-icon>
                <span>{{module.duration}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .py-100 { padding: 100px 0; }
    
    .module-card {
      padding: 2.5rem;
      position: relative;
      overflow: hidden;
      
      .module-number {
        position: absolute;
        top: 20px;
        right: 20px;
        font-family: var(--font-display);
        font-size: 3rem;
        font-weight: 800;
        opacity: 0.05;
        color: var(--primary);
      }
    }

    .module-icon-container {
      width: 60px;
      height: 60px;
      background: hsla(260, 100%, 65%, 0.1);
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
      font-size: 1.8rem;
      border: 1px solid var(--primary-glow);
    }

    .duration-tag {
      font-weight: 700;
      font-size: 0.85rem;
      color: var(--secondary);
      background: hsla(190, 100%, 50%, 0.1);
      padding: 6px 12px;
      border-radius: 8px;
      display: inline-flex;
    }

    h3 { font-size: 1.25rem; font-weight: 700; }
  `]
})
export class CourseDetailsComponent {
  private courseService = inject(CourseService);
  data?: CourseData;

  ngOnInit() {
    this.courseService.getCourseData().subscribe(res => this.data = res);
  }

  getIcon(index: number): string {
    const icons = ['bootstrapBox', 'bootstrapLayers', 'bootstrapBox', 'bootstrapStars'];
    return icons[index % icons.length];
  }
}
