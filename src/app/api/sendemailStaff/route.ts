import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email, subject, message) {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #4CAF50; text-align: center;">Garbage Tracking System</h2>
            <p>Dear Staff Member,</p>
            <p>${message}</p>
            <p>Please check Dashboard for more details.</p>
            <p>If you have any questions, please contact the system administrator.</p>
            <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 0.9em; text-align: center; color: #777;">Garbage Tracking System © 2024. All rights reserved.</p>
        </div>
    `;

    const rawMessage = [
        'Content-Type: text/html; charset=utf-8',
        'MIME-Version: 1.0',
        'Content-Transfer-Encoding: 7bit',
        `to: ${email}`,
        'from: "Garbage Tracking System" <rockarpan31@gmail.com>',
        `subject: ${subject}`,
        '',
        htmlContent
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

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, subject, message } = body;

        if (!email || !subject || !message) {
            return NextResponse.json({ error: 'Email, subject, and message are required' }, { status: 400 });
        }

        await sendMail(email, subject, message);

        return NextResponse.json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json({ error: 'Error sending notification' }, { status: 500 });
    }
}