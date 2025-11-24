import React, { useState, useEffect, useRef } from 'react';
import Desktop from "@/components/Desktop.tsx";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [password, setPassword] = useState('');
  const audioRef = useRef(null);
  const startY = useRef(0);
  const passwordInputRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatDate = () => {
    return time.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleUnlock = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsDragging(false);

    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    setTimeout(() => {
      setIsUnlocked(true);
    }, 600);
  };

  const handleDragStart = (clientY: number) => {
    if (isAnimating) return;
    startY.current = clientY;
    setIsDragging(true);
  };

  const handleDragMove = (clientY) => {
    if (!isDragging || isAnimating) return;
    const offset = Math.min(0, clientY - startY.current);
    setDragOffset(offset);

    if (offset < -50 && !showPassword) {
      setShowPassword(true);
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);
    }

    if (offset < -200) {
      handleUnlock();
    }
  };

  const handleDragEnd = () => {
    if (isAnimating) return;

    setIsDragging(false);

    if (dragOffset > -200) {
      setDragOffset(0);
      if (!showPassword) {
        setShowPassword(false);
      }
    }
  };

  const handlePasswordSubmit = () => {
    handleUnlock();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleDragMove(e.clientY);
      const handleTouchMove = (e) => {
        e.preventDefault();
        handleDragMove(e.touches[0].clientY);
      };
      const handleMouseUp = () => handleDragEnd();
      const handleTouchEnd = () => handleDragEnd();

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, isAnimating, dragOffset, showPassword]);

  if (isUnlocked) {
    return <Desktop />;
  }

  return (
      <>
        <audio ref={audioRef} src="https://cdn.freesound.org/previews/720/720083_3797507-lq.mp3" preload="auto" />

        <div className="relative w-full h-screen overflow-hidden select-none bg-black">
          {/* Wallpaper layer */}
          <div
              className="absolute inset-0 transition-transform duration-700 ease-out"
              style={{
                transform: isAnimating ? 'scale(1.1)' : 'scale(1)',
                filter: isAnimating ? 'blur(20px)' : 'blur(0px)',
                opacity: isAnimating ? 0 : 1,
              }}
          >
            <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2560&h=1440&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          </div>

          {/* Lock screen content - slides up on unlock */}
          <div
              className="relative z-10 flex flex-col items-center justify-between h-full text-white"
              style={{
                transform: isAnimating ? 'translateY(-100vh)' : `translateY(${dragOffset}px)`,
                transition: isAnimating ? 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              }}
          >
            {/* Top section with time - RESPONSIVE */}
            <div className={`flex-1 flex flex-col items-center justify-center ${isMobile ? 'pt-12' : 'pt-20'}`}>
              <div
                  className={`leading-none font-thin tracking-tight mb-2 transition-all duration-500 ${
                      isMobile ? 'text-[80px]' : 'text-[140px]'
                  }`}
                  style={{
                    textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                    transform: showPassword
                        ? isMobile ? 'scale(0.5) translateY(-60px)' : 'scale(0.6) translateY(-100px)'
                        : 'scale(1)',
                    opacity: showPassword ? 0.5 : 1,
                  }}
              >
                {formatTime()}
              </div>
              <div
                  className={`font-medium tracking-wide transition-all duration-500 ${
                      isMobile ? 'text-lg' : 'text-2xl'
                  }`}
                  style={{
                    textShadow: '0 2px 15px rgba(0,0,0,0.5)',
                    transform: showPassword
                        ? isMobile ? 'scale(0.7) translateY(-50px)' : 'scale(0.75) translateY(-80px)'
                        : 'scale(1)',
                    opacity: showPassword ? 0.5 : 1,
                  }}
              >
                {formatDate()}
              </div>
            </div>

            {/* Middle section - Password field - RESPONSIVE */}
            <div
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: showPassword ? 1 : 0,
                  transform: showPassword ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
                  pointerEvents: showPassword ? 'auto' : 'none',
                }}
            >
              <div className={`flex flex-col items-center gap-6 ${isMobile ? 'px-4' : 'px-8'}`}>
                {/* User Avatar - RESPONSIVE */}
                <div className="relative">
                  <div className={`rounded-full bg-white/15 backdrop-blur-xl border-2 border-white/20 flex items-center justify-center shadow-2xl overflow-hidden ${
                      isMobile ? 'w-20 h-20 text-4xl' : 'w-28 h-28 text-5xl'
                  }`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                    <span className="relative z-10">👤</span>
                  </div>
                </div>

                {/* User Name - RESPONSIVE */}
                <div className={`font-medium ${isMobile ? 'text-lg' : 'text-xl'}`} style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  Guest User
                </div>

                {/* Password Input - RESPONSIVE */}
                <div className={`w-full ${isMobile ? 'max-w-[280px]' : 'max-w-xs'}`}>
                  <div className="relative">
                    <input
                        ref={passwordInputRef}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter Password"
                        className={`w-full rounded-lg bg-white/10 backdrop-blur-2xl border border-white/20 text-white placeholder-white/50 text-center focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all ${
                            isMobile ? 'px-4 py-3 text-sm' : 'px-6 py-3.5 text-base'
                        }`}
                        style={{
                          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                          WebkitTextSecurity: password ? 'disc' : 'none'
                        } as React.CSSProperties}
                    />
                    {password && (
                        <button
                            onClick={handlePasswordSubmit}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all ${
                                isMobile ? 'w-6 h-6' : 'w-7 h-7'
                            }`}
                        >
                          <svg width={isMobile ? "12" : "14"} height={isMobile ? "12" : "14"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section - Swipe indicator - RESPONSIVE */}
            <div className={`px-8 ${isMobile ? 'pb-8' : 'pb-12'}`}>
              <div
                  className="cursor-grab active:cursor-grabbing transition-all duration-300"
                  onMouseDown={(e) => handleDragStart(e.clientY)}
                  onTouchStart={(e) => handleDragStart(e.touches[0].clientY)}
                  style={{
                    opacity: showPassword ? 0 : 1,
                    transform: showPassword ? 'translateY(20px) scale(0.9)' : 'translateY(0) scale(1)',
                    pointerEvents: showPassword ? 'none' : 'auto',
                  }}
              >
                <div className={`flex flex-col items-center gap-3 rounded-2xl bg-black/10 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all ${
                    isMobile ? 'px-6 py-3' : 'px-8 py-4'
                }`}>
                  <div className="flex gap-1.5">
                    <div className={`rounded-full bg-white/50 ${isMobile ? 'w-6 h-0.5' : 'w-8 h-1'}`} />
                  </div>
                  <div className={`font-normal opacity-90 tracking-wide ${isMobile ? 'text-sm' : 'text-base'}`} style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                    Swipe up to unlock
                  </div>
                </div>
              </div>

              {/* Alternative: Click to show password */}
              {!showPassword && !isDragging && (
                  <div className={`text-center ${isMobile ? 'mt-4' : 'mt-6'}`}>
                    <button
                        onClick={() => {
                          setShowPassword(true);
                          setTimeout(() => passwordInputRef.current?.focus(), 100);
                        }}
                        className={`opacity-70 hover:opacity-100 transition-opacity ${isMobile ? 'text-xs' : 'text-sm'}`}
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                    >
                      or click to enter password
                    </button>
                  </div>
              )}
            </div>
          </div>

          {/* Subtle vignette */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/40" />
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(1.05);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .bg-gradient-radial {
            background: radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%);
          }
        `}</style>
      </>
  );
};

export default Index;