import NoteDetailsClient from "./NoteDetails.client";

interface Props {
  params: { id: string };
}

export default function NoteDetailsPage({ params }: Props) {
  return <NoteDetailsClient id={params.id} />;
}
