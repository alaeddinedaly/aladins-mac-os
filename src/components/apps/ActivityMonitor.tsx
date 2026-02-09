import { useState, useEffect } from 'react';
import { Activity, Cpu, HardDrive, MemoryStick, Search, XCircle } from 'lucide-react';

const processes = [
    { id: 101, name: 'React Renderer', cpu: 95.5, mem: '1.2 GB', user: 'root', status: 'Running' },
    { id: 102, name: 'TypeScript Compiler', cpu: 92.0, mem: '800 MB', user: 'root', status: 'Running' },
    { id: 103, name: 'Node.js Server', cpu: 88.2, mem: '600 MB', user: 'root', status: 'Sleeping' },
    { id: 104, name: 'TailwindCSS Engine', cpu: 85.0, mem: '300 MB', user: 'style', status: 'Running' },
    { id: 105, name: 'Docker Container', cpu: 75.4, mem: '2.5 GB', user: 'deploy', status: 'Sleeping' },
    { id: 106, name: 'PostgreSQL DB', cpu: 70.1, mem: '1.5 GB', user: 'data', status: 'Running' },
    { id: 107, name: 'Next.js Bundle', cpu: 65.8, mem: '900 MB', user: 'web', status: 'Sleeping' },
    { id: 108, name: 'Python Scripts', cpu: 60.2, mem: '400 MB', user: 'script', status: 'Sleeping' },
    { id: 109, name: 'Framer Motion', cpu: 55.0, mem: '200 MB', user: 'anim', status: 'Running' },
    { id: 110, name: 'Git Version Control', cpu: 45.0, mem: '150 MB', user: 'git', status: 'Sleeping' },
];

const ActivityMonitor = () => {
    const [activeTab, setActiveTab] = useState('CPU');
    const [filter, setFilter] = useState('');
    const [filteredProcesses, setFilteredProcesses] = useState(processes);

    useEffect(() => {
        setFilteredProcesses(
            processes.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
        );
    }, [filter]);

    return (
        <div className="flex flex-col h-full bg-[#ececec] dark:bg-[#2b2b2b] text-xs font-sans text-gray-700 dark:text-gray-300">
            {/* Toolbar */}
            <div className="h-14 bg-[#dfdfdf] dark:bg-[#3a3a3a] border-b border-gray-300 dark:border-neutral-700 flex items-center justify-between px-4">
                <div className="flex gap-2">
                    <div className={`flex flex-col items-center justify-center w-14 h-10 rounded ${activeTab === 'CPU' ? 'bg-black/10 dark:bg-white/10' : ''} cursor-pointer`} onClick={() => setActiveTab('CPU')}>
                        <Activity className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-medium">CPU</span>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-14 h-10 rounded ${activeTab === 'Memory' ? 'bg-black/10 dark:bg-white/10' : ''} cursor-pointer`} onClick={() => setActiveTab('Memory')}>
                        <MemoryStick className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-medium">Memory</span>
                    </div>
                    <div className={`flex flex-col items-center justify-center w-14 h-10 rounded ${activeTab === 'Disk' ? 'bg-black/10 dark:bg-white/10' : ''} cursor-pointer`} onClick={() => setActiveTab('Disk')}>
                        <HardDrive className="w-5 h-5 mb-0.5" />
                        <span className="text-[10px] font-medium">Disk</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-3 h-3 absolute left-2 top-1.5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-7 pr-2 py-1 rounded border border-gray-300 dark:border-neutral-600 bg-white dark:bg-[#1e1e1e] focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table Header */}
            <div className="flex bg-white dark:bg-[#1e1e1e] border-b border-gray-200 dark:border-neutral-700 py-1 px-4 font-semibold text-[11px] select-none">
                <div className="flex-1">Process Name</div>
                <div className="w-16 text-right">% CPU</div>
                <div className="w-20 text-right">Memory</div>
                <div className="w-16 text-right">User</div>
                <div className="w-20 text-left pl-4">Kind</div>
            </div>

            {/* Process List */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1e1e1e]">
                <div className="flex flex-col w-full">
                    {filteredProcesses.map((p, i) => (
                        <div key={p.id} className={`flex py-1 px-4 items-center hover:bg-blue-500 hover:text-white group ${i % 2 === 0 ? 'bg-white dark:bg-[#1e1e1e]' : 'bg-gray-50 dark:bg-[#252526]'}`}>
                            <div className="flex-1 font-medium">{p.name}</div>
                            <div className="w-16 text-right font-mono">{p.cpu}</div>
                            <div className="w-20 text-right font-mono">{p.mem}</div>
                            <div className="w-16 text-right text-gray-500 group-hover:text-blue-100">{p.user}</div>
                            <div className="w-20 pl-4">{p.cpu > 70 ? 'Intel' : 'Apple'}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Graph Area (Static Visual) */}
            <div className="h-32 bg-black flex gap-px p-px">
                {/* Simulated Graph Bars */}
                {Array.from({ length: 100 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-[#1e1e1e] flex items-end relative overflow-hidden"
                    >
                        <div
                            className="w-full bg-green-500/80"
                            style={{ height: `${Math.random() * 80 + 10}%` }}
                        />
                    </div>
                ))}
                <div className="absolute bottom-2 left-4 text-white font-mono text-xs drop-shadow-md">
                    System: 12%  User: 25%  Idle: 63%
                </div>
            </div>
        </div>
    );
};

export default ActivityMonitor;
