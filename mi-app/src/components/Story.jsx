import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
    { num: '01', title: 'Concepto', desc: 'Minimalismo con carácter. Menos ruido, más impacto en cada píxel.' },
    { num: '02', title: 'Paleta', desc: 'Negro profundo, ámbar eléctrico. Contraste que no pide permiso.' },
    { num: '03', title: 'Forma', desc: 'Tipografía que ocupa espacio. Geometría que guía la mirada.' },
]

export default function Story() {
    const sectionRef = useRef(null)
    const headRef = useRef(null)
    const itemsRef = useRef([])

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headRef.current, {
                y: 50, opacity: 0, duration: 1,
                scrollTrigger: { trigger: headRef.current, start: 'top 80%' },
            })

            itemsRef.current.forEach((el, i) => {
                gsap.from(el, {
                    x: 40, opacity: 0, duration: 0.8,
                    delay: i * 0.12,
                    scrollTrigger: { trigger: el, start: 'top 85%' },
                })
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="story" className="relative py-32 px-6 max-w-5xl mx-auto">

            <div className="flex items-center gap-6 mb-16">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] tracking-[0.5em] uppercase text-amber-400/60 font-sans">La historia</span>
                <div className="h-px flex-1 bg-white/10" />
            </div>

            <div ref={headRef} className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2
                        className="text-4xl sm:text-5xl uppercase leading-tight mb-6"
                        style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", textShadow: '0 0 40px rgba(251,191,36,0.12)' }}
                    >
                        El diseño<br />
                        <span className="text-amber-400">como lenguaje</span>
                    </h2>
                    <p className="text-white/45 font-sans font-light leading-relaxed text-sm sm:text-base">
                        Cada decisión visual tiene un propósito. Desde la tipografía hasta el color,
                        todo comunica antes de que leas una sola palabra. Este proyecto explora
                        esa frontera donde el diseño deja de ser decoración y se convierte en narrativa.
                    </p>
                </div>

                <div className="space-y-6">
                    {items.map((item, i) => (
                        <div
                            key={item.num}
                            ref={el => itemsRef.current[i] = el}
                            className="flex gap-5 group"
                        >
                            <span className="text-amber-400/35 text-xs font-sans mt-1 shrink-0 group-hover:text-amber-400 transition-colors duration-300">
                                {item.num}
                            </span>
                            <div className="border-t border-white/10 pt-4 flex-1">
                                <p className="text-xs tracking-[0.3em] uppercase text-white/75 font-sans mb-1">{item.title}</p>
                                <p className="text-white/35 font-sans font-light text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
