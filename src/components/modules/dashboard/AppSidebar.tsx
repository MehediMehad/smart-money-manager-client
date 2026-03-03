import {
  LayoutDashboard,
  ArrowDownCircle,
  ArrowUpCircle,
  PiggyBank,
  HandCoins,
  BarChart3,
  Settings,
  Bell,
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

const menuItems = [
  { title: "ড্যাশবোর্ড", url: "/dashboard", icon: LayoutDashboard },
  { title: "আয়", url: "/dashboard/income", icon: ArrowDownCircle },
  { title: "ব্যয়", url: "/dashboard/expense", icon: ArrowUpCircle },
  { title: "সঞ্চয়", url: "/dashboard/savings", icon: PiggyBank },
  { title: "ধার-দেনা", url: "/dashboard/debts", icon: HandCoins },
  { title: "রিপোর্ট", url: "/dashboard/reports", icon: BarChart3 },
  { title: "নোটিফিকেশন", url: "/dashboard/notifications", icon: Bell },
  { title: "সেটিংস", url: "/dashboard/settings", icon: Settings },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base font-bold px-4 py-3">
            {!collapsed && "স্মার্ট মানি"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="hover:bg-accent/60"
                      // activeClassName="bg-accent text-primary font-semibold"
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
