import { useState, useEffect, useRef } from 'react';
import { Apple, Wifi, Battery, Volume2, FileText, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';

// Motivation Letter Component (to be used in your window)
export const MotivationLetter = () => {
  return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <h1 className="text-2xl font-bold mb-4">Motivation Letter</h1>
        <div className="space-y-4 text-foreground/90">
          <p className="leading-relaxed">
            Dear Hiring Manager,
          </p>
          <p className="leading-relaxed">
            I am writing to express my strong interest in the software development position at your company.
            With a passion for creating innovative solutions and a solid foundation in modern web technologies,
            I am excited about the opportunity to contribute to your team.
          </p>
          <p className="leading-relaxed">
            Throughout my career, I have developed expertise in React, TypeScript, and various frontend
            frameworks, creating intuitive and performant user interfaces. My experience includes building
            complex state management systems, implementing responsive designs, and optimizing application
            performance.
          </p>
          <p className="leading-relaxed">
            What sets me apart is my dedication to writing clean, maintainable code and my commitment to
            continuous learning. I stay current with industry trends and best practices, always seeking to
            improve my skills and deliver exceptional results.
          </p>
          <p className="leading-relaxed">
            I am particularly drawn to your company's mission and values, and I believe my technical skills
            and collaborative approach would make me a valuable addition to your team. I am eager to bring
            my expertise to challenging projects and contribute to your company's success.
          </p>
          <p className="leading-relaxed">
            Thank you for considering my application. I look forward to the opportunity to discuss how I
            can contribute to your team.
          </p>
          <p className="leading-relaxed">
            Best regards,<br />
            <span className="font-semibold">AlaEddine Daly</span>
          </p>
        </div>
      </div>
  );
};

// Resume Video Component (to be used in your window)
export const ResumeVideo = () => {
  // 🎥 PUT YOUR VIDEO URL HERE
  const VIDEO_URL = "cv_video.mp4"; // YouTube, Vimeo, or direct video file URL

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDownload = () => {
    // Open video URL in new tab for download
    window.open(VIDEO_URL, '_blank');
  };

  return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className="w-full max-w-2xl aspect-video bg-black rounded-lg flex items-center justify-center border border-border/20 relative overflow-hidden group">
          {/* Video Element */}
          <video
              ref={videoRef}
              className="w-full h-full object-contain"
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Custom Play Button Overlay (shows when not playing) */}
          {!isPlaying && (
              <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
              >
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl group-hover:bg-primary transition-colors">
                  <div className="w-0 h-0 border-l-[20px] border-l-primary-foreground border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                </div>
              </motion.button>
          )}
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold">Video Resume - AlaEddine Daly</h2>
          <p className="text-sm text-muted-foreground">
            {isPlaying ? 'Watch my introduction and experience overview' : 'Click play to watch my introduction video'}
          </p>
        </div>

        <div className="flex gap-3">
          <button
              onClick={handlePlayPause}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            {isPlaying ? 'Pause' : 'Play Video'}
          </button>
          <button
              onClick={handleDownload}
              className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            Download
          </button>
        </div>
      </div>
  );
};

// Main MenuBar Component
const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const [isViewMenuOpen, setIsViewMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { openWindow } = useWindowStore();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsViewMenuOpen(false);
      }
    };

    if (isViewMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isViewMenuOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleMenuItemClick = (appId) => {
    openWindow(appId);
    setIsViewMenuOpen(false);
  };

  return (
      <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-0 left-0 right-0 h-7 backdrop-blur-xl bg-background/80 border-b border-border/20 z-50 flex items-center justify-between px-4 text-sm font-medium"
      >
        {/* Left side */}
        <div className="flex items-center gap-5">
          <Apple className="w-4 h-4" />
          <span className="font-semibold">Portfolio</span>
          <span className="text-foreground/70 cursor-default">File</span>
          <span className="text-foreground/70 cursor-default">Edit</span>

          {/* View Menu */}
          <div className="relative" ref={menuRef}>
          <span
              className={`cursor-pointer transition-colors ${
                  isViewMenuOpen
                      ? 'text-foreground bg-primary/10'
                      : 'text-foreground hover:text-foreground'
              } px-2 py-1 rounded`}
              onClick={() => setIsViewMenuOpen(!isViewMenuOpen)}
          >
            View
          </span>

            <AnimatePresence>
              {isViewMenuOpen && (
                  <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 backdrop-blur-xl bg-background/95 border border-border/20 rounded-lg shadow-2xl overflow-hidden"
                      style={{ zIndex: 1000 }}
                  >
                    <div className="py-1">
                      <button
                          onClick={() => handleMenuItemClick('motivation-letter')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-colors flex items-center gap-3"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Motivation Letter</span>
                      </button>
                      <button
                          onClick={() => handleMenuItemClick('resume-video')}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 transition-colors flex items-center gap-3"
                      >
                        <Video className="w-4 h-4" />
                        <span>Resume Video</span>
                      </button>
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
          </div>

          <span className="text-foreground/70 cursor-default">Window</span>
          <span className="text-foreground/70 cursor-default">Help</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Battery className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <span>{formatDate(time)}</span>
            <span className="font-semibold">{formatTime(time)}</span>
          </div>
        </div>
      </motion.div>
  );
};

export default MenuBar;