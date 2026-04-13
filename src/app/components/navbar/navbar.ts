import { Component, HostListener, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapHexagonFill } from '@ng-icons/bootstrap-icons';
import { lucideMenu, lucideX } from '@ng-icons/lucide';
import gsap from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, RouterLinkActive],
  providers: [provideIcons({ bootstrapHexagonFill, lucideMenu, lucideX })],
  template: `
    <nav class="navbar navbar-expand-lg fixed-top" [class.scrolled]="isScrolled">
      <div class="container" #navContainer>
        <a class="navbar-brand d-flex align-items-center gap-2" routerLink="/">
          <ng-icon name="bootstrapHexagonFill" class="brand-icon"></ng-icon>
          <span class="brand-text">DIGITAL<span>BLERD</span></span>
        </a>
        
        <button class="navbar-toggler" type="button" (click)="isMenuOpen = !isMenuOpen">
          <ng-icon [name]="isMenuOpen ? 'lucideX' : 'lucideMenu'"></ng-icon>
        </button>
        
        <div class="collapse navbar-collapse" [class.show]="isMenuOpen">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-3" #navList>
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/caracteristicas" routerLinkActive="active">Características</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/instalacion" routerLinkActive="active">Instalación</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/recursos" routerLinkActive="active">Recursos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/proyectos" routerLinkActive="active">Proyectos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/precios" routerLinkActive="active">Precios</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/blog" routerLinkActive="active">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/novedades" routerLinkActive="active">Novedades</a>
            </li>
            <li class="nav-item">
              <a class="btn btn-premium" routerLink="/inscripcion">Inscríbete</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      padding: 1.5rem 0;
      transition: var(--transition-smooth);
      background: transparent;
      z-index: 1000;
      
      &.scrolled {
        padding: 0.8rem 0;
        background: hsla(230, 25%, 7%, 0.85);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--glass-border);
      }
    }

    .brand-text {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.4rem;
      color: var(--text-main);
      span { color: var(--primary); }
    }

    .brand-icon {
      font-size: 1.8rem;
      color: var(--primary);
      filter: drop-shadow(0 0 10px var(--primary-glow));
    }

    .nav-link {
      color: var(--text-muted);
      font-weight: 500;
      font-family: var(--font-display);
      transition: var(--transition-smooth);
      position: relative;
      
      &:hover, &.active {
        color: var(--primary);
      }
      
      &.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--bg-gradient-main);
        border-radius: 2px;
      }
    }

    .btn-premium {
      background: var(--bg-gradient-main);
      color: white;
      border: none;
      padding: 0.6rem 1.5rem;
      border-radius: 12px;
      font-weight: 700;
      box-shadow: 0 10px 20px -5px var(--primary-glow);
      transition: var(--transition-smooth);
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 15px 30px -5px var(--primary-glow);
        color: white;
      }
    }

    .navbar-toggler {
      border: none;
      color: white;
      font-size: 1.5rem;
    }

    @media (max-width: 991px) {
      .navbar-collapse {
        background: var(--bg-dark);
        padding: 1.5rem;
        border-radius: 20px;
        margin-top: 1rem;
        border: 1px solid var(--glass-border);
      }
    }
  `]
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navContainer') container!: ElementRef;
  @ViewChild('navList') list!: ElementRef;
  
  isScrolled = false;
  isMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  ngAfterViewInit() {
    gsap.from(this.container.nativeElement, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    });
    
    if (this.list?.nativeElement?.children) {
      gsap.from(this.list.nativeElement.children, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }
}
