import { useState } from "react";
import { Apartment } from "../types/apartment";
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from "lucide-react";

export default function ApartmentDetails({ apartment }: { apartment: Apartment }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    apartment.imageUrl || "https://cf.bstatic.com/xdata/images/hotel/max1024x768/498402919.jpg?k=a40b6cc48cbd0cf180a6d6318ba49c4d595b3c5cbc85561ff51221a418ae7500&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/498402919.jpg?k=a40b6cc48cbd0cf180a6d6318ba49c4d595b3c5cbc85561ff51221a418ae7500&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/196165095.jpg?k=e109bc7efe234d7727cef89cb64b8513c28ec69a13248cd1ce073e040c27d07e&o=&hp=1",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/390416936.jpg?k=4e9d6846c05908c12c30b6a7b42d5b89c040701342a01eb71bd65dd815722018&o=&hp=1",
    "https://walls.ge/modules/project_gldani/uploads/step_2/1573.jpg",
  ];

  const handlePrev = () => setActiveIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setActiveIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="bg-gradient-to-br from-blue-50 via-sky-100 to-cyan-100 rounded-2xl shadow-2xl p-6 md:p-10 max-w-5xl mx-auto transition-all duration-300 hover:shadow-3xl">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/2">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={images[activeIndex]}
              alt={`${apartment.unitName} - Image ${activeIndex + 1}`}
              className="w-full h-[400px] object-cover rounded-xl transition-transform duration-300 hover:scale-[1.05] hover:opacity-95"
              width={600}
              height={400}
            />
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-3 mt-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  activeIndex === index ? "ring-2 ring-indigo-600" : "grayscale"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 tracking-wide">
              {apartment.unitName}
            </h1>
            <p className="text-indigo-700 mt-3 flex items-center gap-3 text-lg">
              <MapPin className="w-6 h-6 text-indigo-500" />
              {apartment.project}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Bed className="w-6 h-6 text-teal-500" />
              <span className="text-lg text-gray-800">{apartment.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-3">
              <Bath className="w-6 h-6 text-violet-500" />
              <span className="text-lg text-gray-800">{apartment.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-3">
              <Square className="w-6 h-6 text-sky-500" />
              <span className="text-lg text-gray-800">{apartment.area} sqft</span>
            </div>
            <div className="text-3xl font-bold text-teal-700">
              ${apartment.price.toLocaleString()}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed text-base">
              {apartment.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
