import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">CV Builder</h1>
        <p className="text-lg text-gray-600 mb-8">
          Create a professional, ATS-optimized CV in minutes using AI.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
        </div>
      </main>
    </div>
  );
}
