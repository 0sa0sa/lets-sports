import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

export function IndexPage() {
  return <Navigate to="/search" />;
}
