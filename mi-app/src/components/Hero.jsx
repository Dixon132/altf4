import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImg from '../assets/hero.png'
import Noise from './Noise'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
    const containerRef = useRef(null)
    const imgRef = useRef(null)
    const titleRef = useRef(null)
    const subRef = useRef(null)
    const btnRef = useRef(null)
    const lineRef = useRef(null)
    const eyebrowRef = useRef(null)
    const sideLeftRef = useRef(null)
    const sideRightRef = useRef(null)
    const progressRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── entrada ──
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
            tl.from(imgRef.current, { scale: 1.1, duration: 2.4, ease: 'power2.out' })
                .from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.7 }, '-=1.8')
                .from(titleRef.current, { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=1.4')
                .from(subRef.current, { y: 30, opacity: 0, duration: 0.9 }, '-=0.7')
                .from(btnRef.current, { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
                .from(sideLeftRef.current, { opacity: 0, x: -20, duration: 0.8 }, '-=0.6')
                .from(sideRightRef.current, { opacity: 0, x: 20, duration: 0.8 }, '-=0.8')
                .from(lineRef.current, { scaleY: 0, opacity: 0, duration: 0.8, transformOrigin: 'top' }, '-=0.5')

            // ── parallax del hero al hacer scroll ──
            gsap.to(imgRef.current, {
                yPercent: 25,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            })

            // ── barra de progreso lateral ──
            gsap.to(progressRef.current, {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                },
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen flex flex-col items-center justify-end pb-20 overflow-hidden"
            style={{ cursor: 'none' }}
        >
            {/* imagen con parallax */}
            <img
                ref={imgRef}
                src={heroImg}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center"
                style={{ filter: 'brightness(0.45) saturate(1.4)', willChange: 'transform' }}
            />

            {/* ruido cinematográfico */}
            <Noise />

            {/* gradientes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />

            {/* viñeta */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    boxShadow: 'inset 0 0 200px rgba(0,0,0,0.7)',
                }}
            />

            {/* ── texto lateral izquierdo ── */}
            <div
                ref={sideLeftRef}
                className="absolute left-6 bottom-1/2 translate-y-1/2 z-20 flex flex-col items-center gap-3"
            >
                <div className="h-16 w-px bg-white/15" />
                <span
                    className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-sans"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                    Diseño · 2026
                </span>
            </div>

            {/* ── texto lateral derecho ── */}
            <div
                ref={sideRightRef}
                className="absolute right-6 bottom-1/2 translate-y-1/2 z-20 flex flex-col items-center gap-3"
            >
                <span
                    className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-sans"
                    style={{ writingMode: 'vertical-rl' }}
                >
                    AltF4 · Portfolio
                </span>
                <div className="h-16 w-px bg-white/15" />
            </div>

            {/* ── barra de progreso scroll (lado derecho) ── */}
            <div className="fixed right-0 top-0 w-[2px] h-full z-[60] bg-white/5">
                <div
                    ref={progressRef}
                    className="w-full bg-amber-400 origin-top"
                    style={{ height: '100%', scaleY: 0 }}
                />
            </div>

            {/* ── contenido central ── */}
            <div className="relative z-20 flex flex-col items-center text-center px-6">
                <p
                    ref={eyebrowRef}
                    className="text-[10px] sm:text-xs tracking-[0.6em] uppercase text-amber-400/60 mb-8 font-sans font-medium"
                >
                    Diseño · Identidad · Forma
                </p>

                <h1
                    ref={titleRef}
                    className="leading-none uppercase text-white"
                    style={{
                        fontSize: 'clamp(5rem, 20vw, 18rem)',
                        letterSpacing: '-0.03em',
                        fontFamily: "'Impact', 'Arial Black', sans-serif",
                        textShadow: '0 0 120px rgba(251,191,36,0.18), 0 0 40px rgba(0,0,0,1)',
                    }}
                >
                    Alt<span style={{ color: '#f59e0b' }}>F4</span>
                </h1>

                <p
                    ref={subRef}
                    className="mt-5 text-sm sm:text-base tracking-[0.25em] uppercase text-white/35 font-sans font-light"
                >
                    Un proyecto donde el diseño habla por sí solo
                </p>

                <button
                    ref={btnRef}
                    className="mt-12 group relative px-12 py-4 text-xs tracking-[0.4em] uppercase font-sans font-medium overflow-hidden"
                    style={{ border: '1px solid rgba(245,158,11,0.4)', color: '#f59e0b' }}
                >
                    {/* fill hover */}
                    <span
                        className="absolute inset-0 bg-amber-400 transition-transform duration-500 origin-left"
                        style={{ transform: 'scaleX(0)', transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scaleX(1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scaleX(0)'}
                    />
                    <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                        Explorar
                    </span>
                </button>
            </div>

            {/* scroll hint */}
            <div
                ref={lineRef}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-[9px] tracking-[0.5em] uppercase text-white/20 font-sans">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-amber-400/40 to-transparent" />
            </div>
        </section>
    )
}
