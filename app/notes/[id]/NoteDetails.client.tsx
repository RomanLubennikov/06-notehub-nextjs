"use client";

import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  useQuery,
} from "@tanstack/react-query";
import type { DehydratedState } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
import { useState } from "react";

interface NoteDetailsClientProps {
  dehydratedState: DehydratedState | null;
}

export default function NoteDetailsClient({
  dehydratedState,
}: NoteDetailsClientProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <NoteDetailsInner />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

function NoteDetailsInner() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),

    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>

        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{data.createdAt}</p>
      </div>
    </div>
  );
}
