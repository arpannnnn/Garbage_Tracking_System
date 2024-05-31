'use client';

import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../components/ui/dropdown-menu'

export function UserNav() {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const username = profile ? profile.name : "Loading...";
    const email = profile ? profile.email : null;
    const role = profile ? profile.role : null;

    useEffect(() => {
        async function fetchProfile() {
            try {
                const authToken = JSON.parse(localStorage.getItem("user_token"));
                const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                    headers: {
                        'Authorization': `Bearer ${authToken.access}`
                    }
                }); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProfile(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch profile data:', error);
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user_token");
        window.location.href = '/login'; // Redirect to login page or home page
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src='https://avatars.dicebear.com/api/avataaars/123.svg'
                            alt="User avatar"
                        />
                        <AvatarFallback>
                            {username.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {username}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {email}
                        </p>
                        <p className="text-xs font-bold uppercase text-green-400 leading-none text-muted-foreground">
                            {role}
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
                <DropdownMenuItem onClick={handleLogout}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
