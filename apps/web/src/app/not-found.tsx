import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
      <div className="text-center">
        <h1 className="text-[120px] font-black leading-none tracking-tighter text-zinc-50 md:text-[200px]">
          404
        </h1>
        <div className="mt-4 inline-block bg-zinc-50 px-6 py-2 text-xl font-bold uppercase tracking-tight text-zinc-950">
          Page Not Found
        </div>
        <p className="mx-auto mt-8 max-w-md text-zinc-400">
          THE RESOURCE YOU ARE LOOKING FOR HAS BEEN MOVED, DELETED, OR NEVER EXISTED IN THE FIRST PLACE.
        </p>
        <div className="mt-12">
          <Link 
            href="/"
            className="inline-block border-2 border-zinc-50 bg-zinc-950 px-8 py-4 text-lg font-black uppercase tracking-tighter text-zinc-50 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            RETURN TO ROOT
          </Link>
        </div>
      </div>
    </div>
  );
}
