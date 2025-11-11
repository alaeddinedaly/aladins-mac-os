import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

const Terminal = () => {
    const darkMode = useThemeStore((state) => state.darkMode);
    const [history, setHistory] = useState([
        { type: 'output', content: 'Last login: ' + new Date().toLocaleString() + ' on ttys000' },
        { type: 'output', content: 'Welcome to Aladin\'s Portfolio Terminal' },
        { type: 'output', content: 'Type "help" to see available commands\n' }
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    const terminalRef = useRef(null);

    const commands = {
        help: {
            description: 'Display available commands',
            execute: () => [
                'Available commands:',
                '  help           - Show this help message',
                '  about          - Learn more about me',
                '  skills         - View my technical stack',
                '  projects       - List my personal projects',
                '  contact        - Get my contact information',
                '  experience     - View my experience',
                '  education      - View my studies',
                '  clear          - Clear the terminal',
                '  whoami         - Display current user',
                '  date           - Display current date and time',
                '  echo [text]    - Print text to terminal',
                '  ls             - List portfolio sections',
                ''
            ]
        },
        about: {
            description: 'About Aladin',
            execute: () => [
                '👨‍💻 Aladin',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                'Full-Stack Developer based in Tunisia 🇹🇳',
                '',
                'Crafting digital experiences with modern technologies.',
                'Currently pursuing a Multimedia Licence at ISITCOM Hammam Sousse.',
                'Passionate about web development, mobile apps, and AI-driven projects.',
                'Available for work — let’s create something amazing together!',
                ''
            ]
        },
        skills: {
            description: 'Technical skills',
            execute: () => [
                '💻 Technical Stack',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                'Frontend:  HTML, CSS, JavaScript, TypeScript, React, Next.js',
                'Backend:   Node.js, PHP, Python, Java, C#, C',
                'Mobile:    React Native, Expo',
                'Database:  SQL, NoSQL, PostgreSQL',
                'Tools:     Git, GitHub',
                '',
                'Always learning and improving across modern technologies!',
                ''
            ]
        },
        projects: {
            description: 'Portfolio projects',
            execute: () => [
                '📁 Projects',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '1. LynkAi - AI-powered document Q&A and summary generation (Angular, Spring Boot, RAG, JWT)',
                '2. AI Storyboard Generator - Custom-trained CNN + SDXL pipeline for image generation (Python, AI/ML)',
                '3. Nexus Down - Python download manager with parallel downloads and retries',
                '4. Secure File Service - Encrypted cloud storage (Kotlin, Spring Boot, JWT)',
                '5. Finora - Finance management mobile app (React Native, Expo, PostgreSQL)',
                '6. OCR Application - Intelligent text extraction using Tesseract and Gemini API (JS, CV, OCR)',
                '7. Portfolio Website - Next.js + Tailwind CSS + Framer Motion',
                '8. FlameBot - Gemini AI chatbot (JavaScript, HTML, Gemini AI)',
                '9. Restaurant Management App - Full Java Swing + SQL system',
                '10. 2D Shooter Game - Unity C# shooter with multiple levels',
                '11. Zipit - Python Tkinter ZIP compression tool',
                '',
                'Type "contact" to reach out or visit the Projects section for more details!',
                ''
            ]
        },
        contact: {
            description: 'Contact information',
            execute: () => [
                '📬 Contact Information',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                'Email:    dalyalaeddine@gmail.com',
                'Phone:    (+216) 58 247 509',
                'Location: Sousse, Tunisia',
                'GitHub:   github.com/alaeddinedaly',
                'LinkedIn: linkedin.com/in/daly-ala-eddine',
                '',
                'Let’s talk about your next project!',
                ''
            ]
        },
        experience: {
            description: 'Experience',
            execute: () => [
                '💼 Experience',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                '✅ Available for work',
                '',
                '• June – July 2025: Internship at SMOFT ERP – Software development and system integration',
                '• 2024 – Present: 1.5 years Freelance – Full-stack web & mobile projects, scalable applications, modern tech integration',
                '',
                'Building real-world solutions powered with Artificial Intelligence through creativity and clean code.',
                ''
            ]
        },
        education: {
            description: 'Studies and certifications',
            execute: () => [
                '🎓 Education',
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
                'Institut Supérieur d\'Informatique et de Technologie de Communication de Hammam Sousse (ISITCOM)',
                'Multimedia Licence Student | 2023 - Present',
                '',
                'Learning about multimedia technologies, web development, and software engineering.',
                ''
            ]
        },
        clear: {
            description: 'Clear terminal',
            execute: () => null
        },
        whoami: {
            description: 'Display current user',
            execute: () => ['aladin']
        },
        date: {
            description: 'Display current date',
            execute: () => [new Date().toString()]
        },
        ls: {
            description: 'List sections',
            execute: () => [
                'about.txt',
                'skills.txt',
                'projects/',
                'contact.txt',
                'experience.txt',
                'education.txt',
                ''
            ]
        }
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeCommand();
        }
    };

    const executeCommand = () => {
        if (!input.trim()) {
            setHistory(prev => [...prev, { type: 'prompt', content: input }]);
            setInput('');
            return;
        }

        const trimmedInput = input.trim();
        const [cmd, ...args] = trimmedInput.split(' ');
        const command = commands[cmd.toLowerCase()];

        if (cmd.toLowerCase() === 'clear') {
            setHistory([]);
            setInput('');
            return;
        }

        if (cmd.toLowerCase() === 'echo') {
            setHistory(prev => [
                ...prev,
                { type: 'prompt', content: trimmedInput },
                { type: 'output', content: args.join(' ') }
            ]);
            setInput('');
            return;
        }

        if (command) {
            const output = command.execute(args);
            setHistory(prev => [
                ...prev,
                { type: 'prompt', content: trimmedInput },
                ...(output ? [{ type: 'output', content: output.join('\n') }] : [])
            ]);
        } else {
            setHistory(prev => [
                ...prev,
                { type: 'prompt', content: trimmedInput },
                { type: 'error', content: `zsh: command not found: ${cmd}` }
            ]);
        }

        setInput('');
    };

    return (
        <div
            className={`h-full font-mono text-sm flex flex-col overflow-hidden ${
                darkMode ? 'bg-[#1e1e1e] text-[#e8e8e8]' : 'bg-white text-gray-900'
            }`}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Terminal Content */}
            <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 space-y-1">
                {history.map((entry, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        {entry.type === 'prompt' && (
                            <div className="flex gap-2">
                                <span className={darkMode ? 'text-[#4ec9b0]' : 'text-green-600'}>
                                    aladin@portfolio
                                </span>
                                <span className={darkMode ? 'text-[#ce9178]' : 'text-orange-600'}>~</span>
                                <span className={darkMode ? 'text-[#dcdcaa]' : 'text-blue-600'}>$</span>
                                <span className={darkMode ? 'text-white' : 'text-gray-900'}>{entry.content}</span>
                            </div>
                        )}
                        {entry.type === 'output' && (
                            <div
                                className={`whitespace-pre-wrap pl-0 ${
                                    darkMode ? 'text-[#cccccc]' : 'text-gray-700'
                                }`}
                            >
                                {entry.content}
                            </div>
                        )}
                        {entry.type === 'error' && (
                            <div className={darkMode ? 'text-[#f48771]' : 'text-red-600'}>
                                {entry.content}
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Input Line */}
                <div className="flex gap-2">
                    <div className="flex gap-2 flex-shrink-0">
                        <span className={darkMode ? 'text-[#4ec9b0]' : 'text-green-600'}>
                            aladin@portfolio
                        </span>
                        <span className={darkMode ? 'text-[#ce9178]' : 'text-orange-600'}>~</span>
                        <span className={darkMode ? 'text-[#dcdcaa]' : 'text-blue-600'}>$</span>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`flex-1 bg-transparent outline-none ${
                            darkMode ? 'text-white caret-white' : 'text-gray-900 caret-gray-900'
                        }`}
                        autoFocus
                        spellCheck={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default Terminal;
