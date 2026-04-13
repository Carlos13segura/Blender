import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, CourseData } from '../../services/course';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ScrollRevealDirective],
  providers: [provideIcons({ bootstrapCheckCircleFill })],
  template: `
    <section id="instructor" class="py-100 bg-darker">
      <div class="container">
        <div class="glass-card p-5 instructor-wrapper" appScrollReveal>
          <div class="row align-items-center g-5">
            <div class="col-lg-4 text-center">
              <div class="image-stack">
                <div class="image-bg bg-gradient-main"></div>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&fit=crop" 
                     class="instructor-img" alt="Instructor">
              </div>
            </div>
            <div class="col-lg-8">
              <h4 class="text-primary fw-bold mb-2">TU INSTRUCTOR</h4>
              <h2 class="display-4 mb-3">{{data?.instructor?.name}}</h2>
              <h5 class="text-muted mb-4">{{data?.instructor?.title}}</h5>
              <p class="instructor-bio mb-4">{{data?.instructor?.bio}}</p>
              
              <div class="row g-3">
                <div class="col-md-6" *ngFor="let cred of data?.instructor?.credentials; let i = index">
                  <div class="d-flex align-items-center gap-3 credential-item" 
                       appScrollReveal [style.transitionDelay]="(i * 100) + 200 + 'ms'">
                    <ng-icon name="bootstrapCheckCircleFill" class="text-primary"></ng-icon>
                    <span>{{cred}}</span>
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
    .bg-darker { background-color: var(--bg-darker); }
    
    .instructor-wrapper {
      border: 1px solid var(--glass-border);
    }
    
    .image-stack {
      position: relative;
      display: inline-block;
      
      .image-bg {
        position: absolute;
        top: 20px;
        left: -20px;
        width: 100%;
        height: 100%;
        border-radius: 30px;
        z-index: 0;
        opacity: 0.3;
      }
      
      .instructor-img {
        position: relative;
        z-index: 1;
        border-radius: 30px;
        width: 280px;
        height: 280px;
        object-fit: cover;
        border: 4px solid var(--glass-border);
      }
    }
    
    .instructor-bio {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--text-muted);
    }
    
    .credential-item {
      background: hsla(230, 25%, 15%, 0.5);
      padding: 12px 20px;
      border-radius: 12px;
      border: 1px solid var(--glass-border);
      font-weight: 600;
      font-size: 0.95rem;
    }
  `]
})
export class InstructorComponent {
  private courseService = inject(CourseService);
  data?: CourseData;

  ngOnInit() {
    this.courseService.getCourseData().subscribe(res => this.data = res);
  }
}
