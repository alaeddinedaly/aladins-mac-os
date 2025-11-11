import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

interface Photo {
  id: string;
  title: string;
  project: string;
  color: string;
}

const Photos = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos: Photo[] = [
    { id: '1', title: 'LynkAi Dashboard', project: 'LynkAi', color: 'from-blue-500 to-purple-600' },
    { id: '2', title: 'Storyboard Generator', project: 'AI Project', color: 'from-pink-500 to-rose-600' },
    { id: '3', title: 'Finora App', project: 'Mobile', color: 'from-green-500 to-emerald-600' },
    { id: '4', title: 'Portfolio Site', project: 'Web', color: 'from-orange-500 to-red-600' },
    { id: '5', title: 'OCR Interface', project: 'AI/ML', color: 'from-cyan-500 to-blue-600' },
    { id: '6', title: 'Restaurant System', project: 'Desktop', color: 'from-violet-500 to-purple-600' },
  ];

  return (
    <div className="space-y-4">
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
            className={`aspect-square rounded-lg bg-gradient-to-br ${photo.color} cursor-pointer shadow-lg flex items-center justify-center text-white font-semibold p-4 text-center`}
          >
            <div>
              <div className="text-lg">{photo.title}</div>
              <div className="text-sm opacity-80 mt-1">{photo.project}</div>
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
            className={`relative max-w-4xl w-full aspect-video rounded-2xl bg-gradient-to-br ${selectedPhoto.color} shadow-2xl flex items-center justify-center text-white`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center p-8">
              <h3 className="text-4xl font-bold mb-2">{selectedPhoto.title}</h3>
              <p className="text-xl opacity-90">{selectedPhoto.project}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Photos;
