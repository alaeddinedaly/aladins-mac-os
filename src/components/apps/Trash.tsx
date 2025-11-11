import { motion } from 'framer-motion';
import { Trash2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Trash = () => {
  const trashedItems = [
    { id: '1', name: 'Old Resume.pdf', type: 'Document', size: '245 KB' },
    { id: '2', name: 'Screenshot.png', type: 'Image', size: '1.2 MB' },
    { id: '3', name: 'Draft Project', type: 'Folder', size: '45 MB' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Trash
        </h2>
        <Button variant="destructive" size="sm">
          Empty Trash
        </Button>
      </div>

      {trashedItems.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Trash2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p>Trash is empty</p>
        </div>
      ) : (
        <div className="space-y-2">
          {trashedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">
                  {item.type === 'Document' ? '📄' : item.type === 'Image' ? '🖼️' : '📁'}
                </div>
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.type} • {item.size}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <RotateCcw className="w-3 h-3" />
                  Restore
                </Button>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;
