import Link from "next/link";

export default function SkillNotFound() {
  return (
    <div className="py-12 text-center">
      <h2 className="text-xl font-semibold text-white">
        Skill not found
      </h2>
      <p className="mt-2 text-zinc-400">
        The skill you’re looking for doesn’t exist or was removed.
      </p>
      <Link
        href="/"
        className="mt-4 inline-block text-sm font-medium text-zinc-400 hover:text-white"
      >
        ← Back to all skills
      </Link>
    </div>
  );
}
