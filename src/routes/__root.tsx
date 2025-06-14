import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-blue-50">
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <hr />
          <Outlet />
          <TanStackRouterDevtools />
        </SidebarProvider>
      </TooltipProvider>
    </div>
  ),
});
