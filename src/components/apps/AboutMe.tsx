import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Briefcase, Download, ExternalLink } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary relative group cursor-pointer">
          <img
            src="/me.jpg"
            alt="AlaEddine Daly"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AlaEddine Daly</h1>
          <p className="text-lg text-primary font-medium">Full-Stack Software Engineer</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 mt-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Open to Work
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-lg bg-muted/50 border border-border/50 text-sm leading-relaxed"
        >
          <p>
            Hi there! 👋 I'm a passionate Full-Stack Developer with a knack for building robust, scalable applications.
            I specialize in the Java ecosystem (Spring Boot) and modern frontend frameworks (React, Next.js).
            I love turning complex problems into simple, elegant solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Sousse, Tunisia</span>
          </div>

          <a
            href="mailto:dalyalaeddine@gmail.com"
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <Mail className="w-5 h-5 text-primary" />
            <span className="group-hover:text-primary transition-colors">dalyalaeddine@gmail.com</span>
          </a>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
            <Phone className="w-5 h-5 text-primary" />
            <span>(+216) 58 247 509</span>
          </div>

          <a
            href="/Resume_en.pdf"
            target="_blank"
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <Download className="w-5 h-5 text-primary" />
            <span className="group-hover:text-primary transition-colors">Download Resume</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="pt-4 border-t border-border/30"
      >
        <p className="text-center text-sm text-muted-foreground mb-4">Connect with me</p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/alaeddinedaly"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/30 hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/daly-ala-eddine"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/30 hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://aladin-daly-dev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/30 hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
            title="Website"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
