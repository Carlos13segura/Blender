import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapHexagonFill } from '@ng-icons/bootstrap-icons';
import { lucideMenu, lucideX } from '@ng-icons/lucide';
import {
  matHome,
  matList,
  matBuild,
  matBook,
  matSchool,
  matFolder,
  matLabel,
  matArticle,
  matFlashOn,
  matSecurity,
  matStar,
} from '@ng-icons/material-icons/baseline';
import gsap from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgIconComponent, RouterLink, RouterLinkActive],
  providers: [
    provideIcons({
      bootstrapHexagonFill,
      lucideMenu,
      lucideX,
      matHome,
      matList,
      matBuild,
      matBook,
      matSchool,
      matFolder,
      matLabel,
      matArticle,
      matFlashOn,
      matSecurity,
      matStar,
    }),
  ],
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

  constructor() {}

  ngOnInit(): void {}

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu(event: Event) {
    if ((event.target as HTMLElement).classList.contains('mobile-menu')) {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = offset > 50;
  }

  ngAfterViewInit(): void {
    // Animate navbar container
    gsap.from(this.container.nativeElement, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // Stagger animate desktop navigation links
    const links = this.navLinks.toArray().map((l) => l.nativeElement);
    gsap.from(links, {
      y: 20,
      opacity: 0,
      stagger: 0.07,
      delay: 0.3,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
}
