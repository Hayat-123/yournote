"use client";

import { useEffect, useState, Suspense } from "react";
import { useAuth } from "@/components/auth-provider";
import { Note, createNote, subscribeToNotes } from "@/lib/db";
import { NoteEditor } from "@/components/note-editor";
import { NoteList } from "@/components/note-list";
import { useSearchParams, useRouter } from "next/navigation";

function NotesPageContent() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get("action");

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToNotes(user.uid, (fetchedNotes) => {
      setNotes(fetchedNotes);

      // If we have a selected note, keep it updated
      if (selectedNote) {
        const updated = fetchedNotes.find((n) => n.id === selectedNote.id);
        if (updated) {
          // Only update if it's not currently being edited? 
          // actually update is handled in Editor via note prop change
          // But if it was deleted, handle that
          setSelectedNote(updated);
        } else {
          setSelectedNote(null);
        }
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedNote?.id]);

  useEffect(() => {
    const handleNewNote = async () => {
      if (action === "new" && user) {
        // Clear param first to avoid double creation
        router.replace("/notes");
        try {
          await createNote(user.uid);
          // Wait for subscription to pick it up or find it in next update
          // Simplified: we'll just wait for the subscription to give it to us,
          // OR we can optimistically set it.
          // For now, let's just wait. Subscription is fast.
        } catch (error) {
          console.error("Error creating note:", error);
        }
      }
    };
    handleNewNote();
  }, [action, user, router]);

  // Select the first note if nothing selected and notes exist? 
  // Maybe not, explicit selection is better.

  // Automatically select the newest note if we just created one?
  // We can track if note count increased.

  // A simpler approach for "New Note":
  // When action=new, create note, then find it in notes array (useEffect dependency on notes)
  // and select it.

  useEffect(() => {
    if (user && notes.length > 0 && !selectedNote) {
      // Optionally select the first note on load
      // setSelectedNote(notes[0]);
    }
  }, [notes, user, selectedNote]);

  // When a new note is added at the top (which createNote does), we might want to select it.

  return (
    <div className="flex h-full">
      <NoteList
        notes={notes}
        selectedNoteId={selectedNote?.id || null}
        onSelectNote={setSelectedNote}
      />
      <div className="flex-1 overflow-hidden bg-white">
        {selectedNote ? (
          <NoteEditor
            key={selectedNote.id} // Re-mount on note change to reset editor state properly
            note={selectedNote}
            userId={user?.uid || ""}
            onDelete={() => setSelectedNote(null)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-400">
            Select a note or create a new one.
          </div>
        )}
      </div>
    </div>
  );
}

export default function NotesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotesPageContent />
    </Suspense>
  );
}
