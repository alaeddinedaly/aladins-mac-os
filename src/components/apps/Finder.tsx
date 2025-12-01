import { Project } from '@/types/apps';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, Github, Globe } from 'lucide-react';
import { useState } from 'react';

const projects: Project[] = [
  {
    id: 'lynkai',
    name: 'LynkAi',
    description: 'Web application with JWT authentication featuring a RAG model for intelligent document Q&A and AI-powered summary generation.',
    tech: ['Angular', 'Spring Boot', 'RAG', 'JWT', 'AI/ML'],
    category: 'Web Application',
    readme: `# LynkAi

## Overview
LynkAi is a sophisticated web application that combines modern authentication with cutting-edge AI capabilities. Built with Angular and Spring Boot, it provides a secure platform for intelligent document analysis.

## Key Features
- **JWT Authentication**: Secure user authentication and authorization
- **RAG Model Integration**: Retrieval-Augmented Generation for accurate document Q&A
- **AI-Powered Summaries**: Automatic generation of document summaries
- **Real-time Processing**: Fast and efficient document analysis

## Tech Stack
- **Frontend**: Angular with TypeScript
- **Backend**: Spring Boot (Java)
- **AI/ML**: Custom RAG implementation
- **Security**: JWT tokens for authentication
- **Database**: PostgreSQL

## Architecture
The application follows a microservices architecture with separate frontend and backend services. The RAG model processes documents and provides context-aware responses to user queries.

## Use Cases
- Document analysis and summarization
- Intelligent Q&A systems
- Knowledge base management
- Research assistance`,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
  {
    id: 'storyboard',
    name: 'AI Storyboard Generator',
    description: 'AI-powered storyboard generator using custom-trained VGG-inspired CNN (67% accuracy) with SDXL diffusion pipeline for professional 1024×1024 images.',
    tech: ['Python', 'AI/ML', 'Computer Vision', 'CNN', 'SDXL'],
    category: 'AI/ML',
    readme: `# AI Storyboard Generator

## Overview
An advanced AI-powered tool that generates professional storyboard images using deep learning and diffusion models.

## Technical Highlights
- **Custom CNN Architecture**: VGG-inspired model trained from scratch
- **67% Classification Accuracy**: Optimized for storyboard scene recognition
- **SDXL Integration**: Stable Diffusion XL for high-quality image generation
- **1024×1024 Output**: Professional-grade image resolution

## Model Architecture
The system uses a two-stage approach:
1. Scene classification using custom CNN
2. Image generation using SDXL diffusion pipeline

## Training Details
- Dataset: Custom curated storyboard dataset
- Framework: PyTorch
- Training Duration: 50 epochs
- Validation Accuracy: 67%

## Applications
- Film and animation pre-production
- Comic book creation
- Video game concept art
- Advertising storyboards

## Performance
- Generation time: ~5 seconds per image
- GPU requirement: NVIDIA RTX 3060 or better
- Memory usage: 8GB VRAM`,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
  {
    id: 'nexusdown',
    name: 'Nexus Down',
    description: 'Robust download manager featuring infinite retry on errors and concurrent parallel downloads for maximum speed.',
    tech: ['Python', 'Automation', 'File Management'],
    category: 'Utility',
    readme: `# Nexus Down

## Overview
A powerful download manager built with Python that ensures reliable file downloads with automatic error recovery.

## Key Features
- **Infinite Retry Logic**: Never lose a download due to temporary network issues
- **Parallel Downloads**: Multiple concurrent downloads for maximum speed
- **Resume Capability**: Continue interrupted downloads from where they stopped
- **Progress Tracking**: Real-time download progress and speed monitoring

## Technical Implementation
\`\`\`python
# Core download engine
- asyncio for concurrent operations
- requests library with streaming
- Custom retry decorator with exponential backoff
\`\`\`

## Features
- Automatic chunk-based downloading
- Network failure detection and recovery
- Configurable thread pool size
- Download queue management
- Speed limiting options

## Use Cases
- Bulk file downloads
- Large file transfers
- Unreliable network environments
- Automated backup systems`,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
  {
    id: 'fileservice',
    name: 'Secure File Service',
    description: 'Secure cloud storage service inspired by Google Drive with JWT authentication and encrypted file storage.',
    tech: ['Kotlin', 'Security', 'File Management', 'JWT'],
    category: 'Web Service',
    readme: `# Secure File Service

## Overview
A cloud storage service built with security as the top priority, featuring end-to-end encryption and secure authentication.

## Security Features
- **JWT Authentication**: Stateless, secure user sessions
- **File Encryption**: AES-256 encryption for stored files
- **Secure Upload**: HTTPS-only file transfers
- **Access Control**: Fine-grained permission system

## Architecture
Built using Kotlin and Spring Boot, the service provides RESTful APIs for file operations.

## Key Capabilities
- Upload and download files
- Share files with other users
- Organize files in folders
- Search functionality
- Version control

## Tech Stack
- **Backend**: Kotlin + Spring Boot
- **Database**: PostgreSQL
- **Storage**: MinIO (S3-compatible)
- **Security**: Spring Security + JWT

## API Endpoints
\`\`\`
POST /api/files/upload
GET /api/files/{id}
DELETE /api/files/{id}
POST /api/files/share
\`\`\``,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
  {
    id: 'finora',
    name: 'Finora',
    description: 'Financial management mobile app featuring expense tracking, budgeting tools, and financial insights.',
    tech: ['React Native', 'Expo', 'PostgreSQL'],
    category: 'Mobile App',
    readme: `# Finora - Financial Management App

## Overview
A comprehensive mobile application for personal finance management, built with React Native and Expo.

## Features
- **Expense Tracking**: Log and categorize all your expenses
- **Budget Management**: Set and track monthly budgets
- **Financial Insights**: AI-powered spending analysis
- **Bill Reminders**: Never miss a payment
- **Multi-Currency Support**: Track expenses in any currency

## Technical Stack
- React Native for cross-platform development
- Expo for rapid development and deployment
- PostgreSQL for reliable data storage
- Redux for state management

## Key Screens
1. Dashboard - Overview of finances
2. Transactions - Detailed expense list
3. Budgets - Budget tracking and alerts
4. Analytics - Spending patterns and insights
5. Settings - App configuration

## Data Visualization
- Interactive charts using react-native-chart-kit
- Monthly spending trends
- Category-wise breakdown
- Budget vs actual comparisons`,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
  {
    id: 'ocr',
    name: 'OCR Application',
    description: 'Intelligent document scanner using Tesseract OCR enhanced with Gemini API for advanced text understanding.',
    tech: ['HTML', 'JavaScript', 'OCR', 'Computer Vision', 'Gemini AI'],
    category: 'Utility',
    readme: `# OCR Application

## Overview
An intelligent document scanning application that combines Tesseract OCR with Google's Gemini AI for enhanced text recognition and understanding.

## Features
- **Tesseract OCR Engine**: Industry-standard text recognition
- **Gemini AI Enhancement**: Context-aware text correction
- **Multi-Language Support**: Recognizes 100+ languages
- **Document Structure**: Preserves formatting and layout
- **Real-time Processing**: Fast text extraction

## Technology Stack
- Tesseract.js for OCR processing
- Google Gemini API for AI enhancement
- HTML5 Canvas for image processing
- JavaScript for application logic

## Workflow
1. Upload or capture document image
2. Tesseract extracts raw text
3. Gemini AI corrects and formats text
4. Export as text, PDF, or Word document

## Use Cases
- Digitizing physical documents
- Converting images to editable text
- Extracting data from receipts
- Processing handwritten notes

## Accuracy
- Printed text: 95%+ accuracy
- Handwritten text: 80%+ accuracy
- Enhanced by Gemini: 98%+ accuracy`,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    description: 'Modern, responsive portfolio with smooth animations and beautiful dark theme.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web',
    readme: `# Portfolio Website

## Overview
A stunning, modern portfolio website built with Next.js and featuring smooth animations powered by Framer Motion.

## Design Features
- **Dark Theme**: Eye-friendly dark mode design
- **Smooth Animations**: Framer Motion for fluid transitions
- **Responsive Design**: Perfect on all screen sizes
- **Fast Loading**: Optimized performance with Next.js

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **TypeScript**: Type-safe development

## Sections
- Hero with animated introduction
- About Me with skills showcase
- Projects gallery with filtering
- Contact form with validation
- Blog (optional)

## Performance
- Lighthouse Score: 100/100
- First Contentful Paint: <1s
- Time to Interactive: <2s

## Deployment
Hosted on Vercel with automatic deployments from GitHub.`,
    githubUrl: 'https://github.com/alaeddinedaly',
    liveUrl: 'https://yourportfolio.com',
  },
  {
    id: 'flamebot',
    name: 'FlameBot',
    description: 'Conversational AI chatbot powered by Google\'s Gemini API for natural conversation.',
    tech: ['JavaScript', 'Gemini AI', 'Chatbot', 'NLP'],
    category: 'AI',
    readme: `# FlameBot

## Overview
An intelligent conversational AI chatbot leveraging Google's Gemini API for natural, context-aware interactions.

## Features
- **Natural Conversations**: Context-aware responses
- **Multi-turn Dialogue**: Maintains conversation history
- **Quick Responses**: Fast API integration
- **Customizable Personality**: Adjustable tone and style

## Implementation
Built with vanilla JavaScript for lightweight performance and easy integration into any website.

## Gemini Integration
\`\`\`javascript
const chat = await gemini.startChat({
  history: conversationHistory,
  generationConfig: {
    maxOutputTokens: 1000,
  }
});
\`\`\`

## Use Cases
- Customer support automation
- Personal assistant
- Educational tutoring
- Entertainment and engagement

## Features
- Typing indicators
- Message history
- Export conversations
- Dark/Light theme toggle

## Deployment
Can be embedded in any website with a simple script tag.`,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
  {
    id: 'restaurant',
    name: 'Restaurant Management',
    description: 'Full restaurant management system with inventory tracking, order management, and reporting.',
    tech: ['Java', 'Swing', 'SQL', 'JDBC'],
    category: 'Desktop App',
    readme: `# Restaurant Management System

## Overview
A comprehensive desktop application for managing restaurant operations, built with Java Swing.

## Core Modules
1. **Order Management**: Take and track customer orders
2. **Inventory Control**: Monitor stock levels and ingredients
3. **Staff Management**: Employee scheduling and tracking
4. **Reporting**: Sales analytics and financial reports

## Technical Stack
- Java Swing for GUI
- MySQL database
- JDBC for database connectivity
- JasperReports for printing

## Key Features
- Point of Sale (POS) interface
- Table management
- Kitchen display system
- Billing and invoicing
- Customer management
- Menu configuration

## Database Schema
- Orders, OrderItems
- Menu, MenuItems
- Inventory, Suppliers
- Employees, Shifts
- Customers, Reservations

## Reports
- Daily sales report
- Inventory status
- Employee performance
- Popular items analysis`,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
  {
    id: 'shooter',
    name: '2D Shooter Game',
    description: 'Action-packed 2D shooting game with multiple levels and engaging mechanics.',
    tech: ['Unity', 'C#', 'Game Development'],
    category: 'Game',
    readme: `# 2D Shooter Game

## Overview
An exciting 2D shooting game developed in Unity with engaging gameplay mechanics and multiple challenging levels.

## Game Features
- **Multiple Levels**: Progressive difficulty
- **Power-ups**: Various weapon upgrades
- **Enemy Types**: Diverse enemy behaviors
- **Boss Fights**: Epic end-level challenges
- **Scoring System**: High score tracking

## Technical Implementation
- Unity 2D physics engine
- Custom enemy AI patterns
- Particle systems for effects
- Audio management system
- Save/Load functionality

## Gameplay Mechanics
- Smooth character movement
- Multiple weapon types
- Health and armor system
- Collectible items
- Combo system

## Level Design
- 10+ unique levels
- Environmental hazards
- Secret areas and bonuses
- Checkpoint system

## Art Style
- Pixel art graphics
- Animated sprites
- Dynamic lighting effects
- Parallax scrolling backgrounds

## Controls
- WASD/Arrow keys for movement
- Mouse for aiming and shooting
- Space for special abilities`,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
  {
    id: 'zipit',
    name: 'Zipit',
    description: 'GUI app for compressing and extracting ZIP archives. Simple, lightweight, and efficient.',
    tech: ['Python', 'Tkinter', 'Zipfile'],
    category: 'Utility',
    readme: `# Zipit - ZIP Archive Manager

## Overview
A lightweight, user-friendly GUI application for managing ZIP archives built with Python and Tkinter.

## Features
- **Compress Files**: Create ZIP archives from files and folders
- **Extract Archives**: Unzip files with progress tracking
- **Preview Contents**: View archive contents before extraction
- **Password Protection**: Secure your archives
- **Drag & Drop**: Easy file addition

## Technical Details
Built using Python's standard library with Tkinter for the GUI, making it lightweight with no external dependencies.

## Interface
- Clean, intuitive design
- Progress bars for operations
- File tree view
- Context menus

## Capabilities
- Compress individual files or entire folders
- Batch compression
- Selective extraction
- Compression level adjustment
- Multiple archive format support

## Performance
- Fast compression using zipfile module
- Efficient memory usage
- Multi-threaded operations

## Cross-Platform
Works on Windows, macOS, and Linux without modifications.`,
    githubUrl: 'https://github.com/alaeddinedaly',
  },
];

const Finder = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  return (
      <div className="flex h-full">
        {/* Left Sidebar - Project List */}
        <div className={`${selectedProject ? 'w-80 border-r border-border/30' : 'w-full'} overflow-y-auto macos-scrollbar transition-all duration-300`}>
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Projects</h2>
              <div className="text-sm text-muted-foreground">{projects.length} items</div>
            </div>

            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleProjectClick(project)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedProject?.id === project.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border/30 hover:border-primary/50 hover:bg-accent/50'
                    }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">{project.category}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0 ml-2" />
                  </div>
                  <p className="text-xs text-foreground/70 line-clamp-2 mb-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-1.5 py-0.5 text-xs rounded bg-primary/10 text-primary font-medium"
                        >
                    {tech}
                  </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="px-1.5 py-0.5 text-xs text-muted-foreground">
                    +{project.tech.length - 3}
                  </span>
                    )}
                  </div>
                </motion.div>
            ))}
          </div>
        </div>

        {/* Right Panel - Project Details */}
        <AnimatePresence>
          {selectedProject && (
              <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex-1 overflow-y-auto macos-scrollbar"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back to Projects
                    </button>

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{selectedProject.name}</h1>
                        <p className="text-muted-foreground">{selectedProject.description}</p>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 mb-4">
                      {selectedProject.githubUrl && (
                          <a
                              href={selectedProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
                          >
                            <Github className="w-4 h-4" />
                            View on GitHub
                          </a>
                      )}
                      {selectedProject.liveUrl && (
                          <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg transition-colors text-sm font-medium"
                          >
                            <Globe className="w-4 h-4" />
                            Live Demo
                          </a>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                          <span
                              key={tech}
                              className="px-3 py-1 text-sm rounded-md bg-primary/10 text-primary font-medium"
                          >
                      {tech}
                    </span>
                      ))}
                    </div>
                  </div>

                  {/* README Content */}
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap font-mono text-sm bg-accent/30 rounded-lg p-6 border border-border/30">
                      {selectedProject.readme}
                    </div>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default Finder;