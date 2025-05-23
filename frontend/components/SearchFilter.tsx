import { useState, useEffect } from 'react';
import axios from 'axios';

export default function SearchFilter({
  search,
  setSearch,
  setSelectedProjects,
}: {
  search: string;
  setSearch: (value: string) => void;
  setSelectedProjects: (value: string[]) => void;
}) {
  const [projects, setProjects] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/projects`)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error('Error fetching projects:', err));
  }, []);

  const handleCheckboxChange = (project: string) => {
    const updated = selected.includes(project)
      ? selected.filter((p) => p !== project)
      : [...selected, project];

    setSelected(updated);
    setSelectedProjects(updated);
  };

  return (
    <div className="mb-6 p-6 border border-gray-100 rounded-xl shadow-md bg-gradient-to-br from-white to-slate-50 space-y-5">
      <div>
        <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-2">
          🔍 Search Apartments
        </label>
        <input
          id="search"
          type="text"
          placeholder="e.g. Sunrise, A101, Oceanview..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">🏢 Filter by Project</label>
        <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3 bg-slate-50 custom-scroll">
          {projects.length === 0 ? (
            <span className="text-sm text-gray-500 italic">No projects found</span>
          ) : (
            projects.map((project) => (
              <label
                key={project}
                className="flex items-center text-sm gap-2 p-1 rounded-md hover:bg-sky-100 transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(project)}
                  onChange={() => handleCheckboxChange(project)}
                  className="accent-sky-600 h-4 w-4"
                />
                <span className="text-slate-800">{project}</span>
              </label>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #94a3b8;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
