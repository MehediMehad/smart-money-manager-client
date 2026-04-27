import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  PiggyBank,
  HandCoins,
  Settings,
  Bell,
  Clock,
  Receipt,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { MdOutlineCategory } from "react-icons/md";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  {
    title: "Today Update",
    url: "/dashboard/today-update",
    icon: Clock,
  },
  { title: "Income", url: "/dashboard/income", icon: ArrowDownCircle },
  { title: "Expense", url: "/dashboard/expense", icon: ArrowUpCircle },
  { title: "Budget", url: "/dashboard/budget", icon: Receipt },
  { title: "Savings", url: "/dashboard/savings", icon: PiggyBank },
  { title: "Debts", url: "/dashboard/debts", icon: HandCoins },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: MdOutlineCategory,
  },
  { title: "Notifications", url: "/dashboard/notifications", icon: Bell },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const pathname = usePathname();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold px-4 py-3 mb-4">
            {!collapsed && ""}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive =
                  item.url === "/dashboard"
                    ? pathname === item.url
                    : pathname === item.url ||
                      pathname.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={clsx(
                          "flex items-center hover:font-bold rounded-lg px-4 py-3 text-[15px] transition-all",
                          "hover:bg-accent/70",
                          isActive &&
                            "bg-accent text-accent-foreground font-semibold shadow-sm",
                        )}
                      >
                        <item.icon
                          className={clsx("h-6 w-6", !collapsed && "mr-3")}
                        />
                        {!collapsed && <span>{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
