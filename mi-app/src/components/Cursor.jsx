import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const labelRef = useRef(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current

        // posición inicial fuera de pantalla
        gsap.set([dot, ring], { x: -100, y: -100 })

        let mx = -100, my = -100

        const onMove = (e) => {
            mx = e.clientX
            my = e.clientY
            gsap.to(dot, { x: mx, y: my, duration: 0.1, ease: 'none' })
            gsap.to(ring, { x: mx, y: my, duration: 0.45, ease: 'power2.out' })
        }

        // hover en links y botones → agrandar ring
        const onEnter = () => {
            gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.3 })
            gsap.to(dot, { scale: 0, duration: 0.2 })
        }
        const onLeave = () => {
            gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })
            gsap.to(dot, { scale: 1, duration: 0.2 })
        }

        window.addEventListener('mousemove', onMove)

        const targets = document.querySelectorAll('a, button, [data-cursor]')
        targets.forEach(el => {
            el.addEventListener('mouseenter', onEnter)
            el.addEventListener('mouseleave', onLeave)
        })

        return () => {
            window.removeEventListener('mousemove', onMove)
            targets.forEach(el => {
                el.removeEventListener('mouseenter', onEnter)
                el.removeEventListener('mouseleave', onLeave)
            })
        }
    }, [])

    return (
        <>
            {/* punto central */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    width: 6, height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#f59e0b',
                    transform: 'translate(-50%, -50%)',
                    mixBlendMode: 'difference',
                }}
            />
            {/* anillo exterior */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    width: 36, height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(245,158,11,0.7)',
                    transform: 'translate(-50%, -50%)',
                    mixBlendMode: 'difference',
                }}
            />
        </>
    )
}
