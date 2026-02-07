"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { useEffect, useState } from "react";
import { Note, updateNote, deleteNote } from "@/lib/db";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Loader2,
  Save,
  Trash2,
  Bold,
  Italic,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Strikethrough,
  Code,
  Underline as UnderlineIcon,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface NoteEditorProps {
  note: Note;
  userId: string;
  onDelete: () => void;
}

export function NoteEditor({ note, userId, onDelete }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: note.content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-stone dark:prose-invert max-w-none focus:outline-none min-h-[500px] py-4",
      },
    },
  });

  useEffect(() => {
    if (editor && note) {
      if (editor.getHTML() !== note.content) {
        editor.commands.setContent(note.content);
      }
      setTitle(note.title);
    }
  }, [note.id, editor, note]);

  const handleSave = async () => {
    if (!editor) return;
    setIsSaving(true);
    try {
      await updateNote(note.id, {
        title,
        content: editor.getHTML(),
      });
      toast.success("Note saved!");
    } catch (error) {
      toast.error("Failed to save note.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    await deleteNote(note.id);
    onDelete();
  };

  if (!editor) {
    return null;
  }

  const getHeadingLabel = () => {
    if (editor.isActive("heading", { level: 1 })) return "H1";
    if (editor.isActive("heading", { level: 2 })) return "H2";
    if (editor.isActive("heading", { level: 3 })) return "H3";
    return "Paragraph";
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-stone-900 rounded-md border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden">
      {/* Premium Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/50">
        <div className="flex items-center gap-0.5 mr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-8 w-8"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-8 w-8"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6 shrink-0" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 gap-2 px-2 text-stone-600 dark:text-stone-400">
              {getHeadingLabel()}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
              Paragraph
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              H1
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              H2
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              H3
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-0.5 ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn("h-8 w-8", editor.isActive("bulletList") && "bg-stone-200 dark:bg-stone-800")}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn("h-8 w-8", editor.isActive("orderedList") && "bg-stone-200 dark:bg-stone-800")}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="mx-1 h-6 shrink-0" />

        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn("h-8 w-8", editor.isActive("bold") && "bg-stone-200 dark:bg-stone-800")}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn("h-8 w-8", editor.isActive("italic") && "bg-stone-200 dark:bg-stone-800")}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn("h-8 w-8", editor.isActive("strike") && "bg-stone-200 dark:bg-stone-800")}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={cn("h-8 w-8", editor.isActive("code") && "bg-stone-200 dark:bg-stone-800")}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn("h-8 w-8", editor.isActive("underline") && "bg-stone-200 dark:bg-stone-800")}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" onClick={handleSave} disabled={isSaving} className="h-8">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span className="ml-2 hidden sm:inline">Save</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 sm:p-8">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl sm:text-3xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto mb-4 bg-transparent"
          placeholder="Note Title"
        />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
