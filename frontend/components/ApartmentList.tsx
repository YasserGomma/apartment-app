import { useEffect, useState } from 'react';
import axios from 'axios';
import { Apartment } from '../types/apartment';
import ApartmentCard from './ApartmentCard';
import SearchFilter from './SearchFilter';

export default function ApartmentList() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [search, setSearch] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    let url = `${process.env.NEXT_PUBLIC_API_URL}?search=${search}&limit=${itemsPerPage}&page=${currentPage}`;
    if (selectedProjects.length > 0) {
      url += `&projects=${selectedProjects.join(',')}`;
    }

    axios
      .get(url)
      .then((res) => {
        setApartments(res.data.data || res.data);
        setTotalPages(Math.ceil((res.data.total || res.data.length) / itemsPerPage));
      })
      .catch((err) => console.error(err));
  }, [search, selectedProjects, currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        setSelectedProjects={setSelectedProjects}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment._id} apartment={apartment} />
        ))}
      </div>

      <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium rounded-md bg-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-300 transition"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
              currentPage === page
                ? 'bg-blue-500 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium rounded-md bg-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-300 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
