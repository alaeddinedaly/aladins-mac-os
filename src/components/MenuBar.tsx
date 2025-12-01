import { useState, useEffect, useRef } from 'react';
import { Apple, Wifi, Battery, Volume2, FileText, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/windowStore';

// Motivation Letter Component (to be used in your window)
export const MotivationLetter = () => {
  return (
      <div className="max-w-none p-8">
        {/* Header with contact info */}
        <div className="flex justify-between items-start mb-8 text-sm">
          {/* Left - My info */}
          <div className="space-y-0.5">
            <p className="font-semibold">Alaa Eddine Daly</p>
            <p>Sousse, Tunisie</p>
            <p>+216 58 247 509</p>
            <p>dalyalaeddine@gmail.com</p>
          </div>

          {/* Right - Company info */}
          <div className="space-y-0.5 text-right">
            <p className="font-semibold">Webnet</p>
            <p>55 rue de Luxembourg, Lille Europe</p>
            <p>contact@webnet.fr</p>
          </div>
        </div>

        {/* Date centered */}
        <div className="text-center mb-8">
          <p className="text-sm">LE 12/10/2025</p>
        </div>

        {/* Letter content */}
        <div className="space-y-4 text-foreground/90">
          <h1 className="text-lg font-bold mb-6">Candidature pour le poste de Développeur Web Java</h1>

          <p className="leading-relaxed">
            Madame, Monsieur,
          </p>

          <p className="leading-relaxed">
            Actuellement étudiant en 3ème année à l'ISITCOM, je recherche une opportunité professionnelle
            afin de mettre en application mes compétences acquises durant mon parcours universitaire.
            Rejoindre votre équipe dynamique me permettrait d'approfondir mes connaissances en développement
            backend, architectures modernes et bonnes pratiques Java.
          </p>

          <p className="leading-relaxed">
            Votre annonce pour ce poste correspond parfaitement à ma recherche et à mes attentes, notamment
            par les technologies maîtrisées telles que Java, Spring Boot, PostgreSQL, MySQL, Angular,
            JavaScript/TypeScript, Git, CI/CD, conception orientée objet et méthodologies modernes. Grâce
            à divers projets académiques, freelances et personnels, j'ai pu développer de solides
            compétences techniques et être à l'aise avec les méthodes demandées dans l'offre. J'ai
            également acquis des qualités personnelles indispensables : autonomie, esprit d'analyse, sens
            du challenge, travail d'équipe, créativité et patience.
          </p>

          <p className="leading-relaxed">
            Intégrer votre entreprise serait une opportunité pour bénéficier de votre expertise et
            continuer à progresser dans un cadre stimulant. Je suis motivé par l'envie d'apprendre et de
            contribuer activement à vos projets informatiques, au sein d'une société reconnue pour son
            excellence technique. Disponible immédiatement, je serais ravi d'échanger davantage lors d'un
            entretien à votre convenance.
          </p>

          <p className="leading-relaxed">
            En espérant une réponse favorable de votre part, veuillez agréer, Madame, Monsieur,
            l'expression de mes salutations distinguées.
          </p>

          {/* Signature bottom right */}
          <div className="mt-12 text-right">
            <p className="font-semibold">Alaa Eddine Daly</p>
          </div>
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