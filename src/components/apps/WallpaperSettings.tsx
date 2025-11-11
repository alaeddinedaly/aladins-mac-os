import { motion } from 'framer-motion';
import { useState } from 'react';
import { Upload, Check } from 'lucide-react';

// Predefined wallpaper options
const WALLPAPER_OPTIONS = [
    {
        id: 'sonoma',
        name: 'Sonoma',
        url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80'
    },
    {
        id: 'mountain',
        name: 'Mountain',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80'
    },
    {
        id: 'ocean',
        name: 'Ocean',
        url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400&q=80'
    },
    {
        id: 'forest',
        name: 'Forest',
        url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&q=80'
    },
    {
        id: 'desert',
        name: 'Desert',
        url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80'
    },
    {
        id: 'city',
        name: 'City Night',
        url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&q=80'
    },
    {
        id: 'space',
        name: 'Space',
        url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80'
    },
    {
        id: 'abstract',
        name: 'Abstract',
        url: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=1920&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=400&q=80'
    }
];

interface WallpaperSettingsProps {
    currentWallpaper: string;
    onWallpaperChange: (url: string) => void;
}

const WallpaperSettings = ({ currentWallpaper, onWallpaperChange }: WallpaperSettingsProps) => {
    const [selectedWallpaper, setSelectedWallpaper] = useState(currentWallpaper);
    const [customImage, setCustomImage] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleWallpaperSelect = (url: string) => {
        setSelectedWallpaper(url);
        onWallpaperChange(url);
        setCustomImage(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setUploadError('Please upload a valid image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Image must be less than 5MB');
            return;
        }

        setUploadError(null);
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            setCustomImage(imageUrl);
            setSelectedWallpaper(imageUrl);
            onWallpaperChange(imageUrl);
        };
        reader.readAsDataURL(file);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col"
        >
            {/* Header */}
            <div className="pb-4 border-b border-border/20">
                <h2 className="text-2xl font-semibold mb-2">Desktop Background</h2>
                <p className="text-sm text-muted-foreground">
                    Choose a wallpaper or upload your own image
                </p>
            </div>

            {/* Upload Section */}
            <div className="mt-6 mb-4">
                <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-border/40 rounded-xl hover:border-blue-500 hover:bg-blue-500/5 transition-all cursor-pointer group"
                >
                    <Upload className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-blue-500 transition-colors">
            Upload Custom Image
          </span>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </label>
                {uploadError && (
                    <p className="mt-2 text-sm text-red-500">{uploadError}</p>
                )}
            </div>

            {/* Custom Image Preview */}
            {customImage && (
                <div className="mb-6">
                    <h3 className="text-sm font-medium mb-3">Custom Image</h3>
                    <div
                        className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                            selectedWallpaper === customImage
                                ? 'border-blue-500 ring-2 ring-blue-500/30'
                                : 'border-transparent hover:border-blue-300'
                        }`}
                        onClick={() => handleWallpaperSelect(customImage)}
                    >
                        <img
                            src={customImage}
                            alt="Custom wallpaper"
                            className="w-full h-32 object-cover"
                        />
                        {selectedWallpaper === customImage && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                                <Check size={16} />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Wallpaper Grid */}
            <div className="flex-1 overflow-y-auto">
                <h3 className="text-sm font-medium mb-3">Built-in Wallpapers</h3>
                <div className="grid grid-cols-2 gap-4 pb-4">
                    {WALLPAPER_OPTIONS.map((wallpaper) => (
                        <div
                            key={wallpaper.id}
                            className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                selectedWallpaper === wallpaper.url
                                    ? 'border-blue-500 ring-2 ring-blue-500/30'
                                    : 'border-transparent hover:border-blue-300'
                            }`}
                            onClick={() => handleWallpaperSelect(wallpaper.url)}
                        >
                            <img
                                src={wallpaper.thumbnail}
                                alt={wallpaper.name}
                                className="w-full h-32 object-cover"
                                loading="lazy"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                <p className="text-white text-sm font-medium">
                                    {wallpaper.name}
                                </p>
                            </div>
                            {selectedWallpaper === wallpaper.url && (
                                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                                    <Check size={16} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default WallpaperSettings;