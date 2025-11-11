import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/themeStore';

const Terminal = () => {
    const darkMode = useThemeStore((state) => state.darkMode);
    const [history, setHistory] = useState([
        { type: 'output', content: 'Last login: ' + new Date().toLocaleString() + ' on ttys000' },
        { type: 'output', content: "Welcome to Aladin's Portfolio Terminal" },
        { type: 'output', content: 'Type "help" to see available commands\n' },
    ]);
    const [input, setInput] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const commands = {
        help: { execute: () => ['Available commands:', 'help', 'about', 'skills', 'projects', 'contact', 'experience', 'education', 'clear', 'whoami', 'date', 'echo [text]', 'ls', ''] },
        about: { execute: () => ['👨‍💻 Aladin – Full-Stack Developer based in Tunisia 🇹🇳', 'Building AI-driven web & mobile apps.'] },
        clear: { execute: () => null },
        whoami: { execute: () => ['aladin'] },
        date: { execute: () => [new Date().toString()] },
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
