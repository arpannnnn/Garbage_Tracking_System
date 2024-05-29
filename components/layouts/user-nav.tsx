'use client';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '../../components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react';
export function UserNav() {
    const { data: session } = useSession();
    if (!session) { //for test !session done
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src='https://avatars.dicebear.com/api/avataaars/123.svg'
                                // src={session.user?.image ?? ''}
                                alt="ok"

                            // {session.user?.name ?? ''}

                            />
                            <AvatarFallback>

                                Binay
                                {/* {session.user?.name?.[0]} */}

                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Arpan
                                {/* {session.user?.name} */}

                            </p>

                            <p className="text-xs leading-none text-muted-foreground">
                                arpan@gmail.com
                                {/* {session.user?.email} */}

                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            Profile

                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Billing

                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings

                        </DropdownMenuItem>
                        <DropdownMenuItem>New Team</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                        Log out

                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
}