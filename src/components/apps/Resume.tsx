import { motion } from 'framer-motion';
import { Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Resume = () => {
  const resumeUrl = '/Resume_en.pdf'; // Path inside /public

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Resume_en.pdf';
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
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Alaa Eddine Daly</h1>
            <p className="text-xl text-primary">Full-Stack Developer</p>
            <div className="flex justify-center gap-4 text-sm text-muted-foreground">
              <span>dalyalaeddine@gmail.com</span>
              <span>•</span>
              <span>(+216) 58 247 509</span>
              <span>•</span>
              <span>Sousse, Tunisia</span>
              <span>•</span>
              <a
                  href="https://aladin-daly-dev.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
              >
                aladin-daly-dev.vercel.app
              </a>
            </div>
          </div>

          {/* Profile */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">
              Profile
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              Full-Stack Developer specialized in Spring Boot, React Native, and cloud technologies.
              Experienced in developing e-commerce and financial management applications.
              Seeking opportunities to build impactful digital products.
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">
              Professional Experience
            </h3>

            <div>
              <h4 className="font-medium text-primary">Smoft ERP – Internship</h4>
              <p className="text-sm text-muted-foreground">June 2025 – July 2025</p>
              <ul className="list-disc ml-5 text-sm text-foreground/80 mt-2 space-y-1">
                <li>
                  Developed a full-stack e-commerce platform (<a href="https://packajungle.com" target="_blank" className="underline">packajungle.com</a>)
                  using HTML, CSS, JavaScript, and PHP.
                </li>
                <li>
                  Built a custom OCR application using TesseractOCR and GEMINI to automate formula processing,
                  reducing manual data entry by 30%.
                </li>
                <li>
                  Improved ERP data retrieval performance, enhancing user experience and response time.
                </li>
                <li>
                  Debugged and resolved over 15 production issues, increasing system stability and performance.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-primary">Freelancer – Custom Development</h4>
              <p className="text-sm text-muted-foreground">2025 – Present</p>
              <ul className="list-disc ml-5 text-sm text-foreground/80 mt-2 space-y-1">
                <li>
                  Built custom web and mobile applications integrating AI features such as chatbots,
                  automation, and recommendation systems.
                </li>
                <li>
                  Produced professional video edits using Adobe After Effects and Premiere Pro, including
                  motion design, visual effects, and color grading.
                </li>
                <li>
                  Delivered client-focused digital solutions combining AI technology and high-quality multimedia.
                </li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">Education</h3>
            <p className="text-foreground/80">
              <span className="font-medium">ISITCOM | Higher Institute of Computer Science and Communication Technologies, Hammam Sousse</span><br />
              Bachelor’s Degree in Computer Science (2023 – Present)
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">Skills</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-foreground/80">
              <div>
                <h4 className="font-medium text-primary mb-2">Languages & Frameworks</h4>
                <p>Java, Kotlin, JavaScript/TypeScript, Python, SQL</p>
                <p>Spring Boot, Angular, Spring Security, React, React Native, Expo, Clerk Auth, Postman</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Databases & Tools</h4>
                <p>MySQL, PostgreSQL, Git/GitHub, Maven/Gradle, JWT, RESTful APIs, JDBC</p>
              </div>
              <div>
                <h4 className="font-medium text-primary mb-2">Concepts</h4>
                <p>RBAC, Microservices, Artificial Intelligence, OOP, Web/Mobile Development, Database Design</p>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">Projects</h3>

            <div>
              <h4 className="font-medium text-primary">StoryboardAI – AI-Powered Storyboard Generator</h4>
              <p className="text-sm text-muted-foreground">PyTorch, CNN, LoRA, Stable Diffusion XL</p>
              <ul className="list-disc ml-5 text-sm text-foreground/80 mt-2 space-y-1">
                <li>Developed a storyboard generator with a custom CNN for shot classification.</li>
                <li>Implemented an advanced AI engine with LoRA and facial embeddings for character consistency.</li>
                <li>Built a full pipeline using Stable Diffusion XL with temporal coherence and PDF/PNG export.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-primary">Finora – Financial Management Mobile App</h4>
              <p className="text-sm text-muted-foreground">React Native, Expo, PostgreSQL</p>
              <ul className="list-disc ml-5 text-sm text-foreground/80 mt-2 space-y-1">
                <li>Developed a cross-platform app with AI chatbot for personalized financial insights.</li>
                <li>Created card management and goal tracking with interactive visualizations.</li>
                <li>Architected secure authentication using Clerk and PostgreSQL (Neon).</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-primary">LynkAi</h4>
              <p className="text-sm text-muted-foreground">Angular, Spring Boot, MySQL</p>
              <ul className="list-disc ml-5 text-sm text-foreground/80 mt-2 space-y-1">
                <li>Developed a multi-platform app with JWT authentication and secure user management.</li>
                <li>Implemented a RAG + LLM system to query and analyze uploaded documents.</li>
                <li>Built an intelligent summarization generator for automatic file content synthesis.</li>
              </ul>
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">Languages</h3>
            <p className="text-foreground/80">English • Arabic • French</p>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-border/30 pb-2">Availability</h3>
            <p className="text-accent font-medium">✅ Available for full-time opportunities</p>
          </div>
        </motion.div>
      </div>
  );
};

export default Resume;
