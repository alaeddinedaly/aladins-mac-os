import { useState } from 'react';
import { Files, Search, GitGraph, Bug, Box, Settings, ChevronRight, ChevronDown, X, Menu } from 'lucide-react';

const files = {
    'AboutMe.tsx': `import React from 'react';

export const AboutMe = () => {
  return (
    <div className="about-me">
      <h1>Hello, I'm Aladin! 👋</h1>
      <p>
        Full-stack developer with a passion for 
        building beautiful, functional applications.
      </p>
    </div>
  );
};`,
    'Skills.ts': `export const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'Python',
  'Docker',
  'AWS'
];`,
    'Contact.tsx': `export const Contact = () => {
  const email = "dalyalaeddine@gmail.com";
  
  return (
    <a href={\`mailto:\${email}\`}>
      Get in touch!
    </a>
  );
};`
};

const SyntaxHighlight = ({ code }: { code: string }) => {
    // Very basic syntax highlighting
    const lines = code.split('\n');
    return (
        <div className="font-mono text-sm leading-6">
            {lines.map((line, i) => {
                let content = line;

                // This is a naive implementation, just for show
                // Real syntax highlighting requires a parser

                return (
                    <div key={i} className="table-row">
                        <span className="table-cell text-right pr-4 text-gray-500 select-none w-8">{i + 1}</span>
                        <span className="table-cell whitespace-pre">
                            {line.split(/(\s+|[(){}[\]<>=;])/).map((token, j) => {
                                let color = 'text-gray-300';
                                if (['import', 'from', 'export', 'const', 'return'].includes(token)) color = 'text-pink-400';
                                else if (['React', 'useState', 'useEffect'].includes(token)) color = 'text-yellow-300';
                                else if (token.startsWith("'") || token.startsWith('"') || token.startsWith("`")) color = 'text-green-400';
                                else if (token.match(/<[^>]+>/)) color = 'text-blue-400';
                                else if (token.match(/\/\/.*/)) color = 'text-gray-500';
                                else if (['div', 'h1', 'p', 'a', 'span'].includes(token)) color = 'text-blue-300';

                                return <span key={j} className={color}>{token}</span>;
                            })}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

const VSCode = () => {
    const [activeFile, setActiveFile] = useState<keyof typeof files>('AboutMe.tsx');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-full bg-[#1e1e1e] text-gray-300 font-sans overflow-hidden">
            {/* Activity Bar */}
            <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-[#1e1e1e]">
                <Files className="w-6 h-6 text-white cursor-pointer opacity-100" />
                <Search className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                <GitGraph className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                <Bug className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                <Box className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                <div className="flex-1" />
                <Settings className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="w-60 bg-[#252526] flex flex-col border-r border-[#1e1e1e]">
                    <div className="h-8 flex items-center px-4 text-xs font-medium tracking-wide uppercase text-gray-400">Explorer</div>
                    <div className="flex-1 overflow-y-auto">
                        <div className="px-2 py-1 flex items-center gap-1 cursor-pointer text-gray-300 font-bold text-xs hover:bg-[#2a2d2e]">
                            <ChevronDown className="w-3 h-3" />
                            <span>PORTFOLIO</span>
                        </div>
                        <div className="pl-4">
                            <div className="px-2 py-1 flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e] text-xs">
                                <ChevronDown className="w-3 h-3" />
                                <span className="text-blue-400">src</span>
                            </div>
                            <div className="pl-4">
                                <div className="px-2 py-1 flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e] text-xs">
                                    <ChevronRight className="w-3 h-3" />
                                    <span className="text-yellow-400">components</span>
                                </div>
                                {Object.keys(files).map(file => (
                                    <div
                                        key={file}
                                        onClick={() => setActiveFile(file as keyof typeof files)}
                                        className={`px-2 py-1 flex items-center gap-2 cursor-pointer text-xs pl-6 ${activeFile === file ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e] text-gray-300'}`}
                                    >
                                        <span className="text-[#61dafb] text-[10px]">TSX</span>
                                        <span>{file}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Editor Area */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {/* Tabs */}
                <div className="h-9 flex bg-[#252526] overflow-x-auto no-scrollbar">
                    {Object.keys(files).map((file) => (
                        <div
                            key={file}
                            onClick={() => setActiveFile(file as keyof typeof files)}
                            className={`px-3 min-w-[120px] flex items-center justify-between gap-2 text-xs border-r border-[#1e1e1e] cursor-pointer ${activeFile === file ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] text-gray-400'}`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-[#61dafb]">TSX</span>
                                <span>{file}</span>
                            </div>
                            <X className={`w-3 h-3 hover:bg-gray-700 rounded-sm p-0.5 ${activeFile === file ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                        </div>
                    ))}
                </div>

                {/* Breadcrumbs */}
                <div className="h-6 flex items-center px-4 bg-[#1e1e1e] text-xs text-gray-500 gap-1 border-b border-[#2b2b2b]">
                    <span>src</span>
                    <ChevronRight className="w-3 h-3" />
                    <span>components</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-white">{activeFile}</span>
                </div>

                {/* Code Area */}
                <div className="flex-1 overflow-auto p-2">
                    <SyntaxHighlight code={files[activeFile]} />
                </div>

                {/* Status Bar */}
                <div className="h-6 bg-[#007acc] text-white text-[10px] flex items-center px-3 justify-between select-none">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1"><GitGraph className="w-3 h-3" /> main*</div>
                        <div className="flex items-center gap-1"><X className="w-3 h-3" /> 0</div>
                        <div className="flex items-center gap-1"><Bug className="w-3 h-3" /> 0</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div>Ln 12, Col 34</div>
                        <div>UTF-8</div>
                        <div>TypeScript React</div>
                        <div>Prettier</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VSCode;
