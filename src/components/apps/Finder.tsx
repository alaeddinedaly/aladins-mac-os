import { Project } from '@/types/apps';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, Github, Globe, Loader2, Star } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGithubRepos, fetchReadme } from '@/lib/github';

const Finder = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['githubProjects'],
    queryFn: fetchGithubRepos,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const { data: readmeContent, isLoading: isReadmeLoading } = useQuery({
    queryKey: ['readme', selectedProject?.id],
    queryFn: () => selectedProject ? fetchReadme(selectedProject.id) : Promise.resolve(''),
    enabled: !!selectedProject,
    staleTime: 1000 * 60 * 60,
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center flex-col gap-2">
        <p className="text-red-500">Failed to load projects</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Project List */}
      <div className={`${selectedProject ? 'w-80 border-r border-border/30' : 'w-full'} overflow-y-auto macos-scrollbar transition-all duration-300`}>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Projects</h2>
            <div className="text-sm text-muted-foreground">{projects.length} items</div>
          </div>

          {projects.map((project, index) => {
            const isFeatured = ['LynkAi', 'AI Storyboard Generator', 'Finora', 'Secure File Service'].includes(project.name);

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleProjectClick(project)}
                className={`p-3 rounded-lg border transition-all cursor-pointer relative group ${selectedProject?.id === project.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border/30 hover:border-primary/50 hover:bg-accent/50'
                  }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      {isFeatured && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-[10px] font-medium border border-yellow-500/20">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          Featured
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                  </div>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0 ml-2 hover:text-primary" />
                    </a>
                  )}
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
            )
          })}
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
                <div className="whitespace-pre-wrap font-mono text-sm bg-accent/30 rounded-lg p-6 border border-border/30 min-h-[200px] relative">
                  {isReadmeLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    readmeContent || selectedProject.readme || 'No README available.'
                  )}
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