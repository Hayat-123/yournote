"use client";

import { Note } from "@/lib/db";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (note: Note) => void;
}

export function NoteList({ notes, selectedNoteId, onSelectNote }: NoteListProps) {
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex w-80 flex-col border-r bg-white">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-stone-400" />
          <Input
            placeholder="Search notes..."
            className="pl-8 bg-stone-50 border-stone-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelectNote(note)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg p-3 text-left text-sm transition-all hover:bg-stone-100",
                selectedNoteId === note.id && "bg-stone-100 font-medium ring-1 ring-stone-200"
              )}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="font-semibold text-stone-900 truncate w-full">
                    {note.title || "Untitled Note"}
                  </div>
                </div>
                <div className="text-xs text-stone-500">
                  {formatDistanceToNow(note.updatedAt, { addSuffix: true })}
                </div>
                <div className="line-clamp-2 text-xs text-stone-600 w-full"
                  dangerouslySetInnerHTML={{ __html: note.content.substring(0, 100) }}
                />
              </div>
            </button>
          ))}
          {filteredNotes.length === 0 && (
            <div className="p-4 text-center text-sm text-stone-500">
              No notes found.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
