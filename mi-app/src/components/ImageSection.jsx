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
    const overlayRef = useRef(null)
    const numRef = useRef(null)
    const labelRef = useRef(null)
    const titleRef = useRef(null)
    const descRef = useRef(null)
    const lineRef = useRef(null)
    const ctaRef = useRef(null)

    const isRight = align === 'right'

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── parallax del fondo ──
            gsap.to(bgRef.current, {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            })

            // ── reveal: el overlay barre hacia afuera ──
            // empieza tapando todo (scaleX:1) y se va a scaleX:0
            gsap.set(overlayRef.current, { scaleX: 1, transformOrigin: isRight ? 'right' : 'left' })
            gsap.to(overlayRef.current, {
                scaleX: 0,
                duration: 1.1,
                ease: 'power3.inOut',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                    toggleActions: 'play none none none',
                },
            })

            // ── contenido en cascada ──
            const contentTrigger = { trigger: sectionRef.current, start: 'top 65%', toggleActions: 'play none none none' }

            gsap.from(numRef.current, {
                y: 60, opacity: 0, duration: 1, ease: 'power3.out',
                scrollTrigger: contentTrigger,
            })
            gsap.from(lineRef.current, {
                scaleX: 0, transformOrigin: 'left', duration: 0.8, ease: 'power2.out', delay: 0.15,
                scrollTrigger: contentTrigger,
            })
            gsap.from(labelRef.current, {
                y: 16, opacity: 0, duration: 0.6, delay: 0.2,
                scrollTrigger: contentTrigger,
            })
            gsap.from(titleRef.current, {
                y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.3,
                scrollTrigger: contentTrigger,
            })
            gsap.from(descRef.current, {
                y: 24, opacity: 0, duration: 0.8, delay: 0.45,
                scrollTrigger: contentTrigger,
            })
            gsap.from(ctaRef.current, {
                y: 16, opacity: 0, duration: 0.6, delay: 0.55,
                scrollTrigger: contentTrigger,
            })

        }, sectionRef)

        return () => ctx.revert()
    }, [isRight])

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center overflow-hidden"
        >
            {/* ── FONDO PLACEHOLDER ── */}
            <div
                ref={bgRef}
                className="absolute inset-0 scale-110"
                style={{ willChange: 'transform' }}
            >
                <div
                    className="w-full h-full bg-neutral-900"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
                        backgroundSize: '80px 80px',
                    }}
                />
                {/* ícono centrado */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex flex-col items-center gap-4" style={{ opacity: 0.18 }}>
                        <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            style={{ color: accent }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.6}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs tracking-[0.4em] uppercase font-sans" style={{ color: accent }}>
                            Imagen próximamente
                        </span>
                    </div>
                </div>
            </div>

            {/* gradiente lateral */}
            <div
                className="absolute inset-0"
                style={{
                    background: isRight
                        ? 'linear-gradient(to left,  rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.5) 60%, transparent 100%)'
                        : 'linear-gradient(to right, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                }}
            />
            {/* gradiente top/bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

            {/* ── OVERLAY DE REVEAL (z-30, encima de todo hasta que se va) ── */}
            <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: '#000', zIndex: 30 }}
            />

            {/* ── CONTENIDO (z-20, visible cuando el overlay se va) ── */}
            <div
                className={`relative w-full max-w-6xl mx-auto px-8 sm:px-16 flex ${isRight ? 'justify-end' : 'justify-start'}`}
                style={{ zIndex: 20 }}
            >
                <div className={`max-w-lg ${isRight ? 'text-right' : 'text-left'}`}>

                    {/* número decorativo */}
                    <div
                        ref={numRef}
                        className="leading-none font-bold select-none pointer-events-none"
                        style={{
                            fontSize: 'clamp(6rem, 14vw, 12rem)',
                            fontFamily: "'Impact', 'Arial Black', sans-serif",
                            color: 'transparent',
                            WebkitTextStroke: `1px ${accent}30`,
                            marginBottom: '-1.5rem',
                        }}
                    >
                        {String(index).padStart(2, '0')}
                    </div>

                    {/* línea + label */}
                    <div className={`flex items-center gap-4 mb-4 ${isRight ? 'flex-row-reverse' : ''}`}>
                        <div
                            ref={lineRef}
                            className="h-px w-12 shrink-0"
                            style={{ backgroundColor: accent }}
                        />
                        <span
                            ref={labelRef}
                            className="text-[10px] tracking-[0.4em] uppercase font-sans font-medium"
                            style={{ color: accent }}
                        >
                            {label}
                        </span>
                    </div>

                    {/* título */}
                    <h2
                        ref={titleRef}
                        className="uppercase leading-tight text-white mb-6 whitespace-pre-line"
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                            fontFamily: "'Impact', 'Arial Black', sans-serif",
                            textShadow: `0 0 60px ${accent}25`,
                        }}
                    >
                        {title}
                    </h2>

                    {/* descripción */}
                    <p
                        ref={descRef}
                        className="text-white/50 font-sans font-light leading-relaxed text-sm sm:text-base"
                    >
                        {description}
                    </p>

                    {/* CTA */}
                    <div ref={ctaRef} className={`mt-8 flex items-center gap-3 ${isRight ? 'justify-end' : ''}`}>
                        <div className="w-6 h-px shrink-0" style={{ backgroundColor: `${accent}50` }} />
                        <span className="text-[10px] tracking-[0.35em] uppercase font-sans" style={{ color: `${accent}50` }}>
                            Imagen en desarrollo
                        </span>
                    </div>

                </div>
            </div>

            {/* número de escena esquina */}
            <div
                className={`absolute bottom-8 ${isRight ? 'left-8' : 'right-8'}`}
                style={{ zIndex: 20 }}
            >
                <span className="text-[10px] tracking-[0.4em] uppercase text-white/15 font-sans">
                    Escena {String(index).padStart(2, '0')}
                </span>
            </div>
        </section>
    )
}
