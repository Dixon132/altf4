import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Banda de texto que se mueve horizontalmente al hacer scroll.
 * direction: 1 = izquierda, -1 = derecha
 */
export default function Marquee({ text = 'ALTF4', direction = 1, accent = '#f59e0b' }) {
    const trackRef = useRef(null)

    // duplicamos el texto para que sea infinito visualmente
    const repeated = Array(8).fill(text).join(' · ')

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(trackRef.current, {
                xPercent: direction * -30,
                ease: 'none',
                scrollTrigger: {
                    trigger: trackRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            })
        })
        return () => ctx.revert()
    }, [direction])

    return (
        <div className="overflow-hidden py-6 border-y select-none" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <div
                ref={trackRef}
                className="whitespace-nowrap text-[clamp(2rem,6vw,5rem)] uppercase font-bold leading-none"
                style={{
                    fontFamily: "'Impact', 'Arial Black', sans-serif",
                    color: 'transparent',
                    WebkitTextStroke: `1px ${accent}40`,
                    willChange: 'transform',
                }}
            >
                {repeated}
            </div>
        </div>
    )
}
