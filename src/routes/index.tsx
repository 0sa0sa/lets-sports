import { Button } from "@/components/ui/button";
import { Header } from "@/stories/Header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <Header />
      <Button>This is shadcn/ui button</Button>
      <h3>Welcome Home!</h3>
    </div>
  );
}
