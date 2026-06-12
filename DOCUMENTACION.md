# Documentación del Proyecto: DIGITALBLERD - App-Blender

> **Plataforma web** para el máster **DIGITALBLERD**, un curso online de Blender 3D y Animación Profesional.
>
> **Stack:** Angular 21 (Standalone Components) · TypeScript 5.9 · Bootstrap 5.3 · GSAP 3.14 · Supabase · RxJS

---

## Índice

1. [Arquitectura General](#1-arquitectura-general)
2. [Punto de Entrada: `main.ts`](#2-punto-de-entrada-maints)
3. [Configuración Global: `app.config.ts`](#3-configuracion-global-appconfigts)
4. [Sistema de Rutas: `app.routes.ts`](#4-sistema-de-rutas-approutests)
5. [Componente Raíz: `app.ts`](#5-componente-raiz-appts)
6. [Estilos Globales: `styles.scss`](#6-estilos-globales-stylesscss)
7. [Servicios](#7-servicios)
   - [SupabaseService](#71-supabaseservicets)
   - [CourseService](#72-courseservicets)
8. [Directiva ScrollReveal](#8-directiva-scrollreveal)
9. [Componentes Compartidos](#9-componentes-compartidos)
   - [NavbarComponent](#91-navbar)
   - [HeroComponent](#92-hero)
   - [CourseDetailsComponent](#93-course-details)
   - [InstructorComponent](#94-instructor)
   - [ContactComponent](#95-contact)
   - [FooterComponent](#96-footer)
   - [NotificationComponent](#97-notification)
10. [Páginas (Rutas)](#10-paginas-rutas)
    - [HomeComponent](#101-home)
    - [BlogComponent](#102-blog)
    - [ProyectosComponent](#103-proyectos)
    - [PreciosComponent](#104-precios)
    - [InscripcionComponent](#105-inscripcion)
    - [CaracteristicasComponent](#106-caracteristicas)
    - [InstalacionComponent](#107-instalacion)
    - [RecursosComponent](#108-recursos)
    - [TutorialesComponent](#109-tutoriales)
    - [NovedadesComponent](#1010-novedades)
    - [AdminComponent](#1011-admin)
11. [Configuración del Proyecto](#11-configuracion-del-proyecto)
12. [Guía para Capturas con CodeSnap](#12-guia-para-capturas-con-codesnap)

---

## 1. Arquitectura General

```
src/
├── main.ts                  ← Bootstrap de la app
├── index.html               ← HTML raíz (SEO, meta tags, Schema.org)
├── styles.scss              ← Estilos globales (tema oscuro, glassmorphism)
└── app/
    ├── app.ts               ← Componente raíz (AppComponent)
    ├── app.config.ts        ← Providers globales (Router, HttpClient, Animations)
    ├── app.routes.ts        ← Definición de rutas (10 rutas lazy-load)
    ├── directives/
    │   └── scroll-reveal.ts ← Directiva de animación por scroll
    ├── services/
    │   ├── supabase.ts      ← Cliente Supabase (BD PostgreSQL)
    │   └── course.ts        ← Lógica de negocio + fallback data
    ├── components/
    │   ├── navbar/          ← Barra de navegación (GSAP animations)
    │   ├── hero/            ← Hero section (landing page)
    │   ├── course-details/  ← Plan de estudios (módulos del curso)
    │   ├── instructor/      ← Sección del instructor
    │   ├── contact/         ← Formulario de contacto
    │   ├── footer/          ← Pie de página
    │   └── notification/    ← Sistema de notificaciones toast
    └── pages/
        ├── home/            ← Ruta: /
        ├── blog/            ← Ruta: /blog
        ├── proyectos/       ← Ruta: /proyectos
        ├── precios/         ← Ruta: /precios
        ├── inscripcion/     ← Ruta: /inscripcion
        ├── caracteristicas/ ← Ruta: /caracteristicas
        ├── instalacion/     ← Ruta: /instalacion
        ├── recursos/        ← Ruta: /recursos
        ├── tutoriales/      ← Ruta: /tutoriales
        ├── novedades/       ← Ruta: /novedades
        └── admin/           ← Ruta: /admin
```

---

## 2. Punto de Entrada: `main.ts`

**Archivo:** `src/main.ts`

```typescript
import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

> **Descripción:** Arranca la aplicación Angular usando la API de **standalone components** (sin `NgModule`). `bootstrapApplication` recibe el componente raíz y la configuración global.

---

## 3. Configuración Global: `app.config.ts`

**Archivo:** `src/app/app.config.ts`

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
  ],
};
```

> **Descripción:** Configura los providers globales:
>
> - `provideZoneChangeDetection` → Optimiza la detección de cambios
> - `provideRouter` → Sistema de enrutamiento con las rutas definidas
> - `provideHttpClient` → Cliente HTTP para peticiones a APIs
> - `provideAnimations` → Habilita el sistema de animaciones de Angular

---

## 4. Sistema de Rutas: `app.routes.ts`

**Archivo:** `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog').then((m) => m.BlogComponent) },
  {
    path: 'proyectos',
    loadComponent: () => import('./pages/proyectos/proyectos').then((m) => m.ProyectosComponent),
  },
  {
    path: 'precios',
    loadComponent: () => import('./pages/precios/precios').then((m) => m.PreciosComponent),
  },
  {
    path: 'inscripcion',
    loadComponent: () =>
      import('./pages/inscripcion/inscripcion').then((m) => m.InscripcionComponent),
  },
  {
    path: 'caracteristicas',
    loadComponent: () =>
      import('./pages/caracteristicas/caracteristicas').then((m) => m.CaracteristicasComponent),
  },
  {
    path: 'instalacion',
    loadComponent: () =>
      import('./pages/instalacion/instalacion').then((m) => m.InstalacionComponent),
  },
  {
    path: 'recursos',
    loadComponent: () => import('./pages/recursos/recursos').then((m) => m.RecursosComponent),
  },
  {
    path: 'tutoriales',
    loadComponent: () => import('./pages/tutoriales/tutoriales').then((m) => m.TutorialesComponent),
  },
  {
    path: 'novedades',
    loadComponent: () => import('./pages/novedades/novedades').then((m) => m.NovedadesComponent),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin').then((m) => m.AdminComponent),
  },
  { path: '**', redirectTo: '' },
];
```

> **Descripción:** Define **11 rutas**:
>
> - `/` → HomeComponent (cargada **eagerly**)
> - `/blog`, `/proyectos`, `/precios`, `/inscripcion`, `/caracteristicas`, `/instalacion`, `/recursos`, `/tutoriales`, `/novedades`, `/admin` → Carga **lazy** con `loadComponent`
> - `**` → Redirección wildcard a home

---

## 5. Componente Raíz: `app.ts`

**Archivo:** `src/app/app.ts`

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';
import { NotificationComponent } from './components/notification/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, NotificationComponent],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-notification></app-notification>
  `,
  styleUrl: './app.scss',
})
export class AppComponent {
  title = 'blender-app';
}
```

> **Descripción:** El componente raíz combina:
>
> 1. **Navbar** – Barra de navegación fija en la parte superior
> 2. **RouterOutlet** – Donde se renderizan las páginas según la ruta activa
> 3. **Footer** – Pie de página global
> 4. **Notification** – Sistema de notificaciones toast (superpuesto)

---

## 6. Estilos Globales: `styles.scss`

**Archivo:** `src/styles.scss`

```scss
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap');

:root {
  /* Dynamic Palette */
  --bg-dark: hsl(230, 25%, 7%);
  --bg-darker: hsl(230, 25%, 5%);
  --text-main: hsl(0, 0%, 95%);
  --text-muted: hsl(230, 10%, 65%);

  --primary: hsl(260, 100%, 65%);
  --primary-glow: hsla(260, 100%, 65%, 0.3);
  --secondary: hsl(190, 100%, 50%);
  --accent: hsl(320, 100%, 60%);

  --glass: hsla(230, 25%, 12%, 0.6);
  --glass-border: hsla(230, 25%, 25%, 0.4);

  --font-display: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;

  --transition-smooth: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
...
```

> **Descripción:** Define el **tema oscuro personalizado** con:
>
> - Paleta de colores: púrpura (`--primary`), cyan (`--secondary`), rosa (`--accent`)
> - Tipografía: `Syne` para títulos, `Plus Jakarta Sans` para cuerpo
> - Clases utilitarias: `.glass-card` (glassmorphism), `.text-gradient` (gradiente en texto), `.reveal`/`.visible` (animaciones scroll)
> - Importa Bootstrap 5.3 y Bootstrap Icons

---

## 7. Servicios

### 7.1. `SupabaseService`

**Archivo:** `src/app/services/supabase.ts`

```typescript
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase?: SupabaseClient;

  constructor() {
    const supabaseUrl = 'YOUR_SUPABASE_URL';
    const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

    if (supabaseUrl && supabaseUrl.startsWith('https://')) {
      try {
        this.supabase = createClient(supabaseUrl, supabaseKey);
      } catch (e) {
        console.error('Error al inicializar Supabase:', e);
      }
    } else {
      console.warn('Supabase: URL no configurada o inválida.');
    }
  }

  get client() {
    return this.supabase;
  }

  async getCourseData() {
    if (!this.supabase) {
      throw new Error('Supabase no está configurado');
    }
    const { data: course, error: courseError } = await this.supabase
      .from('course')
      .select(`*, instructor (*), modules (*)`)
      .single();
    if (courseError) throw courseError;
    return course;
  }

  async sendContact(contact: { name: string; email: string; message: string }) {
    if (!this.supabase) {
      throw new Error('Supabase no está configurado');
    }
    const { data, error } = await this.supabase.from('contacts').insert([contact]);
    if (error) throw error;
    return data;
  }
}
```

> **Descripción:** Wrapper del cliente **Supabase**. Características:
>
> - Validación de URL antes de inicializar (evita errores en dev)
> - `getCourseData()` → Consulta `course` con joins a `instructor` y `modules`
> - `sendContact()` → Inserta en la tabla `contacts`
> - Getter `client` para acceso directo al cliente Supabase

---

### 7.2. `CourseService`

**Archivo:** `src/app/services/course.ts`

```typescript
export interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
}

export interface Instructor {
  name: string;
  title: string;
  bio: string;
  credentials: string[];
}

export interface Metrics {
  students: number;
  rating: number;
  hours: number;
  projects: number;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  createdAt: Date;
}

export interface CourseData {
  title: string;
  instructor: Instructor;
  metrics: Metrics;
  modules: Module[];
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  private supabase = inject(SupabaseService);

  private fallbackData: CourseData = { ... };
  public tutorialAdded$ = new Subject<Tutorial>();
  private localTutorials: Tutorial[] = [...];

  getCourseData(): Observable<CourseData> { ... }
  sendContact(contact): Observable<any> { ... }
  getTutorials(): Observable<Tutorial[]> { ... }
  addTutorial(tutorial): Observable<Tutorial> { ... }
}
```

> **Descripción:** **Capa de negocio** entre Supabase y los componentes:
>
> - **Fallback data**: Datos mock hardcodeados para que la UI funcione sin backend
> - **`getCourseData()`**: Intenta Supabase, si falla → datos de respaldo
> - **`sendContact()`**: Envía formulario a Supabase; si falla → simula éxito
> - **`tutorialAdded$`**: `Subject` de RxJS para notificaciones en tiempo real
> - **`addTutorial()`**: Agrega tutorial localmente y emite evento
>
> **Interfaces exportadas:** `Module`, `Instructor`, `Metrics`, `Tutorial`, `CourseData`

---

## 8. Directiva ScrollReveal

**Archivo:** `src/app/directives/scroll-reveal.ts`

```typescript
import { Directive, ElementRef, AfterViewInit, inject } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.el.nativeElement.classList.add('visible');
            observer.unobserve(this.el.nativeElement);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      },
    );

    this.el.nativeElement.classList.add('reveal');
    observer.observe(this.el.nativeElement);
  }
}
```

> **Descripción:** Directiva standalone que aplica animaciones al hacer scroll usando **IntersectionObserver**:
>
> - Agrega clase `reveal` inicialmente (oculta el elemento con opacity/translateY)
> - Cuando el elemento entra en viewport, agrega `visible` (lo muestra con transición suave)
> - Se desconecta (`unobserve`) después de la primera activación
> - Configurable vía `transitionDelay` desde el HTML

---

## 9. Componentes Compartidos

### 9.1. Navbar

**Archivo:** `src/app/components/navbar/navbar.ts`

```typescript
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, RouterLinkActive],
  providers: [provideIcons({ bootstrapHexagonFill, lucideMenu, lucideX })],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('navContainer') container!: ElementRef;
  @ViewChild('navList') navList!: ElementRef;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;
  @ViewChildren('navLink') navLinks!: QueryList<ElementRef>;
  isScrolled = false;
  isMenuOpen = false;

  toggleMobileMenu() {
    /* GSAP fade toggle */
  }
  closeMenu(event: Event) {
    /* Cerrar menú al hacer clic fuera */
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = offset > 50;
  }

  ngAfterViewInit() {
    gsap.from(this.container.nativeElement, { y: -50, opacity: 0, duration: 0.8 });
    gsap.from(links, { y: 20, opacity: 0, stagger: 0.07, delay: 0.3, duration: 0.5 });
  }
}
```

> **Descripción:** Barra de navegación responsive con:
>
> - **GSAP animations** al cargar (slide down + stagger en links)
> - **Scroll detection** → cambia de fondo transparente a blurred cuando scrollea > 50px
> - **Menú mobile** full-screen con overlay y GSAP fade
> - **11 enlaces** de navegación + CTA "Inscríbete"
> - Iconos de Lucide + Bootstrap

**Template:** `src/app/components/navbar/navbar.html`

```html
<nav class="navbar navbar-expand-lg fixed-top" [class.scrolled]="isScrolled">
  <div class="container" #navContainer>
    <a class="navbar-brand" routerLink="/">
      <ng-icon name="bootstrapHexagonFill" class="brand-icon"></ng-icon>
      <span class="brand-text">DIGITAL<span>BLERD</span></span>
    </a>

    <button class="navbar-toggler" (click)="toggleMobileMenu()">
      <ng-icon [name]="isMenuOpen ? 'lucideX' : 'lucideMenu'"></ng-icon>
    </button>

    <div class="desktop-nav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-3" #navList>
        <li class="nav-item">
          <a
            #navLink
            class="nav-link"
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact: true}"
          >
            <ng-icon name="lucideHome"></ng-icon> Inicio
          </a>
        </li>
        <!-- ... más links: Características, Instalación, Recursos, Tutoriales, Proyectos, Precios, Blog, Novedades, Admin, Inscríbete -->
      </ul>
    </div>

    <div #mobileMenu class="mobile-menu" [class.open]="isMenuOpen" (click)="closeMenu($event)">
      <!-- Versión mobile de los links -->
    </div>
  </div>
</nav>
```

**Estilos:** `src/app/components/navbar/navbar.scss`

```scss
.navbar {
  z-index: 1150;
  padding: 1.5rem 0;
  transition: var(--transition-smooth);
  background: transparent;

  &.scrolled {
    padding: 0.8rem 0;
    background: hsla(230, 25%, 7%, 0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
  }
}

.nav-link {
  color: var(--text-muted);
  &::after {
    /* underline animation on hover */
  }
  &.active::after {
    width: 100%;
  }
}

.btn-premium {
  background: var(--bg-gradient-main);
  box-shadow: 0 10px 20px -5px var(--primary-glow);
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  opacity: 0;
  pointer-events: none;
  z-index: 1200;
}
```

> **Captura recomendada:** Todo el archivo `navbar.ts` (muestra ViewChildren, GSAP, HostListener)

---

### 9.2. Hero

**Archivo:** `src/app/components/hero/hero.ts`

```typescript
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroContent') content!: ElementRef;
  @ViewChild('heroVisual') visual!: ElementRef;

  private courseService = inject(CourseService);
  data?: CourseData;

  ngOnInit() {
    this.courseService.getCourseData().subscribe((res) => (this.data = res));
  }

  ngAfterViewInit() {
    gsap.from(this.content.nativeElement.children, {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out',
      delay: 0.5,
    });
    gsap.from(this.visual.nativeElement, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.8,
    });
  }
}
```

**Template:** `src/app/components/hero/hero.html`

```html
<section id="hero" class="hero-container d-flex align-items-center">
  <div class="glow-sphere pulse"></div>
  <div class="container position-relative">
    <div class="row align-items-center">
      <div class="col-lg-7" #heroContent>
        <span class="badge premium-badge mb-3">CONVIÉRTETE EN UN ARTISTA 3D</span>
        <h1 class="hero-title mb-4">
          Domina <span class="text-gradient">Blender</span> <br />
          de Cero a <span class="text-gradient">Pro</span>
        </h1>
        <p class="hero-lead mb-5">Únete al máster más completo de habla hispana...</p>
        <div class="d-flex gap-4 flex-wrap stats-row-buttons">
          <a routerLink="/inscripcion" class="btn btn-primary-glow btn-lg">Empezar Máster</a>
          <a href="#modules" class="btn btn-outline-premium btn-lg">Ver Plan de Estudios</a>
        </div>
        <div class="mt-5 d-flex gap-5 stats-row">
          <div class="stat-item">
            <div class="stat-value">+{{data?.metrics?.students || 120}}</div>
            <div class="stat-label">Proyectos</div>
          </div>
          <!-- ... más métricas -->
        </div>
      </div>
      <div class="col-lg-5 mt-5 mt-lg-0" #heroVisual>
        <div class="visual-wrapper glass-card">
          <div class="render-preview">
            <img src="mazinkaiser_3d_model_..." class="render-img" alt="3D Model" />
          </div>
          <div class="floating-label">Blender 5.0 Ready</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

> **Descripción:** Hero section de la landing page con:
>
> - Esfera de glow decorativa
> - Título con gradiente, badge, y párrafo
> - **GSAP stagger** en los hijos del contenido (fade-in up)
> - **GSAP slide** en el panel visual (fade-in right)
> - **Métricas dinámicas** desde `CourseService` (students, rating, hours)
> - Imagen 3D con efecto rotateY(-10deg) y badge "Blender 5.0 Ready"

---

### 9.3. Course Details

**Archivo:** `src/app/components/course-details/course-details.ts`

```typescript
@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ScrollRevealDirective],
  providers: [provideIcons({ bootstrapClock, bootstrapBox, bootstrapLayers, bootstrapStars })],
  templateUrl: './course-details.html',
  styleUrls: ['./course-details.scss'],
})
export class CourseDetailsComponent {
  private courseService = inject(CourseService);
  data?: CourseData;

  ngOnInit() {
    this.courseService.getCourseData().subscribe((res) => (this.data = res));
  }

  getIcon(index: number): string {
    const icons = ['bootstrapBox', 'bootstrapLayers', 'bootstrapBox', 'bootstrapStars'];
    return icons[index % icons.length];
  }
}
```

**Template:** `src/app/components/course-details/course-details.html`

```html
<section id="modules" class="py-100 position-relative">
  <div class="container">
    <div class="text-center mb-5 mt-5" appScrollReveal>
      <h2 class="display-3 mb-3">Plan de <span class="text-gradient">Estudios</span></h2>
      <p class="text-muted lead mx-auto" style="max-width: 600px;">...</p>
    </div>

    <div class="row g-4 mt-4">
      <div class="col-md-6 col-lg-3" *ngFor="let module of data?.modules; let i = index">
        <div
          class="glass-card module-card h-100"
          appScrollReveal
          [style.transitionDelay]="i * 100 + 'ms'"
        >
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
```

> **Descripción:** Grid de 4 columnas con los módulos del curso:
>
> - Usa `ScrollRevealDirective` con `transitionDelay` progresivo
> - Cada módulo muestra: número (01-04), icono, título, descripción, duración
> - Iconos cíclicos: Box → Layers → Box → Stars

---

### 9.4. Instructor

**Archivo:** `src/app/components/instructor/instructor.ts`

```typescript
@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule, NgIconComponent, ScrollRevealDirective],
  providers: [provideIcons({ bootstrapCheckCircleFill })],
  templateUrl: './instructor.html',
  styleUrls: ['./instructor.scss'],
})
export class InstructorComponent {
  private courseService = inject(CourseService);
  data?: CourseData;

  ngOnInit() {
    this.courseService.getCourseData().subscribe((res) => (this.data = res));
  }
}
```

**Template:** `src/app/components/instructor/instructor.html`

```html
<section id="instructor" class="py-100 bg-darker">
  <div class="container">
    <div class="glass-card p-5 instructor-wrapper" appScrollReveal>
      <div class="row align-items-center g-5">
        <div class="col-lg-4 text-center">
          <div class="image-stack">
            <div class="image-bg bg-gradient-main"></div>
            <img src="" class="instructor-img" alt="Instructor" />
          </div>
        </div>
        <div class="col-lg-8">
          <h4 class="text-primary fw-bold mb-2">TU INSTRUCTOR</h4>
          <h2 class="display-4 mb-3">{{data?.instructor?.name}}</h2>
          <h5 class="text-muted mb-4">{{data?.instructor?.title}}</h5>
          <p class="instructor-bio mb-4">{{data?.instructor?.bio}}</p>

          <div class="row g-3">
            <div class="col-md-6" *ngFor="let cred of data?.instructor?.credentials; let i = index">
              <div class="d-flex align-items-center gap-3 credential-item" appScrollReveal>
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
```

> **Descripción:** Sección del instructor con:
>
> - Card glassmorphism con layout de dos columnas
> - Avatar placeholder (imagen por configurar)
> - Nombre, título, biografía desde `CourseService`
> - Lista de credenciales con iconos checkmark y scroll-reveal

---

### 9.5. Contact

**Archivo:** `src/app/components/contact/contact.ts`

```typescript
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
})
export class ContactComponent {
  private courseService = inject(CourseService);

  contact = { name: '', email: '', message: '' };
  isSubmitting = false;
  successMessage = '';

  onSubmit() {
    this.isSubmitting = true;
    this.courseService.sendContact(this.contact).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.contact = { name: '', email: '', message: '' };
        this.isSubmitting = false;
        setTimeout(() => (this.successMessage = ''), 5000);
      },
      error: () => {
        this.isSubmitting = false;
        alert('Error');
      },
    });
  }
}
```

**Template:** `src/app/components/contact/contact.html`

```html
<section id="contact" class="py-100 position-relative">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 text-center">
        <h2 class="display-4 mb-3" appScrollReveal>
          ¿Listo para <span class="text-gradient">Empezar?</span>
        </h2>
        <div class="glass-card p-4 p-md-5 text-start" appScrollReveal>
          <form (submit)="onSubmit()">
            <input
              type="text"
              [(ngModel)]="contact.name"
              name="name"
              class="form-control premium-input"
              required
            />
            <input
              type="email"
              [(ngModel)]="contact.email"
              name="email"
              class="form-control premium-input"
              required
            />
            <textarea
              [(ngModel)]="contact.message"
              name="message"
              class="form-control premium-input"
            ></textarea>
            <button type="submit" class="btn btn-primary-glow w-100 py-3">
              {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>
            <div *ngIf="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
```

> **Descripción:** Formulario de contacto con:
>
> - **Two-way binding** con `ngModel` (FormsModule)
> - Validación HTML5 (`required`)
> - Estados de carga y éxito con timeout de 5s
> - Fallback a simulación si Supabase no responde (en `CourseService`)

---

### 9.6. Footer

**Archivo:** `src/app/components/footer/footer.ts`

```typescript
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [
    provideIcons({
      bootstrapHexagonFill,
      bootstrapInstagram,
      bootstrapTwitterX,
      bootstrapYoutube,
      bootstrapDiscord,
    }),
  ],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent {}
```

**Template:** `src/app/components/footer/footer.html`

```html
<footer class="footer py-80">
  <div class="container">
    <div class="row g-5">
      <div class="col-lg-4">
        <!-- Branding: icon + DIGITALBLERD -->
        <!-- Redes sociales: Instagram, Twitter, YouTube, Discord -->
      </div>
      <div class="col-lg-2 col-md-4">
        <h6>Explorar</h6>
        <ul>
          <li><a>Cursos</a></li>
          <li><a>Tutoriales</a></li>
          <li><a>Recursos</a></li>
          <li><a>Comunidad</a></li>
        </ul>
      </div>
      <div class="col-lg-2 col-md-4">
        <h6>Soporte</h6>
        <ul>
          <li><a>FAQ</a></li>
          <li><a>Contacto</a></li>
          <li><a>Privacidad</a></li>
          <li><a>Términos</a></li>
        </ul>
      </div>
      <div class="col-lg-4 col-md-4">
        <h6>Newsletter</h6>
        <input type="email" placeholder="Tu email" />
        <button>Suscribirse</button>
      </div>
    </div>
    <hr />
    <div class="text-center text-muted small">
      © 2026 DIGITALBLERD. Todos los derechos reservados.
    </div>
  </div>
</footer>
```

> **Descripción:** Footer con 4 columnas: branding + redes, explorar, soporte, newsletter.
> Efecto hover en links: translateX(5px) + color primary. Social links: hover con background primary.

---

### 9.7. Notification

**Archivo:** `src/app/components/notification/notification.ts`

```typescript
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapBellFill })],
  templateUrl: './notification.html',
  styleUrls: ['./notification.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  private courseService = inject(CourseService);
  private sub?: Subscription;
  notifications: Tutorial[] = [];

  ngOnInit() {
    this.sub = this.courseService.tutorialAdded$.subscribe((tutorial: Tutorial) => {
      this.notifications.push(tutorial);
      setTimeout(() => this.removeNotification(tutorial), 6000);
    });
  }

  removeNotification(tutorial: Tutorial) {
    this.notifications = this.notifications.filter((n) => n.id !== tutorial.id);
  }
}
```

**Template:** `src/app/components/notification/notification.html`

```html
<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1055;">
  <div *ngFor="let note of notifications" class="toast show glass-toast">
    <div class="toast-header bg-transparent border-bottom border-secondary text-white">
      <ng-icon name="bootstrapBellFill" class="text-primary me-2"></ng-icon>
      <strong class="me-auto text-primary">¡Nuevo Tutorial!</strong>
      <small class="text-muted">Ahora mismo</small>
      <button
        type="button"
        class="btn-close btn-close-white"
        (click)="removeNotification(note)"
      ></button>
    </div>
    <div class="toast-body text-white">
      Se ha publicado un nuevo tutorial: <strong>{{note.title}}</strong>.
    </div>
  </div>
</div>
```

> **Descripción:** Sistema de notificaciones **toast** en tiempo real:
>
> - Se suscribe a `CourseService.tutorialAdded$` (RxJS Subject)
> - Cada notificación se auto-destruye a los 6 segundos
> - Animación `slideInRight` con CSS keyframes
> - Estilo glassmorphism con borde púrpura

---

## 10. Páginas (Rutas)

### 10.1. Home

**Archivo:** `src/app/pages/home/home.ts`

```typescript
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    CourseDetailsComponent,
    InstructorComponent,
    ContactComponent,
  ],
  template: `
    <app-hero></app-hero>
    <app-course-details></app-course-details>
    <app-instructor></app-instructor>
    <app-contact></app-contact>
  `,
})
export class HomeComponent {}
```

> **Descripción:** Página principal que compone 4 secciones: Hero → Plan de Estudios → Instructor → Contacto.

---

### 10.2. Blog

**Archivo:** `src/app/pages/blog/blog.ts`

```typescript
@Component({
  selector: 'app-blog',
  standalone: true,
  template: `...`,
})
export class BlogComponent {
  features = [
    { title: 'Súper Rápido', icon: 'bootstrapLightningChargeFill', description: '...' },
    { title: '100% Seguro', icon: 'bootstrapShieldLockFill', description: '...' },
    { title: 'Personalizable', icon: 'bootstrapPuzzleFill', description: '...' },
  ];
}
```

> **Descripción:** Página "Blog" con 3 feature cards (rapidez, seguridad, personalización) + secciones de Misión/Visión.

---

### 10.3. Proyectos

**Archivo:** `src/app/pages/proyectos/proyectos.ts`

```typescript
@Component({ ... })
export class ProyectosComponent {
  projects = [
    { title: 'Arquitectura Minimalista', category: 'Exterior', image: '...' },
    { title: 'Personaje Stylized', category: 'Character Design', image: '...' },
    { title: 'Escena Sci-Fi', category: 'Environment', image: '...' },
    { title: 'Mech Warrior', category: 'Hard Surface', image: '...' },
    { title: 'Render de Producto', category: 'Comercial', image: '...' },
    { title: 'Mundo Bio-Luminiscente', category: 'VFX', image: '...' }
  ];
}
```

> **Descripción:** Galería de 6 proyectos con imágenes Unsplash, categorías, overlay hover con botón "Ver Detalles".

---

### 10.4. Precios

**Archivo:** `src/app/pages/precios/precios.ts`

```typescript
@Component({ ... })
export class PreciosComponent {
  plans = [
    { name: 'Plan Básico', price: '1,000', featured: false, features: [...] },
    { name: 'Plan Intermedio', price: '2,000', featured: true, features: [...] },
    { name: 'Plan Avanzado', price: '3,000', featured: false, features: [...] }
  ];
}
```

> **Descripción:** 3 planes de precios (Básico, Intermedio - destacado, Avanzado). El plan destacado tiene `scale(1.05)` y glow púrpura.

---

### 10.5. Inscripcion

**Archivo:** `src/app/pages/inscripcion/inscripcion.ts`

```typescript
@Component({ ... })
export class InscripcionComponent {
  data = { name: '', email: '', country: 'Mexico', plan: 'Pro' };
  advantages = [
    { title: 'Certificación Oficial', text: '...' },
    { title: 'Acceso de por vida', text: '...' },
    { title: 'Bolsa de Trabajo', text: '...' }
  ];

  onSubmit() {
    this.service.sendContact({ name, email, message: `Plan: ${plan}, País: ${country}` })
      .subscribe(() => { this.success = true; });
  }
}
```

> **Descripción:** Página de inscripción con formulario (nombre, email, país, selector de plan) + lista de ventajas. El template está **inline** en el componente (no usa archivo HTML externo).

---

### 10.6. Caracteristicas

**Archivo:** `src/app/pages/caracteristicas/caracteristicas.ts`

```typescript
@Component({ ... })
export class CaracteristicasComponent {
  featureList = [
    { title: 'Renderizado', icon: 'bootstrapMagic', description: '...', image: '...' },
    { title: 'Modelado', icon: 'bootstrapBox', description: '...', image: '...' },
    { title: 'Animación', icon: 'bootstrapCollectionPlay', description: '...', image: '...' },
    { title: 'VFX & Composición', icon: 'bootstrapCameraVideo', description: '...', image: '...' },
    { title: 'Simulación', icon: 'bootstrapCpu', description: '...', image: '...' },
    { title: 'Scripting Python', icon: 'bootstrapBrush', description: '...', image: '...' }
  ];
}
```

> **Descripción:** 6 tarjetas con imagen de fondo, icono superpuesto, título y descripción. Muestra las capacidades de Blender.

---

### 10.7. Instalacion

**Archivo:** `src/app/pages/instalacion/instalacion.ts`

```typescript
@Component({ ... })
export class InstalacionComponent {
  activeOS = 'windows';

  osOptions = [
    {
      id: 'windows',
      label: 'Windows',
      icon: 'lucideMonitor',
      steps: [
        { title: 'Descargar Instalador', text: '...' },
        { title: 'Ejecutar Setup', text: '...' },
        { title: 'Finalizar', text: '...' }
      ]
    },
    { id: 'macos', label: 'macOS', icon: 'lucideApple', steps: [...] },
    { id: 'linux', label: 'Linux', icon: 'lucideTerminal', steps: [...] }
  ];
}
```

> **Descripción:** Guía de instalación con tabs para Windows, macOS y Linux. Cada OS tiene 3 pasos numerados + requisitos recomendados.

---

### 10.8. Recursos

**Archivo:** `src/app/pages/recursos/recursos.ts`

```typescript
@Component({ ... })
export class RecursosComponent {
  resourceGroups = [
    { title: 'Documentación', icon: 'bootstrapJournalBookmarkFill', text: '...', link: '...' },
    { title: 'Cursos Video', icon: 'bootstrapPlayBtnFill', text: '...', link: '#' },
    { title: 'Comunidad', icon: 'bootstrapPeopleFill', text: '...', link: '#' },
    { title: 'Addons', icon: 'bootstrapGridFill', text: '...', link: '#' }
  ];

  featuredAssets = [
    { name: 'Pack de Texturas PBR', img: '...' },
    { name: 'Modelos de Vegetación', img: '...' },
    { name: 'HDRI Studio Pack', img: '...' }
  ];
}
```

> **Descripción:** Página de recursos con 4 tarjetas (Documentación, Cursos, Comunidad, Addons) + 3 assets destacados con imágenes.

---

### 10.9. Tutoriales

**Archivo:** `src/app/pages/tutoriales/tutoriales.ts`

```typescript
@Component({ ... })
export class TutorialesComponent implements OnInit, OnDestroy {
  private courseService = inject(CourseService);
  private sub?: Subscription;
  tutorials: Tutorial[] = [];

  ngOnInit() {
    this.courseService.getTutorials().subscribe(tuts => { this.tutorials = tuts; });
    this.sub = this.courseService.tutorialAdded$.subscribe(tutorial => {
      this.tutorials = [tutorial, ...this.tutorials];
    });
  }
}
```

> **Descripción:** Lista de tutoriales con **suscripción en tiempo real** a `tutorialAdded$`. Muestra cards con icono play, título, descripción, duración y botón "Ver Tutorial".

---

### 10.10. Novedades

**Archivo:** `src/app/pages/novedades/novedades.ts`

```typescript
@Component({ ... })
export class NovedadesComponent {
  majorUpdates = [
    { title: 'Gestión de Color HDR', icon: 'bootstrapSunFill', description: '...' },
    { title: 'Grease Pencil 3', icon: 'bootstrapPalette', description: '...' },
    { title: 'Geometry Nodes: Assets', icon: 'bootstrapLightningFill', description: '...' },
    { title: 'Compositor Realtime', icon: 'bootstrapStars', description: '...' }
  ];
}
```

> **Descripción:** Página de novedades de Blender 5.0 "Hi Five". Hero section con badge + CTA de descarga. 4 tarjetas de actualizaciones mayores. Sección de rendimiento Cycles & EEVEE.

---

### 10.11. Admin

**Archivo:** `src/app/pages/admin/admin.ts`

```typescript
@Component({ ... })
export class AdminComponent implements OnInit {
  private courseService = inject(CourseService);
  tutorials: Tutorial[] = [];
  newTutorial = { title: '', description: '', url: '', duration: '' };

  ngOnInit() { this.loadTutorials(); }

  onSubmit(event: Event) {
    event.preventDefault();
    this.courseService.addTutorial(this.newTutorial).subscribe({
      next: () => {
        this.successMessage = 'Tutorial subido correctamente';
        this.newTutorial = { title: '', description: '', url: '', duration: '' };
        this.loadTutorials();
        setTimeout(() => this.successMessage = '', 3000);
      }
    });
  }
}
```

**Template:** `src/app/pages/admin/admin.html`

```html
<section class="admin-panel py-100">
  <div class="container">
    <div class="row g-5">
      <div class="col-lg-4">
        <div class="glass-card p-4">
          <h4><ng-icon name="bootstrapPlus"></ng-icon> Nuevo Tutorial</h4>
          <form (submit)="onSubmit($event)">
            <input [(ngModel)]="newTutorial.title" name="title" required />
            <textarea [(ngModel)]="newTutorial.description" name="description" required></textarea>
            <input [(ngModel)]="newTutorial.url" name="url" required />
            <input [(ngModel)]="newTutorial.duration" name="duration" required />
            <button type="submit">Publicar Tutorial</button>
          </form>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="glass-card p-4">
          <h4>Tutoriales Publicados</h4>
          <div class="row g-4">
            <div class="col-md-6" *ngFor="let tut of tutorials">
              <div class="tutorial-card p-4">
                <ng-icon name="bootstrapPlayCircle"></ng-icon>
                <h5>{{tut.title}}</h5>
                <p>{{tut.description}}</p>
                <span class="badge duration-badge">{{tut.duration}}</span>
                <a [href]="tut.url" target="_blank">Ver</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

> **Descripción:** Panel de administración con dos columnas:
>
> - **Izquierda:** Formulario para crear tutorial (title, description, url, duration)
> - **Derecha:** Grid de tutoriales publicados
> - Al crear un tutorial, se emite vía `tutorialAdded$` y todas las suscripciones se actualizan

---

## 11. Configuración del Proyecto

### `angular.json`

| Propiedad           | Valor                               |
| ------------------- | ----------------------------------- |
| **Proyecto**        | `blender-app`                       |
| **Package Manager** | `bun`                               |
| **Builder**         | `@angular/build:application`        |
| **Styles**          | `src/styles.scss`                   |
| **Assets**          | `public/**/*`                       |
| **Budgets (prod)**  | Initial: 1MB warning / 2MB error    |
| **Test runner**     | `@angular/build:unit-test` (Vitest) |

### `package.json`

| Dependencia              | Versión    |
| ------------------------ | ---------- |
| Angular                  | `^21.2.0`  |
| TypeScript               | `~5.9.0`   |
| Bootstrap                | `^5.3.3`   |
| GSAP                     | `^3.14.0`  |
| Supabase JS              | `^2.103.0` |
| ng-icons/bootstrap-icons | `^30.0.0`  |
| ng-icons/lucide          | `^30.0.0`  |
| Vitest                   | `^4.0.0`   |

### `tsconfig.json`

- **target:** ES2022
- **module:** `preserve`
- **strict mode** habilitado
- **standalone components** (sin `NgModule`)

---

## 12. Guía para Capturas con CodeSnap

Para generar las capturas de código con la extensión **CodeSnap** en VS Code:

1. Instala [CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap) en VS Code
2. Abre el archivo que quieras capturar
3. Selecciona el código
4. Haz clic derecho → "CodeSnap" o usa `Ctrl+Shift+P` → "CodeSnap"
5. Ajusta el tamaño y fondo si lo deseas
6. Guarda la imagen

### Archivos recomendados para captura (por orden):

| #   | Archivo                                           | Líneas | ¿Por qué capturarlo?                             |
| --- | ------------------------------------------------- | ------ | ------------------------------------------------ |
| 1   | `src/app/app.ts`                                  | 1-30   | Componente raíz con template inline              |
| 2   | `src/app/app.config.ts`                           | 1-15   | Configuración global de providers                |
| 3   | `src/app/app.routes.ts`                           | 1-17   | Sistema de rutas lazy-load                       |
| 4   | `src/app/directives/scroll-reveal.ts`             | 1-26   | Directiva ScrollReveal con IntersectionObserver  |
| 5   | `src/app/services/supabase.ts`                    | 1-60   | Servicio Supabase completo                       |
| 6   | `src/app/services/course.ts`                      | 1-128  | CourseService con interfaces y lógica de negocio |
| 7   | `src/app/components/navbar/navbar.ts`             | 1-73   | Navbar con GSAP y scroll detection               |
| 8   | `src/app/components/hero/hero.ts`                 | 1-47   | Hero con GSAP animations                         |
| 9   | `src/app/components/notification/notification.ts` | 1-42   | Sistema de notificaciones toast                  |
| 10  | `src/app/pages/admin/admin.ts`                    | 1-58   | Panel admin con CRUD de tutoriales               |
| 11  | `src/app/pages/precios/precios.ts`                | 1-121  | Pricing page con template inline                 |
| 12  | `src/app/pages/inscripcion/inscripcion.ts`        | 1-155  | Enrollment form con template y styles inline     |
| 13  | `src/styles.scss`                                 | 1-111  | Tema oscuro y CSS custom properties              |

---

## Resumen Técnico

| Aspecto         | Detalle                               |
| --------------- | ------------------------------------- |
| **Framework**   | Angular 21 (Standalone Components)    |
| **Lenguaje**    | TypeScript 5.9                        |
| **Estilos**     | SCSS + Bootstrap 5.3 + Glassmorphism  |
| **Animaciones** | GSAP 3.14 + IntersectionObserver      |
| **Backend**     | Supabase (PostgreSQL)                 |
| **Estado**      | RxJS Subjects + Services              |
| **Testing**     | Vitest                                |
| **Build**       | Angular CLI v21 (application builder) |
| **Rendimiento** | Lazy loading en 10/11 rutas           |

---

_Documentación generada para el proyecto **App-Blender / DIGITALBLERD** — Junio 2026_
