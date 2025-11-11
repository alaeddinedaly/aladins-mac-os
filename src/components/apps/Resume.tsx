import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Resume = () => {
  const resumeUrl = '/Resume.pdf'; // Path inside /public

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Resume.pdf';
    link.click();
  };

  const handleOpen = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Resume</h2>
          <div className="flex gap-2">
            <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleOpen}
            >
              <ExternalLink className="w-4 h-4" />
              Open
            </Button>
          </div>
        </div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-lg border border-border/30 p-6 space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">AlaEddine Daly</h1>
            <p className="text-xl text-primary">Full-Stack Developer</p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>dalyalaeddine@gmail.com</span>
              <span>•</span>
              <span>(+216) 58 247 509</span>
              <span>•</span>
              <span>Sousse, Tunisia</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">Professional Summary</h3>
            <p className="text-foreground/80 leading-relaxed">
              Experienced Full-Stack Developer with expertise in building scalable web applications,
              AI-powered solutions, and mobile apps. Proficient in modern frameworks and technologies
              including React, Angular, Spring Boot, and Python. Strong background in AI/ML, computer
              vision, and secure system architecture.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-primary mb-2">Frontend</h4>
                <p className="text-sm text-foreground/80">
                  React, Next.js, Angular, TypeScript, Tailwind CSS, Framer Motion
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Backend</h4>
                <p className="text-sm text-foreground/80">
                  Node.js, Spring Boot, Python, Java, Kotlin, PHP
                </p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Mobile</h4>
                <p className="text-sm text-foreground/80">React Native, Expo</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">AI/ML</h4>
                <p className="text-sm text-foreground/80">
                  Computer Vision, RAG, NLP, Gemini API, CNN
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">Availability</h3>
            <p className="text-accent font-medium">✅ Available for full-time opportunities</p>
          </div>
        </motion.div>
      </div>
  );
};

export default Resume;
