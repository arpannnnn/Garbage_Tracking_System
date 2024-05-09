import { signInWithEmailAndPassword } from "firebase/auth";
import { NextResponse } from "next/server";
import { customAuth } from "../../../../../firebaase/firebase";

export async function POST(request){
    try{
        const{email,password}=await request.json();
        if(email.length===0) throw Error('email must not be empty')
            if(password.length===0) throw Error('password must not be empty')
                if(password.length<6) throw Error('Password must me more than 6 characters')

        const userCred= await signInWithEmailAndPassword(customAuth,email,password)
        const user=userCred.user;
        return NextResponse.json({message:'succrssfully logged in',staatus:200,data:user});

    }catch(error){
        return NextResponse.json({error:`error?.message`})

    }
}