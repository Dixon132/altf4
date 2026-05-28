import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Cuadro individual con borde de acento ── */
function ImageCard({ accent, delay, thumb = null }) {
    const cardRef = useRef(null)
    const shimRef = useRef(null)

    // hover: shimmer diagonal
    const onEnter = () => {
        gsap.to(shimRef.current, { x: '200%', duration: 0.6, ease: 'power2.out' })
    }
    const onLeave = () => {
        gsap.set(shimRef.current, { x: '-100%' })
    }

    return (
        <div
            ref={cardRef}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative overflow-hidden"
            style={{
                aspectRatio: '4/3',
                border: `1px solid ${accent}55`,
                boxShadow: `0 0 20px ${accent}10, inset 0 0 20px ${accent}05`,
            }}
        >
            {/* contenido */}
            {thumb ? (
                <img src={thumb} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.75)' }} />
            ) : (
                <div
                    className="w-full h-full flex flex-col items-center justify-center gap-3"
                    style={{ backgroundColor: `${accent}06` }}
                >
                    {/* patrón de puntos */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle, ${accent}20 1px, transparent 1px)`,
                            backgroundSize: '18px 18px',
                        }}
                    />
                    <svg className="relative w-8 h-8 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        style={{ color: accent }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="relative text-[8px] tracking-[0.4em] uppercase font-sans opacity-30"
                        style={{ color: accent }}>
                        Próximamente
                    </span>
                </div>
            )}

            {/* shimmer hover */}
            <div
                ref={shimRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `linear-gradient(105deg, transparent 40%, ${accent}18 50%, transparent 60%)`,
                    transform: 'translateX(-100%)',
                }}
            />

            {/* esquinas decorativas */}
            {[
                'top-0 left-0 border-t border-l',
                'top-0 right-0 border-t border-r',
                'bottom-0 left-0 border-b border-l',
                'bottom-0 right-0 border-b border-r',
            ].map((pos, i) => (
                <div
                    key={i}
                    className={`absolute w-3 h-3 ${pos}`}
                    style={{ borderColor: accent }}
                />
            ))}
        </div>
    )
}

/* ── Título con efecto glitch en hover ── */
function GlitchTitle({ text, accent }) {
    const wrapRef = useRef(null)
    let glitchInterval = null

    const startGlitch = () => {
        const el = wrapRef.current
        if (!el) return
        const glitchFrames = [
            { x: -3, skewX: -2, color: '#ff003c' },
            { x: 3, skewX: 2, color: '#00fff9' },
            { x: -2, skewX: 1, color: '#ff003c' },
            { x: 0, skewX: 0, color: 'transparent' },
        ]
        let i = 0
        glitchInterval = setInterval(() => {
            const f = glitchFrames[i % glitchFrames.length]
            if (el._before) {
                el._before.style.transform = `translateX(${f.x}px) skewX(${f.skewX}deg)`
                el._before.style.color = f.color === 'transparent' ? 'transparent' : f.color
                el._before.style.opacity = f.color === 'transparent' ? '0' : '0.7'
            }
            i++
        }, 80)
    }

    const stopGlitch = () => {
        clearInterval(glitchInterval)
        const el = wrapRef.current
        if (el?._before) {
            el._before.style.transform = 'translateX(0)'
            el._before.style.opacity = '0'
        }
    }

    return (
        <div
            ref={wrapRef}
            className="relative"
            onMouseEnter={startGlitch}
            onMouseLeave={stopGlitch}
        >
            {/* capa glitch (pseudo-elemento simulado con div) */}
            <div
                ref={el => { if (wrapRef.current) wrapRef.current._before = el }}
                className="absolute inset-0 pointer-events-none select-none uppercase leading-[0.9] whitespace-pre-line"
                style={{
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    fontFamily: "'Impact', 'Arial Black', sans-serif",
                    letterSpacing: '-0.02em',
                    color: 'transparent',
                    opacity: 0,
                    transition: 'none',
                    mixBlendMode: 'screen',
                }}
                aria-hidden="true"
            >
                {text}
            </div>
            {/* texto real */}
            <h2
                className="uppercase leading-[0.9] text-white mb-8 whitespace-pre-line relative"
                style={{
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    fontFamily: "'Impact', 'Arial Black', sans-serif",
                    textShadow: `0 0 80px ${accent}20, 0 2px 0 rgba(0,0,0,0.8)`,
                    letterSpacing: '-0.02em',
                }}
            >
                {text}
            </h2>
        </div>
    )
}

export default function ImageSection({
    index,
    label,
    title,
    description,
    align = 'left',
    accent = '#f59e0b',
    image = null,
    thumbs = [],   // hasta 3 imágenes para los cuadros
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
    const glowRef = useRef(null)
    const cardsRef = useRef(null)

    const isRight = align === 'right'

    useEffect(() => {
        const ctx = gsap.context(() => {

            // parallax fondo
            gsap.to(bgRef.current, {
                yPercent: -14, ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom', end: 'bottom top', scrub: true,
                },
            })

            // overlay reveal
            gsap.set(overlayRef.current, {
                scaleX: 1,
                transformOrigin: isRight ? 'right center' : 'left center',
            })
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 72%',
                onEnter: () => gsap.to(overlayRef.current, { scaleX: 0, duration: 1.2, ease: 'power3.inOut', overwrite: true }),
                onLeaveBack: () => gsap.to(overlayRef.current, { scaleX: 1, duration: 0.5, ease: 'power2.in', overwrite: true }),
            })

            // glow
            gsap.from(glowRef.current, {
                opacity: 0, scale: 0.5, duration: 2, ease: 'power2.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
            })

            // contenido
            const ct = { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' }
            gsap.from(numRef.current, { y: 70, opacity: 0, duration: 1.1, ease: 'power4.out', scrollTrigger: ct })
            gsap.from(lineRef.current, { scaleX: 0, transformOrigin: 'left', duration: 0.9, ease: 'power2.out', delay: 0.1, scrollTrigger: ct })
            gsap.from(labelRef.current, { y: 18, opacity: 0, duration: 0.7, delay: 0.18, scrollTrigger: ct })
            gsap.from(titleRef.current, { y: 50, opacity: 0, skewX: isRight ? 4 : -4, duration: 1, ease: 'power3.out', delay: 0.28, scrollTrigger: ct })
            gsap.from(descRef.current, { y: 28, opacity: 0, duration: 0.9, delay: 0.42, scrollTrigger: ct })
            gsap.from(ctaRef.current, { y: 18, opacity: 0, duration: 0.7, delay: 0.55, scrollTrigger: ct })

            // cuadros: entran escalonados desde abajo
            if (cardsRef.current) {
                const cards = cardsRef.current.querySelectorAll('.img-card')
                gsap.from(cards, {
                    y: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
                    stagger: 0.12, delay: 0.3,
                    scrollTrigger: ct,
                })
            }

        }, sectionRef)

        return () => ctx.revert()
    }, [isRight])

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen flex items-center overflow-hidden"
            style={{ cursor: 'none' }}
        >
            {/* FONDO */}
            <div ref={bgRef} className="absolute inset-0 scale-110" style={{ willChange: 'transform' }}>
                {image ? (
                    <img src={image} alt="" className="w-full h-full object-cover object-center"
                        style={{ filter: 'brightness(0.55) saturate(1.2)' }} />
                ) : (
                    <>
                        <div className="w-full h-full" style={{
                            backgroundColor: '#0a0a0a',
                            backgroundImage: `
                                radial-gradient(ellipse at 50% 50%, ${accent}08 0%, transparent 60%),
                                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                            `,
                            backgroundSize: '100% 100%, 80px 80px, 80px 80px',
                        }} />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div style={{ opacity: 0.08 }} className="flex flex-col items-center gap-5">
                                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: accent }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5}
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* GLOW */}
            <div ref={glowRef} className="absolute pointer-events-none" style={{
                width: '55vw', height: '55vw', borderRadius: '50%',
                background: `radial-gradient(circle, ${accent}12 0%, transparent 65%)`,
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                filter: 'blur(50px)',
            }} />

            {/* gradientes */}
            <div className="absolute inset-0" style={{
                background: isRight
                    ? 'linear-gradient(to left,  rgba(0,0,0,0.97) 28%, rgba(0,0,0,0.5) 52%, transparent 100%)'
                    : 'linear-gradient(to right, rgba(0,0,0,0.97) 28%, rgba(0,0,0,0.5) 52%, transparent 100%)',
            }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

            {/* OVERLAY REVEAL */}
            <div ref={overlayRef} className="absolute inset-0 pointer-events-none"
                style={{ backgroundColor: '#000', zIndex: 30 }} />

            {/* ── LAYOUT PRINCIPAL ── */}
            <div
                className="relative w-full max-w-7xl mx-auto px-8 sm:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                style={{ zIndex: 20 }}
            >
                {/* columna de texto — orden según align */}
                <div className={`${isRight ? 'lg:order-2' : 'lg:order-1'} ${isRight ? 'text-right' : 'text-left'}`}>

                    {/* número decorativo */}
                    <div ref={numRef} className="leading-none font-bold select-none pointer-events-none" style={{
                        fontSize: 'clamp(6rem, 14vw, 12rem)',
                        fontFamily: "'Impact', 'Arial Black', sans-serif",
                        color: 'transparent',
                        WebkitTextStroke: `1px ${accent}22`,
                        marginBottom: '-1.5rem',
                        letterSpacing: '-0.05em',
                    }}>
                        {String(index).padStart(2, '0')}
                    </div>

                    {/* línea + label */}
                    <div className={`flex items-center gap-4 mb-5 ${isRight ? 'flex-row-reverse' : ''}`}>
                        <div ref={lineRef} className="h-px w-16 shrink-0" style={{ backgroundColor: accent }} />
                        <span ref={labelRef} className="text-[10px] tracking-[0.5em] uppercase font-sans font-semibold"
                            style={{ color: accent }}>
                            {label}
                        </span>
                    </div>

                    {/* título con glitch */}
                    <div ref={titleRef}>
                        <GlitchTitle text={title} accent={accent} />
                    </div>

                    {/* descripción */}
                    <p ref={descRef} className="text-white/45 font-sans font-light leading-relaxed"
                        style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1rem)' }}>
                        {description}
                    </p>

                    {/* CTA */}
                    <div ref={ctaRef} className={`mt-10 flex items-center gap-4 ${isRight ? 'justify-end' : ''}`}>
                        <div className="w-8 h-px shrink-0" style={{ backgroundColor: `${accent}40` }} />
                        <span className="text-[10px] tracking-[0.4em] uppercase font-sans" style={{ color: `${accent}45` }}>
                            Imagen en desarrollo
                        </span>
                    </div>
                </div>

                {/* columna de cuadros */}
                <div
                    ref={cardsRef}
                    className={`${isRight ? 'lg:order-1' : 'lg:order-2'} grid grid-cols-2 gap-3`}
                >
                    {/* cuadro grande arriba a la izquierda */}
                    <div className="img-card col-span-2">
                        <ImageCard accent={accent} delay={0} thumb={thumbs[0]} />
                    </div>
                    {/* dos cuadros pequeños abajo */}
                    <div className="img-card">
                        <ImageCard accent={accent} delay={0.1} thumb={thumbs[1]} />
                    </div>
                    <div className="img-card">
                        <ImageCard accent={accent} delay={0.2} thumb={thumbs[2]} />
                    </div>
                </div>
            </div>

            {/* índice esquina */}
            <div className={`absolute bottom-10 ${isRight ? 'left-10' : 'right-10'} flex items-center gap-3`}
                style={{ zIndex: 20 }}>
                <div className="w-4 h-px" style={{ backgroundColor: `${accent}30` }} />
                <span className="text-[9px] tracking-[0.5em] uppercase font-sans" style={{ color: `${accent}30` }}>
                    {String(index).padStart(2, '0')} / 05
                </span>
            </div>

            {/* línea vertical lateral */}
            <div className={`absolute top-0 bottom-0 w-px ${isRight ? 'left-8' : 'right-8'}`}
                style={{ background: `linear-gradient(to bottom, transparent, ${accent}15, transparent)`, zIndex: 20 }} />
        </section>
    )
}
