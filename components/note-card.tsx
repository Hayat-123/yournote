"use client";

import { Note, deleteNote } from "@/lib/db";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { DeleteDialog } from "./delete-dialog";

import Link from "next/link";
import { useParams } from "next/navigation";

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const params = useParams();
  const notebookId = params.notebookId as string;

  const handleDelete = async () => {
    try {
      await deleteNote(note.id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold truncate">{note.title || "Untitled"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="text-stone-500 text-sm line-clamp-3 prose prose-stone dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: note.content || "No content" }}
          />
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/notes/${notebookId}/${note.id}`}>View</Link>
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeleteOpen(true)}
            className="bg-red-500 hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
        title="Delete Note"
        description={`Are you sure you want to delete "${note.title || "this note"}"? This action cannot be undone.`}
      />
    </>
  );
}
