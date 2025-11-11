import { motion } from 'framer-motion';
import { Sun, Moon, Palette, Volume2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [sounds, setSounds] = useState(true);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    toast({
      title: darkMode ? 'Light mode enabled' : 'Dark mode enabled',
      description: 'Theme has been updated',
    });
  };

  const wallpapers = [
    { id: '1', name: 'Sonoma', gradient: 'from-purple-500 via-pink-500 to-orange-500' },
    { id: '2', name: 'Ocean', gradient: 'from-blue-500 via-cyan-500 to-teal-500' },
    { id: '3', name: 'Forest', gradient: 'from-green-500 via-emerald-500 to-teal-500' },
    { id: '4', name: 'Sunset', gradient: 'from-orange-500 via-red-500 to-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">System Preferences</h2>

      {/* Appearance */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          Appearance
        </h3>
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <div>
              <div className="font-medium">Dark Mode</div>
              <div className="text-sm text-muted-foreground">
                {darkMode ? 'Using dark theme' : 'Using light theme'}
              </div>
            </div>
          </div>
          <Switch checked={darkMode} onCheckedChange={handleThemeToggle} />
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium">Wallpaper</div>
          <div className="grid grid-cols-2 gap-3">
            {wallpapers.map((wallpaper, index) => (
              <motion.div
                key={wallpaper.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className={`aspect-video rounded-lg bg-gradient-to-br ${wallpaper.gradient} cursor-pointer shadow-lg flex items-center justify-center text-white font-semibold`}
              >
                {wallpaper.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Accessibility
        </h3>
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
          <div>
            <div className="font-medium">Reduce Motion</div>
            <div className="text-sm text-muted-foreground">
              {animations ? 'Animations enabled' : 'Animations disabled'}
            </div>
          </div>
          <Switch checked={animations} onCheckedChange={setAnimations} />
        </div>
      </div>

      {/* Sound */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-primary" />
          Sound
        </h3>
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
          <div>
            <div className="font-medium">System Sounds</div>
            <div className="text-sm text-muted-foreground">
              {sounds ? 'Sounds enabled' : 'Sounds disabled'}
            </div>
          </div>
          <Switch checked={sounds} onCheckedChange={setSounds} />
        </div>
      </div>

      {/* System Info */}
      <div className="pt-4 border-t border-border/30 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Version</span>
          <span className="font-medium">macOS Portfolio 1.0</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Developer</span>
          <span className="font-medium">AlaEddine Daly</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
