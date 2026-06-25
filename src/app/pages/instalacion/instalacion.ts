import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideMonitor, lucideApple, lucideTerminal, lucideCheckCircle2, lucideExternalLink } from '@ng-icons/lucide';

@Component({
  selector: 'app-instalacion',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, NgIconComponent],
  providers: [provideIcons({ lucideMonitor, lucideApple, lucideTerminal, lucideCheckCircle2, lucideExternalLink })],
  templateUrl: './instalacion.html',
  styleUrls: ['./instalacion.scss']
})
export class InstalacionComponent {
  activeOS = 'windows';

  osOptions = [
    {
      id: 'windows',
      label: 'Windows',
      icon: 'lucideMonitor',
      steps: [
        { title: 'Descargar Instalador', text: 'Ve a blender.org y baja el archivo .msi para Windows.' },
        { title: 'Ejecutar Setup', text: 'Abre el instalador y sigue las instrucciones del asistente.' },
        { title: 'Finalizar', text: 'Una vez instalado, abre Blender desde el menú de inicio.' }
      ]
    },
    {
      id: 'macos',
      label: 'macOS',
      icon: 'lucideApple',
      steps: [
        { title: 'Descargar DMG', text: 'Elige la versión Intel o Apple Silicon según tu procesador.' },
        { title: 'Arrastrar a Aplicaciones', text: 'Abre el DMG y mueve el icono de Blender a tu carpeta de Apps.' },
        { title: 'Autorizar ejecución', text: 'Si el sistema te bloquea, ve a Ajustes > Seguridad para autorizar.' }
      ]
    },
    {
      id: 'linux',
      label: 'Linux',
      icon: 'lucideTerminal',
      steps: [
        { title: 'Usar Snap', text: 'Ejecuta: sudo snap install blender --classic' },
        { title: 'Alternativa Tarball', text: 'Descarga el tar.xz, extráelo y ejecuta el binario directamente.' },
        { title: 'Dependencias', text: 'Asegúrate de tener instalados los drivers de video propietarios.' }
      ]
    }
  ];
}
