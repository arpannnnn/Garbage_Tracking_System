import ThemeToggle from '../layouts/ThemeToggle/theme-toggle';
import { cn } from '../../src/app/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from '../layouts/user-nav';
import Link from 'next/link';

export default function Header() {
    return (
        <div className="  supports-backdrop-blur:bg-background/60    left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-14 items-center justify-between px-4 bg-gradient-to-r from-green-400 to-blue-600">
                <div className="hidden lg:block">
                    
                </div>
                <div className={cn('block lg:!hidden')}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    <UserNav />
                    {/* <ThemeToggle /> */}
                </div>
            </nav>
        </div>
    );
}