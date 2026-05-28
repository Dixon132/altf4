import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import heroImg from '../assets/landing.jpeg'

export default function Hero() {
    const containerRef = useRef(null)
    const imgRef = useRef(null)
    const titleRef = useRef(null)
    const subRef = useRef(null)
    const btnRef = useRef(null)
    const lineRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            // entrada inicial
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.from(imgRef.current, { scale: 1.12, duration: 2.2, ease: 'power2.out' })
                .from(titleRef.current, { y: 60, opacity: 0, duration: 1.2 }, '-=1.6')
                .from(subRef.current, { y: 30, opacity: 0, duration: 0.9 }, '-=0.8')
                .from(btnRef.current, { y: 20, opacity: 0, duration: 0.7 }, '-=0.6')
                .from(lineRef.current, { scaleY: 0, opacity: 0, duration: 0.8, transformOrigin: 'top' }, '-=0.4')
        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-end pb-20 overflow-hidden">

            {/* imagen */}
            <img
                ref={imgRef}
                src={heroImg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.5) saturate(1.3)' }}
            />

            {/* gradientes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

            {/* contenido */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
                <p className="text-[10px] sm:text-xs tracking-[0.5em] uppercase text-amber-400/70 mb-6 font-sans font-medium">
                    Diseño · Identidad · Forma
                </p>

                <h1
                    ref={titleRef}
                    className="text-[clamp(5rem,18vw,16rem)] leading-none uppercase text-white"
                    style={{
                        letterSpacing: '-0.02em',
                        textShadow: '0 0 100px rgba(251,191,36,0.2), 0 4px 60px rgba(0,0,0,0.9)',
                        fontFamily: "'Impact', 'Arial Black', sans-serif",
                    }}
                >
                    Alt<span style={{ color: '#f59e0b' }}>F4</span>
                </h1>

                <p
                    ref={subRef}
                    className="mt-4 text-sm sm:text-base tracking-[0.2em] uppercase text-white/40 font-sans font-light"
                >
                    Un proyecto donde el diseño habla por sí solo
                </p>

                <button
                    ref={btnRef}
                    className="mt-10 px-10 py-3 border border-amber-400/50 text-amber-400 text-xs tracking-[0.35em] uppercase font-sans font-medium hover:bg-amber-400 hover:text-black transition-all duration-300"
                >
                    Explorar
                </button>
            </div>

            {/* scroll hint */}
            <div ref={lineRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
                <span className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-sans">Scroll</span>
                <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
            </div>
        </section>
    )
}
