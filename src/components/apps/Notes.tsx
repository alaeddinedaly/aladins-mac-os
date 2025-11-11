import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
}

const Notes = () => {
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome Note',
      content: 'This is a simple notes app. Click + to create a new note!',
      date: new Date(),
    },
  ]);
  const [activeNote, setActiveNote] = useState<Note | null>(notes[0]);
  const [content, setContent] = useState(notes[0].content);
  const [title, setTitle] = useState(notes[0].title);

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
  };

  const handleSave = () => {
    if (!activeNote) return;
    setNotes(
      notes.map((note) =>
        note.id === activeNote.id ? { ...note, title, content, date: new Date() } : note
      )
    );
    toast({
      title: 'Note saved',
      description: 'Your note has been saved successfully',
    });
  };

  const handleDelete = () => {
    if (!activeNote) return;
    const filtered = notes.filter((note) => note.id !== activeNote.id);
    setNotes(filtered);
    setActiveNote(filtered[0] || null);
    setTitle(filtered[0]?.title || '');
    setContent(filtered[0]?.content || '');
    toast({
      title: 'Note deleted',
      description: 'Your note has been deleted',
    });
  };

  return (
    <div className="flex gap-4 h-full">
      {/* Sidebar */}
      <div className="w-48 space-y-2">
        <Button onClick={handleNewNote} className="w-full gap-2" size="sm">
          <Plus className="w-4 h-4" />
          New Note
        </Button>
        <div className="space-y-1">
          {notes.map((note) => (
            <motion.div
              key={note.id}
              whileHover={{ x: 4 }}
              onClick={() => {
                setActiveNote(note);
                setTitle(note.title);
                setContent(note.content);
              }}
              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                activeNote?.id === note.id ? 'bg-primary/20' : 'hover:bg-muted/30'
              }`}
            >
              <div className="font-medium text-sm truncate">{note.title}</div>
              <div className="text-xs text-muted-foreground">
                {note.date.toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          className="w-full text-2xl font-semibold bg-transparent border-none outline-none"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start typing..."
          className="w-full h-64 bg-transparent border-none outline-none resize-none"
        />
        <div className="flex gap-2">
          <Button onClick={handleSave} size="sm" className="gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>
          <Button onClick={handleDelete} variant="destructive" size="sm" className="gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
