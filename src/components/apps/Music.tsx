import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src: string;
}

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.75); // 0 to 1

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);


  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.min(Math.max(clickX / rect.width, 0), 1); // clamp 0-1
    setVolume(newVolume);
  };


  const tracks: Track[] = [
    { id: '1', title: 'Rose Golden', artist: 'Kid Cudi', duration: '3:45', src: 'RoseGolden.mp4' },
    { id: '2', title: 'Animal I Have Become', artist: 'Three Days Grace', duration: '4:20', src: 'ThreeDaysGrace-AnimalIHaveBecome.mp4' },
    { id: '3', title: 'I Hate Everything About You', artist: 'Three Days Grace', duration: '5:12', src: 'ThreeDaysGrace-IHateEverythingAboutYou(Official Video).mp4' },
  ];

  // Play/pause audio
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentTrack]);

  // Update currentTime and duration
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [currentTrack]);

  const handlePrev = () => {
    setCurrentTrack(prev => (prev > 0 ? prev - 1 : tracks.length - 1));
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleNext = () => {
    setCurrentTrack(prev => (prev < tracks.length - 1 ? prev + 1 : 0));
    setIsPlaying(true);
    setCurrentTime(0);
  };

  // Format seconds to mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Seek audio
  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
      <div className="space-y-6">
        <audio ref={audioRef} src={tracks[currentTrack].src} />

        {/* Now Playing */}
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 text-center space-y-4"
        >
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg flex items-center justify-center text-4xl">
            🎵
          </div>
          <div>
            <h3 className="text-2xl font-bold">{tracks[currentTrack].title}</h3>
            <p className="text-muted-foreground">{tracks[currentTrack].artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div
                className="h-1 bg-muted/30 rounded-full overflow-hidden cursor-pointer"
                onClick={handleSeek}
            >
              <motion.div
                  className="h-full bg-primary"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{tracks[currentTrack].duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <motion.button whileTap={{ scale: 0.9 }} onClick={handlePrev} className="p-3 rounded-full hover:bg-muted/30 transition-colors">
              <SkipBack className="w-5 h-5" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsPlaying(!isPlaying)} className="p-4 rounded-full bg-primary text-primary-foreground hover:brightness-110 transition-all">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleNext} className="p-3 rounded-full hover:bg-muted/30 transition-colors">
              <SkipForward className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Playlist */}
        <div className="space-y-2">
          <h3 className="font-semibold">Playlist</h3>
          {tracks.map((track, index) => (
              <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    setCurrentTrack(index);
                    setIsPlaying(true);
                    setCurrentTime(0);
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${currentTrack === index ? 'bg-primary/20' : 'hover:bg-muted/30'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-muted-foreground">{track.artist}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{track.duration}</span>
                  </div>
                </div>
              </motion.div>
          ))}
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 pt-4 border-t border-border/30">
          <Volume2 className="w-5 h-5 text-muted-foreground" />
          <div
              className="flex-1 h-1 bg-muted/30 rounded-full overflow-hidden cursor-pointer"
              onClick={handleVolumeChange}
          >
            <div className="h-full bg-primary" style={{ width: `${volume * 100}%` }} />
          </div>
        </div>
      </div>
  );
};

export default Music;
