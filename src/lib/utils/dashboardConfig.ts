export const dashboardCards = [
    {
      title: "Total Events",
      key: "totalEvents",
      icon: "CalendarPlus",
      description: "Events you've created",
      formatter: (value?: number) => `${(typeof value === 'number' ? value : 0).toFixed(2)}`,
    },
    {
      title: "Total Participants",
      key: "totalParticipants",
      icon: "Users",
      description: "People joined your events",
      formatter: (value?: number) => `${(typeof value === 'number' ? value : 0).toFixed(2)}`,
    },
    {
      title: "Pending Invitations",
      key: "pendingInvitations",
      icon: "Mail",
      description: "Event invites awaiting response",
      formatter: (value?: number) => `${(typeof value === 'number' ? value : 0).toFixed(2)}`,
    },
    {
      title: "Total Reviews",
      key: "totalReviews",
      icon: "Star",
      description: "Feedback received",
      formatter: (value?: number) => `${(typeof value === 'number' ? value : 0).toFixed(2)}`,
    },
    {
      title: "Total Earnings",
      key: "totalEarnings",
      icon: "DollarSign",
      description: "Revenue from ticket sales",
      formatter: (value?: number) => `$${(typeof value === 'number' ? value : 0).toFixed(2)}`,
    },
  ];