import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase?: SupabaseClient;

  constructor() {
    const supabaseUrl = 'YOUR_SUPABASE_URL';
    const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
    
    // Solo inicializar si la URL es válida para evitar que Angular se rompa al arranque
    if (supabaseUrl && supabaseUrl.startsWith('https://')) {
      try {
        this.supabase = createClient(supabaseUrl, supabaseKey);
      } catch (e) {
        console.error('Error al inicializar Supabase:', e);
      }
    } else {
      console.warn('Supabase: URL no configurada o inválida. Usando modo de desarrollo sin conexión.');
    }
  }

  get client() {
    return this.supabase;
  }

  async getCourseData() {
    if (!this.supabase) {
      throw new Error('Supabase no está configurado');
    }

    const { data: course, error: courseError } = await this.supabase
      .from('course')
      .select(`
        *,
        instructor (*),
        modules (*)
      `)
      .single();

    if (courseError) throw courseError;
    return course;
  }

  async sendContact(contact: { name: string; email: string; message: string }) {
    if (!this.supabase) {
      throw new Error('Supabase no está configurado');
    }

    const { data, error } = await this.supabase
      .from('contacts')
      .insert([contact]);

    if (error) throw error;
    return data;
  }
}
