import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface MobileWindowProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
    appId?: string;
}

const MobileWindow = ({ children, isOpen, onClose, appId }: MobileWindowProps) => {
    // Apps that should take full width/height without default padding
    const fullWidthApps = [
        'safari', 'mail', 'photos', 'calendar', 'settings',
        'finder', 'terminal', 'snake', 'calculator'
    ];

    const isFullWidth = appId ? fullWidthApps.includes(appId) : false;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-[100] bg-background flex flex-col"
                    style={{ willChange: 'transform' }}
                >
                    <div className="flex-1 overflow-hidden relative">
                        {/* Apps that handle their own layout (full width) */}
                        {isFullWidth ? (
                            <div className="h-full w-full">
                                {children}
                            </div>
                        ) : (
                            /* Content apps that need a container and padding */
                            <div className="h-full w-full overflow-y-auto p-6 pb-24">
                                {children}
                            </div>
                        )}
                    </div>

                    {/* Home Indicator Area - Swipe up or click to close */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-6 z-[101] flex items-end justify-center pb-2 cursor-pointer"
                        onClick={onClose}
                    // Simple swipe handling could be added here
                    >
                        <div className="w-32 h-1.5 bg-foreground/20 rounded-full" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileWindow;
