import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapLightningChargeFill, bootstrapShieldLockFill, bootstrapPuzzleFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent],
  providers: [provideIcons({ bootstrapLightningChargeFill, bootstrapShieldLockFill, bootstrapPuzzleFill })],
  templateUrl: './blog.html',
  styleUrls: ['./blog.scss'],
})
export class BlogComponent {
  features = [
    {
      title: 'Súper Rápido',
      icon: 'bootstrapLightningChargeFill',
      description: 'Rendimiento optimizado para que trabajes sin interrupciones y sin lag en tus proyectos más complejos.'
    },
    {
      title: '100% Seguro',
      icon: 'bootstrapShieldLockFill',
      description: 'Tus proyectos están protegidos con encriptación de nivel y backups automáticos en nuestra nube.'
    },
    {
      title: 'Personalizable',
      icon: 'bootstrapPuzzleFill',
      description: 'Adapta cada aspecto de la interfaz a tu flujo de trabajo y estilo creativo único con Python API.'
    }
  ];
}
