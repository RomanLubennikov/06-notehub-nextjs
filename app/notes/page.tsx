import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const qc = new QueryClient();

  const defaultParams = { page: 1, perPage: 12, search: "" };

  await qc.prefetchQuery({
    queryKey: ["notes", defaultParams],
    queryFn: () => fetchNotes(defaultParams),
  });

  const dehydratedState = dehydrate(qc);

  return <NotesClient dehydratedState={dehydratedState} />;
}
