"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect, useState } from "react";
import { Note, updateNote, uploadImage } from "@/lib/db";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ImageIcon, Loader2, Save, Trash2, Bold, Italic, List, ListOrdered } from "lucide-react";
import { deleteNote } from "@/lib/db";

interface NoteEditorProps {
  note: Note;
  userId: string;
  onDelete: () => void;
}

export function NoteEditor({ note, userId, onDelete }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: note.content,
    editorProps: {
      attributes: {
        class: "prose prose-stone max-w-none focus:outline-none min-h-[500px]",
      },
    },
    onUpdate: () => {
      // Auto-save logic could go here (debounced)
    },
  });

  useEffect(() => {
    if (editor && note) {
      // Only update content if it's different to prevent cursor jumps
      // A simple check might not be enough for real-time collaboration but works for single user switcher
      if (editor.getHTML() !== note.content) {
        editor.commands.setContent(note.content);
      }
      setTitle(note.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note.id, editor]); // Depend on note.id to switch notes

  const handleSave = async () => {
    if (!editor) return;
    setIsSaving(true);
    try {
      await updateNote(note.id, {
        title,
        content: editor.getHTML(),
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editor) {
      setIsUploading(true);
      try {
        const url = await uploadImage(file, userId, note.id);
        editor.chain().focus().setImage({ src: url }).run();
      } catch (error) {
        console.error("Image upload failed", error);
        alert("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this note?")) {
      await deleteNote(note.id);
      onDelete();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto"
          placeholder="Note Title"
        />
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-4 border-r pr-4">
            <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'bg-stone-100' : ''}>
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'bg-stone-100' : ''}>
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'bg-stone-100' : ''}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'bg-stone-100' : ''}>
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>

          <label htmlFor="image-upload" className="cursor-pointer">
            <Button variant="outline" size="icon" asChild disabled={isUploading}>
              <span>
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
              </span>
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="ml-2 hidden sm:inline">Save</span>
          </Button>
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-8">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
