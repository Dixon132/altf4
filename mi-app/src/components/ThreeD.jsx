import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ThreeD() {
    const sectionRef = useRef(null)
    const boxRef = useRef(null)
    const textRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(boxRef.current, {
                scale: 0.92, opacity: 0, duration: 1.2, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
            })
            gsap.from(textRef.current, {
                y: 30, opacity: 0, duration: 0.9,
                scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} id="3d" className="py-32 px-6">
            <div className="max-w-6xl mx-auto">

                <div className="flex items-center gap-6 mb-16">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] tracking-[0.5em] uppercase text-amber-400/60 font-sans">3D · Blender</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div
                    ref={boxRef}
                    className="relative w-full border border-white/5 bg-neutral-950 overflow-hidden"
                    style={{ height: '520px' }}
                >
                    {/* grid de fondo */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px)
              `,
                            backgroundSize: '60px 60px',
                        }}
                    />
                    {/* punto de fuga central */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 65%)',
                        }}
                    />

                    <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                        <div
                            className="w-20 h-20 border border-amber-400/20 flex items-center justify-center"
                            style={{ transform: 'rotate(45deg)' }}
                        >
                            <span className="text-amber-400/40 text-3xl" style={{ transform: 'rotate(-45deg)' }}>◈</span>
                        </div>
                        <div className="text-center">
                            <p className="text-[10px] tracking-[0.5em] uppercase text-white/20 font-sans mb-2">
                                Diseño 3D · Blender
                            </p>
                            <p className="text-[9px] tracking-[0.3em] uppercase text-amber-400/30 font-sans">
                                Próximamente
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
