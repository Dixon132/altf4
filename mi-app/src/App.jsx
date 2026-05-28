import { useState, useEffect } from 'react'
import heroImg from './assets/landing.jpeg'

/* ── Recuadros placeholder para imágenes futuras ── */
const gallery = [
  { id: 1, label: 'Escena 01' },
  { id: 2, label: 'Escena 02' },
  { id: 3, label: 'Escena 03' },
  { id: 4, label: 'Escena 04' },
  { id: 5, label: 'Escena 05' },
  { id: 6, label: 'Escena 06' },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-black text-white overflow-x-hidden" style={{ fontFamily: "'Pricedown', 'Impact', 'Arial Black', sans-serif" }}>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
        <span className="text-xl tracking-[0.3em] uppercase text-white/80 font-sans font-light">
          AltF4
        </span>
        <div className="flex gap-8 text-xs tracking-[0.25em] uppercase text-white/50 font-sans">
          <a href="#story" className="hover:text-white transition-colors">Historia</a>
          <a href="#gallery" className="hover:text-white transition-colors">Galería</a>
          <a href="#3d" className="hover:text-white transition-colors">3D</a>
        </div>
      </nav>

      {/* ── HERO FULLSCREEN ── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-end pb-20 overflow-hidden">

        {/* imagen de fondo */}
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
          style={{ filter: 'brightness(0.55) saturate(1.2)' }}
        />

        {/* gradiente inferior */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* gradiente lateral izquierdo sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* contenido centrado */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">

          {/* eyebrow */}
          <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-amber-400/80 mb-6 font-sans font-medium">
            Diseño · Identidad · Forma
          </p>

          {/* título estilo GTA — enorme, condensado */}
          <h1
            className="text-[clamp(5rem,18vw,16rem)] leading-none uppercase text-white drop-shadow-2xl"
            style={{
              letterSpacing: '-0.02em',
              textShadow: '0 0 80px rgba(251,191,36,0.25), 0 4px 40px rgba(0,0,0,0.8)',
            }}
          >
            Alt<span style={{ color: '#f59e0b' }}>F4</span>
          </h1>

          {/* subtítulo */}
          <p className="mt-4 text-sm sm:text-base tracking-[0.2em] uppercase text-white/50 font-sans font-light">
            Un proyecto donde el diseño habla por sí solo
          </p>

          {/* CTA */}
          <button className="mt-10 px-10 py-3 border border-amber-400/60 text-amber-400 text-xs tracking-[0.35em] uppercase font-sans font-medium hover:bg-amber-400 hover:text-black transition-all duration-300">
            Explorar
          </button>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-sans">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      <section id="story" className="relative py-32 px-6 max-w-5xl mx-auto">

        {/* línea decorativa */}
        <div className="flex items-center gap-6 mb-16">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-amber-400/60 font-sans">La historia</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl uppercase leading-tight mb-6"
              style={{ textShadow: '0 0 40px rgba(251,191,36,0.15)' }}>
              El diseño<br />
              <span className="text-amber-400">como lenguaje</span>
            </h2>
            <p className="text-white/50 font-sans font-light leading-relaxed text-sm sm:text-base">
              Cada decisión visual tiene un propósito. Desde la tipografía hasta el color,
              todo comunica antes de que leas una sola palabra. Este proyecto explora
              esa frontera donde el diseño deja de ser decoración y se convierte en narrativa.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { num: '01', title: 'Concepto', desc: 'Minimalismo con carácter. Menos ruido, más impacto.' },
              { num: '02', title: 'Paleta', desc: 'Negro profundo, ámbar eléctrico. Contraste que no pide permiso.' },
              { num: '03', title: 'Forma', desc: 'Tipografía que ocupa espacio. Geometría que guía la mirada.' },
            ].map(item => (
              <div key={item.num} className="flex gap-5 group">
                <span className="text-amber-400/40 text-xs font-sans mt-1 shrink-0 group-hover:text-amber-400 transition-colors">
                  {item.num}
                </span>
                <div className="border-t border-white/10 pt-4 flex-1">
                  <p className="text-xs tracking-[0.3em] uppercase text-white/80 font-sans mb-1">{item.title}</p>
                  <p className="text-white/40 font-sans font-light text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY SECTION ── */}
      <section id="gallery" className="py-20 px-6">

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-amber-400/60 font-sans">Galería</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <h2 className="text-3xl sm:text-4xl uppercase text-center mb-4"
            style={{ textShadow: '0 0 40px rgba(251,191,36,0.1)' }}>
            Imágenes del proyecto
          </h2>
          <p className="text-center text-white/30 font-sans text-sm tracking-widest uppercase mb-16">
            Próximamente
          </p>

          {/* grid de recuadros */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {gallery.map((item, i) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden"
                style={{ aspectRatio: i === 0 || i === 3 ? '16/10' : '4/3' }}
              >
                {/* fondo placeholder */}
                <div className="absolute inset-0 bg-neutral-900 border border-white/5 group-hover:border-amber-400/30 transition-all duration-500" />

                {/* patrón de puntos */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* overlay hover */}
                <div className="absolute inset-0 bg-amber-400/0 group-hover:bg-amber-400/5 transition-all duration-500" />

                {/* ícono central */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-10 h-10 border border-white/10 group-hover:border-amber-400/40 flex items-center justify-center transition-all duration-300">
                    <svg className="w-4 h-4 text-white/20 group-hover:text-amber-400/60 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-white/20 group-hover:text-amber-400/50 font-sans transition-colors duration-300">
                    {item.label}
                  </span>
                </div>

                {/* número esquina */}
                <span className="absolute top-3 left-3 text-[10px] text-white/15 font-sans tracking-widest">
                  {String(item.id).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLACEHOLDER 3D ── */}
      <section id="3d" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] tracking-[0.5em] uppercase text-amber-400/60 font-sans">3D</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div
            className="relative w-full flex items-center justify-center border border-white/5 bg-neutral-950"
            style={{ height: '480px' }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 border border-amber-400/20 flex items-center justify-center">
                <span className="text-amber-400/40 text-2xl">◈</span>
              </div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-white/20 font-sans">
                Diseño 3D · Blender · Próximamente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs tracking-[0.4em] uppercase text-white/20 font-sans">AltF4 © 2026</span>
        <span className="text-xs tracking-[0.3em] uppercase text-white/15 font-sans">Diseño · Identidad · Forma</span>
      </footer>

    </div>
  )
}
