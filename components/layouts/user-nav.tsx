'use client';

import { useCallback, useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '../../components/ui/dropdown-menu';

import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app, customAuth, db } from '../../firebase/firebase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export function UserNav() {
    const { data: session, status } = useSession();
    const db = getFirestore(app);
    const [userData, setUserData] = useState(null);

    const getUser = useCallback(async () => {
        if (status === 'authenticated' && session?.user?.uid) {
            try {
                const q = query(collection(db, "users"), where("uid", "==", session.user.uid));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    console.log("No matching documents.");
                } else {
                    querySnapshot.forEach((doc) => {
                        setUserData(doc.data());
                    });
                }
            } catch (error) {
                console.error("Error getting user data:", error);
            }
        } else {
            console.log("User is not authenticated or UID is missing.");
        }
    }, [db, session, status]);

    useEffect(() => {
        getUser();
    }, [getUser]);



    return (
        <div className="flex items-center space-x-4">
            {userData && (
                <DropdownMenu>

                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">

                                <AvatarImage
                                    src='https://avatars.dicebear.com/api/avataaars/123.svg'
                                    alt="User avatar"
                                />
                                <AvatarFallback>
                                    {userData.fullName}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-semibold leading-none">
                                    {userData.fullName}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {userData.email}
                                </p>
                                <p className="text-xs font-bold uppercase text-green-800 leading-none text-muted-foreground">
                                    {userData.role}
                                </p>
                                {session?.user && (
                                    <li>
                                        <Link href="/api/auth/signout" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Logout</Link>
                                    </li>
                                )}
                            </div>
                        </DropdownMenuLabel>





                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}
