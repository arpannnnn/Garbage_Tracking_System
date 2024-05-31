import { NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { customAuth, db } from '../../../../../firebaase/firebase.js';
import { doc, setDoc } from "firebase/firestore";

export async function POST(request) {
    try {
        const { email, password, fullName, citizenship, mobileNumber, latitude, longitude, role } = await request.json();

        if (!email) throw new Error('Email must not be empty');
        if (!password) throw new Error('Password must not be empty');
        if (!fullName) throw new Error('Full Name must not be empty');
        if (!citizenship) throw new Error('Citizenship must not be empty');
        if (!mobileNumber) throw new Error('Mobile Number must not be empty');
        if (!latitude) throw new Error('Latitude must not be empty');
        if (!longitude) throw new Error('Longitude must not be empty');
        if (!role) throw new Error('Role must not be empty');

        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(customAuth, email, password);
        const user = userCredential.user;

        // Save additional user data to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            email,
            fullName,
            citizenship,
            mobileNumber,
            latitude,
            longitude,
            role,
            uid: user.uid,
        });

        return NextResponse.json({ message: 'User registered successfully', status: 200, data: { uid: user.uid } });
    } catch (error) {
        return NextResponse.json({ error: `${error.message}`, status: 400 });
    }
}
