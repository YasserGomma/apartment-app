import { useRouter } from "next/router";
import { Apartment } from "../types/apartment";
import { Bed, Bath, Square, MapPin } from "lucide-react";

// Soft pastel gradients
const gradientColors = [
  "from-sky-100 via-sky-200 to-sky-300",
  "from-purple-100 via-purple-200 to-indigo-200",
  "from-teal-100 via-teal-200 to-cyan-200",
  "from-slate-100 via-gray-200 to-slate-300",
];

const getRandomGradient = (id: string) => {
  const index = Math.abs(hashCode(id)) % gradientColors.length;
  return gradientColors[index];
};

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  const router = useRouter();
  const gradient = getRandomGradient(apartment._id);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${apartment.unitName}`}
      onClick={() => router.push(`/apartments/${apartment._id}`)}
      onKeyDown={(e) => e.key === "Enter" && router.push(`/apartments/${apartment._id}`)}
      className={`cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200 rounded-2xl p-4 sm:p-6 bg-gradient-to-br ${gradient} transition-all duration-300 hover:shadow-md max-w-full w-full flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:space-x-6`}
    >
      <div className="relative w-full sm:w-[300px] h-[200px] sm:h-[250px] rounded-xl overflow-hidden">
        <img
          src={apartment.imageUrl || "/placeholder.jpg"}
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
          alt={apartment.unitName}
          className="w-full h-full object-cover rounded-xl transition-opacity duration-300"
        />
        <div className="absolute top-2 right-2 bg-indigo-300 text-gray-800 text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow-md">
          ${apartment.price.toLocaleString()}
        </div>
      </div>

      <div className="w-full sm:flex-1 text-center sm:text-left mt-4 sm:mt-0">
        <h2 className="text-2xl font-bold text-gray-800">{apartment.unitName}</h2>

        <div className="text-sm text-gray-600 mt-1 flex justify-center sm:justify-start items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>Unit {apartment.unitNumber}</span>
        </div>
        <div className="text-sm text-blue-600 flex justify-center sm:justify-start items-center gap-2 mt-1">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span className="truncate max-w-full">{apartment.project}</span>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-teal-400 rounded-full">
            <Bed className="w-4 h-4 mr-1 text-white" /> {apartment.bedrooms} Beds
          </span>
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-purple-300 rounded-full">
            <Bath className="w-4 h-4 mr-1 text-white" /> {apartment.bathrooms} Baths
          </span>
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-blue-300 rounded-full">
            <Square className="w-4 h-4 mr-1 text-white" /> {apartment.area} sqft
          </span>
        </div>
      </div>
    </div>
  );
}
