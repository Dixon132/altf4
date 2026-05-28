import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import Hero from './components/Hero'
import Story from './components/Story'
import ImageSection from './components/ImageSection'
import ThreeD from './components/ThreeD'
import Marquee from './components/Marquee'
import Cursor from './components/Cursor'

gsap.registerPlugin(ScrollTrigger)

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

  useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.to(navRef.current, {
      backgroundColor: scrolled ? 'rgba(0,0,0,0.88)' : 'rgba(0,0,0,0)',
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [scrolled])

  return (
    <>
      {/* cursor personalizado */}
      <Cursor />

      <div
        className="bg-black text-white overflow-x-hidden"
        style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", cursor: 'none' }}
      >
        {/* ── NAV ── */}
        <nav
          ref={navRef}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
          style={{ backgroundColor: 'rgba(0,0,0,0)' }}
        >
          <span className="text-base tracking-[0.35em] uppercase text-white/60 font-sans font-light">
            AltF4
          </span>
          <div className="flex gap-8 text-[10px] tracking-[0.3em] uppercase text-white/35 font-sans">
            {['Historia', 'Galería', '3D'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace('í', 'i')}`}
                className="relative group"
              >
                <span className="hover:text-amber-400 transition-colors duration-300">{item}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </nav>

        {/* ── HERO ── */}
        <Hero />

        {/* ── MARQUEE 1 ── */}
        <Marquee text="ALTF4 · DISEÑO · IDENTIDAD · FORMA" direction={1} accent="#f59e0b" />

        {/* ── STORY ── */}
        <Story />

        {/* ── MARQUEE 2 ── */}
        <Marquee text="GALERÍA · IMÁGENES · PROYECTO · VISUAL" direction={-1} accent="#e879f9" />

        {/* separador galería */}
        <div id="galeria" className="flex items-center gap-6 px-8 pt-20 pb-4 max-w-6xl mx-auto">
          <div className="h-px flex-1 bg-white/8" />
          <span className="text-[10px] tracking-[0.5em] uppercase text-amber-400/50 font-sans">Galería</span>
          <div className="h-px flex-1 bg-white/8" />
        </div>

        {/* ── ESCENAS ── */}
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

        {/* ── MARQUEE 3 ── */}
        <Marquee text="3D · BLENDER · PRÓXIMAMENTE · RENDER" direction={1} accent="#38bdf8" />

        {/* ── 3D ── */}
        <ThreeD />

        {/* ── FOOTER ── */}
        <footer className="border-t py-12 px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <span className="text-xs tracking-[0.4em] uppercase text-white/12 font-sans">AltF4 © 2026</span>
          <div className="flex gap-2 items-center">
            <div className="w-1 h-1 rounded-full bg-amber-400/30" />
            <span className="text-xs tracking-[0.3em] uppercase text-white/10 font-sans">Diseño · Identidad · Forma</span>
          </div>
        </footer>
      </div>
    </>
  )
}
