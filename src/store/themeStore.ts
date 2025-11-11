import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeColor =
    | 'blue'
    | 'purple'
    | 'green'
    | 'orange'
    | 'pink'
    | 'red'
    | 'cyan'
    | 'amber';

interface ThemeStore {
    darkMode: boolean;
    themeColor: ThemeColor;
    toggleDarkMode: () => void;
    setThemeColor: (color: ThemeColor) => void;
    applyTheme: () => void;
}

// Color theme configurations
export const themeColors: Record<ThemeColor, { name: string; light: string; dark: string; gradient: string }> = {
    blue: {
        name: 'Ocean Blue',
        light: '221 83% 53%', // hsl format for CSS variables
        dark: '217 91% 60%',
        gradient: 'from-blue-500 to-cyan-500'
    },
    purple: {
        name: 'Royal Purple',
        light: '262 83% 58%',
        dark: '263 70% 65%',
        gradient: 'from-purple-500 to-pink-500'
    },
    green: {
        name: 'Forest Green',
        light: '142 71% 45%',
        dark: '142 76% 56%',
        gradient: 'from-green-500 to-emerald-500'
    },
    orange: {
        name: 'Sunset Orange',
        light: '25 95% 53%',
        dark: '31 100% 60%',
        gradient: 'from-orange-500 to-red-500'
    },
    pink: {
        name: 'Cherry Blossom',
        light: '330 81% 60%',
        dark: '330 85% 70%',
        gradient: 'from-pink-500 to-rose-500'
    },
    red: {
        name: 'Ruby Red',
        light: '0 84% 60%',
        dark: '0 90% 67%',
        gradient: 'from-red-500 to-pink-600'
    },
    cyan: {
        name: 'Aqua Cyan',
        light: '189 94% 43%',
        dark: '189 94% 53%',
        gradient: 'from-cyan-500 to-blue-500'
    },
    amber: {
        name: 'Golden Amber',
        light: '38 92% 50%',
        dark: '38 100% 60%',
        gradient: 'from-amber-500 to-orange-500'
    }
};

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set, get) => ({
            darkMode: false,
            themeColor: 'blue',

            toggleDarkMode: () => {
                set((state) => ({ darkMode: !state.darkMode }));
                get().applyTheme();
            },

            setThemeColor: (color: ThemeColor) => {
                set({ themeColor: color });
                get().applyTheme();
            },

            applyTheme: () => {
                const { darkMode, themeColor } = get();
                const root = document.documentElement;

                // Toggle dark mode class
                if (darkMode) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }

                // Apply theme color as CSS variable
                const colorValue = darkMode
                    ? themeColors[themeColor].dark
                    : themeColors[themeColor].light;

                root.style.setProperty('--primary', colorValue);

                // Optional: Apply additional accent colors
                root.setAttribute('data-theme', themeColor);
            }
        }),
        {
            name: 'theme-storage',
            onRehydrateStorage: () => (state) => {
                // Apply theme immediately after hydration
                if (state) {
                    state.applyTheme();
                }
            }
        }
    )
);