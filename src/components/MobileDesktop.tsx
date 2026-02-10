import { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Battery, Wifi, Signal } from 'lucide-react';
import { defaultApps } from '@/store/windowStore';
import { dockApps } from '@/components/Dock';
import MobileWindow from './MobileWindow';
import { useThemeStore } from '@/store/themeStore';

// Lazy load apps (reusing from Desktop.tsx)
const Finder = lazy(() => import('./apps/Finder'));
const AboutMe = lazy(() => import('./apps/AboutMe'));
const TechStack = lazy(() => import('./apps/TechStack'));
const Resume = lazy(() => import('./apps/Resume'));
const Safari = lazy(() => import('./apps/Safari'));
const Calculator = lazy(() => import('./apps/Calculator'));
const Notes = lazy(() => import('./apps/Notes'));
const Calendar = lazy(() => import('./apps/Calendar'));
const Photos = lazy(() => import('./apps/Photos'));
const Music = lazy(() => import('./apps/Music'));
const Settings = lazy(() => import('./apps/Settings'));
const Trash = lazy(() => import('./apps/Trash'));
const Mail = lazy(() => import('./apps/Mail'));
const ActivityMonitor = lazy(() => import('./apps/ActivityMonitor'));
const Terminal = lazy(() => import('@/components/apps/Terminal'));
const WallpaperSettings = lazy(() => import('./apps/WallpaperSettings'));
const Snake = lazy(() => import('./apps/Snake'));

const MobileDesktop = () => {
    const [openAppId, setOpenAppId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [wallpaper, setWallpaper] = useState('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80');

    // Apps to display in the grid (Using dockApps for icons/images)
    // Filter out undesired apps just in case dockApps includes them
    const excludedApps = ['activity', 'resume-video', 'motivation-letter'];

    // We use dockApps as the source of truth for the mobile view apps
    const allMobileApps = dockApps.filter(app => !excludedApps.includes(app.id));

    // Apps fixed in the bottom dock - picking same as iOS defaults or similar
    const bottomDockIds = ['safari', 'mail', 'terminal', 'about'];
    const bottomDockApps = allMobileApps.filter(app => bottomDockIds.includes(app.id));

    // Apps for the main grid (excluding those in bottom dock if we want unique, but iOS puts them in library)
    // Let's put ALL apps in the grid EXCEPT the bottom dock ones to avoid duplication on screen
    const gridApps = allMobileApps.filter(app => !bottomDockIds.includes(app.id));

    // Pagination logic
    const APPS_PER_PAGE = 24; // 4 columns x 6 rows
    const pages = [];
    for (let i = 0; i < gridApps.length; i += APPS_PER_PAGE) {
        pages.push(gridApps.slice(i, i + APPS_PER_PAGE));
    }

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: false
        });
    };

    const handleAppClick = (appId: string) => {
        if (appId === 'github' || appId === 'Github') {
            window.open('https://github.com/alaeddinedaly', '_blank');
            return;
        }
        if (appId === 'linkedin' || appId === 'Linkedin') {
            window.open('https://linkedin.com/in/daly-ala-eddine', '_blank');
            return;
        }
        setOpenAppId(appId);
    };

    const renderAppContent = (component: string) => {
        // This switch matches existing component mapping
        switch (component) {
            case 'Finder': return <Finder />;
            case 'AboutMe': return <AboutMe />;
            case 'TechStack': return <TechStack />;
            case 'Resume': return <Resume />;
            case 'Safari': return <Safari />;
            case 'Calculator': return <Calculator />;
            case 'Notes': return <Notes />;
            case 'Calendar': return <Calendar />;
            case 'Photos': return <Photos />;
            case 'Music': return <Music />;
            case 'Settings': return <Settings />;
            case 'Mail': return <Mail />;
            case 'ActivityMonitor': return <ActivityMonitor />;
            case 'Trash': return <Trash />;
            case 'Terminal': return <Terminal />;
            case 'WallpaperSettings': return <WallpaperSettings currentWallpaper={wallpaper} onWallpaperChange={setWallpaper} />;
            case 'Snake': return <Snake />;
            default: return <div className="p-4">App not found</div>;
        }
    };

    // Find the app definition to get the component string. 
    // We look in standard defaultApps or dockApps. 
    // dockApps has component strings, so we can use that.
    const activeApp = allMobileApps.find(app => app.id === openAppId);

    const renderAppIcon = (app: any) => {
        if (typeof app.icon === 'string') {
            // Check if it's an image path (contains dot or forward slash)
            if (app.icon.includes('.') || app.icon.includes('/')) {
                return (
                    <img
                        src={app.icon}
                        alt={app.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                    />
                );
            }
            // Unicode/Emoji case
            return <span>{app.icon}</span>;
        }
        // React node case (e.g. Lucid icon)
        return <div className="text-2xl">{app.icon}</div>;
    };

    return (
        <div
            className="w-full h-screen overflow-hidden relative bg-black text-white"
            style={{
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-12 px-6 flex items-center justify-between z-10 text-sm font-medium">
                <div className="flex-1">{formatTime(currentTime)}</div>
                <div className="flex items-center gap-2">
                    <Signal size={16} />
                    <Wifi size={16} />
                    <Battery size={16} />
                </div>
            </div>

            {/* App Grid */}
            <div className="absolute inset-0 top-16 bottom-28 overflow-hidden">
                <motion.div
                    className="h-full flex"
                    animate={{ x: `-${currentPage * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    drag="x"
                    dragConstraints={{ left: -((pages.length - 1) * window.innerWidth), right: 0 }}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = offset.x; // negative is left swipe (next page)
                        if (swipe < -50 && currentPage < pages.length - 1) {
                            setCurrentPage(currentPage + 1);
                        } else if (swipe > 50 && currentPage > 0) {
                            setCurrentPage(currentPage - 1);
                        }
                    }}
                >
                    {pages.map((page, pageIndex) => (
                        <div
                            key={pageIndex}
                            className="min-w-full h-full px-6 py-2 grid grid-cols-4 grid-rows-6 gap-x-4 gap-y-2 content-start"
                        >
                            {page.map(app => (
                                <div
                                    key={app.id}
                                    className="flex flex-col items-center gap-1 mb-2"
                                    onClick={() => handleAppClick(app.id)}
                                >
                                    <div className="w-[60px] h-[60px] rounded-[14px] bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg relative overflow-hidden group active:scale-95 transition-transform">
                                        {renderAppIcon(app)}

                                        {/* Gradient Overlay for touch feedback */}
                                        <div className="absolute inset-0 bg-black/10 opacity-0 active:opacity-100 transition-opacity pointer-events-none" />
                                    </div>
                                    <span className="text-[11px] font-medium text-white drop-shadow-md text-center line-clamp-1 w-full px-1">{app.title}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Page Indicators */}
            <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 p-2 z-10">
                {pages.map((_, i) => (
                    <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentPage ? 'bg-white' : 'bg-white/40'}`}
                    />
                ))}
            </div>

            {/* Dock */}
            <div className="absolute bottom-2 left-2 right-2 h-[85px] bg-white/20 backdrop-blur-2xl rounded-[35px] flex items-center justify-around px-2 z-20">
                {bottomDockApps.map(app => (
                    <div
                        key={app.id}
                        className="flex flex-col items-center justify-center w-full h-full"
                        onClick={() => handleAppClick(app.id)}
                    >
                        <div className="w-[60px] h-[60px] rounded-[14px] backdrop-blur-md flex items-center justify-center shadow-lg overflow-hidden active:scale-95 transition-transform">
                            {renderAppIcon(app)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Window Overlay */}
            <MobileWindow
                isOpen={!!openAppId}
                onClose={() => setOpenAppId(null)}
                appId={activeApp?.id}
            >
                {activeApp && (
                    <Suspense fallback={<div className="flex h-full items-center justify-center text-white">Loading...</div>}>
                        {/* We need to wrap some apps that expect specific props or context if any */}
                        {renderAppContent(activeApp.component)}
                    </Suspense>
                )}
            </MobileWindow>
        </div>
    );
};

export default MobileDesktop;
