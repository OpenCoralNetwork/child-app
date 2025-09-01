export interface Facility {
  id: string;
  name: string;
  type: 'nursery' | 'sick-child' | 'clinic';
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  description?: string;
  rating: number;
  imageUrl: string;
  distance?: number; // in km
}

// Sample facilities in Sapporo
export const sampleFacilities: Facility[] = [
  {
    id: '1',
    name: '札幌こども保育園',
    type: 'nursery',
    address: '札幌市中央区北3条西4丁目',
    lat: 43.064,
    lng: 141.346,
    phone: '011-123-4567',
    email: 'info@sapporokids.jp',
    description: '温かい雰囲気の保育園で、子どもたちが楽しく安全に過ごせる環境を提供しています。',
    rating: 4.8,
    imageUrl: 'https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: 0.8,
  },
  {
    id: '2',
    name: 'キッズケア札幌',
    type: 'sick-child',
    address: '札幌市北区北7条西5丁目',
    lat: 43.072,
    lng: 141.348,
    phone: '011-234-5678',
    email: 'care@kidscare.jp',
    description: '病児保育に特化した施設です。看護師が常駐し、安心して預けられます。',
    rating: 4.5,
    imageUrl: 'https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: 1.2,
  },
  {
    id: '3',
    name: '札幌こどもクリニック',
    type: 'clinic',
    address: '札幌市中央区南1条東2丁目',
    lat: 43.059,
    lng: 141.351,
    phone: '011-345-6789',
    email: 'clinic@sapporokids.jp',
    description: '小児科専門のクリニックです。予防接種や健康診断も行っています。',
    rating: 4.7,
    imageUrl: 'https://images.pexels.com/photos/3038285/pexels-photo-3038285.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: 0.5,
  },
  {
    id: '4',
    name: '北海道子育て支援センター',
    type: 'nursery',
    address: '札幌市東区北11条東7丁目',
    lat: 43.076,
    lng: 141.368,
    phone: '011-456-7890',
    email: 'support@hokkaidocare.jp',
    description: '子育て支援に特化したセンターです。一時預かりや相談サービスを提供しています。',
    rating: 4.6,
    imageUrl: 'https://images.pexels.com/photos/3933239/pexels-photo-3933239.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: 2.3,
  },
  {
    id: '5',
    name: '札幌メディカルケアセンター',
    type: 'clinic',
    address: '札幌市西区琴似1条3丁目',
    lat: 43.083,
    lng: 141.308,
    phone: '011-567-8901',
    email: 'medical@sapporocare.jp',
    description: '総合的な医療サービスを提供するセンターです。小児科も充実しています。',
    rating: 4.4,
    imageUrl: 'https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: 3.7,
  },
  {
    id: '6',
    name: 'ふわふわ保育園',
    type: 'nursery',
    address: '札幌市豊平区平岸3条8丁目',
    lat: 43.032,
    lng: 141.368,
    phone: '011-678-9012',
    email: 'fuwa@fuwacare.jp',
    description: '自然に囲まれた環境で、のびのびと育つことを大切にしている保育園です。',
    rating: 4.9,
    imageUrl: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=600',
    distance: 4.1,
  },
];