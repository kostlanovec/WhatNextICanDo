// pages/index.tsx
import ThreeDice from '@/app/ui/ThreeDice';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      <ThreeDice />
      <Link
        className="absolute left-4 top-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        href="/dashboard"
      >
        Rozvoj
      </Link>
    </div>
  );
}
