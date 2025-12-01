import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Plus, Trash2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
}

const NOTES_STORAGE_KEY = 'portfolio-notes';

const defaultNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome Note',
    content: 'This is a simple notes app. Click + to create a new note!',
    date: new Date(),
  },
];

const deserializeNotes = (raw: string | null): Note[] => {
  if (!raw) return defaultNotes;
  try {
    const parsed = JSON.parse(raw) as Array<Omit<Note, 'date'> & { date: string }>;
    return parsed.map((note) => ({
      ...note,
      date: new Date(note.date),
    }));
  } catch (error) {
    console.warn('Failed to parse stored notes, falling back to defaults.', error);
    return defaultNotes;
  }
};

const useStoredNotes = () => {
  const loadNotes = () => {
    if (typeof window === 'undefined') return defaultNotes;
    const stored = localStorage.getItem(NOTES_STORAGE_KEY);
    return deserializeNotes(stored);
  };
  return useState<Note[]>(loadNotes);
};

const Notes = () => {
  const [notes, setNotes] = useStoredNotes();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(() => {
    const primaryCollection = typeof window === 'undefined'
      ? defaultNotes
      : deserializeNotes(localStorage.getItem(NOTES_STORAGE_KEY));
    return primaryCollection[0]?.id ?? null;
  });
  const activeNote = useMemo(
    () => notes.find((note) => note.id === activeNoteId) ?? null,
    [notes, activeNoteId],
  );
  const [content, setContent] = useState(activeNote?.content ?? '');
  const [title, setTitle] = useState(activeNote?.title ?? '');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Update unsaved changes indicator
  useEffect(() => {
    if (activeNote) {
      const hasChanges =
        title !== activeNote.title ||
        content !== activeNote.content;
      setHasUnsavedChanges(hasChanges);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [title, content, activeNote]);

  useEffect(() => {
    if (activeNote) {
      setTitle(activeNote.title);
      setContent(activeNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [activeNote?.id]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const payload = JSON.stringify(
      notes.map((note) => ({
        ...note,
        date: note.date.toISOString(),
      })),
    );
    localStorage.setItem(NOTES_STORAGE_KEY, payload);
  }, [notes]);

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      date: new Date(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
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
    setHasUnsavedChanges(false);
  };

  const handleDelete = () => {
    if (!activeNote) return;

    const filtered = notes.filter((note) => note.id !== activeNote.id);
    setNotes(filtered);

    const nextNote = filtered[0] || null;
    setActiveNoteId(nextNote?.id ?? null);
    setTitle(nextNote?.title || '');
    setContent(nextNote?.content || '');
    setHasUnsavedChanges(false);
  };

  const handleSelectNote = (note: Note) => {
    setActiveNoteId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setHasUnsavedChanges(false);
  };

  const handleShare = () => {
    if (!activeNote) return;
    const subject = encodeURIComponent(`Note: ${activeNote.title || 'Untitled'}`);
    const body = encodeURIComponent(
      `${activeNote.content || 'Shared from my macOS portfolio.'}\n\n— Sent via Notes app preview`,
    );
    window.open(`mailto:dalyalaeddine@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
      <div className="flex gap-4 h-full">
        {/* Sidebar */}
        <div className="w-48 space-y-2 flex-shrink-0">
          <Button onClick={handleNewNote} className="w-full gap-2" size="sm">
            <Plus className="w-4 h-4" />
            New Note
          </Button>
          <div className="space-y-1 overflow-y-auto overflow-x-hidden macos-scrollbar" style={{ maxHeight: 'calc(100% - 48px)' }}>
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
                  className="flex-1 w-full bg-transparent border-none outline-none focus:outline-none resize-none macos-scrollbar"
              />
              <div className="flex items-center gap-2 flex-wrap">
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
                    onClick={handleShare}
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                    disabled={!activeNote}
                >
                  <Share2 className="w-4 h-4" />
                  Share
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