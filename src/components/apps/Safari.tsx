import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { useState } from 'react';

interface Link {
  name: string;
  url: string;
  icon: React.ReactNode;
  description: string;
}

const links: Link[] = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: <Github className="w-8 h-8" />,
    description: 'View my open source projects and contributions',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: <Linkedin className="w-8 h-8" />,
    description: 'Connect with me professionally',
  },
  {
    name: 'Portfolio',
    url: 'https://portfolio.com',
    icon: <Globe className="w-8 h-8" />,
    description: 'Visit my traditional portfolio website',
  },
];

const Safari = () => {
  const [activeLink, setActiveLink] = useState<Link | null>(null);

  return (
    <div className="space-y-4">
      {/* Safari toolbar */}
      <div className="flex items-center gap-3 pb-3 border-b border-border/30">
        <div className="flex gap-2">
          <button className="p-1.5 rounded-md hover:bg-muted/30 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-muted/30 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-muted/30 transition-colors">
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 bg-muted/30 rounded-lg px-4 py-2 text-sm text-muted-foreground">
          {activeLink ? activeLink.url : 'Quick Links'}
        </div>
      </div>

      {/* Favorites */}
      {!activeLink && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Favorites</h3>
          <div className="grid grid-cols-3 gap-4">
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer flex flex-col items-center gap-3 text-center group"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(link);
                }}
              >
                <div className="text-primary group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <div>
                  <div className="font-medium">{link.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {link.description}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Active page preview */}
      {activeLink && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <button
            onClick={() => setActiveLink(null)}
            className="text-sm text-primary hover:underline"
          >
            ← Back to Favorites
          </button>
          <div className="p-8 bg-muted/20 rounded-lg text-center space-y-4">
            <div className="text-primary">{activeLink.icon}</div>
            <h2 className="text-2xl font-bold">{activeLink.name}</h2>
            <p className="text-muted-foreground">{activeLink.description}</p>
            <a
              href={activeLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
            >
              Visit {activeLink.name}
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Safari;
