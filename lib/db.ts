import { db, storage } from "./firebase";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string; // HTML content from Tiptap
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NOTES_COLLECTION = "notes";
const IMAGES_COLLECTION = "images";

export async function createNote(userId: string, title: string = "Untitled") {
  const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
    userId,
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

export async function uploadImage(file: File, userId: string, noteId: string): Promise<string> {
  const storageRef = ref(storage, `users/${userId}/images/${Date.now()}_${file.name}`);
  await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(storageRef);

  // Save metadata to images collection
  await addDoc(collection(db, IMAGES_COLLECTION), {
    noteId,
    userId,
    imageUrl,
    createdAt: serverTimestamp(),
  });

  return imageUrl;
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
