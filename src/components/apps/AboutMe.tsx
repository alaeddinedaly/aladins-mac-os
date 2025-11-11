import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Briefcase } from 'lucide-react';

const AboutMe = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl">
          👨‍💻
        </div>
        <div>
          <h1 className="text-3xl font-bold">AlaEddine Daly</h1>
          <p className="text-lg text-primary">Full-Stack Developer</p>
        </div>
      </motion.div>

      <div className="space-y-3">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
        >
          <MapPin className="w-5 h-5 text-primary" />
          <span>Sousse, Tunisia</span>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
        >
          <Mail className="w-5 h-5 text-primary" />
          <a href="mailto:dalyalaeddine@gmail.com" className="hover:text-primary transition-colors">
            dalyalaeddine@gmail.com
          </a>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
        >
          <Phone className="w-5 h-5 text-primary" />
          <span>(+216) 58 247 509</span>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
        >
          <Briefcase className="w-5 h-5 text-primary" />
          <span className="font-medium text-accent">Available for work</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="pt-4 border-t border-border/30"
      >
        <p className="text-center text-sm text-muted-foreground mb-4">Connect with me</p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/alaeddinedaly"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/30 hover:bg-primary/20 transition-all hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/daly-ala-eddine"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted/30 hover:bg-primary/20 transition-all hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutMe;
