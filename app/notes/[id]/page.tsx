import { QueryClient, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = params;
  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydrated = JSON.parse(JSON.stringify(dehydrate(qc)));

  return <NoteDetailsClient dehydratedState={dehydrated} />;
}
