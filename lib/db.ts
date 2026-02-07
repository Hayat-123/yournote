import { db } from "./firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";


export interface Notebook {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  id: string;
  userId: string;
  notebookId?: string; // Optional for now, to support legacy notes or unassigned ones
  title: string;
  content: string; // HTML content from Tiptap
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NOTES_COLLECTION = "notes";
const NOTEBOOKS_COLLECTION = "notebooks";

// Notebook CRUD
export async function createNotebook(userId: string, name: string) {
  const docRef = await addDoc(collection(db, NOTEBOOKS_COLLECTION), {
    userId,
    name,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateNotebook(notebookId: string, data: Partial<Notebook>) {
  const docRef = doc(db, NOTEBOOKS_COLLECTION, notebookId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteNotebook(notebookId: string) {
  // Optional: delete all notes in this notebook? 
  // For now, just delete the notebook.
  await deleteDoc(doc(db, NOTEBOOKS_COLLECTION, notebookId));
}

export function subscribeToNotebooks(userId: string, callback: (notebooks: Notebook[]) => void) {
  const q = query(
    collection(db, NOTEBOOKS_COLLECTION),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const notebooks: Notebook[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      notebooks.push({
        id: doc.id,
        userId: data.userId,
        name: data.name,
        createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
      });
    });
    callback(notebooks);
  });
}

export function subscribeToNotebook(notebookId: string, callback: (notebook: Notebook | null) => void) {
  return onSnapshot(doc(db, NOTEBOOKS_COLLECTION, notebookId), (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        id: doc.id,
        userId: data.userId,
        name: data.name,
        createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
      });
    } else {
      callback(null);
    }
  });
}

// Note CRUD updates
export async function createNote(userId: string, notebookId: string, title: string = "Untitled") {
  const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
    userId,
    notebookId,
    title,
    content: "",
    tags: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateNote(noteId: string, data: Partial<Note>) {
  const docRef = doc(db, NOTES_COLLECTION, noteId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteNote(noteId: string) {
  await deleteDoc(doc(db, NOTES_COLLECTION, noteId));
}

export function subscribeToNotes(userId: string, callback: (notes: Note[]) => void) {
  const q = query(
    collection(db, NOTES_COLLECTION),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const notes: Note[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      notes.push({
        id: doc.id,
        userId: data.userId,
        notebookId: data.notebookId,
        title: data.title,
        content: data.content,
        tags: data.tags,
        createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
      });
    });
    callback(notes);
  });
}

export function subscribeToNotesInNotebook(userId: string, notebookId: string, callback: (notes: Note[]) => void) {
  const q = query(
    collection(db, NOTES_COLLECTION),
    where("userId", "==", userId),
    where("notebookId", "==", notebookId),
    orderBy("updatedAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const notes: Note[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      notes.push({
        id: doc.id,
        userId: data.userId,
        notebookId: data.notebookId,
        title: data.title,
        content: data.content,
        tags: data.tags,
        createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
      });
    });
    callback(notes);
  });
}

export function subscribeToNote(noteId: string, callback: (note: Note | null) => void) {
  return onSnapshot(doc(db, NOTES_COLLECTION, noteId), (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      callback({
        id: doc.id,
        userId: data.userId,
        notebookId: data.notebookId,
        title: data.title,
        content: data.content,
        tags: data.tags,
        createdAt: (data.createdAt as Timestamp)?.toDate() || new Date(),
        updatedAt: (data.updatedAt as Timestamp)?.toDate() || new Date(),
      });
    } else {
      callback(null);
    }
  });
}
