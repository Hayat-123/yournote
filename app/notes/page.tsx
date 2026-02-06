"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Notebook, subscribeToNotebooks, Note, subscribeToNotes } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateNotebookDialog } from "@/components/create-notebook-dialog";
import { NotebookCard } from "@/components/notebook-card";

export default function NotesPage() {
  const { user } = useAuth();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubscribeNotebooks = subscribeToNotebooks(user.uid, setNotebooks);
    const unsubscribeNotes = subscribeToNotes(user.uid, setNotes);

    return () => {
      unsubscribeNotebooks();
      unsubscribeNotes();
    };
  }, [user]);

  const getNoteCount = (notebookId: string) => {
    return notes.filter((n) => n.notebookId === notebookId).length;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-6">Notebooks</h1>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="bg-black text-white hover:bg-stone-800 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            Create Notebook
          </Button>
        </div>

        {notebooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notebooks.map((nb) => (
              <NotebookCard
                key={nb.id}
                notebook={nb}
                noteCount={getNoteCount(nb.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-stone-500 mt-4">No notebooks found</div>
        )}
      </div>

      <CreateNotebookDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
