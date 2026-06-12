import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapHexagonFill, bootstrapInstagram, bootstrapTwitterX, bootstrapYoutube, bootstrapDiscord } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapHexagonFill, bootstrapInstagram, bootstrapTwitterX, bootstrapYoutube, bootstrapDiscord })],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {}
