'use client';

import Link from 'next/link';
import { User, UserCheck, LogOut } from 'lucide-react';
import { useUser } from "@/context/UserContext";

export default function Header() {
  const { user, logout } = useUser();

  return (
    <header className="w-full px-6 py-2 bg-blue-600 shadow-md flex items-center justify-between">
      <div className='flex items-center space-x-6'>
        <Link href="/" className="text-xl font-bold text-white">
          Portfolio ESGI
        </Link>
        {user && (
          <span className="text-white text-lg">Hello {user.name} !</span>
        )}
      </div>
      {user ? (
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-white hover:text-blue-600 hover:bg-white transition p-2 rounded">
            Home
          </Link>
          <Link
            href="/users"
            className="text-white hover:text-blue-600 hover:bg-white transition p-2 rounded"
          >
            Users
          </Link>
          <Link
            href="/technologies"
            className="text-white hover:text-blue-600 hover:bg-white transition p-2 rounded"
          >
            Technologies
          </Link>
          <button
            onClick={logout}
            className="flex items-center cursor-pointer space-x-2 text-white p-2 rounded hover:text-blue-600 hover:bg-white transition"
          >
            <LogOut className="w-6 h-6" />
            <p className=''>Logout</p>
          </button>
        </div>
      ) : (
        <Link href="/login" className="flex items-center space-x-2 p-2 text-white hover:text-blue-600 hover:bg-white transition rounded">
          <User className="w-6 h-6" />
          <span>Login</span>
        </Link>
      )}
    </header>
  );
}
