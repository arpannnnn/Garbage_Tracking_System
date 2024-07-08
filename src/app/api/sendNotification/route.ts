import { NextResponse } from 'next/server';
import axios from 'axios';
import { google } from 'googleapis';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../../../../firebase/firebase';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Gmail API setup
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email: string) {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const message = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://i.pinimg.com/736x/92/35/76/923576278d7ea38728ba99c842cdcd62.jpg" alt="Garbage Tracking System Logo" style="max-width: 100px;">
    </div>
    <h2 style="color: #4CAF50; text-align: center;">Garbage Tracking System</h2>
    <p>Dear User,</p>
    <p>We are excited to inform you that the driver is within 400 meters of your location!</p>
    <p style="text-align: center;">Please be ready with your garbage for a quick and efficient collection.</p>
    <p>If you have any questions or need assistance, please contact our support team.</p>
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
    'subject: Driver Notification',
    '',
    message
].join('\n');

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
        const body = await request.json();
        const { userId, userLatitude, userLongitude } = body;

        if ( !userId || !userLatitude || !userLongitude) {
            return NextResponse.json({ error: 'Message, userId, userLatitude, and userLongitude are required' }, { status: 400 });
        }

        // Retrieve user's email from Firestore
        const db = getFirestore(app);
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (!userDoc.exists()) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { email } = userDoc.data();

        if (!email) {
            return NextResponse.json({ error: 'User email not found' }, { status: 404 });
        }

        // Send email via Gmail API
        await sendMail(email);

        // Respond with success message
        return NextResponse.json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);

        // Determine appropriate error response
        let errorMessage = 'Error sending notification';
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
