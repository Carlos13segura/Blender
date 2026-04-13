import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase';
import { from, Observable, map, of, catchError } from 'rxjs';

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

export interface CourseData {
  title: string;
  instructor: Instructor;
  metrics: Metrics;
  modules: Module[];
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private supabase = inject(SupabaseService);

  // Datos Mock de respaldo para que la UI se vea siempre
  private fallbackData: CourseData = {
    title: "DIGITALBLERD - Master 3D Design & Animation",
    instructor: {
      name: "Carlos Segura",
      title: "Senior 3D Artist & Lecturer",
      bio: "Especialista en Blender con más de 10 años de experiencia en la industria de la animación y el diseño 3D.",
      credentials: ["Autodesk Certified", "Blender Foundation Certified", "Top Rated Instructor"]
    },
    metrics: {
      students: 500,
      rating: 4.9,
      hours: 120,
      projects: 15
    },
    modules: [
      { id: 1, title: "Introducción a Blender", description: "Base del modelado 3D.", duration: "4 semanas" },
      { id: 2, title: "Esculpido & Texturas", description: "Detalles orgánicos.", duration: "6 semanas" },
      { id: 3, title: "Rigging & Animación", description: "Movimiento pro.", duration: "5 semanas" },
      { id: 4, title: "Iluminación & Render", description: "Resultado final.", duration: "5 semanas" }
    ]
  };

  getCourseData(): Observable<CourseData> {
    return from(this.supabase.getCourseData()).pipe(
      map((data: any) => ({
        title: data.title,
        instructor: data.instructor,
        metrics: {
          students: data.students,
          rating: data.rating,
          hours: data.hours,
          projects: data.projects
        },
        modules: data.modules.sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      })),
      catchError(err => {
        console.warn('Supabase no configurado o error en carga, usando fallback:', err);
        return of(this.fallbackData);
      })
    );
  }

  sendContact(contact: { name: string; email: string; message: string }): Observable<any> {
    return from(this.supabase.sendContact(contact)).pipe(
      map(() => ({ message: "Mensaje recibido correctamente. Te contactaremos pronto." })),
      catchError(() => of({ message: "Simulación de envío: ¡Datos recibidos!" }))
    );
  }
}
