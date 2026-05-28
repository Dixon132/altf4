import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
    {
        num: '01',
        title: 'Concepto',
        desc: 'Una reinterpretación de la Guerra del Gas de Bolivia (2003): policías rediseñados como entidades que absorben el alma de los ciudadanos — el gas como metáfora del espíritu colectivo que el Estado intenta extraer y controlar.',
    },
    {
        num: '02',
        title: 'Paleta',
        desc: 'Oscura por decisión. Negros densos, grises ceniza y destellos de ámbar sucio evocan humo, represión y calles sin luz. El color no decora — acusa.',
    },
    {
        num: '03',
        title: 'Formas',
        desc: 'Modelos de personajes y escenarios construidos desde cero en Blender. Entornos urbanos con bibliotecas de assets procedurales; figuras policiales con geometría distorsionada para reflejar su naturaleza alterada.',
    },
]

// divide un string en spans por letra
function SplitText({ text, className, style }) {
    return (
        <span className={className} style={style} aria-label={text}>
            {text.split('').map((ch, i) => (
                <span
                    key={i}
                    className="inline-block split-char"
                    style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                    {ch}
                </span>
            ))}
        </span>
    )
}

export default function Story() {
    const sectionRef = useRef(null)
    const titleWrap = useRef(null)
    const subRef = useRef(null)
    const itemsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── letras del título caen desde arriba ──
            const chars = titleWrap.current.querySelectorAll('.split-char')
            gsap.from(chars, {
                y: -60, opacity: 0, rotateX: -90,
                duration: 0.7, ease: 'power3.out',
                stagger: 0.03,
                scrollTrigger: { trigger: titleWrap.current, start: 'top 80%' },
            })

            gsap.from(subRef.current, {
                y: 30, opacity: 0, duration: 0.9,
                scrollTrigger: { trigger: subRef.current, start: 'top 85%' },
            })

            // ── items con slide desde el lado ──
            itemsRef.current.forEach((el, i) => {
                gsap.from(el, {
                    x: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
                    delay: i * 0.1,
                    scrollTrigger: { trigger: el, start: 'top 88%' },
                })
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="story" className="relative py-32 px-6 max-w-5xl mx-auto overflow-hidden">

            {/* separador */}
            <div className="flex items-center gap-6 mb-20">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] tracking-[0.5em] uppercase text-amber-400/60 font-sans">La historia</span>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* título con split */}
            <div ref={titleWrap} className="mb-4" style={{ perspective: '600px' }}>
                <h2
                    className="uppercase leading-tight"
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 7rem)',
                        fontFamily: "'Impact', 'Arial Black', sans-serif",
                        textShadow: '0 0 60px rgba(251,191,36,0.1)',
                    }}
                >
                    <SplitText text="Almas de" className="block text-white" />
                    <SplitText text="humo y gas" className="block" style={{ color: '#f59e0b' }} />
                </h2>
            </div>

            <p
                ref={subRef}
                className="text-white/40 font-sans font-light leading-relaxed mb-20 max-w-xl"
                style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
            >
                Bolivia, 2003. El pueblo sale a las calles a defender el gas natural — su recurso, su alma colectiva.
                Este proyecto reimagina ese conflicto: ¿qué pasaría si las fuerzas del orden no fueran humanas,
                sino entidades modificadas para absorber la voluntad de los ciudadanos?
                El gas como espíritu. La represión como extracción.
            </p>

            {/* items */}
            <div className="space-y-0">
                {items.map((item, i) => (
                    <div
                        key={item.num}
                        ref={el => itemsRef.current[i] = el}
                        className="flex gap-6 group border-b border-white/6 py-7 hover:border-amber-400/20 transition-colors duration-300"
                    >
                        <span className="text-amber-400/30 text-xs font-sans mt-1 shrink-0 w-8 group-hover:text-amber-400 transition-colors duration-300">
                            {item.num}
                        </span>
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <p className="text-sm tracking-[0.25em] uppercase text-white/70 font-sans group-hover:text-white transition-colors duration-300">
                                {item.title}
                            </p>
                            <p className="text-white/30 font-sans font-light text-sm sm:max-w-xs sm:text-right">
                                {item.desc}
                            </p>
                        </div>
                        <span className="text-amber-400/0 group-hover:text-amber-400/60 transition-all duration-300 text-xs font-sans self-center">
                            →
                        </span>
                    </div>
                ))}
            </div>

        </section>
    )
}
