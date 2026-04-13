import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero';
import { CourseDetailsComponent } from '../../components/course-details/course-details';
import { InstructorComponent } from '../../components/instructor/instructor';
import { ContactComponent } from '../../components/contact/contact';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    HeroComponent, 
    CourseDetailsComponent, 
    InstructorComponent, 
    ContactComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-course-details></app-course-details>
    <app-instructor></app-instructor>
    <app-contact></app-contact>
  `
})
export class HomeComponent {}
