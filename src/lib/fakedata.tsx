
export const MOCK_USERS= [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export const MOCK_EVENTS= [
  {
    id: '1',
    title: 'Tech Conference 2023',
    description:
      'Join us for the biggest tech conference of the year. Learn from industry experts and network with professionals.',
    date: '2023-11-15T09:00:00Z',
    location: 'Convention Center, New York',
    coverImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Tech Events Inc.',
    organizerId: '1',
    isPrivate: false,
    price: 99.99,
    participantsCount: 250,
    capacity: 500,
    createdAt: '2023-08-15T12:00:00Z',
    updatedAt: '2023-08-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'Community Gardening Workshop',
    description:
      'Learn how to start and maintain your own community garden. All skill levels welcome!',
    date: '2023-11-20T14:00:00Z',
    location: 'Community Center, Boston',
    coverImage: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Green Thumbs',
    organizerId: '2',
    isPrivate: false,
    price: 0,
    participantsCount: 45,
    capacity: 60,
    createdAt: '2023-09-01T10:00:00Z',
    updatedAt: '2023-09-01T10:00:00Z',
  },
  {
    id: '3',
    title: 'Exclusive Networking Dinner',
    description:
      'An exclusive networking dinner for executives in the technology industry.',
    date: '2023-12-05T18:30:00Z',
    location: 'Grand Hotel, San Francisco',
    coverImage: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Tech Leaders Association',
    organizerId: '1',
    isPrivate: true,
    price: 199.99,
    participantsCount: 30,
    capacity: 50,
    createdAt: '2023-09-15T09:30:00Z',
    updatedAt: '2023-09-15T09:30:00Z',
  },
  {
    id: '4',
    title: 'Yoga in the Park',
    description:
      'Join us for a relaxing yoga session in the park. All levels welcome!',
    date: '2023-11-12T08:00:00Z',
    location: 'Central Park, New York',
    coverImage: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Mindful Movements',
    organizerId: '2',
    isPrivate: false,
    price: 0,
    participantsCount: 75,
    capacity: 100,
    createdAt: '2023-10-01T14:00:00Z',
    updatedAt: '2023-10-01T14:00:00Z',
  },
  {
    id: '5',
    title: 'Charity Gala Dinner',
    description:
      'An evening of fine dining and entertainment to raise funds for children in need.',
    date: '2023-12-15T19:00:00Z',
    location: 'Prestige Hall, Chicago',
    coverImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Children First Foundation',
    organizerId: '3',
    isPrivate: true,
    price: 250,
    participantsCount: 120,
    capacity: 200,
    createdAt: '2023-09-20T11:00:00Z',
    updatedAt: '2023-09-20T11:00:00Z',
  },
  {
    id: '6',
    title: 'Marketing Masterclass',
    description:
      'Learn the latest digital marketing strategies from industry experts.',
    date: '2023-11-25T10:00:00Z',
    location: 'Online',
    coverImage: 'https://images.pexels.com/photos/1181325/pexels-photo-1181325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Digital Marketing Academy',
    organizerId: '1',
    isPrivate: false,
    price: 49.99,
    participantsCount: 180,
    capacity: 500,
    createdAt: '2023-10-10T09:00:00Z',
    updatedAt: '2023-10-10T09:00:00Z',
  },
  {
    id: '7',
    title: 'Private Book Club Meeting',
    description:
      'Join our exclusive book club to discuss this month\'s selection.',
    date: '2023-11-18T19:00:00Z',
    location: 'Literary Cafe, Seattle',
    coverImage: 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Readers Circle',
    organizerId: '2',
    isPrivate: true,
    price: 0,
    participantsCount: 15,
    capacity: 20,
    createdAt: '2023-10-15T16:00:00Z',
    updatedAt: '2023-10-15T16:00:00Z',
  },
  {
    id: '8',
    title: 'Photography Workshop',
    description:
      'Improve your photography skills with hands-on training from professionals.',
    date: '2023-12-02T13:00:00Z',
    location: 'Art Center, Portland',
    coverImage: 'https://images.pexels.com/photos/1194775/pexels-photo-1194775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Capture Moments',
    organizerId: '3',
    isPrivate: false,
    price: 75,
    participantsCount: 35,
    capacity: 40,
    createdAt: '2023-10-20T10:30:00Z',
    updatedAt: '2023-10-20T10:30:00Z',
  },
  {
    id: '9',
    title: 'Startup Pitch Competition',
    description:
      'Watch innovative startups pitch their ideas to investors and win funding.',
    date: '2023-12-10T15:00:00Z',
    location: 'Innovation Hub, Austin',
    coverImage: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Startup Accelerator',
    organizerId: '1',
    isPrivate: false,
    price: 25,
    participantsCount: 90,
    capacity: 150,
    createdAt: '2023-10-25T14:00:00Z',
    updatedAt: '2023-10-25T14:00:00Z',
  },
  {
    id: '10',
    title: 'VIP Concert Access',
    description:
      'Exclusive VIP access to the hottest concert of the year with backstage passes.',
    date: '2023-12-20T20:00:00Z',
    location: 'Arena Stadium, Los Angeles',
    coverImage: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    organizer: 'Music Entertainment Group',
    organizerId: '3',
    isPrivate: true,
    price: 299.99,
    participantsCount: 50,
    capacity: 100,
    createdAt: '2023-11-01T09:00:00Z',
    updatedAt: '2023-11-01T09:00:00Z',
  },
];

export const MOCK_PARTICIPANTS= [
  {
    id: '1',
    userId: '1',
    eventId: '2',
    user: MOCK_USERS[0],
    status: 'approved',
    createdAt: '2023-09-10T14:30:00Z',
  },
  {
    id: '2',
    userId: '2',
    eventId: '1',
    user: MOCK_USERS[1],
    status: 'approved',
    paymentStatus: 'completed',
    paymentId: 'pay_123456',
    createdAt: '2023-09-05T10:15:00Z',
  },
  {
    id: '3',
    userId: '1',
    eventId: '3',
    user: MOCK_USERS[0],
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2023-09-20T16:45:00Z',
  },
];

export const MOCK_INVITATIONS= [
  {
    id: '1',
    eventId: '3',
    userId: '2',
    event: MOCK_EVENTS[2],
    status: 'pending',
    createdAt: '2023-09-18T11:30:00Z',
  },
  {
    id: '2',
    eventId: '5',
    userId: '1',
    event: MOCK_EVENTS[4],
    status: 'pending',
    createdAt: '2023-09-25T09:20:00Z',
  },
];

export const MOCK_REVIEWS = [
  {
    id: '1',
    userId: '1',
    eventId: '1',
    user: MOCK_USERS[0],
    rating: 5,
    comment: 'Amazing event! The speakers were incredibly knowledgeable and the networking opportunities were fantastic.',
    createdAt: '2023-11-16T10:00:00Z',
    updatedAt: '2023-11-16T10:00:00Z',
  },
  {
    id: '2',
    userId: '2',
    eventId: '1',
    user: MOCK_USERS[1],
    rating: 4,
    comment: 'Great organization and content. Would have loved more Q&A time.',
    createdAt: '2023-11-17T14:30:00Z',
    updatedAt: '2023-11-17T14:30:00Z',
  },
];


export interface UserType {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
}

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage: string;
  organizer: string;
  organizerId: string;
  isPrivate: boolean;
  price: number;
  participantsCount: number;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ParticipantType {
  id: string;
  userId: string;
  eventId: string;
  user: UserType;
  status: 'pending' | 'approved' | 'rejected' | 'banned';
  paymentStatus?: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  createdAt: string;
}

export interface InvitationType {
  id: string;
  eventId: string;
  userId: string;
  event: EventType;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface ReviewType {
  id: string;
  userId: string;
  eventId: string;
  user: UserType;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export type EventStatus = 'all' | 'upcoming' | 'past';
export type EventVisibility = 'all' | 'public' | 'private';
export type PaymentStatus = 'all' | 'free' | 'paid';
export type ParticipantStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'banned';