import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Mail,
  Star,
} from "lucide-react";

export const dashboardCards = [
  {
    key: "totalEvents",
    title: "Total Events",
    icon: LayoutDashboard,
    className: "bg-blue-50 dark:bg-blue-900/20 border-blue-100",
  },
  {
    key: "totalPublicEvents",
    title: "Public Events",
    icon: CalendarDays,
    className: "bg-green-50 dark:bg-green-900/20 border-green-100",
  },
  {
    key: "totalPrivateEvents",
    title: "Private Events",
    icon: Mail,
    className: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100",
  },
  {
    key: "totalParticipants",
    title: "Total Participants",
    icon: Users,
    className: "bg-purple-50 dark:bg-purple-900/20 border-purple-100",
  },
  {
    key: "totalReviews",
    title: "Total Reviews",
    icon: Star,
    className: "bg-pink-50 dark:bg-pink-900/20 border-pink-100",
  },
];