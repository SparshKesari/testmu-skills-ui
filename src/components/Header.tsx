import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full min-w-0 max-w-[1400px] items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
        <Button variant="link" asChild className="min-w-0 shrink truncate text-lg font-semibold p-0 h-auto hover:no-underline">
          <Link href="/">Agent Skills for All</Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a
            href="https://github.com/LambdaTest/agent-skills"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Button>
      </div>
    </header>
  );
}
