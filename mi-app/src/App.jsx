import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import Hero from './components/Hero'
import Story from './components/Story'
import ImageSection from './components/ImageSection'
import ThreeD from './components/ThreeD'

gsap.registerPlugin(ScrollTrigger)

/* ── Datos de cada sección de imagen ── */
const scenes = [
  {
    label: 'Identidad visual',
    title: 'La marca\nen movimiento',
    description:
      'El logotipo no es solo un símbolo — es el punto de partida de todo el sistema visual. Aquí se define cómo se comporta en distintos contextos, fondos y escalas.',
    align: 'left',
    accent: '#f59e0b',
  },
  {
    label: 'Composición',
    title: 'Espacio y\njerarquía',
    description:
      'La composición dicta dónde mira el ojo primero. Cada elemento tiene un peso visual calculado para guiar la atención sin forzarla.',
    align: 'right',
    accent: '#e879f9',
  },
  {
    label: 'Tipografía',
    title: 'La voz\ndel diseño',
    description:
      'Las fuentes no son neutras. Su peso, su tracking, su interlineado — todo suma al tono emocional del mensaje antes de que el lector procese una sola palabra.',
    align: 'left',
    accent: '#38bdf8',
  },
  {
    label: 'Color',
    title: 'Contraste\nsin ruido',
    description:
      'Una paleta reducida obliga a que cada color trabaje más. El negro absorbe, el ámbar activa, el blanco respira. Nada es decorativo.',
    align: 'right',
    accent: '#f59e0b',
  },
  {
    label: 'Detalle',
    title: 'Lo que no\nse ve primero',
    description:
      'Los mejores diseños tienen capas. Lo que el usuario descubre en el segundo o tercer vistazo es lo que hace que vuelva.',
    align: 'left',
    accent: '#4ade80',
  },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  // inicializar Lenis
  useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // animación del nav al hacer scroll
  useEffect(() => {
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0)',
      backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
      duration: 0.4,
      ease: 'power2.out',
    })
  }, [scrolled])

  return (
    <div
      className="bg-black text-white overflow-x-hidden"
      style={{ fontFamily: "'Impact', 'Arial Black', sans-serif" }}
    >
      {/* ── NAV ── */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ backgroundColor: 'rgba(0,0,0,0)' }}
      >
        <span className="text-lg tracking-[0.3em] uppercase text-white/70 font-sans font-light">
          AltF4
        </span>
        <div className="flex gap-8 text-[10px] tracking-[0.25em] uppercase text-white/40 font-sans">
          <a href="#story" className="hover:text-amber-400 transition-colors duration-300">Historia</a>
          <a href="#gallery" className="hover:text-amber-400 transition-colors duration-300">Galería</a>
          <a href="#3d" className="hover:text-amber-400 transition-colors duration-300">3D</a>
        </div>
      </nav>

      {/* ── SECCIONES ── */}
      <Hero />
      <Story />

      {/* separador */}
      <div id="gallery" className="flex items-center gap-6 px-8 py-20 max-w-6xl mx-auto">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-amber-400/60 font-sans">Galería</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* ── ESCENAS DE IMAGEN ── */}
      {scenes.map((scene, i) => (
        <ImageSection
          key={i}
          index={i + 1}
          label={scene.label}
          title={scene.title}
          description={scene.description}
          align={scene.align}
          accent={scene.accent}
        />
      ))}

      <ThreeD />

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs tracking-[0.4em] uppercase text-white/15 font-sans">AltF4 © 2026</span>
        <span className="text-xs tracking-[0.3em] uppercase text-white/10 font-sans">Diseño · Identidad · Forma</span>
      </footer>
    </div>
  )
}
