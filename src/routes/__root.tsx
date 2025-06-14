import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-blue-50">
      <SidebarProvider>
        <AppSidebar />
        <hr />
          <Outlet />
        <TanStackRouterDevtools />
      </SidebarProvider>
    </div>
  ),
});
