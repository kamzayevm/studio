'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MountainIcon } from '@/components/icons';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-4xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="hidden font-headline text-lg font-bold sm:inline-block">
            HackerView
          </span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname === '/' ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            Top
          </Link>
          <Link
            href="/new"
            className={cn(
              'transition-colors hover:text-foreground/80',
              pathname.startsWith('/new') ? 'text-foreground' : 'text-foreground/60'
            )}
          >
            New
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
