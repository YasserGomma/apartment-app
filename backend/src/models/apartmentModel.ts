import mongoose, { Schema } from 'mongoose';

const apartmentSchema = new Schema({
  unitName: { type: String, required: true },
  unitNumber: { type: String, required: true },
  project: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  imageUrl: { type: String }
}, { timestamps: true });

export default mongoose.models.Apartment || mongoose.model('Apartment', apartmentSchema);
