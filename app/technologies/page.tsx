'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteTechnology, getAllTechnologies } from '@/services/technoAPI';
import { Pencil, Trash2 } from 'lucide-react';

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await getAllTechnologies();
        setTechnologies(data);
      } catch (err: any) {
        setError('Failed to fetch technologies');
      }
    };

    fetchTechnologies();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette technologie ?")) {
      try {
        await deleteTechnology(id); 
        setTechnologies((prevTechnologies) =>
          prevTechnologies.filter((tech) => tech.id !== id)
        );
      } catch (err: any) {
        setError("Failed to delete technology");
      }
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-blue-600 mb-4">Liste des technologies</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
            </tr>
          </thead>
          <tbody>
            {technologies.map((tech) => (
              <tr key={tech.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{tech.Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}