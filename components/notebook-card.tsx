"use client";

import { Notebook, deleteNotebook } from "@/lib/db";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DeleteDialog } from "./delete-dialog";

interface NotebookCardProps {
  notebook: Notebook;
  noteCount: number;
}

export function NotebookCard({ notebook, noteCount }: NotebookCardProps) {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteNotebook(notebook.id);
    } catch (error) {
      console.error("Error deleting notebook:", error);
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{notebook.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-stone-500">{noteCount} notes</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/notes/${notebook.id}`}>View</Link>
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
        title="Delete Notebook"
        description={`Are you sure you want to delete "${notebook.name}"? This action cannot be undone.`}
      />
    </>
  );
}
