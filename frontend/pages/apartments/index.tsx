import ApartmentList from '../../components/ApartmentList';

export default function ApartmentsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-900">🏠 Apartment Listings</h1>
          <p className="mt-3 text-lg text-slate-600">
            Find your perfect place from our curated collection
          </p>
        </header>

        <section className="rounded-xl shadow-md p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-blue-100">
          <ApartmentList />
        </section>
      </div>
    </main>
  );
}
