import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapCheckCircleFill } from '@ng-icons/bootstrap-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent, RouterLink],
  providers: [provideIcons({ bootstrapCheckCircleFill })],
  templateUrl: './precios.html',
  styleUrls: ['./precios.scss'],
})
export class PreciosComponent {
  plans = [
    {
      name: 'Plan Básico',
      price: '1,000',
      featured: false,
      features: [
        'Acceso a la plataforma 24/7',
        'Material descargable',
        'Comunidad privada',
        'Certificado digital',
      ],
    },
    {
      name: 'Plan Intermedio',
      price: '2,000',
      featured: true,
      features: [
        'Todo el Plan Básico',
        'Mentorías grupales semanales',
        'Feedback personalizado',
        'Bolsa de trabajo exclusiva',
      ],
    },
    {
      name: 'Plan Avanzado',
      price: '3,000',
      featured: false,
      features: [
        'Todo el Plan Intermedio',
        'Mentorías 1:1 diarias',
        'Garantía de empleo',
        'Proyectos con clientes reales',
      ],
    },
  ];
}
