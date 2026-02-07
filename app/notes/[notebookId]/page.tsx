"use client";

import { useEffect, useState, use } from "react";
import { useAuth } from "@/components/auth-provider";
import { Notebook, subscribeToNotebook, Note, subscribeToNotesInNotebook } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { CreateNoteDialog } from "@/components/create-note-dialog";
import { NoteCard } from "@/components/note-card";
import { useRouter } from "next/navigation";

export default function NotebookPage({ params }: { params: Promise<{ notebookId: string }> }) {
  const { notebookId } = use(params);
  const { user } = useAuth();
  const [notebook, setNotebook] = useState<Notebook | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user || !notebookId) return;

    const unsubscribeNotebook = subscribeToNotebook(notebookId, (nb) => {
      if (!nb) {
        router.push("/notes");
        return;
      }
      setNotebook(nb);
    });

    const unsubscribeNotes = subscribeToNotesInNotebook(user.uid, notebookId, setNotes);

    return () => {
      unsubscribeNotebook();
      unsubscribeNotes();
    };
  }, [user, notebookId, router]);

  if (!notebook) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-6">{notebook.name}</h1>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-black text-white hover:bg-stone-800 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            Create Note
          </Button>
        </div>

        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="text-stone-500 mt-4">No notes found in this notebook.</div>
        )}
      </div>

      <CreateNoteDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        notebookId={notebookId}
      />
    </div>
  );
}
