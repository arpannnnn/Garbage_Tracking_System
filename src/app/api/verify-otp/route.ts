import { NextResponse } from 'next/server';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../../../../firebase/firebase';

export async function POST(request: Request) {
    try {
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json({ error: 'Email and OTP are required' }, { status: 400 });
        }

        const db = getFirestore(app);
        const otpDoc = await getDoc(doc(db, 'otps', email));

        if (!otpDoc.exists()) {
            return NextResponse.json({ error: 'No OTP found for this email' }, { status: 400 });
        }

        const otpData = otpDoc.data();

        if (Date.now() > otpData.expiry) {
            await deleteDoc(doc(db, 'otps', email));
            return NextResponse.json({ error: 'OTP has expired' }, { status: 400 });
        }

        if (otp === otpData.otp) {
            await deleteDoc(doc(db, 'otps', email));
            return NextResponse.json({ success: true, message: 'OTP verified successfully' });
        } else {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return NextResponse.json({ error: 'Error verifying OTP' }, { status: 500 });
    }
}