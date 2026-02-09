import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Pause } from 'lucide-react';
import { useThemeStore, themeColors } from '@/store/themeStore';

// Types
type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type GameStatus = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAME_OVER';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;

const Snake = () => {
    // Theme
    const { themeColor, darkMode } = useThemeStore();
    const activeColor = `hsl(${darkMode ? themeColors[themeColor].dark : themeColors[themeColor].light})`;

    // Game State
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
    const [food, setFood] = useState<Position>({ x: 15, y: 10 });
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [status, setStatus] = useState<GameStatus>('IDLE');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('snake-highscore');
        return saved ? parseInt(saved) : 0;
    });

    // Refs for mutable state in game loop
    const directionRef = useRef<Direction>('RIGHT');
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
    const speedRef = useRef(INITIAL_SPEED);

    // Initialize/Reset Game
    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(generateFood([{ x: 10, y: 10 }]));
        setDirection('RIGHT');
        directionRef.current = 'RIGHT';
        setScore(0);
        setStatus('IDLE');
        speedRef.current = INITIAL_SPEED;
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };

    const startGame = () => {
        setStatus('PLAYING');
        speedRef.current = INITIAL_SPEED;
    };

    const pauseGame = () => {
        setStatus(prev => prev === 'PLAYING' ? 'PAUSED' : 'PLAYING');
    };

    // Game Logic
    const generateFood = (currentSnake: Position[]): Position => {
        let newFood: Position;
        let isOnSnake;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
            isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        } while (isOnSnake);
        return newFood;
    };

    const moveSnake = useCallback(() => {
        if (status !== 'PLAYING') return;

        setSnake(prevSnake => {
            const head = prevSnake[0];
            const newHead = { ...head };

            switch (directionRef.current) {
                case 'UP': newHead.y -= 1; break;
                case 'DOWN': newHead.y += 1; break;
                case 'LEFT': newHead.x -= 1; break;
                case 'RIGHT': newHead.x += 1; break;
            }

            // Check collisions
            if (
                newHead.x < 0 || newHead.x >= GRID_SIZE ||
                newHead.y < 0 || newHead.y >= GRID_SIZE ||
                prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
            ) {
                setStatus('GAME_OVER');
                if (score > highScore) {
                    setHighScore(score);
                    localStorage.setItem('snake-highscore', score.toString());
                }
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Check food
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 10);
                setFood(generateFood(newSnake));
                // Increase speed slightly
                speedRef.current = Math.max(50, speedRef.current - SPEED_INCREMENT);
                // Restart loop with new speed
                if (gameLoopRef.current) clearInterval(gameLoopRef.current);
                gameLoopRef.current = setInterval(moveSnake, speedRef.current);
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [status, food, score, highScore]);

    // Keyboard Controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (status === 'IDLE' && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                startGame();
            }

            // Prevent scrolling with arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                e.preventDefault();
            }

            if (e.key === ' ' && (status === 'PLAYING' || status === 'PAUSED')) {
                pauseGame();
                return;
            }

            const current = directionRef.current;
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (current !== 'DOWN') directionRef.current = 'UP';
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (current !== 'UP') directionRef.current = 'DOWN';
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (current !== 'RIGHT') directionRef.current = 'LEFT';
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (current !== 'LEFT') directionRef.current = 'RIGHT';
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status]);

    // Game Loop
    useEffect(() => {
        if (status === 'PLAYING') {
            gameLoopRef.current = setInterval(moveSnake, speedRef.current);
        } else {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [status, moveSnake]);


    return (
        <div className="h-full flex flex-col bg-gray-900 text-white font-mono p-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 bg-gray-800 p-3 rounded-xl border border-gray-700 shadow-lg">
                <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-400 w-5 h-5" />
                    <span className="text-gray-400 text-xs uppercase tracking-wider">High Score</span>
                    <span className="text-xl font-bold font-mono">{highScore}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-gray-400 text-xs uppercase tracking-wider">Score</span>
                    <span className="text-2xl font-bold font-mono text-white">{score}</span>
                </div>
            </div>

            {/* Game Board */}
            <div className="flex-1 flex items-center justify-center relative bg-black/40 rounded-xl overflow-hidden border border-gray-800 shadow-2xl backdrop-blur-sm">
                <div
                    className="relative bg-gray-900/80 rounded-lg shadow-inner border border-gray-800"
                    style={{
                        width: 'min(100%, 400px)',
                        aspectRatio: '1/1',
                        display: 'grid',
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                    }}
                >
                    {/* Grid Background (Optional subtle lines) */}
                    <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)] pointer-events-none opacity-10">
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-gray-500" />
                        ))}
                    </div>

                    {/* Food */}
                    <motion.div
                        className="absolute rounded-full shadow-[0_0_10px_rgba(239,68,68,0.6)]"
                        style={{
                            left: `${(food.x / GRID_SIZE) * 100}%`,
                            top: `${(food.y / GRID_SIZE) * 100}%`,
                            width: `${100 / GRID_SIZE}%`,
                            height: `${100 / GRID_SIZE}%`,
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div className="w-full h-full bg-red-500 rounded-full animate-bounce" />
                    </motion.div>


                    {/* Snake */}
                    <AnimatePresence>
                        {snake.map((segment, i) => (
                            <motion.div
                                key={`${segment.x}-${segment.y}-${i}`}
                                className="absolute rounded-sm"
                                style={{
                                    left: `${(segment.x / GRID_SIZE) * 100}%`,
                                    top: `${(segment.y / GRID_SIZE) * 100}%`,
                                    width: `${100 / GRID_SIZE}%`,
                                    height: `${100 / GRID_SIZE}%`,
                                    backgroundColor: i === 0 ? activeColor : '#9ca3af', // Head is theme color, body is gray
                                    zIndex: 10,
                                    borderRadius: i === 0 ? '4px' : '2px',
                                    boxShadow: i === 0 ? `0 0 10px ${activeColor}` : 'none'
                                }}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.1 }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Overlays */}
                    {status === 'IDLE' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={startGame}
                                className={`flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all`}
                            >
                                <Play size={24} fill="currentColor" />
                                Start Game
                            </motion.button>
                            <p className="mt-4 text-gray-400 text-sm">Use Arrow Keys or WASD to move</p>
                        </div>
                    )}

                    {status === 'PAUSED' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={startGame} // Resumes game
                                className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold backdrop-blur-md border border-white/10"
                            >
                                <Play size={20} fill="currentColor" />
                                Resume
                            </motion.button>
                        </div>
                    )}

                    {status === 'GAME_OVER' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/40 backdrop-blur-md z-20">
                            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Game Over!</h2>
                            <p className="text-gray-200 mb-6 text-lg">Score: {score}</p>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                onClick={resetGame}
                                className="p-4 rounded-full bg-white text-black shadow-lg hover:bg-gray-100"
                            >
                                <RotateCcw size={28} />
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>

            {/* Controls (Mobile Friendly / Visual) */}
            <div className="mt-4 grid grid-cols-3 gap-2 max-w-[200px] mx-auto md:hidden">
                <div />
                <button className="p-4 bg-gray-800 rounded-lg active:bg-gray-700" onClick={() => { if (directionRef.current !== 'DOWN') directionRef.current = 'UP'; }}>⬆️</button>
                <div />
                <button className="p-4 bg-gray-800 rounded-lg active:bg-gray-700" onClick={() => { if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT'; }}>⬅️</button>
                <button className="p-4 bg-gray-800 rounded-lg active:bg-gray-700" onClick={() => { if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT'; }}>⬇️</button>
                <button className="p-4 bg-gray-800 rounded-lg active:bg-gray-700" onClick={() => { if (directionRef.current !== 'UP') directionRef.current = 'DOWN'; }}>➡️</button>
            </div>

            <div className="mt-2 text-center text-xs text-gray-500 hidden md:block">
                Press SPACE to Pause/Resume
            </div>
        </div>
    );
};

export default Snake;
