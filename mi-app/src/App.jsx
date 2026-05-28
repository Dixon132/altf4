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
import img11 from './assets/11.png'
import img22 from './assets/22.png'
import banner1 from './assets/baner.png'
import banner2 from './assets/baner2.png'
import banner3 from './assets/banner3.png'
import banner4 from './assets/banner4.png'
import banner5 from './assets/banner5.png'

gsap.registerPlugin(ScrollTrigger)

const scenes = [
  {
    label: 'El detonante',
    title: 'El gas\nno se vende',
    description:
      'Octubre 2003. Bolivia arde. El gobierno de Sánchez de Lozada intenta exportar gas natural por puertos chilenos. El pueblo responde con bloqueos, marchas y sangre. Aquí reimaginamos a los agentes del Estado como entidades que no reprimen — absorben.',
    align: 'left',
    accent: '#f59e0b',
    image: banner1,
    thumbs: [img11, img22, img22],
  },
  {
    label: 'Los absorbedores',
    title: 'Policías\nsin alma',
    description:
      'Modificados para extraer la voluntad colectiva. Cada ciudadano que cae no muere — es vaciado. Su energía, su rabia, su identidad pasan a alimentar la máquina del Estado. El gas como metáfora del espíritu que se intenta robar.',
    align: 'right',
    accent: '#e879f9',
    image: banner2,
    thumbs: [img22, img22, img22],
  },
  {
    label: 'El Cerco de La Paz',
    title: 'La ciudad\nasediada',
    description:
      'Mineros, campesinos y vecinos de El Alto rodean La Paz. El cerco no es solo físico — es simbólico. La ciudad respira el gas que le pertenece mientras las entidades modificadas patrullan sus calles buscando almas que cosechar.',
    align: 'left',
    accent: '#38bdf8',
    image: banner3,
    thumbs: [img22, img22, img22],
  },
  {
    label: 'La masacre',
    title: 'Sangre\ny humo',
    description:
      'Más de 60 muertos. Cientos de heridos. El gobierno ordena disparar. En nuestra versión, las balas no matan — transfieren. Cada impacto es una extracción forzada del alma. El humo del gas lacrimógeno se mezcla con el espíritu robado de los caídos.',
    align: 'right',
    accent: '#f59e0b',
    image: banner4,
    thumbs: [img22, img22, img22],
  },
  {
    label: 'La renuncia',
    title: 'El pueblo\nrecupera',
    description:
      'Sánchez de Lozada huye al exilio. El gas queda en Bolivia. Las entidades absorbedoras colapsan — sin almas que extraer, se desintegran. El espíritu colectivo regresa a las calles. La resistencia como acto de recuperación del alma propia.',
    align: 'left',
    accent: '#4ade80',
    image: banner5,
    thumbs: [img22, img22, img22],
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
            image={scene.image}
            thumbs={scene.thumbs || []}
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
