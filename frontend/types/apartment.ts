export interface Apartment {
  _id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  description?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl?: string;
}