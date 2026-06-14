# Portafolio Albert

Portafolio personal construido con **React 18**, **Vite**, **Tailwind CSS** y **Framer Motion**.

Pensado para mostrar trabajos en plataformas como **Fiverr**, redes sociales y CVs en línea.

## Stack

- **Frontend:** React, Vite, JavaScript
- **Estilos:** Tailwind CSS, diseño responsive mobile-first
- **Animaciones:** Framer Motion (parallax, transiciones suaves, microinteracciones)
- **Backend & datos:** Integrable con APIs externas, Supabase y Firebase

## Proyectos incluidos

- **JJ Logistic** – Página web corporativa para empresa de logística y transporte.
- **SafePet** – Sitio web para servicios de cuidado y bienestar de mascotas.
- **Inversiones Duvan (Web)** – Página web para negocio de almuerzos al mayor.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` (o el puerto que indique Vite) en el navegador.

## Build de producción

```bash
npm run build
```

Los archivos optimizados se generan en la carpeta `dist/`.

## Personalización rápida

- **Proyectos:** edita `src/data/projects.js` para cambiar nombres, descripciones, tags e imágenes.
- **Hero / portada:** ajusta el texto principal en `src/components/Hero.jsx`.
- **Sobre mí:** modifica la biografía y skills en `src/components/About.jsx`.
- **Contacto:** actualiza el email, WhatsApp y GitHub en `src/components/Contact.jsx`.

## Ideal para

- Mostrar tu trabajo en **Fiverr**, **Upwork** u otras plataformas de freelancing.
- Enviar un link profesional a potenciales clientes.
- Tener una landing moderna para compartir en redes sociales.

## Deploy recomendado

El proyecto está preparado para desplegarse fácilmente en:

- **Vercel** (recomendado para proyectos con Vite/React).
- **Netlify**.
- **GitHub Pages** (sirviendo el contenido de `dist/`).

Solo tienes que conectar tu repositorio y apuntar el comando de build a `npm run build`.
