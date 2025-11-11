import { create } from 'zustand';

interface ThemeStore {
    darkMode: boolean;
    toggleDarkMode: () => void;
    setDarkMode: (value: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    darkMode: false,
    toggleDarkMode: () =>
        set((state) => {
            const newDarkMode = !state.darkMode;
            document.documentElement.classList.toggle('dark', newDarkMode);
            return { darkMode: newDarkMode };
        }),
    setDarkMode: (value: boolean) =>
        set(() => {
            document.documentElement.classList.toggle('dark', value);
            return { darkMode: value };
        }),
}));