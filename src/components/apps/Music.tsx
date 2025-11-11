import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { useState } from 'react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
}

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks: Track[] = [
    { id: '1', title: 'Focus Flow', artist: 'Ambient Sounds', duration: '3:45' },
    { id: '2', title: 'Code & Coffee', artist: 'Lo-Fi Beats', duration: '4:20' },
    { id: '3', title: 'Deep Work', artist: 'Study Music', duration: '5:12' },
    { id: '4', title: 'Creative Mode', artist: 'Chill Vibes', duration: '3:58' },
  ];

  return (
    <div className="space-y-6">
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
          <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: isPlaying ? '60%' : '0%' }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1:23</span>
            <span>{tracks[currentTrack].duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentTrack((prev) => (prev > 0 ? prev - 1 : tracks.length - 1))}
            className="p-3 rounded-full hover:bg-muted/30 transition-colors"
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 rounded-full bg-primary text-primary-foreground hover:brightness-110 transition-all"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentTrack((prev) => (prev < tracks.length - 1 ? prev + 1 : 0))}
            className="p-3 rounded-full hover:bg-muted/30 transition-colors"
          >
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
            onClick={() => setCurrentTrack(index)}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              currentTrack === index
                ? 'bg-primary/20'
                : 'hover:bg-muted/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{track.title}</div>
                <div className="text-sm text-muted-foreground">{track.artist}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{track.duration}</span>
                {currentTrack === index && isPlaying && (
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-primary rounded-full"
                        animate={{ height: ['4px', '12px', '4px'] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
        <Volume2 className="w-5 h-5 text-muted-foreground" />
        <div className="flex-1 h-1 bg-muted/30 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default Music;
