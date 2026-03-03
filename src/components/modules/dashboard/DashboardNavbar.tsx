import { Bell, User, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

const DashboardNavbar = () => {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <SidebarTrigger />
      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <button className="rounded-lg p-2 text-muted-foreground hover:bg-accent transition-colors">
          <User className="h-5 w-5" />
        </button>
        <Link
          href="/"
          className="rounded-lg p-2 text-muted-foreground hover:bg-accent transition-colors"
        >
          <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
};

export default DashboardNavbar;
