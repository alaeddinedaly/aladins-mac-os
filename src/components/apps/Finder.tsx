import { Project } from '@/types/apps';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects: Project[] = [
  {
    id: 'lynkai',
    name: 'LynkAi',
    description: 'Web application with JWT authentication featuring a RAG model for intelligent document Q&A and AI-powered summary generation.',
    tech: ['Angular', 'Spring Boot', 'RAG', 'JWT', 'AI/ML'],
    category: 'Web Application',
  },
  {
    id: 'storyboard',
    name: 'AI Storyboard Generator',
    description: 'AI-powered storyboard generator using custom-trained VGG-inspired CNN (67% accuracy) with SDXL diffusion pipeline for professional 1024×1024 images.',
    tech: ['Python', 'AI/ML', 'Computer Vision', 'CNN', 'SDXL'],
    category: 'AI/ML',
  },
  {
    id: 'nexusdown',
    name: 'Nexus Down',
    description: 'Robust download manager featuring infinite retry on errors and concurrent parallel downloads for maximum speed.',
    tech: ['Python', 'Automation', 'File Management'],
    category: 'Utility',
  },
  {
    id: 'fileservice',
    name: 'Secure File Service',
    description: 'Secure cloud storage service inspired by Google Drive with JWT authentication and encrypted file storage.',
    tech: ['Kotlin', 'Security', 'File Management', 'JWT'],
    category: 'Web Service',
  },
  {
    id: 'finora',
    name: 'Finora',
    description: 'Financial management mobile app featuring expense tracking, budgeting tools, and financial insights.',
    tech: ['React Native', 'Expo', 'PostgreSQL'],
    category: 'Mobile App',
  },
  {
    id: 'ocr',
    name: 'OCR Application',
    description: 'Intelligent document scanner using Tesseract OCR enhanced with Gemini API for advanced text understanding.',
    tech: ['HTML', 'JavaScript', 'OCR', 'Computer Vision', 'Gemini AI'],
    category: 'Utility',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    description: 'Modern, responsive portfolio with smooth animations and beautiful dark theme.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web',
  },
  {
    id: 'flamebot',
    name: 'FlameBot',
    description: 'Conversational AI chatbot powered by Google\'s Gemini API for natural conversation.',
    tech: ['JavaScript', 'Gemini AI', 'Chatbot', 'NLP'],
    category: 'AI',
  },
  {
    id: 'restaurant',
    name: 'Restaurant Management',
    description: 'Full restaurant management system with inventory tracking, order management, and reporting.',
    tech: ['Java', 'Swing', 'SQL', 'JDBC'],
    category: 'Desktop App',
  },
  {
    id: 'shooter',
    name: '2D Shooter Game',
    description: 'Action-packed 2D shooting game with multiple levels and engaging mechanics.',
    tech: ['Unity', 'C#', 'Game Development'],
    category: 'Game',
  },
  {
    id: 'zipit',
    name: 'Zipit',
    description: 'GUI app for compressing and extracting ZIP archives. Simple, lightweight, and efficient.',
    tech: ['Python', 'Tkinter', 'Zipfile'],
    category: 'Utility',
  },
];

const Finder = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Projects</h2>
        <div className="text-sm text-muted-foreground">{projects.length} items</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-4 rounded-lg border border-border/30 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <span className="text-xs text-muted-foreground">{project.category}</span>
              </div>
              {project.link && (
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </div>
            <p className="text-sm text-foreground/80 mb-3 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Finder;
