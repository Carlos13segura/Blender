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
  ExternalHyperlink,
} = require('docx');

const SCREENSHOTS_DIR = path.join(__dirname, 'docs-screenshots');
const OUTPUT = path.join(__dirname, 'DOCUMENTACION.docx');

function imageBuffer(name) {
  return fs.readFileSync(path.join(SCREENSHOTS_DIR, `${name}.png`));
}

function imgParagraph(name, width = 620, height = 350) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 400 },
    children: [
      new ImageRun({
        data: imageBuffer(name),
        transformation: { width, height },
        type: 'png',
      }),
    ],
  });
}

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 300, after: 200 },
  });
}

function subheading(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 250, after: 150 },
  });
}

function subsubheading(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
  });
}

function body(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text, size: 22 })],
  });
}

function boldBody(text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text, bold: true, size: 22 })],
  });
}

function bullet(text) {
  return new Paragraph({
    spacing: { after: 60 },
    bullet: { level: 0 },
    children: [new TextRun({ text, size: 22 })],
  });
}

function spacer() {
  return new Paragraph({ spacing: { after: 100 }, children: [] });
}

const sections = [
  // ===================== PORTADA =====================
  {
    properties: {
      page: {
        margin: { top: 1500, bottom: 1500, left: 1500, right: 1500 },
      },
    },
    children: [
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
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: 'Angular 21 · TypeScript 5.9 · Bootstrap 5.3 · GSAP 3.14 · Supabase',
            size: 22,
            color: '888888',
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [new TextRun({ text: 'Junio 2026', size: 22, color: '888888' })],
      }),
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== INDICE =====================
      heading('Índice'),
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
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 1. ARQUITECTURA =====================
      heading('1. Arquitectura General'),
      body(
        'App-Blender es una aplicación web SPA desarrollada con Angular 21 utilizando componentes standalone (sin NgModules). Sigue una arquitectura de una sola página con enrutamiento lazy para optimizar la carga inicial.',
      ),
      boldBody('Estructura de directorios:'),
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
      body('      ├── components/      ← Componentes reutilizables'),
      body('      └── pages/           ← 11 páginas (1 eager + 10 lazy)'),
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 2. MAIN.TS =====================
      heading('2. Punto de Entrada - main.ts'),
      body('Archivo: src/main.ts'),
      body(
        'Este archivo arranca la aplicación utilizando la API bootstrapApplication de Angular, que permite iniciar una aplicación con componentes standalone sin necesidad de NgModules.',
      ),
      imgParagraph('main-ts', 620, 180),

      boldBody('Explicación:'),
      body('• import zone.js: Habilita la detección de cambios de Angular.'),
      body(
        '• bootstrapApplication: Función que inicializa la aplicación con el componente raíz y la configuración global.',
      ),
      body('• appConfig: Contiene los providers globales (router, http client, animations).'),
      body('• catchError: Maneja errores de arranque mostrándolos en consola.'),
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 3. APP.CONFIG.TS =====================
      heading('3. Configuración Global - app.config.ts'),
      body('Archivo: src/app/app.config.ts'),
      body('Configura los providers que estarán disponibles en toda la aplicación.'),
      imgParagraph('app-config', 620, 320),

      boldBody('Providers:'),
      body(
        '• provideZoneChangeDetection({ eventCoalescing: true }): Optimiza la detección de cambios coalesciendo eventos.',
      ),
      body(
        '• provideRouter(routes): Configura el enrutador con las rutas definidas en app.routes.ts.',
      ),
      body('• provideHttpClient(): Habilita el cliente HTTP para peticiones a APIs externas.'),
      body('• provideAnimations(): Activa el sistema de animaciones basado en Angular Animations.'),
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 4. APP.ROUTES.TS =====================
      heading('4. Sistema de Rutas - app.routes.ts'),
      body('Archivo: src/app/app.routes.ts'),
      body(
        'Define 11 rutas: la ruta raíz cargada eager y 10 rutas lazy-loaded para optimizar el bundle inicial.',
      ),
      imgParagraph('app-routes', 620, 500),

      boldBody('Rutas:'),
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
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 5. APP.TS =====================
      heading('5. Componente Raíz - app.ts'),
      body('Archivo: src/app/app.ts'),
      body(
        'El componente raíz define la estructura principal de la aplicación. Combina el navbar, router outlet, footer y sistema de notificaciones.',
      ),
      imgParagraph('app-component', 620, 480),

      boldBody('Estructura del template:'),
      body('• app-navbar: Barra de navegación fija en la parte superior.'),
      body('• router-outlet: Donde se renderizan las páginas según la ruta activa.'),
      body('• app-footer: Pie de página con branding, enlaces y newsletter.'),
      body('• app-notification: Sistema de notificaciones toast superpuesto.'),
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 6. STYLES.SCSS =====================
      heading('6. Estilos Globales - styles.scss'),
      body('Archivo: src/styles.scss'),
      body(
        'Define el sistema de diseño con tema oscuro, paleta de colores personalizada, glassmorphism y animaciones.',
      ),
      imgParagraph('app-component', 0, 0), // placeholder to be replaced
      boldBody('Variables CSS (Custom Properties):'),
      bullet('--bg-dark / --bg-darker: Fondo oscuro en dos tonos.'),
      bullet('--primary (púrpura) / --secondary (cyan) / --accent (rosa): Paleta principal.'),
      bullet('--glass / --glass-border: Efecto glassmorphism.'),
      bullet('--font-display: Syne para títulos / --font-body: Plus Jakarta Sans.'),
      boldBody('Clases utilitarias:'),
      bullet('.glass-card: Card con backdrop-filter blur y borde semitransparente.'),
      bullet('.text-gradient: Gradiente lineal en texto (púrpura → cyan → rosa).'),
      bullet('.reveal / .visible: Sistema de animaciones scroll con IntersectionObserver.'),
      bullet('.bg-gradient-main: Gradiente púrpura → rosa.'),
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 7. SERVICIOS =====================
      heading('7. Servicios'),

      // 7.1 SupabaseService
      subheading('7.1 SupabaseService'),
      body('Archivo: src/app/services/supabase.ts'),
      body(
        'Wrapper del cliente Supabase que gestiona la conexión con la base de datos PostgreSQL.',
      ),
      imgParagraph('supabase-service', 620, 800),

      boldBody('Características:'),
      body(
        '• Validación de URL antes de inicializar el cliente para evitar errores en desarrollo.',
      ),
      body('• getCourseData(): Consulta la tabla "course" con joins a "instructor" y "modules".'),
      body('• sendContact(): Inserta registros en la tabla "contacts".'),
      body('• Getter "client" para acceso directo al cliente Supabase desde otros servicios.'),

      // 7.2 CourseService
      subheading('7.2 CourseService'),
      body('Archivo: src/app/services/course.ts'),
      body(
        'Capa de negocio principal que abstrae la lógica de la aplicación y proporciona datos de respaldo (fallback) cuando Supabase no está configurado.',
      ),
      imgParagraph('course-service', 620, 1200),

      boldBody('Interfaces exportadas:'),
      bullet('Module: id, title, description, duration'),
      bullet('Instructor: name, title, bio, credentials[]'),
      bullet('Metrics: students, rating, hours, projects'),
      bullet('Tutorial: id, title, description, url, duration, createdAt'),
      bullet('CourseData: title, instructor, metrics, modules'),
      boldBody('Métodos principales:'),
      body('• getCourseData(): Intenta obtener datos de Supabase; si falla, devuelve datos mock.'),
      body('• sendContact(): Envía formulario de contacto a Supabase con fallback a simulación.'),
      body('• getTutorials(): Devuelve lista local de tutoriales.'),
      body('• addTutorial(): Agrega tutorial localmente y emite evento via Subject RxJS.'),
      boldBody('Patrón de notificaciones en tiempo real:'),
      body(
        'El Subject tutorialAdded$ permite que múltiples componentes (Admin, Tutoriales, Notification) se suscriban y reaccionen cuando se crea un nuevo tutorial.',
      ),
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 8. SCROLL-REVEAL =====================
      heading('8. Directiva ScrollReveal'),
      body('Archivo: src/app/directives/scroll-reveal.ts'),
      body(
        'Directiva standalone que aplica animaciones de entrada cuando los elementos entran en el viewport al hacer scroll.',
      ),
      imgParagraph('scroll-reveal', 620, 400),

      boldBody('Funcionamiento:'),
      body('• Usa IntersectionObserver para detectar cuándo un elemento entra en el viewport.'),
      body('• threshold: 0.1 → Se activa cuando al menos el 10% del elemento es visible.'),
      body(
        '• rootMargin: "0px 0px -50px 0px" → Se activa 50px antes de que el elemento llegue al viewport.',
      ),
      body('• Agrega clase "reveal" inicialmente (oculto con opacity: 0 y translateY(30px)).'),
      body('• Cuando es visible, agrega clase "visible" (opacity: 1, translateY(0)).'),
      body('• Se desconecta automáticamente después de la primera activación (unobserve).'),
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 9. COMPONENTES =====================
      heading('9. Componentes Compartidos'),

      // 9.1 Navbar
      subheading('9.1 NavbarComponent'),
      body('Archivo: src/app/components/navbar/navbar.ts'),
      body(
        'Barra de navegación responsive con animaciones GSAP, detección de scroll y menú mobile.',
      ),
      imgParagraph('navbar', 620, 750),
      boldBody('Características:'),
      bullet('@ViewChildren para animar los links de navegación con GSAP stagger.'),
      bullet('@HostListener("window:scroll") para detectar scroll y agregar clase "scrolled".'),
      bullet('Menú mobile full-screen con overlay y GSAP fade toggle.'),
      bullet('11 enlaces de navegación + botón CTA "Inscríbete" con efecto glow.'),
      bullet('Underline animation en hover con pseudo-elemento ::after.'),
      new Paragraph({ children: [new PageBreak()] }),

      // 9.2 Hero
      subheading('9.2 HeroComponent'),
      body('Archivo: src/app/components/hero/hero.ts'),
      body('Hero section de la landing page con animaciones GSAP, métricas dinámicas y visual 3D.'),
      imgParagraph('hero', 620, 650),
      boldBody('Características:'),
      bullet('Carga datos desde CourseService (métricas: estudiantes, rating, horas).'),
      bullet('GSAP stagger animation en los hijos del contenido (fade-in up con power4.out).'),
      bullet('GSAP slide-in desde la derecha para el panel visual.'),
      bullet('Esfera de glow decorativa con CSS radial-gradient.'),
      bullet('Imagen 3D con transform: perspective(1000px) rotateY(-10deg).'),
      bullet('Badge flotante "Blender 5.0 Ready" con gradiente.'),
      new Paragraph({ children: [new PageBreak()] }),

      // 9.3 CourseDetails
      subheading('9.3 CourseDetailsComponent'),
      body('Archivo: src/app/components/course-details/course-details.ts'),
      body('Grid de 4 columnas que muestra los módulos del plan de estudios.'),
      imgParagraph('course-details', 620, 450),
      boldBody('Características:'),
      bullet('Usa ScrollRevealDirective con transitionDelay progresivo (i * 100ms).'),
      bullet('Cada módulo muestra: número (01-04), icono, título, descripción, duración.'),
      bullet('Iconos cíclicos: Box → Layers → Box → Stars.'),
      bullet('Card glassmorphism con hover effect (border-color primary + glow).'),
      new Paragraph({ children: [new PageBreak()] }),

      // 9.4 Instructor
      subheading('9.4 InstructorComponent'),
      body('Archivo: src/app/components/instructor/instructor.ts'),
      body('Sección del instructor con foto, biografía y credenciales.'),
      imgParagraph('instructor', 620, 400),
      boldBody('Características:'),
      bullet('Layout de dos columnas: imagen + información.'),
      bullet('Avatar con efecto image-stack (background gradiente detrás).'),
      bullet('Lista de credenciales con iconos checkmark y ScrollReveal.'),
      bullet('Card glassmorphism con borde semitransparente.'),
      new Paragraph({ children: [new PageBreak()] }),

      // 9.5 Contact
      subheading('9.5 ContactComponent'),
      body('Archivo: src/app/components/contact/contact.ts'),
      body('Formulario de contacto con validación, estados de carga y feedback visual.'),
      imgParagraph('contact', 620, 500),
      boldBody('Características:'),
      bullet('Two-way binding con ngModel (FormsModule).'),
      bullet('Campos: nombre, email, mensaje con validación HTML5 required.'),
      bullet('Estados: isSubmitting (deshabilita botón) y successMessage (alerta por 5s).'),
      bullet('Inputs con estilo premium (focus: border-primary + glow).'),
      new Paragraph({ children: [new PageBreak()] }),

      // 9.6 Footer
      subheading('9.6 FooterComponent'),
      body('Archivo: src/app/components/footer/footer.ts'),
      body('Pie de página con 4 columnas: branding, explorar, soporte y newsletter.'),
      imgParagraph('footer', 620, 350),
      boldBody('Características:'),
      bullet('Logo DIGITALBLERD con icono hexagon y efecto glow.'),
      bullet('Redes sociales: Instagram, Twitter/X, YouTube, Discord con hover primary.'),
      bullet('Enlaces con hover translateX(5px) + color primary.'),
      bullet('Newsletter con input y botón de suscripción.'),
      bullet('Copyright © 2026 DIGITALBLERD.'),
      new Paragraph({ children: [new PageBreak()] }),

      // 9.7 Notification
      subheading('9.7 NotificationComponent'),
      body('Archivo: src/app/components/notification/notification.ts'),
      body('Sistema de notificaciones toast en tiempo real usando RxJS Subjects.'),
      imgParagraph('notification', 620, 500),
      boldBody('Características:'),
      bullet('Se suscribe a CourseService.tutorialAdded$ (RxJS Subject).'),
      bullet('Cada notificación se auto-destruye a los 6 segundos.'),
      bullet('Animación slideInRight con CSS keyframes.'),
      bullet('Estilo glassmorphism con borde púrpura (primary-glow).'),
      new Paragraph({ children: [new PageBreak()] }),

      // ===================== 10. PÁGINAS =====================
      heading('10. Páginas (Rutas)'),

      // 10.1 Home
      subheading('10.1 HomeComponent (/)'),
      body('Archivo: src/app/pages/home/home.ts'),
      body(
        'Página principal que compone 4 secciones: Hero → Plan de Estudios → Instructor → Contacto.',
      ),
      imgParagraph('home', 620, 300),

      new Paragraph({ children: [new PageBreak()] }),

      // 10.2 Blog
      subheading('10.2 BlogComponent (/blog)'),
      body('Archivo: src/app/pages/blog/blog.ts'),
      body(
        'Página de blog con 3 feature cards (rapidez, seguridad, personalización) y secciones de Misión/Visión.',
      ),
      body(
        'Usa ScrollRevealDirective, ng-icons (LightningChargeFill, ShieldLockFill, PuzzleFill).',
      ),
      new Paragraph({ children: [new PageBreak()] }),

      // 10.3 Proyectos
      subheading('10.3 ProyectosComponent (/proyectos)'),
      body('Archivo: src/app/pages/proyectos/proyectos.ts'),
      body(
        'Galería de 6 proyectos con imágenes Unsplash. Cada proyecto tiene categoría, overlay hover con botón "Ver Detalles".',
      ),
      body('Categorías: Exterior, Character Design, Environment, Hard Surface, Comercial, VFX.'),

      new Paragraph({ children: [new PageBreak()] }),

      // 10.4 Precios
      subheading('10.4 PreciosComponent (/precios)'),
      body('Archivo: src/app/pages/precios/precios.ts'),
      body(
        '3 planes de precios (Básico $1,000, Intermedio $2,000 - destacado, Avanzado $3,000). Template y estilos inline.',
      ),
      imgParagraph('precios', 620, 850),
      boldBody('Características:'),
      bullet('Plan "Intermedio" destacado con scale(1.05), border-color primary y glow.'),
      bullet('Feature lists con iconos checkmark-circle.'),
      bullet('Cada plan tiene botón que enlaza a /inscripcion.'),

      new Paragraph({ children: [new PageBreak()] }),

      // 10.5 Inscripcion
      subheading('10.5 InscripcionComponent (/inscripcion)'),
      body('Archivo: src/app/pages/inscripcion/inscripcion.ts'),
      body(
        'Página de inscripción con formulario completo y lista de ventajas. Template y estilos 100% inline.',
      ),
      imgParagraph('inscripcion', 620, 1200),
      boldBody('Características:'),
      bullet(
        'Formulario con nombre, email, selector de país (México, España, Colombia, Argentina, Otro).',
      ),
      bullet(
        'Selector de plan visual (Básico / Pro / Elite) con clase .active y background primary.',
      ),
      bullet('Lista de 3 ventajas: Certificación Oficial, Acceso de por vida, Bolsa de Trabajo.'),
      bullet('ScrollRevealDirective en ambas columnas.'),

      new Paragraph({ children: [new PageBreak()] }),

      // 10.6 Caracteristicas
      subheading('10.6 CaracteristicasComponent (/caracteristicas)'),
      body('Archivo: src/app/pages/caracteristicas/caracteristicas.ts'),
      body(
        '6 tarjetas de características de Blender con imágenes Unsplash, iconos superpuestos y descripciones.',
      ),

      // 10.7 Instalacion
      subheading('10.7 InstalacionComponent (/instalacion)'),
      body('Archivo: src/app/pages/instalacion/instalacion.ts'),
      body(
        'Guía de instalación con tabs para Windows, macOS y Linux. Cada OS tiene 3 pasos numerados + requisitos.',
      ),

      // 10.8 Recursos
      subheading('10.8 RecursosComponent (/recursos)'),
      body('Archivo: src/app/pages/recursos/recursos.ts'),
      body(
        '4 tarjetas de recursos (Documentación, Cursos, Comunidad, Addons) + 3 assets destacados.',
      ),

      // 10.9 Tutoriales
      subheading('10.9 TutorialesComponent (/tutoriales)'),
      body('Archivo: src/app/pages/tutoriales/tutoriales.ts'),
      body(
        'Lista de tutoriales con suscripción en tiempo real a tutorialAdded$. Muestra cards con icono play, título, descripción, duración y botón "Ver Tutorial".',
      ),
      imgParagraph('tutoriales', 620, 500),

      new Paragraph({ children: [new PageBreak()] }),

      // 10.10 Novedades
      subheading('10.10 NovedadesComponent (/novedades)'),
      body('Archivo: src/app/pages/novedades/novedades.ts'),
      body(
        'Página de novedades de Blender 5.0 "Hi Five". Hero section con badge + CTA de descarga. 4 tarjetas de actualizaciones mayores + sección de rendimiento.',
      ),

      new Paragraph({ children: [new PageBreak()] }),

      // 10.11 Admin
      subheading('10.11 AdminComponent (/admin)'),
      body('Archivo: src/app/pages/admin/admin.ts'),
      body(
        'Panel de administración para gestionar tutoriales. Dos columnas: formulario de creación + grid de tutoriales publicados.',
      ),
      imgParagraph('admin', 620, 700),
      boldBody('Características:'),
      bullet('Formulario con campos: título, descripción, URL del video, duración.'),
      bullet(
        'Al crear un tutorial, se emite vía tutorialAdded$ y todas las suscripciones se actualizan.',
      ),
      bullet(
        'Los tutoriales se muestran en cards con icono play, badge de duración y enlace para ver.',
      ),

      new Paragraph({ children: [new PageBreak()] }),

      // ===================== RESUMEN FINAL =====================
      heading('Resumen Técnico'),
      body(''),
      boldBody('Stack Tecnológico:'),
      bullet('Framework: Angular 21 (Standalone Components)'),
      bullet('Lenguaje: TypeScript 5.9'),
      bullet('Estilos: SCSS + Bootstrap 5.3 + Glassmorphism'),
      bullet('Animaciones: GSAP 3.14 + IntersectionObserver'),
      bullet('Backend: Supabase (PostgreSQL)'),
      bullet('Estado: RxJS Subjects + Services'),
      bullet('Testing: Vitest'),
      bullet('Build: Angular CLI v21 (application builder)'),
      body(''),
      boldBody('Arquitectura:'),
      bullet('11 rutas (1 eager + 10 lazy-loaded)'),
      bullet('7 componentes compartidos + 1 directiva + 2 servicios'),
      bullet('11 páginas standalone con lazy loading'),
      body(''),
      boldBody('Patrones implementados:'),
      bullet('Standalone components (sin NgModules)'),
      bullet('Lazy loading con loadComponent'),
      bullet('Fallback data graceful degradation'),
      bullet('Real-time notifications con RxJS Subjects'),
      bullet('SEO optimization (Open Graph, JSON-LD, sitemap)'),

      new Paragraph({ children: [new PageBreak()] }),

      // ===================== FIN =====================
      heading('Notas Finales'),
      body('Documentación generada el 11 de Junio de 2026.'),
      body('Proyecto: App-Blender / DIGITALBLERD - Máster en Blender 3D y Animación Profesional.'),
      body(''),
      body(
        'Las capturas de código fueron generadas con carbon-now-cli, que utiliza el motor de renderizado de carbon.now.sh para producir imágenes estilizadas de código fuente.',
      ),
    ],
  },
];

async function main() {
  const doc = new Document({
    title: 'Documentación DIGITALBLERD - App-Blender',
    description: 'Documentación técnica del proyecto App-Blender',
    creator: 'DIGITALBLERD',
    sections,
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`✅ Documento generado: ${OUTPUT}`);
  console.log(`   Tamaño: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
