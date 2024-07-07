// src/app/api/send-otp/route.ts

import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../../../../firebase/firebase';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Gmail API setup
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendMail(email: string, otp: string) {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const message = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://i.pinimg.com/736x/92/35/76/923576278d7ea38728ba99c842cdcd62.jpg" alt="Garbage Tracking System Logo" style="max-width: 100px;">
            </div>
            <h2 style="color: #4CAF50; text-align: center;">Garbage Tracking System</h2>
            <p>Dear User,</p>
            <p>Your OTP for registration is:</p>
            <p style="font-size: 1.5em; color: #4CAF50; text-align: center; font-weight: bold;">${otp}</p>
            <p style="text-align: center;">This OTP is valid for the next 10 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
            <div style="text-align: center; margin-top: 20px;">
                <a href="https://google.com/support" style="color: #4CAF50; text-decoration: none;">Contact Support</a>
            </div>
            <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 0.9em; text-align: center; color: #777;">Garbage Tracking System &copy; 2024. All rights reserved.</p>
        </div>
    `;

    const rawMessage = [
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        'Content-Transfer-Encoding: 7bit',
        'to: ' + email,
        'from: "Garbage Tracking System" <rockarpan31@gmail.com>',
        'subject: OTP for Registration',
        '',
        message,
    ].join('\r\n').trim();

    const encodedMessage = Buffer.from(rawMessage)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    try {
        await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
            },
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
}

export async function POST(request: Request) {
    try {
        // Parse JSON body from request
        const body = await request.json();
        const { email } = body;

        // Validate required fields
        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Generate OTP
        const otp = generateOTP();

        // Send email via Gmail API
        await sendMail(email, otp);

        // Store OTP in Firestore
        const db = getFirestore(app);
        await setDoc(doc(db, 'otps', email), {
            otp,
            expiry: Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes
        });

        // Respond with success message
        return NextResponse.json({ message: 'OTP sent successfully' });
    } catch (error) {
        // Determine appropriate error response
        let errorMessage = 'Error sending OTP';
        let statusCode = 500;

        if (error.response) {
            // The request was made and the server responded with a status code
            errorMessage = `Gmail API error: ${error.response.data}`;
            statusCode = error.response.status;
        } else if (error.request) {
            // The request was made but no response was received
            errorMessage = 'No response received from Gmail API';
        } else {
            // Something happened in setting up the request that triggered an error
            errorMessage = error.message || 'Unknown error';
        }

        return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }
}
