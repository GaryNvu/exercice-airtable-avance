'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteUser, getAllUsers } from '@/services/userAPI';
import Image from 'next/image';
import { Pencil, Plus, Trash2 } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err: any) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      } catch (err: any) {
        setError("Failed to delete user");
      }
    }
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-blue-600">Liste des utilisateurs</h1>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Photo</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Class</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                    {user.Photo && user.Photo.length > 0 ? (
                    <div className="w-14 h-14 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                    <Image
                      src={user.Photo[0].url}
                      alt={user.Name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">N/A</span>
                  </div>
                )}
                </td>
                <td className="border border-gray-300 px-4 py-2">{user.Name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.Email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.Role}</td>
                <td className="border border-gray-300 px-4 py-2">{user.Class}</td>
                <td className="border border-gray-300 px-4">
                        <button
                        onClick={() => handleDelete(user.id)}
                        className="text-white bg-red-600 hover:bg-red-700 p-2 rounded flex items-center justify-center"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}