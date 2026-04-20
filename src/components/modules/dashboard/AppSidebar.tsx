import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  PiggyBank,
  HandCoins,
  BarChart3,
  Settings,
  Bell,
  Clock,
  PieChart,
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
  { title: "Monthly Budget", url: "/dashboard/monthly-budget", icon: PieChart },

  { title: "Savings", url: "/dashboard/savings", icon: PiggyBank },
  { title: "Debts", url: "/dashboard/debts", icon: HandCoins },
  {
    title: "Monthly Reports",
    url: "/dashboard/monthly-reports",
    icon: BarChart3,
  },
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
                  pathname === item.url || pathname.startsWith(item.url + "/");

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={clsx(
                          "flex items-center rounded-md px-3 py-2 text-base transition-colors",
                          "hover:bg-accent/60",
                          isActive && "bg-accent text-primary font-semibold",
                        )}
                      >
                        <item.icon
                          className={clsx("h-5 w-5", !collapsed && "mr-2")}
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
