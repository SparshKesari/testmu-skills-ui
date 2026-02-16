import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold text-white hover:text-white/90"
        >
          TestMu AI Skills
        </Link>
        <a
          href="https://github.com/SparshKesari/testmu-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-400 hover:text-white"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
