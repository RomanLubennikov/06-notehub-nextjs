import axios from "axios";
import type { Note, CreateNoteInput } from "@/types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  total: number;
}

export async function fetchNotes(params: FetchNotesParams) {
  const res = await api.get<FetchNotesResponse>("/notes", { params });
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function createNote(data: CreateNoteInput) {
  const res = await api.post<Note>("/notes", data);
  return res.data;
}

export async function deleteNote(id: string) {
  const res = await api.delete<Note>(`/notes/${id}`);
  return res.data;
}
