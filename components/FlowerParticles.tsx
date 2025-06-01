// components/StaticFloralBg.tsx
"use client";

const StaticFloralBg = () => {
    const floralIcons = ['🌸', '🌺', '🌻', '🌷', '🌱', '🍁', '🌼', '🍂'];
    const colors = ['#F4D794', '#AF3E3E', '#3D5300', '#516036', '#644A07'];

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
            {[...Array(25)].map((_, i) => (
                <div
                    key={i}
                    className="absolute text-3xl md:text-4xl"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        color: colors[Math.floor(Math.random() * colors.length)],
                        transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 2.9 + 0.7})`,
                        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))'
                    }}
                >
                    {floralIcons[Math.floor(Math.random() * floralIcons.length)]}
                </div>
            ))}
        </div>
    );
};

export default StaticFloralBg;