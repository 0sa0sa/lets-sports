import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  if (import.meta.env.DEV === false || import.meta.env.VITE_MSW === "false") {
    return;
  }

  const { worker } = await import("./mocks");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  // NOTE: 基本的にundefinedになることはないので!をつける
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
});
