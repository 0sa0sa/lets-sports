import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/reserve/")({
  component: ReservePage,
});

function ReservePage() {
  return <div>Hello "/reserve"!</div>;
}
