# Configuración de Supabase para DIGITALBLERD

Sigue estos pasos para configurar tu backend en Supabase y conectar la aplicación.

## 1. Crear las Tablas

Copia y pega este script en el **SQL Editor** de tu panel de Supabase:

```sql
-- Crear Tabla de Instructores
CREATE TABLE instructor (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  credentials TEXT[]
);

-- Crear Tabla de Cursos
CREATE TABLE course (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  instructor_id BIGINT REFERENCES instructor(id),
  students INTEGER DEFAULT 0,
  rating DECIMAL DEFAULT 0.0,
  hours INTEGER DEFAULT 0,
  projects INTEGER DEFAULT 0
);

-- Crear Tabla de Módulos
CREATE TABLE modules (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  course_id BIGINT REFERENCES course(id),
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  "order" INTEGER
);

-- Crear Tabla de Contactos (para el formulario)
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT,
  email TEXT,
  message TEXT
);

-- Insertar Datos de Prueba
INSERT INTO instructor (name, title, bio, credentials) 
VALUES ('Carlos Segura', 'Senior 3D Artist & Lecturer', 'Especialista en Blender con más de 10 años de experiencia...', ARRAY['Autodesk Certified', 'Blender Foundation Certified', 'Top Rated Instructor']);

INSERT INTO course (title, instructor_id, students, rating, hours, projects)
VALUES ('DIGITALBLERD - Master 3D Design & Animation', 1, 500, 4.9, 120, 15);

INSERT INTO modules (course_id, title, description, duration, "order")
VALUES 
(1, 'Introducción a Blender & Modelado Base', 'Aprende la interfaz y las herramientas fundamentales de modelado poligonal.', '4 semanas', 1),
(1, 'Esculpido Digital & Texturizado', 'Domina el esculpido orgánico y la creación de texturas realistas PBR.', '6 semanas', 2),
(1, 'Rigging & Animación Avanzada', 'Da vida a tus personajes con sistemas de rigging profesional.', '5 semanas', 3),
(1, 'Iluminación, Render & Composición', 'Crea imágenes de impacto cinematográfico con Eevee y Cycles.', '5 semanas', 4);
```

## 2. Configurar las Credenciales

Edita el archivo `src/app/services/supabase.ts` y reemplaza los valores de `supabaseUrl` y `supabaseKey` con los que encontrarás en:
**Project Settings > API** de tu proyecto Supabase.

```typescript
const supabaseUrl = 'TU_URL_DE_SUPABASE';
const supabaseKey = 'TU_ANON_KEY_DE_SUPABASE';
```

## 3. Desactivar RLS (Opcional para pruebas)

Para poder leer los datos sin autenticación en esta etapa de desarrollo:
1. Ve a cada tabla en **Table Editor**.
2. Haz clic en **RLS disabled** (o configura una política de `SELECT` para todos).
