const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
} = require('docx');

const SCREENSHOTS_DIR = path.join(__dirname, 'docs-screenshots');

function pngSize(filePath) {
  const buf = fs.readFileSync(filePath);
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  return { w, h };
}

function img(name, maxW = 600) {
  const p = path.join(SCREENSHOTS_DIR, `${name}.png`);
  if (!fs.existsSync(p)) return null;
  const { w, h } = pngSize(p);
  const scale = Math.min(1, maxW / w);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 250 },
    children: [
      new ImageRun({
        data: fs.readFileSync(p),
        transformation: { width: Math.round(w * scale), height: Math.round(h * scale) },
        type: 'png',
      }),
    ],
  });
}

function imgs(...list) {
  const result = [];
  for (const item of list) {
    if (typeof item === 'string') {
      const p = img(item);
      if (p) result.push(p);
    } else if (Array.isArray(item)) {
      const p = img(item[0], item[1] || 600);
      if (p) result.push(p);
    }
  }
  return result;
}

function h1(t) {
  return new Paragraph({
    text: t,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 200 },
  });
}
function h2(t) {
  return new Paragraph({
    text: t,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 250, after: 150 },
  });
}
function h3(t) {
  return new Paragraph({
    text: t,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });
}
function body(t) {
  return new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: t, size: 21 })] });
}
function bold(t) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text: t, bold: true, size: 22 })],
  });
}
function bullet(t) {
  return new Paragraph({
    spacing: { after: 40 },
    bullet: { level: 0 },
    children: [new TextRun({ text: t, size: 21 })],
  });
}
function pb() {
  return new Paragraph({ children: [new PageBreak()] });
}

const children = [
  // ===== PORTADA =====
  new Paragraph({ spacing: { before: 4000 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: 'DIGITALBLERD', size: 56, bold: true, color: '7C3AED' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: 'App-Blender', size: 46, bold: true, color: 'FFFFFF' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
    children: [
      new TextRun({ text: 'Documentación Técnica del Proyecto', size: 32, color: 'AAAAAA' }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [
      new TextRun({
        text: 'Angular 21  ·  TypeScript 5.9  ·  Bootstrap 5.3  ·  GSAP 3.14  ·  Supabase',
        size: 22,
        color: '888888',
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: 'Junio 2026', size: 22, color: '888888' })],
  }),
  pb(),

  // ===== INDICE =====
  h1('Índice'),
  body('1. Arquitectura General'),
  body('2. Punto de Entrada - main.ts'),
  body('3. Configuración Global - app.config.ts'),
  body('4. Sistema de Rutas - app.routes.ts'),
  body('5. Componente Raíz - app.ts'),
  body('6. Estilos Globales - styles.scss'),
  body('7. Servicios (SupabaseService, CourseService)'),
  body('8. Directiva ScrollReveal'),
  body(
    '9. Componentes Compartidos (Navbar, Hero, CourseDetails, Instructor, Contact, Footer, Notification)',
  ),
  body(
    '10. Páginas (Home, Blog, Proyectos, Precios, Inscripcion, Caracteristicas, Instalacion, Recursos, Tutoriales, Novedades, Admin)',
  ),
  pb(),

  // ===== 1. ARQUITECTURA =====
  h1('1. Arquitectura General'),
  body(
    'App-Blender es una aplicación web SPA desarrollada con Angular 21 utilizando componentes standalone. Sigue una arquitectura de una sola página con enrutamiento lazy para optimizar la carga inicial.',
  ),
  bold('Estructura de directorios:'),
  body('src/'),
  body('  ├── main.ts              ← Bootstrap de la aplicación'),
  body('  ├── index.html           ← HTML raíz con SEO y Schema.org'),
  body('  ├── styles.scss          ← Estilos globales (tema oscuro, glassmorphism)'),
  body('  └── app/'),
  body('      ├── app.ts           ← Componente raíz'),
  body('      ├── app.config.ts    ← Providers globales'),
  body('      ├── app.routes.ts    ← Definición de rutas'),
  body('      ├── directives/      ← Directiva ScrollReveal'),
  body('      ├── services/        ← SupabaseService + CourseService'),
  body('      ├── components/      ← 7 componentes reutilizables'),
  body('      └── pages/           ← 11 páginas (1 eager + 10 lazy)'),
  bold('Stack Tecnológico:'),
  bullet('Framework: Angular 21 (Standalone Components)'),
  bullet('Lenguaje: TypeScript 5.9'),
  bullet('Estilos: SCSS + Bootstrap 5.3 + Glassmorphism'),
  bullet('Animaciones: GSAP 3.14 + IntersectionObserver'),
  bullet('Backend: Supabase (PostgreSQL)'),
  bullet('Estado: RxJS Subjects + Services'),
  bullet('Testing: Vitest'),
  bullet('Build: Angular CLI v21 (application builder)'),
  pb(),

  // ===== 2. MAIN.TS =====
  h1('2. Punto de Entrada - main.ts'),
  body('Archivo: src/main.ts'),
  body(
    'Arranca la aplicación utilizando bootstrapApplication de Angular, que permite iniciar con componentes standalone sin NgModules.',
  ),
  ...imgs('main-ts'),
  bold('Explicación:'),
  bullet('import zone.js: Habilita la detección de cambios de Angular.'),
  bullet('bootstrapApplication: Inicializa la app con el componente raíz y configuración global.'),
  bullet('appConfig: Contiene los providers globales (router, http client, animations).'),
  bullet('catchError: Maneja errores de arranque mostrándolos en consola.'),
  pb(),

  // ===== 3. APP.CONFIG.TS =====
  h1('3. Configuración Global - app.config.ts'),
  body('Archivo: src/app/app.config.ts'),
  body('Configura los providers que estarán disponibles en toda la aplicación.'),
  ...imgs('app-config'),
  bold('Providers:'),
  bullet(
    'provideZoneChangeDetection({ eventCoalescing: true }): Optimiza la detección de cambios.',
  ),
  bullet('provideRouter(routes): Configura el enrutador.'),
  bullet('provideHttpClient(): Habilita el cliente HTTP.'),
  bullet('provideAnimations(): Activa el sistema de animaciones de Angular.'),
  pb(),

  // ===== 4. APP.ROUTES.TS =====
  h1('4. Sistema de Rutas - app.routes.ts'),
  body('Archivo: src/app/app.routes.ts'),
  body('Define 11 rutas: 1 eager y 10 lazy-loaded para optimizar el bundle inicial.'),
  ...imgs('app-routes'),
  bold('Rutas:'),
  bullet('/ → HomeComponent (eager)'),
  bullet('/blog → BlogComponent (lazy)'),
  bullet('/proyectos → ProyectosComponent (lazy)'),
  bullet('/precios → PreciosComponent (lazy)'),
  bullet('/inscripcion → InscripcionComponent (lazy)'),
  bullet('/caracteristicas → CaracteristicasComponent (lazy)'),
  bullet('/instalacion → InstalacionComponent (lazy)'),
  bullet('/recursos → RecursosComponent (lazy)'),
  bullet('/tutoriales → TutorialesComponent (lazy)'),
  bullet('/novedades → NovedadesComponent (lazy)'),
  bullet('/admin → AdminComponent (lazy)'),
  bullet('** → Redirecciona a /'),
  pb(),

  // ===== 5. APP.TS =====
  h1('5. Componente Raíz - app.ts'),
  body('Archivo: src/app/app.ts'),
  body('Define la estructura principal: Navbar + Router Outlet + Footer + Notification.'),
  h3('Imports'),
  ...imgs('app-01-imports'),
  h3('Decorador @Component'),
  ...imgs('app-02-decorator'),
  h3('Template y Clase'),
  ...imgs('app-03-template-class'),
  bold('Estructura del template:'),
  bullet('app-navbar: Barra de navegación fija superior.'),
  bullet('router-outlet: Renderiza las páginas según la ruta activa.'),
  bullet('app-footer: Pie de página con branding, enlaces y newsletter.'),
  bullet('app-notification: Notificaciones toast superpuestas.'),
  pb(),

  // ===== 6. STYLES.SCSS =====
  h1('6. Estilos Globales - styles.scss'),
  body('Archivo: src/styles.scss'),
  body('Sistema de diseño con tema oscuro, paleta personalizada, glassmorphism y animaciones.'),
  bold('Variables CSS principales:'),
  bullet('--bg-dark / --bg-darker: Fondo oscuro en dos tonos.'),
  bullet('--primary (púrpura #7C3AED) / --secondary (cyan) / --accent (rosa).'),
  bullet('--glass / --glass-border: Efecto glassmorphism.'),
  bullet('--font-display: Syne para títulos / --font-body: Plus Jakarta Sans.'),
  bold('Clases utilitarias:'),
  bullet('.glass-card: Card con backdrop-filter blur y borde semitransparente.'),
  bullet('.text-gradient: Gradiente lineal en texto (púrpura → cyan → rosa).'),
  bullet('.reveal / .visible: Animaciones scroll con IntersectionObserver.'),
  pb(),

  // ===== 7. SERVICIOS =====
  h1('7. Servicios'),
  h2('7.1 SupabaseService'),
  body('Archivo: src/app/services/supabase.ts'),
  body('Wrapper del cliente Supabase que gestiona la conexión con PostgreSQL.'),
  h3('Imports y Decorador'),
  ...imgs('supabase-01-imports'),
  h3('Constructor con validación de URL'),
  body(
    'Valida que la URL sea HTTPS antes de inicializar el cliente, evitando errores en desarrollo.',
  ),
  ...imgs('supabase-02-constructor'),
  h3('Getter - cliente Supabase'),
  ...imgs('supabase-03-getter'),
  h3('getCourseData() - Consulta con joins'),
  body('Obtiene datos del curso incluyendo instructor y módulos mediante una relación de tablas.'),
  ...imgs('supabase-04-getCourseData'),
  h3('sendContact() - Inserción en BD'),
  body('Inserta registros en la tabla contacts con validación de cliente inicializado.'),
  ...imgs('supabase-05-sendContact'),
  pb(),

  h2('7.2 CourseService'),
  body('Archivo: src/app/services/course.ts'),
  body(
    'Capa de negocio que abstrae la lógica y proporciona datos de respaldo (fallback) cuando Supabase no está disponible.',
  ),
  h3('Interfaces - Parte 1'),
  ...imgs('course-01-interfaces-part1'),
  h3('Interfaces - Parte 2'),
  ...imgs('course-02-interfaces-part2'),
  h3('Fallback Data'),
  ...imgs('course-03-fallback-data'),
  h3('Fallback Módulos'),
  ...imgs('course-04-fallback-modules'),
  h3('getCourseData()'),
  ...imgs('course-05-getCourseData'),
  h3('sendContact()'),
  ...imgs('course-06-sendContact'),
  h3('Lista de Tutoriales'),
  body('Arreglo de tutoriales con emojis como iconos representativos.'),
  ...imgs('course-07-tutorials-list'),
  h3('addTutorial() - Subject RxJS'),
  body(
    'Método que agrega un tutorial y emite el evento a través de un Subject para notificar en tiempo real.',
  ),
  ...imgs('course-08-addTutorial'),
  pb(),

  // ===== 8. SCROLLREVEAL =====
  h1('8. Directiva ScrollReveal'),
  body('Archivo: src/app/directives/scroll-reveal.ts'),
  body(
    'Directiva standalone que aplica animaciones de entrada al hacer scroll usando IntersectionObserver.',
  ),
  ...imgs('scroll-reveal'),
  bold('Funcionamiento:'),
  bullet('Usa IntersectionObserver con threshold 0.1 y rootMargin "-50px".'),
  bullet('Agrega clase "reveal" inicialmente (opacity: 0, translateY(30px)).'),
  bullet('Cuando es visible, agrega "visible" (opacity: 1, translateY(0)).'),
  bullet('Se desconecta automáticamente tras la primera activación (unobserve).'),
  pb(),

  // ===== 9. COMPONENTES =====
  h1('9. Componentes Compartidos'),
  h2('9.1 NavbarComponent'),
  body('Archivo: src/app/components/navbar/navbar.ts'),
  body('Barra de navegación responsive con GSAP, detección de scroll y menú mobile.'),
  h3('Imports'),
  ...imgs('navbar-01-imports'),
  h3('Decorador @Component'),
  ...imgs('navbar-02-decorator'),
  h3('Clase - propiedades y constructor'),
  ...imgs('navbar-03-class'),
  h3('toggleMenu()'),
  body('Maneja el menú mobile con GSAP fade toggle.'),
  ...imgs('navbar-04-toggleMenu'),
  h3('closeMenu() y scroll detection'),
  body('@HostListener para cerrar menú al hacer click fuera y detectar scroll.'),
  ...imgs('navbar-05-closeMenu-scroll'),
  h3('GSAP Animación ngAfterViewInit'),
  body('Animación stagger de los links de navegación con GSAP.'),
  ...imgs('navbar-06-gsap-anim'),
  pb(),

  h2('9.2 HeroComponent'),
  body('Archivo: src/app/components/hero/hero.ts'),
  body('Hero section de la landing page con animaciones GSAP y métricas dinámicas.'),
  h3('Imports'),
  ...imgs('hero-01-imports'),
  h3('Clase'),
  ...imgs('hero-02-class'),
  h3('GSAP ngAfterViewInit'),
  body('Carga datos del CourseService y anima con GSAP stagger y slide desde la derecha.'),
  ...imgs('hero-03-gsap'),
  pb(),

  h2('9.3 CourseDetailsComponent'),
  body('Archivo: src/app/components/course-details/course-details.ts'),
  body('Grid de 4 columnas con los módulos del plan de estudios.'),
  h3('Imports y Decorador'),
  ...imgs('coursedet-01-imports'),
  h3('Clase con getIcon()'),
  body('Obtiene datos del CourseService y asigna iconos cíclicos a cada módulo.'),
  ...imgs('coursedet-02-class'),
  pb(),

  h2('9.4 InstructorComponent'),
  body('Archivo: src/app/components/instructor/instructor.ts'),
  body('Sección del instructor con foto placeholder, biografía y lista de credenciales.'),
  h3('Imports y Decorador'),
  ...imgs('instructor-01-imports'),
  h3('Clase'),
  ...imgs('instructor-02-class'),
  pb(),

  h2('9.5 ContactComponent'),
  body('Archivo: src/app/components/contact/contact.ts'),
  body('Formulario de contacto con two-way binding, validación y estados de carga.'),
  h3('Imports'),
  ...imgs('contact-01-imports'),
  h3('Clase'),
  ...imgs('contact-02-class'),
  h3('onSubmit()'),
  body('Maneja el envío del formulario con estados isSubmitting y mensaje de éxito por 5s.'),
  ...imgs('contact-03-onSubmit'),
  pb(),

  h2('9.6 FooterComponent'),
  body('Archivo: src/app/components/footer/footer.ts'),
  body('Pie de página con 4 columnas: branding, explorar, soporte y newsletter.'),
  ...imgs('footer'),
  pb(),

  h2('9.7 NotificationComponent'),
  body('Archivo: src/app/components/notification/notification.ts'),
  body('Sistema de notificaciones toast en tiempo real usando RxJS Subjects.'),
  h3('Imports y Decorador'),
  ...imgs('notif-01-imports'),
  h3('Clase con subscription y auto-dismiss'),
  body('Se suscribe a tutorialAdded$, agrega notificaciones y las remueve tras 6 segundos.'),
  ...imgs('notif-02-class'),
  pb(),

  // ===== 10. PÁGINAS =====
  h1('10. Páginas (Rutas)'),

  h2('10.1 HomeComponent (/)'),
  body('Archivo: src/app/pages/home/home.ts'),
  body(
    'Página principal que compone 4 secciones: Hero → Plan de Estudios → Instructor → Contacto.',
  ),
  ...imgs('home'),
  pb(),

  h2('10.2 BlogComponent (/blog)'),
  body('Archivo: src/app/pages/blog/blog.ts'),
  body(
    'Página con 3 feature cards (rapidez, seguridad, personalización) y secciones de Misión/Visión.',
  ),
  bullet('Usa ScrollRevealDirective para animaciones de entrada.'),
  bullet('Iconos: bootstrapLightningChargeFill, bootstrapShieldLockFill, bootstrapPuzzleFill.'),
  pb(),

  h2('10.3 ProyectosComponent (/proyectos)'),
  body('Archivo: src/app/pages/proyectos/proyectos.ts'),
  body('Galería de 6 proyectos con imágenes Unsplash, overlay hover y categorías.'),
  bullet('Categorías: Exterior, Character Design, Environment, Hard Surface, Comercial, VFX.'),
  pb(),

  h2('10.4 PreciosComponent (/precios)'),
  body('Archivo: src/app/pages/precios/precios.ts'),
  body(
    '3 planes de precios con template y estilos inline. Plan Intermedio destacado con glow púrpura.',
  ),
  h3('Imports'),
  ...imgs('precios-01-imports'),
  h3('Decorador @Component'),
  ...imgs('precios-02-decorator'),
  h3('Template - Header y Cards'),
  ...imgs('precios-03-template-header'),
  h3('Template - Features y Botones'),
  ...imgs('precios-04-template-features'),
  h3('Estilos - Card y Pricing'),
  ...imgs('precios-05-styles-card'),
  h3('Estilos - Badge y Botón Outline'),
  ...imgs('precios-06-styles-misc'),
  h3('Clase - Datos de Planes'),
  body('3 planes: Básico ($1,000), Intermedio ($2,000 - destacado), Avanzado ($3,000).'),
  ...imgs('precios-07-class'),
  pb(),

  h2('10.5 InscripcionComponent (/inscripcion)'),
  body('Archivo: src/app/pages/inscripcion/inscripcion.ts'),
  body('Página de inscripción con formulario y lista de ventajas. Template y estilos 100% inline.'),
  h3('Imports'),
  ...imgs('inscrip-01-imports'),
  h3('Decorador @Component'),
  ...imgs('inscrip-02-decorator'),
  h3('Template - Hero y Ventajas'),
  ...imgs('inscrip-03-template-hero'),
  h3('Template - Formulario (parte 1)'),
  ...imgs('inscrip-04-template-form-1'),
  h3('Template - Formulario (parte 2)'),
  ...imgs('inscrip-05-template-form-2'),
  h3('Estilos (parte 1)'),
  ...imgs('inscrip-06-styles-1'),
  h3('Estilos (parte 2)'),
  ...imgs('inscrip-07-styles-2'),
  h3('Clase TypeScript'),
  body('Ventajas, datos del formulario y método onSubmit que envía a CourseService.'),
  ...imgs('inscrip-08-class'),
  pb(),

  h2('10.6 CaracteristicasComponent (/caracteristicas)'),
  body('Archivo: src/app/pages/caracteristicas/caracteristicas.ts'),
  body(
    '6 tarjetas de características de Blender con imágenes Unsplash, iconos superpuestos y descripciones.',
  ),
  pb(),

  h2('10.7 InstalacionComponent (/instalacion)'),
  body('Archivo: src/app/pages/instalacion/instalacion.ts'),
  body(
    'Guía de instalación con tabs para Windows, macOS y Linux. Cada OS con 3 pasos numerados + requisitos.',
  ),
  pb(),

  h2('10.8 RecursosComponent (/recursos)'),
  body('Archivo: src/app/pages/recursos/recursos.ts'),
  body('4 tarjetas de recursos (Documentación, Cursos, Comunidad, Addons) + 3 assets destacados.'),
  pb(),

  h2('10.9 TutorialesComponent (/tutoriales)'),
  body('Archivo: src/app/pages/tutoriales/tutoriales.ts'),
  body('Lista de tutoriales con suscripción en tiempo real a tutorialAdded$ de CourseService.'),
  ...imgs('tutoriales-01-imports'),
  pb(),

  h2('10.10 NovedadesComponent (/novedades)'),
  body('Archivo: src/app/pages/novedades/novedades.ts'),
  body(
    'Página de novedades de Blender 5.0 "Hi Five". Hero section con badge, CTA de descarga, 4 tarjetas de actualizaciones y sección de rendimiento.',
  ),
  pb(),

  h2('10.11 AdminComponent (/admin)'),
  body('Archivo: src/app/pages/admin/admin.ts'),
  body(
    'Panel de administración para gestionar tutoriales: formulario de creación + grid de tutoriales.',
  ),
  h3('Imports y Decorador'),
  ...imgs('admin-01-imports'),
  h3('Clase'),
  ...imgs('admin-02-class'),
  h3('onSubmit()'),
  body('Carga la lista y al crear un tutorial emite vía Subject para actualizar en tiempo real.'),
  ...imgs('admin-03-onSubmit'),
  pb(),

  // ===== RESUMEN =====
  h1('Resumen Técnico'),
  bold('Stack Tecnológico:'),
  bullet('Framework: Angular 21 (Standalone Components)'),
  bullet('Lenguaje: TypeScript 5.9'),
  bullet('Estilos: SCSS + Bootstrap 5.3 + Glassmorphism'),
  bullet('Animaciones: GSAP 3.14 + IntersectionObserver'),
  bullet('Backend: Supabase (PostgreSQL)'),
  bullet('Estado: RxJS Subjects + Services'),
  bullet('Testing: Vitest'),
  bold('Arquitectura:'),
  bullet('11 rutas (1 eager + 10 lazy-loaded)'),
  bullet('7 componentes compartidos + 1 directiva + 2 servicios'),
  bullet('11 páginas standalone con lazy loading'),
  bold('Patrones implementados:'),
  bullet('Standalone components (sin NgModules)'),
  bullet('Lazy loading con loadComponent'),
  bullet('Fallback data graceful degradation'),
  bullet('Real-time notifications con RxJS Subjects'),
  bullet('SEO optimization (Open Graph, JSON-LD, sitemap)'),
  pb(),

  // ===== NOTAS FINALES =====
  h1('Notas Finales'),
  body('Documentación generada el 11 de Junio de 2026.'),
  body('Proyecto: App-Blender / DIGITALBLERD - Máster en Blender 3D y Animación Profesional.'),
  body('Las capturas de código fueron generadas con carbon-now-cli (motor carbon.now.sh).'),
];

async function main() {
  function countImageRuns(items) {
    let count = 0;
    for (const item of items) {
      if (item instanceof ImageRun) count++;
      else if (Array.isArray(item.root)) count += countImageRuns(item.root);
    }
    return count;
  }
  const totalImages = countImageRuns(children);
  const doc = new Document({
    title: 'Documentación DIGITALBLERD - App-Blender',
    description: 'Documentación técnica del proyecto App-Blender',
    creator: 'DIGITALBLERD',
    sections: [
      {
        properties: { page: { margin: { top: 1200, bottom: 1200, left: 1200, right: 1200 } } },
        children,
      },
    ],
  });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(__dirname, 'DOCUMENTACION.docx'), buffer);
  console.log(`✅ Documento generado exitosamente`);
  console.log(`   Tamaño: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   ${totalImages} capturas de código incorporadas`);
}

main().catch(console.error);
