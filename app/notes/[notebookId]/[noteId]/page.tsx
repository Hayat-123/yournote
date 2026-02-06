"use client";

import { useEffect, useState, use } from "react";
import { useAuth } from "@/components/auth-provider";
import { Note, subscribeToNote, deleteNote } from "@/lib/db";
import { NoteEditor } from "@/components/note-editor";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronLeft } from "lucide-react";
import { DeleteDialog } from "@/components/delete-dialog";
import { toast } from "sonner";

export default function NotePage({ params }: { params: Promise<{ notebookId: string, noteId: string }> }) {
  const { notebookId, noteId } = use(params);
  const { user } = useAuth();
  const [note, setNote] = useState<Note | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user || !noteId) return;

    const unsubscribe = subscribeToNote(noteId, (n) => {
      if (!n) {
        router.push(`/notes/${notebookId}`);
        return;
      }
      setNote(n);
    });

    return () => unsubscribe();
  }, [user, noteId, notebookId, router]);

  const handleDelete = async () => {
    try {
      await deleteNote(noteId);
      toast.success("Note deleted successfully");
      router.push(`/notes/${notebookId}`);
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  if (!note) return (
    <div className="flex items-center justify-center h-full">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-stone-200 border-t-stone-800" />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push(`/notes/${notebookId}`)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{note.title || "Untitled"}</h1>
        </div>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setDeleteOpen(true)}
          className="bg-red-500 hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 bg-white dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto p-8">
          <NoteEditor
            note={note}
            userId={user?.uid || ""}
            onDelete={() => router.push(`/notes/${notebookId}`)}
          />
        </div>
      </div>

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Note"
        description={`Are you sure you want to delete "${note.title || "this note"}"? This action cannot be undone.`}
      />
    </div>
  );
}
