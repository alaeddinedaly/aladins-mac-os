import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
}

const Notes = () => {
  const initialNotes: Note[] = [
    {
      id: '1',
      title: 'Welcome Note',
      content: 'This is a simple notes app. Click + to create a new note!',
      date: new Date(),
    },
  ];

  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeNote, setActiveNote] = useState<Note | null>(initialNotes[0]);
  const [content, setContent] = useState(initialNotes[0].content);
  const [title, setTitle] = useState(initialNotes[0].title);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Update unsaved changes indicator
  useEffect(() => {
    if (activeNote) {
      const hasChanges =
          title !== activeNote.title ||
          content !== activeNote.content;
      setHasUnsavedChanges(hasChanges);
    }
  }, [title, content, activeNote]);

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      date: new Date(),
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setTitle(newNote.title);
    setContent(newNote.content);
    setHasUnsavedChanges(false);
  };

  const handleSave = () => {
    if (!activeNote) return;

    const updatedNotes = notes.map((note) =>
        note.id === activeNote.id
            ? { ...note, title, content, date: new Date() }
            : note
    );

    setNotes(updatedNotes);

    // Update active note to reflect saved state
    const updatedActiveNote = updatedNotes.find(n => n.id === activeNote.id);
    if (updatedActiveNote) {
      setActiveNote(updatedActiveNote);
    }

    setHasUnsavedChanges(false);
  };

  const handleDelete = () => {
    if (!activeNote) return;

    const filtered = notes.filter((note) => note.id !== activeNote.id);
    setNotes(filtered);

    // Select the next note or null if no notes left
    const nextNote = filtered[0] || null;
    setActiveNote(nextNote);
    setTitle(nextNote?.title || '');
    setContent(nextNote?.content || '');
    setHasUnsavedChanges(false);
  };

  const handleSelectNote = (note: Note) => {
    setActiveNote(note);
    setTitle(note.title);
    setContent(note.content);
    setHasUnsavedChanges(false);
  };

  return (
      <div className="flex gap-4 h-full">
        {/* Sidebar */}
        <div className="w-48 space-y-2 flex-shrink-0">
          <Button onClick={handleNewNote} className="w-full gap-2" size="sm">
            <Plus className="w-4 h-4" />
            New Note
          </Button>
          <div className="space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100% - 48px)' }}>
            <AnimatePresence>
              {notes.map((note) => (
                  <motion.div
                      key={note.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      whileHover={{ x: 4 }}
                      onClick={() => handleSelectNote(note)}
                      className={`p-2 rounded-lg cursor-pointer transition-colors ${
                          activeNote?.id === note.id
                              ? 'bg-primary/20'
                              : 'hover:bg-muted/30'
                      }`}
                  >
                    <div className="font-medium text-sm truncate">{note.title || 'Untitled'}</div>
                    <div className="text-xs text-muted-foreground">
                      {note.date.toLocaleDateString()}
                    </div>
                  </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Editor */}
        {activeNote ? (
            <div className="flex-1 space-y-3 flex flex-col">
              <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Note Title"
                  className="w-full text-2xl font-semibold bg-transparent border-none outline-none focus:outline-none"
              />
              <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start typing..."
                  className="flex-1 w-full bg-transparent border-none outline-none focus:outline-none resize-none"
              />
              <div className="flex items-center gap-2">
                <Button
                    onClick={handleSave}
                    size="sm"
                    className="gap-2"
                    disabled={!hasUnsavedChanges}
                >
                  <Save className="w-4 h-4" />
                  Save
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
                {hasUnsavedChanges && (
                    <span className="text-xs text-muted-foreground ml-2">
                Unsaved changes
              </span>
                )}
              </div>
            </div>
        ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">📝</div>
                <p>No notes yet. Click the + button to create one!</p>
              </div>
            </div>
        )}
      </div>
  );
};

export default Notes;