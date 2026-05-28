/**
 * Capa de ruido SVG animado encima del hero.
 * Usa un filtro feTurbulence para dar textura cinematográfica.
 */
export default function Noise() {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-10 opacity-[0.035]"
            style={{ mixBlendMode: 'overlay' }}
        >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <filter id="noise">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noise)" />
            </svg>
        </div>
    )
}
