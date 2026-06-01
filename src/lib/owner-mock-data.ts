import { imagesForProperty } from '@/lib/images'
import { formatRwandaPhone } from '@/lib/phone'

export type ListingStatus = 'live' | 'pending' | 'draft' | 'sold'
export type InquiryStatus = 'new' | 'replied' | 'closed'
export type VisitStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled'
export type PaymentStatus = 'completed' | 'pending' | 'refunded'

export interface OwnerListing {
  id: string
  title: string
  location: string
  type: string
  price: string
  status: ListingStatus
  views: number
  inquiries: number
  image: string
  trustScore?: number
}

export interface OwnerInquiry {
  id: string
  name: string
  phone: string
  property: string
  message: string
  date: string
  status: InquiryStatus
}

export interface OwnerVisit {
  id: string
  property: string
  guest: string
  phone: string
  date: string
  time: string
  status: VisitStatus
}

export interface OwnerPayment {
  id: string
  property: string
  guest: string
  amount: string
  method: string
  date: string
  status: PaymentStatus
}

export const ownerListings: OwnerListing[] = [
  {
    id: 'ol1',
    title: 'Kimihurura Executive Villa',
    location: 'Kimihurura, Kigali',
    type: 'House',
    price: 'RWF 485M',
    status: 'live',
    views: 1240,
    inquiries: 18,
    image: imagesForProperty('house', 'ol1', 1, 'Kimihurura')[0],
    trustScore: 98,
  },
  {
    id: 'ol2',
    title: 'Kicukiro Prime Development Land',
    location: 'Kicukiro, Kigali',
    type: 'Land',
    price: 'RWF 95M',
    status: 'live',
    views: 620,
    inquiries: 8,
    image: imagesForProperty('land', 'ol2', 1, 'Kicukiro')[0],
    trustScore: 94,
  },
  {
    id: 'ol3',
    title: 'Remera Family Apartment',
    location: 'Remera, Kigali',
    type: 'Apartment',
    price: 'RWF 950K /mo',
    status: 'pending',
    views: 210,
    inquiries: 3,
    image: imagesForProperty('apartment', 'ol3', 1, 'Remera')[0],
  },
  {
    id: 'ol4',
    title: 'Gacuriro Modern Home',
    location: 'Gacuriro, Kigali',
    type: 'House',
    price: 'RWF 198M',
    status: 'draft',
    views: 0,
    inquiries: 0,
    image: imagesForProperty('house', 'ol4', 1, 'Gacuriro')[0],
  },
]

export const ownerInquiries: OwnerInquiry[] = [
  {
    id: 'i1',
    name: 'Patrick Mugisha',
    phone: formatRwandaPhone('788111222'),
    property: 'Kimihurura Executive Villa',
    message: 'Is the plot fully surveyed? Can I visit this Saturday?',
    date: '2 hours ago',
    status: 'new',
  },
  {
    id: 'i2',
    name: 'Claudine Umutoni',
    phone: formatRwandaPhone('722333444'),
    property: 'Kicukiro Land Plot',
    message: 'Please send survey PDF and RDB title copy.',
    date: 'Yesterday',
    status: 'replied',
  },
  {
    id: 'i3',
    name: 'David Okello',
    phone: formatRwandaPhone('712555666'),
    property: 'Kimihurura Executive Villa',
    message: 'Interested in ROI details for investment. Diaspora buyer.',
    date: '3 days ago',
    status: 'replied',
  },
  {
    id: 'i4',
    name: 'Jean Baptiste',
    phone: formatRwandaPhone('739777888'),
    property: 'Remera Apartment',
    message: 'Available from July? Long-term rent.',
    date: '1 week ago',
    status: 'closed',
  },
]

export const ownerVisits: OwnerVisit[] = [
  {
    id: 'v1',
    property: 'Kimihurura Executive Villa',
    guest: 'Patrick Mugisha',
    phone: formatRwandaPhone('788111222'),
    date: 'May 30, 2026',
    time: '10:00 AM',
    status: 'confirmed',
  },
  {
    id: 'v2',
    property: 'Kicukiro Land Plot',
    guest: 'Claudine Umutoni',
    phone: formatRwandaPhone('722333444'),
    date: 'Jun 2, 2026',
    time: '2:00 PM',
    status: 'pending',
  },
  {
    id: 'v3',
    property: 'Kimihurura Executive Villa',
    guest: 'Sarah N.',
    phone: formatRwandaPhone('788999000'),
    date: 'Jun 5, 2026',
    time: '11:00 AM',
    status: 'confirmed',
  },
  {
    id: 'v4',
    property: 'Kicukiro Land Plot',
    guest: 'Eric M.',
    phone: formatRwandaPhone('722121212'),
    date: 'May 22, 2026',
    time: '3:00 PM',
    status: 'completed',
  },
]

export const ownerPayments: OwnerPayment[] = [
  {
    id: 'pay1',
    property: 'Kimihurura Villa',
    guest: 'David Okello',
    amount: 'RWF 24.25M',
    method: 'MTN MoMo',
    date: 'May 18, 2026',
    status: 'completed',
  },
  {
    id: 'pay2',
    property: 'Kicukiro Land',
    guest: 'Claudine Umutoni',
    amount: 'RWF 4.75M',
    method: 'Bank Transfer',
    date: 'May 12, 2026',
    status: 'completed',
  },
  {
    id: 'pay3',
    property: 'Kimihurura Villa',
    guest: 'Patrick Mugisha',
    amount: 'RWF 24.25M',
    method: 'MTN MoMo',
    date: 'May 28, 2026',
    status: 'pending',
  },
]

export const analyticsData = {
  viewsThisMonth: 2840,
  viewsChange: '+18%',
  saves: 156,
  savesChange: '+9%',
  inquiries: 24,
  inquiriesChange: '+12%',
  conversionRate: '3.2%',
  weeklyViews: [
    { day: 'Mon', views: 320 },
    { day: 'Tue', views: 410 },
    { day: 'Wed', views: 380 },
    { day: 'Thu', views: 520 },
    { day: 'Fri', views: 480 },
    { day: 'Sat', views: 390 },
    { day: 'Sun', views: 340 },
  ],
  topListings: [
    { title: 'Kimihurura Villa', views: 1240, inquiries: 18 },
    { title: 'Kicukiro Land', views: 620, inquiries: 8 },
    { title: 'Remera Apartment', views: 210, inquiries: 3 },
  ],
}
