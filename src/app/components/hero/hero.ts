import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CourseService, CourseData } from '../../services/course';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section id="hero" class="hero-container d-flex align-items-center">
      <div class="glow-sphere pulse"></div>
      <div class="container position-relative">
        <div class="row align-items-center">
          <div class="col-lg-7" #heroContent>
            <span class="badge premium-badge mb-3">CONVIÉRTETE EN UN ARTISTA 3D</span>
            <h1 class="hero-title mb-4">
              Domina <span class="text-gradient">Blender</span> <br>
              de Cero a <span class="text-gradient">Pro</span>
            </h1>
            <p class="hero-lead mb-5">
              Únete al máster más completo de habla hispana. 5 meses de inmersión total 
              para transformar tu creatividad en una carrera profesional de alto nivel.
            </p>
            <div class="d-flex gap-4 flex-wrap">
              <a routerLink="/inscripcion" class="btn btn-primary-glow btn-lg">Empezar Máster</a>
              <a href="#modules" class="btn btn-outline-premium btn-lg">Ver Plan de Estudios</a>
            </div>
            
            <div class="mt-5 d-flex gap-5 stats-row">
              <div class="stat-item">
                <div class="stat-value">+{{data?.metrics?.students || 500}}</div>
                <div class="stat-label">Graduados</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{data?.metrics?.rating || 4.9}}</div>
                <div class="stat-label">Valoración</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">+{{data?.metrics?.hours || 120}}h</div>
                <div class="stat-label">Contenido</div>
              </div>
            </div>
          </div>
          
          <div class="col-lg-5 mt-5 mt-lg-0" #heroVisual>
            <div class="visual-wrapper glass-card">
              <div class="render-preview">
                <!-- Mostramos una imagen real de los assets si existe -->
                <img src="mazinkaiser_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_3146962.jpg" class="render-img" alt="3D Model">
              </div>
              <div class="floating-label">Blender 5.0 Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-container {
      min-height: 100vh;
      padding-top: 100px;
      overflow: hidden;
      position: relative;
      background: radial-gradient(circle at 10% 20%, hsla(230, 25%, 10%, 1) 0%, hsla(230, 25%, 5%, 1) 100%);
    }

    .glow-sphere {
      position: absolute;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
      top: -200px;
      right: -100px;
      z-index: 0;
      opacity: 0.6;
    }

    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      line-height: 1.1;
      font-weight: 800;
    }

    .hero-lead {
      font-size: 1.25rem;
      color: var(--text-muted);
      max-width: 600px;
      line-height: 1.8;
    }

    .premium-badge {
      background: hsla(260, 100%, 65%, 0.1);
      color: var(--primary);
      border: 1px solid var(--primary-glow);
      padding: 8px 18px;
      border-radius: 100px;
      font-weight: 700;
      display: inline-block;
    }

    /* Botones Corregidos y Visibles */
    .btn-primary-glow {
      background: var(--bg-gradient-main);
      color: white !important;
      border: none;
      padding: 1rem 2.5rem;
      border-radius: 15px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 40px -10px var(--primary-glow);
      transition: var(--transition-smooth);
      
      &:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 20px 50px -10px var(--primary-glow);
      }
    }

    .btn-outline-premium {
      background: rgba(255,255,255,0.05);
      color: white !important;
      border: 1px solid var(--glass-border);
      padding: 1rem 2.5rem;
      border-radius: 15px;
      font-weight: 700;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-smooth);
      
      &:hover {
        background: var(--glass);
        border-color: var(--primary);
        color: var(--primary) !important;
      }
    }

    .stat-value {
      font-family: var(--font-display);
      font-size: 2.2rem;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1;
    }
    .stat-label {
      color: var(--text-muted);
      font-size: 0.95rem;
      font-weight: 600;
      margin-top: 5px;
    }

    .visual-wrapper {
      padding: 12px;
      transform: perspective(1000px) rotateY(-10deg);
      border-radius: 30px;
      background: hsla(230, 25%, 15%, 0.4);
      
      .render-preview {
        height: 480px;
        border-radius: 22px;
        position: relative;
        overflow: hidden;
        background: black;
      }
      
      .render-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .floating-label {
      position: absolute;
      bottom: 40px;
      right: -20px;
      background: var(--bg-gradient-main);
      color: white;
      padding: 10px 20px;
      border-radius: 50px;
      font-weight: 800;
      font-family: var(--font-display);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 10;
    }

    @media (max-width: 991px) {
      .hero-container { padding-top: 140px; }
      .hero-title { font-size: 3rem; }
      .visual-wrapper { margin-top: 3rem; transform: none; }
    }
  `]
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroContent') content!: ElementRef;
  @ViewChild('heroVisual') visual!: ElementRef;
  
  private courseService = inject(CourseService);
  data?: CourseData;

  ngOnInit() {
    this.courseService.getCourseData().subscribe(res => this.data = res);
  }

  ngAfterViewInit() {
    if (this.content?.nativeElement?.children) {
      gsap.from(this.content.nativeElement.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5
      });
    }

    if (this.visual?.nativeElement) {
      gsap.from(this.visual.nativeElement, {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8
      });
    }
  }
}
