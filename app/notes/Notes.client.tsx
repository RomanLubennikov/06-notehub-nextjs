"use client";

import { useQuery } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNotes } from "@/lib/api/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";

export default function NotesClient({
  dehydratedState,
}: {
  dehydratedState: DehydratedState | null;
}) {
  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClientInner />
    </HydrationBoundary>
  );
}

function NotesClientInner() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notes", { search, page }],
    queryFn: () =>
      fetchNotes({
        search,
        page,
        perPage: 12,
      }),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <SearchBox value={search} onChange={setSearch} />

        <button className={css.addButton} onClick={() => setIsOpen(true)}>
          Add note
        </button>
      </div>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <NoteForm
            onCancel={() => setIsOpen(false)}
            onSuccess={() => {
              setIsOpen(false);
              refetch();
            }}
          />
        </Modal>
      )}

      <div className={css.list}>
        {data.notes.length === 0 && <p>No notes found.</p>}

        {data.notes.map((note) => (
          <div key={note.id} className={css.note}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <span>{note.tag}</span>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        pageCount={data.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
