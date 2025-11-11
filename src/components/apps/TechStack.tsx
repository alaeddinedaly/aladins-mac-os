import { motion } from 'framer-motion';

interface Tech {
  name: string;
  icon: string;
  category: string;
}

const techStack: Tech[] = [
  // Frontend
  { name: 'HTML', icon: '🌐', category: 'Frontend' },
  { name: 'CSS', icon: '🎨', category: 'Frontend' },
  { name: 'JavaScript', icon: '⚡', category: 'Frontend' },
  { name: 'TypeScript', icon: '📘', category: 'Frontend' },
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'Angular', icon: '🅰️', category: 'Frontend' },
  
  // Backend
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'PHP', icon: '🐘', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'Java', icon: '☕', category: 'Backend' },
  { name: 'C#', icon: '💜', category: 'Backend' },
  { name: 'C', icon: '©️', category: 'Backend' },
  { name: 'Spring Boot', icon: '🍃', category: 'Backend' },
  { name: 'Kotlin', icon: '🔷', category: 'Backend' },
  
  // Mobile
  { name: 'React Native', icon: '📱', category: 'Mobile' },
  { name: 'Expo', icon: '⚪', category: 'Mobile' },
  
  // Database
  { name: 'SQL', icon: '🗄️', category: 'Database' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
  { name: 'NoSQL', icon: '📊', category: 'Database' },
  
  // Tools
  { name: 'Git', icon: '📌', category: 'Tools' },
  { name: 'GitHub', icon: '🐙', category: 'Tools' },
  { name: 'Unity', icon: '🎮', category: 'Tools' },
];

const categories = ['Frontend', 'Backend', 'Mobile', 'Database', 'Tools'];

const TechStack = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Tech Stack</h2>

      {categories.map((category, categoryIndex) => {
        const categoryTechs = techStack.filter((tech) => tech.category === category);
        return (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-medium text-primary">{category}</h3>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {categoryTechs.map((tech, techIndex) => (
                <motion.div
                  key={tech.name}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: categoryIndex * 0.1 + techIndex * 0.05,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="p-4 rounded-lg bg-muted/30 hover:bg-primary/10 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </span>
                  <span className="text-xs font-medium text-center">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechStack;
