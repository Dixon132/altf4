import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ImageSection({
    index,
    label,
    title,
    description,
    align = 'left',
    accent = '#f59e0b',
}) {
    const sectionRef = useRef(null)
    const bgRef = useRef(null)
    const clipRef = useRef(null)   // el div que tiene clip-path
    const numRef = useRef(null)
    const labelRef = useRef(null)
    const titleRef = useRef(null)
    const descRef = useRef(null)
    const lineRef = useRef(null)
    const ctaRef = useRef(null)
    const glowRef = useRef(null)

    const isRight = align === 'right'

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── parallax del fondo ──
            gsap.to(bgRef.current, {
                yPercent: -14,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            })

            // ── reveal con clip-path diagonal ──
            // empieza completamente tapado, se abre en diagonal
            const clipStart = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
            const clipEnd = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

            gsap.fromTo(
                clipRef.current,
                { clipPath: clipStart },
                {
                    clipPath: clipEnd,
                    duration: 1.4,
                    ease: 'power3.inOut',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 72%',
                        toggleActions: 'play none none none',
                    },
                }
            )

            // ── glow del acento al entrar ──
            gsap.from(glowRef.current, {
                opacity: 0, scale: 0.6, duration: 1.8, ease: 'power2.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
            })

            // ── contenido en cascada ──
            const ct = { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none none' }

            gsap.from(numRef.current, { y: 70, opacity: 0, duration: 1.1, ease: 'power4.out', scrollTrigger: ct })
            gsap.from(lineRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'power2.out', delay: 0.1, scrollTrigger: ct })
            gsap.from(labelRef.current, { y: 18, opacity: 0, duration: 0.7, delay: 0.18, scrollTrigger: ct })
            gsap.from(titleRef.current, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.28, scrollTrigger: ct })
            gsap.from(descRef.current, { y: 28, opacity: 0, duration: 0.9, delay: 0.42, scrollTrigger: ct })
            gsap.from(ctaRef.current, { y: 18, opacity: 0, duration: 0.7, delay: 0.55, scrollTrigger: ct })

            // ── título con skew al entrar ──
            gsap.from(titleRef.current, {
                skewX: isRight ? 4 : -4,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.28,
                scrollTrigger: ct,
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [isRight])

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center overflow-hidden"
            style={{ cursor: 'none' }}
        >
            {/* ── FONDO con parallax ── */}
            <div
                ref={bgRef}
                className="absolute inset-0 scale-110"
                style={{ willChange: 'transform' }}
            >
                <div
                    className="w-full h-full"
                    style={{
                        backgroundColor: '#0a0a0a',
                        backgroundImage: `
              radial-gradient(ellipse at 50% 50%, ${accent}08 0%, transparent 60%),
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
                        backgroundSize: '100% 100%, 80px 80px, 80px 80px',
                    }}
                />
                {/* placeholder de imagen */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div style={{ opacity: 0.12 }} className="flex flex-col items-center gap-5">
                        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accent }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs tracking-[0.5em] uppercase font-sans" style={{ color: accent }}>
                            Imagen próximamente
                        </span>
                    </div>
                </div>
            </div>

            {/* ── GLOW del acento ── */}
            <div
                ref={glowRef}
                className="absolute pointer-events-none"
                style={{
                    width: '60vw', height: '60vw',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${accent}12 0%, transparent 65%)`,
                    top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(40px)',
                }}
            />

            {/* gradiente lateral */}
            <div
                className="absolute inset-0"
                style={{
                    background: isRight
                        ? `linear-gradient(to left,  rgba(0,0,0,0.97) 30%, rgba(0,0,0,0.55) 55%, transparent 100%)`
                        : `linear-gradient(to right, rgba(0,0,0,0.97) 30%, rgba(0,0,0,0.55) 55%, transparent 100%)`,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

            {/* ── CLIP-PATH REVEAL ── */}
            <div
                ref={clipRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundColor: '#000',
                    zIndex: 30,
                    clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                }}
            />

            {/* ── CONTENIDO ── */}
            <div
                className={`relative w-full max-w-6xl mx-auto px-8 sm:px-20 flex ${isRight ? 'justify-end' : 'justify-start'}`}
                style={{ zIndex: 20 }}
            >
                <div className={`max-w-xl ${isRight ? 'text-right' : 'text-left'}`}>

                    {/* número decorativo gigante */}
                    <div
                        ref={numRef}
                        className="leading-none font-bold select-none pointer-events-none"
                        style={{
                            fontSize: 'clamp(7rem, 16vw, 14rem)',
                            fontFamily: "'Impact', 'Arial Black', sans-serif",
                            color: 'transparent',
                            WebkitTextStroke: `1px ${accent}25`,
                            marginBottom: '-2rem',
                            letterSpacing: '-0.05em',
                        }}
                    >
                        {String(index).padStart(2, '0')}
                    </div>

                    {/* línea + label */}
                    <div className={`flex items-center gap-4 mb-5 ${isRight ? 'flex-row-reverse' : ''}`}>
                        <div
                            ref={lineRef}
                            className="h-px w-16 shrink-0"
                            style={{ backgroundColor: accent }}
                        />
                        <span
                            ref={labelRef}
                            className="text-[10px] tracking-[0.5em] uppercase font-sans font-semibold"
                            style={{ color: accent }}
                        >
                            {label}
                        </span>
                    </div>

                    {/* título */}
                    <h2
                        ref={titleRef}
                        className="uppercase leading-[0.9] text-white mb-8 whitespace-pre-line"
                        style={{
                            fontSize: 'clamp(3rem, 7vw, 6rem)',
                            fontFamily: "'Impact', 'Arial Black', sans-serif",
                            textShadow: `0 0 80px ${accent}20, 0 2px 0 rgba(0,0,0,0.8)`,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {title}
                    </h2>

                    {/* descripción */}
                    <p
                        ref={descRef}
                        className="text-white/45 font-sans font-light leading-relaxed"
                        style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}
                    >
                        {description}
                    </p>

                    {/* CTA */}
                    <div ref={ctaRef} className={`mt-10 flex items-center gap-4 ${isRight ? 'justify-end' : ''}`}>
                        <div className="w-8 h-px shrink-0" style={{ backgroundColor: `${accent}40` }} />
                        <span
                            className="text-[10px] tracking-[0.4em] uppercase font-sans"
                            style={{ color: `${accent}45` }}
                        >
                            Imagen en desarrollo
                        </span>
                    </div>

                </div>
            </div>

            {/* índice esquina opuesta */}
            <div
                className={`absolute bottom-10 ${isRight ? 'left-10' : 'right-10'} flex items-center gap-3`}
                style={{ zIndex: 20 }}
            >
                <div className="w-4 h-px" style={{ backgroundColor: `${accent}30` }} />
                <span className="text-[9px] tracking-[0.5em] uppercase font-sans" style={{ color: `${accent}30` }}>
                    {String(index).padStart(2, '0')} / 05
                </span>
            </div>

            {/* línea vertical decorativa lateral */}
            <div
                className={`absolute top-0 bottom-0 w-px ${isRight ? 'left-8' : 'right-8'}`}
                style={{ background: `linear-gradient(to bottom, transparent, ${accent}15, transparent)`, zIndex: 20 }}
            />
        </section>
    )
}
