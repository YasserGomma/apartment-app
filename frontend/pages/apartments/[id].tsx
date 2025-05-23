import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Apartment } from '../../types/apartment';
import Link from 'next/link';
import ApartmentDetails from '../../components/ApartmentDetails';

export default function ApartmentDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/${id}`)
        .then((res) => {
          setApartment(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load apartment.');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-600 text-lg animate-pulse">
          🔄 Loading apartment details...
        </div>
      </div>
    );
  }

  if (error || !apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600 text-lg">
          ❌ {error || 'Apartment not found.'}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* ✅ Fixed: Link uses modern API */}
        <Link
          href="/apartments"
          className="inline-flex items-center text-sm text-blue-600 hover:underline mb-4"
        >
          ← Back to Listings
        </Link>

        <section className="bg-white p-6 rounded-lg shadow-md">
          <ApartmentDetails apartment={apartment} />
        </section>
      </div>
    </main>
  );
}
