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

async function sendMail(email: string, message: string) {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const rawMessage = [
        'From: "Garbage " <rockarpan31@gmail.com>',
        `To: ${email}`,
        'Subject: Driver Notification',
        '',
        message,
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
        // Parse JSON body from request
        const body = await request.json();
        const { message, userId } = body; // Assuming userId is provided in the request body

        // Validate required fields
        if (!message || !userId) {
            return NextResponse.json({ error: 'Message and userId are required' }, { status: 400 });
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
        await sendMail(email, message);

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
