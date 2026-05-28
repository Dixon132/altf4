import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
    { num: '01', title: 'Concepto', desc: 'Minimalismo con carácter. Menos ruido, más impacto en cada píxel.' },
    { num: '02', title: 'Paleta', desc: 'Negro profundo, ámbar eléctrico. Contraste que no pide permiso.' },
    { num: '03', title: 'Forma', desc: 'Tipografía que ocupa espacio. Geometría que guía la mirada.' },
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
    const statsRef = useRef([])

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

            // ── stats counter ──
            statsRef.current.forEach((el) => {
                const target = parseInt(el.dataset.target, 10)
                gsap.from({ val: 0 }, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                    onUpdate() {
                        el.textContent = Math.round(this.targets()[0].val)
                    },
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
                    <SplitText text="El diseño" className="block text-white" />
                    <SplitText text="como lenguaje" className="block" style={{ color: '#f59e0b' }} />
                </h2>
            </div>

            <p
                ref={subRef}
                className="text-white/40 font-sans font-light leading-relaxed mb-20 max-w-xl"
                style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
            >
                Cada decisión visual tiene un propósito. Desde la tipografía hasta el color,
                todo comunica antes de que leas una sola palabra. Este proyecto explora
                esa frontera donde el diseño deja de ser decoración y se convierte en narrativa.
            </p>

            {/* stats */}
            <div className="grid grid-cols-3 gap-8 mb-20 border-t border-b border-white/8 py-10">
                {[
                    { target: 5, suffix: '+', label: 'Escenas' },
                    { target: 100, suffix: '%', label: 'Diseño propio' },
                    { target: 1, suffix: '', label: 'Proyecto' },
                ].map((s, i) => (
                    <div key={i} className="text-center">
                        <div
                            className="font-bold leading-none mb-2"
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                                fontFamily: "'Impact', 'Arial Black', sans-serif",
                                color: '#f59e0b',
                            }}
                        >
                            <span ref={el => statsRef.current[i] = el} data-target={s.target}>0</span>
                            <span>{s.suffix}</span>
                        </div>
                        <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-sans">{s.label}</p>
                    </div>
                ))}
            </div>

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
