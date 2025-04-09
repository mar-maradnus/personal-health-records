"use client";

import { registerPasskey, loginPasskey } from '../utils/auth';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-6">Personal Health Records</h1>

      <div className="flex flex-col gap-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => registerPasskey('testuser')}
        >
          Register Passkey
        </button>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={() => loginPasskey('testuser')}
        >
          Login Passkey
        </button>
      </div>
    </div>
  );
}