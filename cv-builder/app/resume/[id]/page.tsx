'use client';

import { useParams } from 'next/navigation';

export default function ResumePage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Resume: {id}</h1>
        {/* Resume content will be implemented here */}
      </div>
    </div>
  );
}
