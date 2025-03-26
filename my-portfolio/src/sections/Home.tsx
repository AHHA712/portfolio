import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
    const textRef = useRef<HTMLHeadingElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textRef.current || !sectionRef.current || !arrowRef.current) return;

        // arrow click scroll contents
        const handleArrowClick = () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        };

        const currentArrow = arrowRef.current;
        currentArrow.addEventListener('click', handleArrowClick);

        // Text animation with ScrollTrigger
        const animation = gsap.fromTo(
            textRef.current,
            { 
                opacity: 0, 
                y: 100,
                scale: 0.9 
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 2.5,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top center-=100', 
                    toggleActions: 'restart none restart none',
                    scrub:true,
                }
            }
        );

        return () => {
            currentArrow.removeEventListener('click', handleArrowClick);
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div>
            {/* Initial Landing Section with Down Arrow */}
            <section 
                style={{
                    height: 'calc(100vh-30px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    position: 'relative',
                    paddingBottom: '2rem',
                    paddingTop: '15rem',
                }}
            >
                <img 
                    ref={arrowRef as React.RefObject<HTMLImageElement>} 
                    src="/src/assets/arrow.jpg" 
                    alt="Scroll down arrow"
                    style={{
                        width: '150px', // 
                        height: '100px',
                        cursor: 'pointer',
                        animation: 'bounce 2s infinite',
                        userSelect: 'none'
                    }}
                />
                <style>{`
                    @keyframes bounce {
                        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                        40% {transform: translateY(-20px);}
                        60% {transform: translateY(-10px);}
                    }
                `}</style>
            </section>

            {/* Text Section */}
            <div 
                ref={sectionRef}
                style={{
                    minHeight: '100vh', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100vw',
                    margin: 0,
                    
                }}
            >
                <h1 
                    ref={textRef}
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        lineHeight: "1.6",
                        textAlign: "center",
                        color: "#333",
                        maxWidth: '80%',
                        margin: "0 auto",
                        opacity: 0 
                    }}
                >
                    Welcome! This is Arnold's portfolio. Feel free to navigate around
                </h1>
            </div>
        </div>
    )
}

export default Home