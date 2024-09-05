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

import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebase/firebase';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


export function UserNav() {
    const { data: session, status } = useSession();

    const db = getFirestore(app);
    const [userData, setUserData] = useState(null);

    //after session?.user?.uid? is available, get user data( as of now i remove it from useEffect)
    const getUser = useCallback(async () => {
        if (status === 'authenticated' && session?.user) {
            try {
                const q = query(collection(db, "users"), where("uid", "==", session.user));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    console.log("No matching documents.");
                } else {
                    querySnapshot.forEach((doc) => {
                        setUserData(doc.data());
                    });
                }
            } catch (error) {
                
            }
        } else {
            
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
                                    src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1720350273~exp=1720353873~hmac=41dcf9e9b31d9e7a101f3babc322f1d2cb77bd3df19637d85f64c0e4e7c02dff&w=740'
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
                                <p className="text-sm font-medium leading-none">
                                    {userData.fullName}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {userData.email}
                                </p>
                                <p className="text-xs font-bold uppercase text-green-400 leading-none text-muted-foreground">
                                    {userData.role}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Link href="/dashboard">
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            {userData.role === 'staff' && (
                                <DropdownMenuItem>
                                    <Link href="/dashboard/notify">
                                        Notify
                                    </Link>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}
