// pages/index.tsx
import ThreeDice from '@/app/ui/ThreeDice';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
      <ThreeDice />
      <Link
        className="absolute left-4 top-4 px-4 py-2 outline outline-offset-2 outline-white-500 text-white rounded transition duration-300 hover:outline-blue-300 hover:text-blue-300"
        href="/dashboard"
      >
        Rozvoj
      </Link>
    </div>
  );
}
