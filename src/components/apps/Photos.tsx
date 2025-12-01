import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

interface Photo {
  id: string;
  title: string;
  project: string;
  image: string;
}

const Photos = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos: Photo[] = [
    {
      id: '1',
      title: 'LynkAi Dashboard',
      project: 'LynkAi',
      image: 'lynkai.png' // Dashboard/analytics
    },
    {
      id: '2',
      title: 'Storyboard Generator',
      project: 'AI Project',
      image: 'storyboard.png' // AI/tech
    },
    {
      id: '3',
      title: 'Finora App',
      project: 'Mobile',
      image: 'finora.png' // Mobile/finance
    },
    {
      id: '4',
      title: 'Portfolio Site',
      project: 'Web',
      image: 'portfolio.png' // Web design
    },
    {
      id: '5',
      title: 'OCR Interface',
      project: 'AI/ML',
      image: 'ocr.png' // ML/data
    },
    {
      id: '6',
      title: 'Restaurant System',
      project: 'Desktop',
      image: 'restaurant.png' // Restaurant
    },
  ];

  return (
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">Project Screenshots</h2>

        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-3">
          {photos.map((photo, index) => (
              <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="aspect-square rounded-lg cursor-pointer shadow-lg overflow-hidden relative group"
              >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundImage: `url(${photo.image})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <div className="text-lg font-semibold">{photo.title}</div>
                    <div className="text-sm opacity-90 mt-1">{photo.project}</div>
                  </div>
                </div>
              </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
                onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="relative max-w-4xl w-full aspect-video rounded-2xl shadow-2xl overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
              >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedPhoto.image})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex items-center justify-center">
                  <button
                      onClick={() => setSelectedPhoto(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="text-center p-8 text-white">
                    <h3 className="text-4xl font-bold mb-2">{selectedPhoto.title}</h3>
                    <p className="text-xl opacity-90">{selectedPhoto.project}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
        )}
      </div>
  );
};

export default Photos;