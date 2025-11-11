import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

const Terminal = () => {
    const darkMode = useThemeStore((state) => state.darkMode);
    const [history, setHistory] = useState([
        { type: 'output', content: 'Last login: ' + new Date().toLocaleString() + ' on ttys000' },
        { type: 'output', content: "Welcome to my Portfolio Terminal" },
        { type: 'output', content: 'Type "help" to see available commands\n' },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const commands = {
        help: {
            execute: () => [
                'Available commands:',
                'help',
                'about',
                'skills',
                'projects',
                'contact',
                'experience',
                'education',
                'clear',
                'whoami',
                'date',
                'echo [text]',
                'ls'
            ]
        },
        about: {
            execute: () => [
                '👨‍💻 Alaa Eddine Daly – Full-Stack Developer based in Sousse, Tunisia 🇹🇳',
                'Specialized in Spring Boot, React Native, and cloud technologies.',
                'Seeking opportunities to build impactful digital products.'
            ]
        },
        skills: {
            execute: () => [
                'Languages & Frameworks: Java, Kotlin, JavaScript/TypeScript, Python, SQL',
                'Spring Boot, Angular, Spring Security, React, React Native, Expo, Clerk Auth, Postman',
                'Databases & Tools: MySQL, PostgreSQL, Git/GitHub, Maven/Gradle, JWT, RESTful APIs, JDBC',
                'Concepts: RBAC, Microservices, Artificial Intelligence, OOP, Web/Mobile Development, Database Design'
            ]
        },
        projects: {
            execute: () => [
                            'LynkAi – Web application with JWT auth featuring RAG model for intelligent document Q&A and AI-powered summaries (Angular, Spring Boot, RAG, JWT, AI/ML)',
                            'AI Storyboard Generator – AI-powered storyboard generator using custom VGG-inspired CNN with SDXL diffusion pipeline for 1024×1024 images (Python, AI/ML, Computer Vision, CNN, SDXL)',
                            'Nexus Down – Robust download manager with infinite retry and concurrent parallel downloads (Python, Automation, File Management)',
                            'Secure File Service – Secure cloud storage service with JWT auth and encrypted file storage (Kotlin, Security, File Management, JWT)',
                            'Finora – Financial management mobile app with expense tracking, budgeting tools, and AI-driven insights (React Native, Expo, PostgreSQL)',
                            'OCR Application – Intelligent document scanner using Tesseract OCR enhanced with Gemini API for advanced text understanding (HTML, JavaScript, OCR, Computer Vision, Gemini AI)',
                            'Portfolio Website – Modern, responsive portfolio with smooth animations and dark theme (Next.js, React, Tailwind CSS, Framer Motion)',
                            'FlameBot – Conversational AI chatbot powered by Google\'s Gemini API for natural conversation (JavaScript, Gemini AI, Chatbot, NLP)',
                            'Restaurant Management – Desktop app for restaurant management with inventory, orders, and reporting (Java, Swing, SQL, JDBC)',
                            '2D Shooter Game – Action-packed 2D shooting game with multiple levels and engaging mechanics (Unity, C#, Game Development)',
                            'Zipit – GUI app for compressing and extracting ZIP archives, lightweight and efficient (Python, Tkinter, Zipfile)'
                        ]
                    },
        contact: {
            execute: () => [
                'Email: dalyalaeddine@gmail.com',
                'Phone: (+216) 58 247 509',
                'Portfolio: aladin-daly-dev.vercel.app'
            ]
        },
        experience: {
            execute: () => [
                'Smoft ERP – Internship (June 2025 – July 2025)',
                '- Developed a full-stack e-commerce platform (packajungle.com) using HTML, CSS, JavaScript, PHP.',
                '- Built custom OCR with TesseractOCR & GEMINI to automate formula processing, reducing manual entry by 30%.',
                '- Debugged and resolved 15+ production issues, improving system stability.',
                'Freelancer – Custom Development (2025 – Present)',
                '- Built web & mobile apps integrating AI features: chatbots, automation, recommendation systems.',
                '- Produced professional video edits using Adobe After Effects & Premiere Pro.'
            ]
        },
        education: {
            execute: () => [
                'ISITCOM | Higher Institute of Computer Science and Communication Technologies, Hammam Sousse',
                'Bachelor’s Degree in Computer Science (2023 – Present)'
            ]
        },
        clear: {
            execute: () => null
        },
        whoami: {
            execute: () => ['Alaa Eddine Daly']
        },
        date: {
            execute: () => [new Date().toString()]
        },
        echo: {
            execute: (args: string[]) => [args.join(' ')]
        },
        ls: {
            execute: () => ['Resume.pdf', 'Portfolio/', 'Projects/']
        }
    };


    useEffect(() => {
        if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }, [history]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeCommand();
        }
    };

    const executeCommand = () => {
        if (!input.trim()) {
            setHistory((prev) => [...prev, { type: 'prompt', content: input }]);
            setInput('');
            return;
        }

        const trimmedInput = input.trim();
        const [cmd, ...args] = trimmedInput.split(' ');
        const command = commands[cmd.toLowerCase()];

        if (cmd === 'clear') {
            setHistory([]);
            setInput('');
            return;
        }

        if (cmd === 'echo') {
            setHistory((prev) => [
                ...prev,
                { type: 'prompt', content: trimmedInput },
                { type: 'output', content: args.join(' ') },
            ]);
            setInput('');
            return;
        }

        if (command) {
            const output = command.execute(args);
            setHistory((prev) => [
                ...prev,
                { type: 'prompt', content: trimmedInput },
                ...(output ? [{ type: 'output', content: output.join('\n') }] : []),
            ]);
        } else {
            setHistory((prev) => [
                ...prev,
                { type: 'prompt', content: trimmedInput },
                { type: 'error', content: `zsh: command not found: ${cmd}` },
            ]);
        }
        setInput('');
    };

    return (
        <div
            className={`rounded-xl overflow-hidden shadow-2xl border ${
                darkMode ? 'border-neutral-700' : 'border-gray-200'
            } w-full h-full max-h-[600px] flex flex-col`}
            onClick={() => inputRef.current?.focus()}
        >
            {/* macOS Title Bar */}
            <div
                className={`flex items-center px-3 py-2 gap-2 ${
                    darkMode ? 'bg-[#2b2b2b]' : 'bg-gray-100'
                }`}
            >
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span
                    className={`text-xs font-medium mx-auto ${
                        darkMode ? 'text-neutral-400' : 'text-gray-500'
                    }`}
                >
          aladin — bash — 80x24
        </span>
            </div>

            {/* Terminal Content */}
            <div
                ref={terminalRef}
                className={`flex-1 p-4 overflow-y-auto font-mono text-sm backdrop-blur-xl transition-colors duration-300 ${
                    darkMode
                        ? 'bg-black/80 text-gray-100'
                        : 'bg-white/80 text-gray-900'
                }`}
            >
                {history.map((entry, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        {entry.type === 'prompt' && (
                            <div className="flex gap-2">
                <span className={darkMode ? 'text-green-400' : 'text-green-700'}>
                  aladin@macOS
                </span>
                                <span className={darkMode ? 'text-blue-400' : 'text-blue-700'}>
                  ~
                </span>
                                <span className={darkMode ? 'text-yellow-400' : 'text-yellow-700'}>
                  $
                </span>
                                <span className="pl-2">{entry.content}</span>
                            </div>
                        )}
                        {entry.type === 'output' && (
                            <pre
                                className={`whitespace-pre-wrap ${
                                    darkMode ? 'text-gray-100' : 'text-gray-800'
                                }`}
                            >
                {entry.content}
              </pre>
                        )}
                        {entry.type === 'error' && (
                            <div className="text-red-500">{entry.content}</div>
                        )}
                    </motion.div>
                ))}

                {/* Input */}
                <div className="flex gap-2">
          <span className={darkMode ? 'text-green-400' : 'text-green-700'}>
            aladin@macOS
          </span>
                    <span className={darkMode ? 'text-blue-400' : 'text-blue-700'}>
            ~
          </span>
                    <span className={darkMode ? 'text-yellow-400' : 'text-yellow-700'}>
            $
          </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`flex-1 bg-transparent outline-none ${
                            darkMode ? 'text-white caret-white' : 'text-black caret-black'
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
