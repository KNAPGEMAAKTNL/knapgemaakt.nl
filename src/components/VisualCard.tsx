import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "../lib/utils";

export function VisualCard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Scroll progress for mobile/idle tilt
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Softer spring physics for a more "damped" (gedempt) feel
    const mouseX = useSpring(x, { stiffness: 250, damping: 25 });
    const mouseY = useSpring(y, { stiffness: 250, damping: 25 });

    // Wider scroll-mapping range to slow down the rotation relative to scroll speed
    // and softened the starting point further (-100) for a subtle entry
    const scrollX = useTransform(scrollYProgress, [0.3, 1.0], [-100, 250]);
    const scrollY = useTransform(scrollYProgress, [0.3, 1.0], [-100, 250]);

    // Apply scroll values to motion values when NOT hovered
    useEffect(() => {
        if (!isHovered) {
            const unsubscribeX = scrollX.on("change", (v) => x.set(v));
            const unsubscribeY = scrollY.on("change", (v) => y.set(v));
            return () => { unsubscribeX(); unsubscribeY(); }
        }
    }, [isHovered, scrollX, scrollY, x, y]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        setIsHovered(true);
        const { clientX, clientY } = event;
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        x.set(clientX - centerX);
        y.set(clientY - centerY);
    }
    function handleMouseLeave() {
        setIsHovered(false);
    }

    // Transform position to rotation 
    // Increased rotation angles (up to 40deg) for more drama
    const rotateX = useTransform(mouseY, [-400, 400], [40, -40]);
    const rotateY = useTransform(mouseX, [-400, 400], [-40, 40]);
    const glareX = useTransform(mouseX, [-400, 400], [0, 100]);
    const glareY = useTransform(mouseY, [-400, 250], [0, 100]); // clamped slightly differently

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full flex items-center justify-center perspective-1000 bg-white cursor-crosshair overflow-hidden relative"
            style={{ perspective: "2000px" }}
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-[0.04]"></div>

            {/* Ambient Base Underglow */}
            <motion.div
                style={{
                    x: useTransform(mouseX, (v) => v * 0.4),
                    y: useTransform(mouseY, (v) => v * 0.4),
                }}
                className="absolute w-[600px] h-[600px] bg-electric/10 rounded-full blur-[150px] pointer-events-none"
            />

            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="w-64 h-80 md:w-96 md:h-[500px] relative group/card scale-[0.7] md:scale-100 origin-center"
            >
                {/* Main Glass Layout */}
                <div className="absolute inset-0 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-ink/10 rounded-3xl translate-z-0 overflow-hidden">
                    {/* Dynamic Glare */}
                    <motion.div
                        style={{
                            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.9) 0%, transparent 60%)`
                        }}
                        className="absolute inset-0 opacity-40 pointer-events-none"
                    />

                    {/* Abstract WEBSITE Structure Layer */}
                    <div className="p-8 md:p-12 h-full flex flex-col items-start gap-8 opacity-60">
                        {/* Header Mock */}
                        <div className="w-full flex justify-between items-center mb-4">
                            <div className="w-12 h-2 bg-ink/20 rounded-full"></div>
                            <div className="flex gap-2">
                                <div className="w-6 h-1.5 bg-ink/10 rounded-full"></div>
                                <div className="w-6 h-1.5 bg-ink/10 rounded-full"></div>
                            </div>
                        </div>

                        {/* Hero Section Mock */}
                        <div className="space-y-4 w-full">
                            <div className="w-4/5 h-4 bg-ink rounded-sm"></div>
                            <div className="w-1/2 h-4 bg-ink rounded-sm"></div>
                        </div>

                        {/* Image/Visual Block Mock */}
                        <div className="w-full aspect-video bg-zinc-50 border border-ink/5 rounded-lg flex items-center justify-center overflow-hidden">
                            <div className="w-full h-full bg-[radial-gradient(circle_at_center,#00000005_1px,transparent_1px)] [background-size:12px_12px]"></div>
                        </div>

                        {/* Text Lines Mock */}
                        <div className="space-y-3 w-full">
                            <div className="w-full h-1.5 bg-ink/10 rounded-full"></div>
                            <div className="w-full h-1.5 bg-ink/10 rounded-full"></div>
                            <div className="w-2/3 h-1.5 bg-ink/10 rounded-full"></div>
                        </div>

                        {/* Footer/Meta Info */}
                        <div className="mt-auto w-full flex justify-between items-end">
                            <div className="w-1/3 h-1 bg-ink/10 rounded-full"></div>
                            <div className="w-4 h-4 rounded-full border border-ink/10 bg-electric/5"></div>
                        </div>
                    </div>
                </div>

                {/* Floating Imagery/Gallery Layer (High Z) */}
                <motion.div
                    style={{ translateZ: 100 }}
                    className="absolute top-1/4 -right-12 w-32 h-40 bg-white shadow-2xl border border-ink/10 rounded-xl overflow-hidden hidden md:flex flex-col p-4 gap-3 backdrop-blur-sm bg-white/80"
                >
                    <div className="w-full h-2/3 bg-zinc-100 rounded-md"></div>
                    <div className="w-2/3 h-2 bg-ink/10 rounded-full"></div>
                    <div className="w-full h-2 bg-ink/10 rounded-full"></div>
                </motion.div>

                {/* Floating CTA Layer (Highest Z) */}
                <motion.div
                    style={{ translateZ: 150 }}
                    className="absolute bottom-1/4 -left-8 w-40 h-16 bg-acid shadow-[20px_20px_40px_-10px_rgba(0,0,0,0.2)] border-2 border-ink rounded-xl flex items-center justify-center group-hover/card:scale-110 transition-transform duration-500"
                >
                    <div className="w-1/2 h-2.5 bg-ink rounded-full opacity-30"></div>
                </motion.div>

                {/* Floating Code/Data Layer (Lower Z, offset) */}
                <motion.div
                    style={{ translateZ: 50 }}
                    className="absolute top-12 left-6 right-6 h-28 border border-electric/40 bg-electric/[0.03] rounded-xl flex items-center justify-center backdrop-blur-sm pointer-events-none"
                >
                    <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,black_10px,black_11px)]"></div>
                </motion.div>
            </motion.div>
        </div>
    );
}
