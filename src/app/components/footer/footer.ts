import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapHexagonFill, bootstrapInstagram, bootstrapTwitterX, bootstrapYoutube, bootstrapDiscord } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapHexagonFill, bootstrapInstagram, bootstrapTwitterX, bootstrapYoutube, bootstrapDiscord })],
  template: `
    <footer class="footer py-80">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-4">
            <div class="d-flex align-items-center gap-2 mb-4">
              <ng-icon name="bootstrapHexagonFill" class="brand-icon"></ng-icon>
              <span class="brand-text">DIGITAL<span>BLERD</span></span>
            </div>
            <p class="text-muted mb-4">
              Formando a la siguiente generación de artistas 3D. 
              Calidad premium, aprendizaje real.
            </p>
            <div class="d-flex gap-3">
              <a href="#" class="social-link"><ng-icon name="bootstrapInstagram"></ng-icon></a>
              <a href="#" class="social-link"><ng-icon name="bootstrapTwitterX"></ng-icon></a>
              <a href="#" class="social-link"><ng-icon name="bootstrapYoutube"></ng-icon></a>
              <a href="#" class="social-link"><ng-icon name="bootstrapDiscord"></ng-icon></a>
            </div>
          </div>
          
          <div class="col-lg-2 col-md-4">
            <h6 class="text-white fw-bold mb-4">Explorar</h6>
            <ul class="list-unstyled footer-links">
              <li><a href="#">Cursos</a></li>
              <li><a href="#">Tutoriales</a></li>
              <li><a href="#">Recursos</a></li>
              <li><a href="#">Comunidad</a></li>
            </ul>
          </div>
          
          <div class="col-lg-2 col-md-4">
            <h6 class="text-white fw-bold mb-4">Soporte</h6>
            <ul class="list-unstyled footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Privacidad</a></li>
              <li><a href="#">Términos</a></li>
            </ul>
          </div>
          
          <div class="col-lg-4 col-md-4">
            <h6 class="text-white fw-bold mb-4">Newsletter</h6>
            <p class="text-muted small mb-4">Recibe tips de Blender y ofertas exclusivas.</p>
            <div class="newsletter-form">
              <input type="email" placeholder="Tu email" class="form-control premium-input">
              <button class="btn btn-primary-glow w-100 mt-2">Suscribirse</button>
            </div>
          </div>
        </div>
        
        <hr class="my-5 border-secondary opacity-25">
        
        <div class="text-center text-muted small">
          © 2026 DIGITALBLERD. Todos los derechos reservados. Hecho con pasión por el 3D.
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: var(--bg-darker); border-top: 1px solid var(--glass-border); }
    .py-80 { padding: 80px 0; }
    
    .brand-text {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 1.2rem;
      color: var(--text-main);
      span { color: var(--primary); }
    }
    
    .brand-icon { font-size: 1.5rem; color: var(--primary); }
    
    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      transition: var(--transition-smooth);
      font-size: 0.95rem;
      display: inline-block;
      margin-bottom: 0.8rem;
      
      &:hover {
        color: var(--primary);
        transform: translateX(5px);
      }
    }
    
    .social-link {
      width: 40px;
      height: 40px;
      background: var(--glass);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: var(--transition-smooth);
      
      &:hover {
        background: var(--primary);
        transform: translateY(-3px);
      }
    }
    
    .premium-input {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      color: white;
      border-radius: 10px;
      padding: 10px 15px;
      
      &:focus {
        background: var(--bg-dark);
        border-color: var(--primary);
        box-shadow: 0 0 0 3px var(--primary-glow);
      }
    }
  `]
})
export class FooterComponent {}
